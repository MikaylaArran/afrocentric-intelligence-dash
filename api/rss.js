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

    // Parse items from RSS XML
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const block = match[1];

      const get = (tag) => {
        const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`))||
                  block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
        return m ? m[1].trim() : "";
      };

      const title       = get("title");
      const link        = get("link") || block.match(/<link>(.*?)<\/link>/)?.[1] || "";
      const pubDate     = get("pubDate");
      const description = get("description").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").slice(0, 220).trim();
      const source      = (() => {
        const s = block.match(/<source[^>]*url="[^"]*"[^>]*>([\s\S]*?)<\/source>/);
        return s ? s[1].trim() : "";
      })();

      if (title) items.push({ title, link, pubDate, description, source });
      if (items.length >= 10) break;
    }

    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate"); // 15 min cache
    return res.status(200).json({ items });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
