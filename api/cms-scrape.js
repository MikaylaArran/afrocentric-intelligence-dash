export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const response = await fetch("https://www.medicalschemes.co.za/circulars/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSS Reader/1.0)",
        "Accept": "text/html,application/xhtml+xml,*/*",
      },
    });

    if (!response.ok) return res.status(502).json({ error: `CMS returned ${response.status}` });

    const html = await response.text();

    // Parse circulars from the page — CMS lists them as links with titles and dates
    const items = [];
    const linkRe = /<a[^>]+href="([^"]*circular[^"]*)"[^>]*>([^<]+)<\/a>/gi;
    const dateRe = /(\d{1,2}\s+\w+\s+\d{4}|\d{4}-\d{2}-\d{2})/;

    let match;
    while ((match = linkRe.exec(html)) !== null && items.length < 20) {
      let url = match[1];
      const title = match[2].replace(/\s+/g, " ").trim();
      if (!title || title.length < 5) continue;
      if (!url.startsWith("http")) url = "https://www.medicalschemes.co.za" + url;

      // Try to find a date near this link in the surrounding HTML
      const surrounding = html.slice(Math.max(0, match.index - 200), match.index + 200);
      const dateMatch = surrounding.match(dateRe);
      const pubDate = dateMatch ? new Date(dateMatch[0]).toUTCString() : new Date().toUTCString();

      items.push({
        title,
        link: url,
        pubDate,
        description: `CMS Circular — ${title}`,
        source: "CMS Website",
        publisher: "Council for Medical Schemes",
      });
    }

    // Also try table rows which CMS sometimes uses
    if (items.length === 0) {
      const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      while ((match = rowRe.exec(html)) !== null && items.length < 20) {
        const row = match[1];
        const linkMatch = row.match(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/i);
        if (!linkMatch) continue;
        let url = linkMatch[1];
        const title = linkMatch[2].replace(/\s+/g, " ").trim();
        if (!title || title.length < 5) continue;
        if (!url.startsWith("http")) url = "https://www.medicalschemes.co.za" + url;
        const dateMatch = row.match(dateRe);
        const pubDate = dateMatch ? new Date(dateMatch[0]).toUTCString() : new Date().toUTCString();
        items.push({ title, link: url, pubDate, description: `CMS Circular — ${title}`, source: "CMS Website", publisher: "Council for Medical Schemes" });
      }
    }

    res.setHeader("Cache-Control", "s-maxage=1800"); // 30 min cache
    return res.status(200).json({ items });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}