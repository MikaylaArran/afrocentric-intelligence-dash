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

    // Strip HTML but preserve text content inside tags
    const stripHtml = (str) => {
      if (!str) return "";
      return str
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")   // unwrap CDATA first
        .replace(/<img[^>]*>/gi, "")                       // remove img tags entirely
        .replace(/<br\s*\/?>/gi, " ")                      // br → space
        .replace(/<\/p>/gi, " ")                           // closing p → space
        .replace(/<\/li>/gi, " ")                          // closing li → space
        .replace(/<[^>]+>/g, "")                           // strip remaining tags
        .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/&hellip;/g, "…").replace(/&#8230;/g, "…")
        .replace(/\[&hellip;\]/g, "…").replace(/\[…\]/g, "…")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/\s+/g, " ").trim();
    };

    const getRaw = (block, tag) => {
      // Try CDATA first
      const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i"));
      if (cdata) return cdata[1].trim();
      // Then plain content
      const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
      if (plain) return plain[1].trim();
      return "";
    };

    const getLink = (block) => {
      const std = block.match(/<link>([^<]+)<\/link>/i);
      if (std) return std[1].trim();
      const guid = block.match(/<guid[^>]*isPermaLink="true"[^>]*>([^<]+)<\/guid>/i);
      if (guid) return guid[1].trim();
      const guid2 = block.match(/<guid[^>]*>([^<]+)<\/guid>/i);
      if (guid2 && guid2[1].startsWith("http")) return guid2[1].trim();
      return "";
    };

    const getSource = (block) => {
      const s = block.match(/<source[^>]*>([^<]*)<\/source>/i);
      return s ? s[1].trim() : "";
    };

    const getExcerpt = (block, title) => {
      // Try content:encoded first (full article text in RSS) — best for free publications
      const contentEncoded = getRaw(block, "content:encoded");
      const raw = contentEncoded || getRaw(block, "description");
      if (!raw) return "";

      const text = stripHtml(raw);
      if (!text || text.length < 15) return "";

      // Only suppress if description is VERY close to title (95%+ match — was 80%, too aggressive)
      const titleNorm = title.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
      const descNorm  = text.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
      // Only suppress if first 95% of title appears at start of desc
      const threshold = Math.floor(titleNorm.length * 0.95);
      const isExactRepeat = titleNorm.length > 20 && descNorm.startsWith(titleNorm.slice(0, threshold));
      if (isExactRepeat) return "";

      // Return up to 300 chars
      return text.length > 300 ? text.slice(0, 300).trim() + "…" : text;
    };

    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 15) {
      const block = match[1];
      const rawTitle = getRaw(block, "title");
      const title = stripHtml(rawTitle);
      if (!title) continue;

      // Google News appends " - Publisher" to titles
      const titleMatch = title.match(/^([\s\S]+?)\s+-\s+([^-]+)$/);
      const cleanTitle = titleMatch ? titleMatch[1].trim() : title;
      const pubGuess   = titleMatch ? titleMatch[2].trim() : "";

      const link    = getLink(block);
      const rawDate = getRaw(block, "pubDate") || block.match(/<pubDate>([^<]+)<\/pubDate>/i)?.[1] || "";
      const pubDate = rawDate.trim();
      const source  = getSource(block) || pubGuess;
      const excerpt = getExcerpt(block, cleanTitle);

      items.push({ title: cleanTitle, link, pubDate, description: excerpt, source });
    }

    // Reduce cache to 5 minutes so news is more current
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json({ items });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}