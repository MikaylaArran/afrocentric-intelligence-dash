import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing url param" });

  // Block paywalled sites — no point trying
  const BLOCKED = ["news24.com", "businessday.co.za", "timeslive.co.za", "sowetanlive.co.za", "dailymaverick.co.za/opinionista"];
  const decoded = decodeURIComponent(url);
  if (BLOCKED.some(b => decoded.includes(b))) {
    return res.status(200).json({ text: "", blocked: true });
  }

  try {
    const response = await fetch(decoded, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ReadabilityBot/1.0)",
        "Accept": "text/html,application/xhtml+xml,*/*",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return res.status(200).json({ text: "", error: `HTTP ${response.status}` });

    const html = await response.text();
    const dom = new JSDOM(html, { url: decoded });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return res.status(200).json({ text: "", error: "Could not extract content" });
    }

    // Clean and truncate to ~800 chars — enough for a good summary
    const text = article.textContent
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 800);

    res.setHeader("Cache-Control", "s-maxage=3600"); // cache 1hr — article text doesn't change
    return res.status(200).json({ text, title: article.title || "" });

  } catch (e) {
    return res.status(200).json({ text: "", error: e.message });
  }
}