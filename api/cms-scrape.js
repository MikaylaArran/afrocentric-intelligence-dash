import { JSDOM } from "jsdom";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    // Fetch the CMS latest publications page — circulars, news, press releases
    const response = await fetch("https://www.medicalschemes.co.za/latest-publication/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)",
        "Accept": "text/html,application/xhtml+xml,*/*",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return res.status(502).json({ error: `CMS returned ${response.status}` });

    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const items = [];

    // CMS uses article cards — each with a link, title, date, category
    const cards = doc.querySelectorAll("article, .post, .entry, .publication-item, h2 a, h3 a");

    cards.forEach(card => {
      // Handle both article elements and direct links
      let title, url, date, description;

      if (card.tagName === "A") {
        title = card.textContent.trim();
        url = card.href;
      } else {
        const link = card.querySelector("a");
        if (!link) return;
        title = link.textContent.trim() || card.querySelector("h2, h3, h4")?.textContent.trim() || "";
        url = link.href;
        date = card.querySelector(".date, time, .published, .entry-date")?.textContent.trim() || "";
        description = card.querySelector("p, .excerpt, .entry-summary")?.textContent.trim() || "";
      }

      if (!title || title.length < 5) return;
      if (!url || !url.includes("medicalschemes.co.za")) return;
      if (url.includes("/publications/") && !url.includes("latest-publication")) return; // skip folder links

      // Convert relative URLs
      if (url.startsWith("/")) url = "https://www.medicalschemes.co.za" + url;

      // Parse date
      let pubDate = new Date().toUTCString();
      if (date) {
        const parsed = new Date(date);
        if (!isNaN(parsed.getTime())) pubDate = parsed.toUTCString();
      }

      // Determine category from title
      const t = title.toLowerCase();
      let category = "CMS Publication";
      if (t.includes("circular")) category = "CMS Circular";
      else if (t.includes("press release")) category = "Press Release";
      else if (t.includes("indaba")) category = "CMS Indaba";
      else if (t.includes("investigation") || t.includes("section 44") || t.includes("section 59")) category = "CMS Investigation";
      else if (t.includes("gazette")) category = "Government Gazette";

      items.push({
        title,
        link: url,
        pubDate,
        description: description || `${category} — ${title}`,
        source: "CMS Website",
        publisher: "Council for Medical Schemes",
        category,
      });
    });

    // If DOM scraping found nothing, try regex fallback on raw HTML
    if (items.length === 0) {
      const linkRe = /<a[^>]+href="(https?:\/\/www\.medicalschemes\.co\.za\/latest-publication\/[^"]+)"[^>]*>([^<]{10,200})<\/a>/gi;
      let m;
      while ((m = linkRe.exec(html)) !== null && items.length < 30) {
        const url = m[1];
        const title = m[2].trim().replace(/\s+/g, " ");
        if (!title || title.length < 10) continue;
        items.push({
          title,
          link: url,
          pubDate: new Date().toUTCString(),
          description: `CMS Publication — ${title}`,
          source: "CMS Website",
          publisher: "Council for Medical Schemes",
          category: title.toLowerCase().includes("circular") ? "CMS Circular" : "CMS Publication",
        });
      }
    }

    // Deduplicate by URL
    const seen = new Set();
    const unique = items.filter(i => {
      if (seen.has(i.link)) return false;
      seen.add(i.link);
      return true;
    }).slice(0, 30);

    res.setHeader("Cache-Control", "s-maxage=1800"); // 30 min cache
    return res.status(200).json({ items: unique });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}