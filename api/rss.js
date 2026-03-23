export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing url param" });

  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSS Reader)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: `Feed returned ${response.status}` });
    }

    const xml = await response.text();

    const clean = (str) =>
      str
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();

    const getTag = (block, tag) => {
      // CDATA
      const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i"));
      if (cdata) return clean(cdata[1]);
      // Plain
      const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
      if (plain) return clean(plain[1]);
      return "";
    };

    const getLink = (block) => {
      // Standard <link>url</link>
      const std = block.match(/<link>([^<]+)<\/link>/i);
      if (std) return std[1].trim();
      // GUID often contains the URL in Google News
      const guid = block.match(/<guid[^>]*>([^<]+)<\/guid>/i);
      if (guid) return guid[1].trim();
      return "";
    };

    const getSource = (block) => {
      const s = block.match(/<source[^>]*>([^<]*)<\/source>/i);
      if (s) return s[1].trim();
      return "";
    };

    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
      const block = match[1];

      const rawTitle = getTag(block, "title");
      if (!rawTitle) continue;

      // Google News appends " - Publisher" to titles — split it off
      const titleMatch = rawTitle.match(/^([\s\S]+?)\s+-\s+([^-]+)$/);
      const title     = titleMatch ? titleMatch[1].trim() : rawTitle;
      const pubGuess  = titleMatch ? titleMatch[2].trim() : "";

      const link    = getLink(block);
      const pubDate = getTag(block, "pubDate");
      const source  = getSource(block) || pubGuess;

      // Description: Google News puts an HTML table with links here — strip all tags and truncate
      const rawDesc = getTag(block, "description");
      // After clean(), rawDesc may still have leftover URL fragments — remove anything that looks like a URL
      const desc = rawDesc
        .replace(/https?:\/\/\S+/g, "")
        .replace(/href=\S+/gi, "")
        .slice(0, 200)
        .trim();

      items.push({ title, link, pubDate, description: desc, source });
    }

    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");
    return res.status(200).json({ items });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}