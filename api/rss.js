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

    const stripHtml = (str) =>
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
      const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i"));
      if (cdata) return cdata[1].trim();
      const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
      if (plain) return plain[1].trim();
      return "";
    };

    const getLink = (block) => {
      const standard = block.match(/<link>([^<]+)<\/link>/i);
      if (standard) return standard[1].trim();
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
      const title = stripHtml(rawTitle);
      if (!title) continue;

      // Google News appends " - Publisher Name" to titles — extract and clean
      const publisherMatch = title.match(/^(.+?)\s+-\s+([^-]+)$/);
      const titleClean  = publisherMatch ? publisherMatch[1].trim() : title;
      const sourceGuess = publisherMatch ? publisherMatch[2].trim() : "";

      const link    = getLink(block);
      const pubDate = getTag(block, "pubDate");
      const source  = getSource(block) || sourceGuess;

      // Google News description is an HTML table — strip everything
      const rawDesc = getTag(block, "description");
      const desc    = stripHtml(rawDesc).replace(/Read more.*/i, "").slice(0, 200).trim();

      items.push({ title: titleClean, link, pubDate, description: desc, source });
    }

    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");
    return res.status(200).json({ items });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}