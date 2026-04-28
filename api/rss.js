export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing url param" });

  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSS Reader/1.0)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!response.ok) return res.status(502).json({ error: `Feed returned ${response.status}` });

    const xml = await response.text();

    // Strip HTML preserving text content
    const stripHtml = (str) => {
      if (!str) return "";
      return str
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<\/p>/gi, " ")
        .replace(/<\/li>/gi, " ")
        .replace(/<\/div>/gi, " ")
        .replace(/<img[^>]*>/gi, "")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/&hellip;/g, "…").replace(/&#8230;/g, "…")
        .replace(/\[…\]/g, "…").replace(/\[&hellip;\]/g, "…")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/\s+/g, " ").trim();
    };

    // Extract CDATA or plain tag content — handles colons in tag names (e.g. content:encoded)
    const getTag = (block, tag) => {
      // Escape colon for regex
      const escaped = tag.replace(":", "\\:");
      // Try CDATA
      const cdataRe = new RegExp(`<${escaped}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i");
      const cdata = block.match(cdataRe);
      if (cdata) return cdata[1].trim();
      // Try plain
      const plainRe = new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i");
      const plain = block.match(plainRe);
      if (plain) return plain[1].trim();
      return "";
    };

    const getLink = (block) => {
      const std = block.match(/<link>([^<]+)<\/link>/i);
      if (std) return std[1].trim();
      const atom = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*\/>/i);
      if (atom) return atom[1].trim();
      const guid = block.match(/<guid[^>]*isPermaLink="true"[^>]*>([^<]+)<\/guid>/i);
      if (guid) return guid[1].trim();
      const guid2 = block.match(/<guid[^>]*>([^<]+)<\/guid>/i);
      if (guid2 && guid2[1].startsWith("http")) return guid2[1].trim();
      return "";
    };

    const getExcerpt = (block, title) => {
      // Try content:encoded first — many WordPress sites put full text here
      const contentEncoded = getTag(block, "content:encoded");
      const description    = getTag(block, "description");

      // Use whichever is longer and more meaningful
      const rawContent = stripHtml(contentEncoded);
      const rawDesc    = stripHtml(description);

      // Pick description if it's a real excerpt, otherwise try content:encoded
      let text = "";
      if (rawDesc && rawDesc.length >= 30) {
        text = rawDesc;
      } else if (rawContent && rawContent.length >= 30) {
        text = rawContent;
      }

      if (!text) return "";

      // Suppress if description is substantially the same as the title (75%+ match)
      // Google News: desc = "Article Title - Publisher Name" → after cleaning, starts with title
      const titleNorm = title.toLowerCase().replace(/[^a-z0-9]/g, "");
      const textNorm  = text.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (titleNorm.length > 20 && textNorm.startsWith(titleNorm.slice(0, Math.floor(titleNorm.length * 0.75)))) {
        // Try content:encoded as fallback before giving up
        if (rawContent && rawContent !== rawDesc && rawContent.length >= 30) {
          const contentNorm = rawContent.toLowerCase().replace(/[^a-z0-9]/g, "");
          if (!contentNorm.startsWith(titleNorm.slice(0, Math.floor(titleNorm.length * 0.75)))) {
            return rawContent.length > 300 ? rawContent.slice(0, 300).trim() + "…" : rawContent;
          }
        }
        return "";
      }

      return text.length > 300 ? text.slice(0, 300).trim() + "…" : text;
    };

    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 15) {
      const block = match[1];
      const rawTitle = getTag(block, "title");
      const title = stripHtml(rawTitle);
      if (!title) continue;

      // Google News appends " - Publisher" to titles — strip it
      const titleMatch = title.match(/^([\s\S]+?)\s+-\s+([^-]{2,40})$/);
      const cleanTitle = titleMatch ? titleMatch[1].trim() : title;
      const pubGuess   = titleMatch ? titleMatch[2].trim() : "";

      const link    = getLink(block);
      const rawDate = getTag(block, "pubDate") || block.match(/<pubDate>([^<]+)<\/pubDate>/i)?.[1] || "";
      const pubDate = rawDate.trim();
      const source  = (block.match(/<source[^>]*>([^<]*)<\/source>/i)?.[1] || "").trim() || pubGuess;
      const excerpt = getExcerpt(block, cleanTitle);

      // Reject articles dated more than 35 days ago or in the future — catches recycled old content
      if (pubDate) {
        const d = new Date(pubDate);
        const now = Date.now();
        const age = now - d.getTime();
        if (!isNaN(d.getTime()) && (age > 35 * 24 * 60 * 60 * 1000 || age < -60000)) continue;
      }
      items.push({ title: cleanTitle, link, pubDate, description: excerpt, source });
    }

    // 5 minute cache — fresh enough for news
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json({ items });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}