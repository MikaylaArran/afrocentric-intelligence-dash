import { useState, useEffect, createContext, useContext } from "react";

// ==== COMPUTED DATES — single source of truth (never hand-edit day counts again) ====
const TODAY = new Date();
const MS_DAY = 86400000;
const HANDOVER_DATE = new Date(2026, 5, 1);   // 1 June 2026 — Bonitas/Medscheme handover
const LONG_STOP_DATE = new Date(2026, 5, 30); // 30 June 2026 — Activo Long Stop Date
const DAY_COUNT = Math.max(0, Math.floor((TODAY - HANDOVER_DATE) / MS_DAY));
const DAYS_PAST_LONG_STOP = Math.floor((TODAY - LONG_STOP_DATE) / MS_DAY);
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const TODAY_SHORT = `${TODAY.getDate()} ${MONTHS[TODAY.getMonth()]}`;
const TODAY_FULL = `${TODAY_SHORT} ${TODAY.getFullYear()}`;
const TODAY_UPPER = TODAY_FULL.toUpperCase();
// Countdown helper — renders correctly BEFORE, ON and AFTER a date (prevents "0 DAYS AWAY" rot)
const daysUntil = (y, m, d) => Math.ceil((new Date(y, m, d) - TODAY) / MS_DAY);
const countdown = (y, m, d, passedLabel = "CLOSED") => {
  const n = daysUntil(y, m, d);
  return n > 1 ? `${n} DAYS AWAY` : n === 1 ? "TOMORROW" : n === 0 ? "TODAY" : passedLabel;
};

const DARK = {
  bg: "#000000", surface: "#1C1C1E", panel: "#2C2C2E",
  border: "#38383A", border2: "#48484A", muted: "#636366",
  dim: "#98989D", text: "#F5F5F7", bright: "#FFFFFF",
  green: "#30D158", yellow: "#FFD60A", red: "#FF453A",
  blue: "#0A84FF", purple: "#BF5AF2",
};

const LIGHT = {
  bg: "#FFFFFF", surface: "#FFFFFF", panel: "#F5F5F7",
  border: "#D1D1D6", border2: "#C2C2C7", muted: "#86868B",
  dim: "#515154", text: "#1D1D1F", bright: "#000000",
  green: "#1A8F5A", yellow: "#B8860B", red: "#C00021",
  blue: "#0071E3", purple: "#6E3FC5",
};

const ThemeCtx = createContext(DARK);
const useT = () => useContext(ThemeCtx);

const QUERIES = [
  { id: "insights",    label: "Insights",                   icon: "◑", query: "" },
  { id: "competitors", label: "Competitor Intel",           icon: "⊕", query: "Discovery Health Momentum Health BestMed Bonitas Medihelp South Africa medical scheme 2025 2026 news strategy" },
  { id: "general",     label: "AfroCentric Group Buzz",     icon: "◈", query: "AfroCentric Group South Africa 2026 news public discussion opinions" },
  { id: "medscheme",   label: "Medscheme Chatter",          icon: "◇", query: "Medscheme AfroCentric complaints reviews member opinions 2025 2026" },
  { id: "financial",   label: "AfroCentric Financial Buzz", icon: "◎", query: "AfroCentric Group JSE ACT share price results investor reaction 2025 2026" },
  { id: "nhi",         label: "NHI & Policy",               icon: "⬡", query: "AfroCentric NHI National Health Insurance South Africa 2025 2026 public opinion" },
  { id: "employer",    label: "Employer Reputation",        icon: "◉", query: "AfroCentric Group employer culture employee reviews 2025 South Africa" },
  { id: "cms",         label: "CMS & Regulatory",           icon: "⬡", query: "cms", isLive: true },
];

const STATIC_DATA = {

  // ─── GENERAL / AFROCENTRIC GROUP BUZZ ────────────────────────────────────
  general: {
    overallSentiment: "NEGATIVE", sentimentScore: 27, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: `\ud83d\udd34 POST-HANDOVER DAY ${DAY_COUNT} (${TODAY_SHORT}): Bonitas blames Medscheme for ~10,000 outstanding matters; counter-narrative now live. Members still reporting disruptions; cancelled surgeries, 5-hr queues. 🔴 SCOPE CLASH RESOLVED AGAINST MEDSCHEME (24 Jul): CMS says s44 scope was NOT extended — confined to 2022 PHA/BonCap + 2024 Agile tenders; concludes END-AUGUST. Momentum appointment sits in a separate s43 inquiry (Board Notice 73). \ud83d\udfe2 Lenacapavir LAUNCHED 5 JUNE 2026; Lilian Ngoyi Stadium, Secunda, 09h00; President Ramaphosa. \ud83d\udd34 ACT.JO SLUMPS: ~78 ZAC (6 Jul close, Yahoo; -35% from ~120 late June); 52-wk now 61–180. Thin, delayed trade data. 🔴 ACTIVO LONG STOP DATE PASSED (30 JUNE) — NO SENS ISSUED AS AT ${TODAY_SHORT.toUpperCase()} — ${DAYS_PAST_LONG_STOP} DAYS PAST LONG STOP. Deal may have lapsed or been extended in writing by parties; watch for SENS announcement. \ud83d\udd34 FY2025: R1.27bn basic loss, no dividend. \ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, revenue R13.3bn, dividend 44c (+22.2%); AI wearable wards pilot. \ud83d\udd34 1 June 2026 — Bonitas 40% revenue cliff hit permanently. ⚖️ NHI ConCourt — judgment DELIVERED 24 May 2026, no date set. \ud83d\udfe2 CMS Indaba CONCLUDED — Circular 10 directives fully operational.`,
    themes: [
      {
        theme: "🔴 24 JULY — CMS CONTRADICTS MEDSCHEME ON PROBE SCOPE; s44 INVESTIGATION TO CONCLUDE END-AUGUST — Momentum Appointment Sits in a Separate s43 Inquiry",
        sentiment: "negative",
        what: "THE SCOPE DISPUTE IS RESOLVED — AGAINST MEDSCHEME’S VERSION. Responding to Moonstone (24 July), the CMS confirmed TWO separate regulatory processes and stated plainly: ‘The scope [of the section 44 investigation] was not extended, and no communication was issued either to Bonitas or Medscheme advising on the extension of scope.’ (1) SECTION 44 INVESTIGATION — confined to Bonitas’s earlier procurement decisions only: the 2022 appointment of PHA to administer BonCap, and the 2024 award of the marketing, sales and distribution contract to Agile Business Solutions (led by former AfroCentric executive Tobie du Preez). The CMS expects to CONCLUDE THIS BY THE END OF AUGUST 2026 — the next hard catalyst on the calendar. (2) SECTION 43 INQUIRY — a separate, routine process assessing the Momentum Health administrator appointment for compliance with Board Notice 73 of 2004. BN73 requires a fair and reasonable process considering cost, capacity, experience and financial soundness, and prohibits appointing an administrator in which a trustee, employee or officer holds a direct or indirect financial interest — the provision most relevant to the Ribbens conflict allegation. This directly contradicts Medscheme’s 16 July statement that the CMS had given written assurance it had ‘expanded its current investigation relating to prior tenders to include the most recent tender processes’. Bonitas had called that characterisation ‘misinformation’ — and the regulator has now effectively backed Bonitas. The CMS also rejected Medscheme’s assertion that the probe had been paused during litigation: ‘The investigation is ongoing and was never paused.’ PARTIAL COMFORT FOR MEDSCHEME: the CMS confirmed that information it submitted will be considered as part of the section 43 inquiry, and again if that inquiry escalates into a full investigation. CONTEXT: Medscheme withdrew its High Court application (16 July) without the case ever being heard on its merits. BONITAS’S SUBSTANTIVE DEFENCE (Callakoppen, via Daily Maverick/MedicalBrief): AfroCentric initially SUPPORTED appointing an alternative provider for the loss-making BonCap option, and the 2024 marketing tender followed dissatisfaction with the performance of AfroCentric Distribution Services — i.e. both contested awards had AfroCentric-related commercial backstories rather than being unexplained. Bonitas denies the Agile award was conflict-tainted. MEDSCHEME’S REBUTTAL (replying affidavit): on winning the marketing tender, Agile promptly employed or offered to employ ALL 23 existing AfroCentric Distribution staff — which Medscheme argues is inconsistent with Bonitas’s claim that the contract moved because of poor performance. Medscheme also alleges certain former AfroCentric/Medscheme executives set up competing initiatives while still employed, an alleged breach of fiduciary duty, and says Bonitas’s performance criticisms are contradicted by the scheme’s own reporting. REGULATORY TIMELINE: Business Day investigation Oct 2024 → CMS s43 inquiry opened Feb 2025 → concluded Nov 2025 finding the allegations warranted further investigation → s44 forensic investigation initiated, now targeting end-August 2026. The CMS has stressed this does not indicate a predetermined outcome. Medscheme says its evidence of alleged tender irregularities went unanswered and unchallenged, and accuses Bonitas and PHA of using interlocutory applications and delaying tactics to run out the clock past the 1 June handover. Bonitas describes the withdrawal as a 'capitulation', saying Medscheme could not produce evidence of wrongdoing and that the application was moot once the transition was implemented. Neither side’s case was tested in court. The baton passes to the CMS forensic tender investigation — and the parties are already clashing over its scope (Moonstone, 20 Jul): whether it covers only the 2022/2024 awards or extends to the Momentum/PHA contracts from June 2026. The fraudulent-documents allegation (FACTS Consulting) was also never tested in court.",
        sources: [
          { name: "Daily Maverick — withdrawal", url: "https://www.dailymaverick.co.za/article/2026-07-16-medscheme-drops-bonitas-court-fight-clearing-path-for-regulators-forensic-tender-investigation/", date: "16 July 2026" },
          { name: "MedicalBrief — withdrawal", url: "https://www.medicalbrief.co.za/medscheme-drops-bonitas-court-fight/", date: "22 July 2026" },
          { name: "Moonstone — CMS sets end-August target", url: "https://www.moonstone.co.za/cms-sets-end-august-target-for-bonitas-procurement-investigation/", date: "24 July 2026" },
          { name: "Moonstone — scope clash", url: "https://www.moonstone.co.za/bonitas-medscheme-clash-over-scope-of-cms-investigation/", date: "20 July 2026" },
        ],
        watchPoints: [
          `⚡ INTERIM RESULTS 1 SEPTEMBER 2026 (SENS; presentation 2 Sep) — ${countdown(2026,8,1,"RELEASED")}. First results carrying a full period of the Bonitas revenue cliff, and the likely forum for a formal Activo update`,
          `⚡ CMS s44 findings due END-AUGUST — ~${countdown(2026,7,31,"DUE — findings now overdue")}. Adverse findings on the 2022/2024 tenders would retrospectively validate Medscheme’s core allegations even though it lost the litigation`,
          "🔴 Reputational cost: Medscheme publicly claimed an expanded scope the regulator has now denied — a second narrative setback after the ‘capitulation’ framing",
          "⚡ Reputational framing war: 'capitulation' (Bonitas) vs 'evidence unanswered' (Medscheme) — watch which narrative sticks in press coverage",
        ],
        representative_voice: "The scope [of the section 44 investigation] was not extended, and no communication was issued either to Bonitas or Medscheme advising on the extension of scope. The investigation is ongoing and was never paused. — Council for Medical Schemes, 24 July 2026",
      },
      {
        theme: `✅ BHF 25th ANNUAL CONFERENCE — CONCLUDED 8 July, CTICC; Titanium Gala Held 6 July — Full Winners List Still Unpublished; Bestmed Confirmed With Two Awards`,
        sentiment: "neutral",
        what: "The 25th Annual BHF Conference (Board of Healthcare Funders) runs 4–8 July 2026 at the CTICC, Cape Town — theme: 'Facing Headwinds — Thriving in the Unknown'. The 11th Annual Titanium Awards gala banquet was held during the conference; Gala confirmed held Monday 6 July at the CTICC. BHF has STILL not published the full 2026 winners list — verified 29 Jul: the site’s Titanium nav lists only Winners 2023/2024/2025, and the awards page still shows the closed nominations call. Three weeks post-gala vs a 3-day turnaround in 2025. Six categories were contested in 2026, including Best Integrated Report (Corporates in Healthcare) — the category AfroCentric won in 2024. First confirmed winners via press: Bestmed took TWO awards — Excellence in Creating Access to Quality Healthcare, and Service to Membership (Category A: Member Service). No Medscheme or Bonitas 2026 wins confirmed in coverage yet. Watch bhfglobal.com. Historical context: AfroCentric won the 2024 Titanium Award for Best Integrated Report (Corporates in Healthcare). 2025 winners included Bonitas (Service to Membership — Operational Excellence), Bestmed, Momentum Health Solutions (Best Innovator — Multiply), and GEMS (Best Integrated Report). Competitor visibility note: Dr Ayanda Mbuli, CEO of Private Health Administrators (PHA) — the managed-care provider that took the Bonitas contract from Medscheme — is a BHF Board Member and directed the Day 1 Clinical Workshop.",
        sources: [
          { name: "BHF 2026 Conference", url: "https://bhfglobal.com/bhf-conferences/2026-summary/", date: "8 July 2026" },
          { name: "BHF Titanium Awards", url: "https://bhfglobal.com/titanium-awards/", date: "8 July 2026" },
          { name: "2025 winners (reference)", url: "https://bhfglobal.com/2025/05/15/bhf-announces-winners-of-the-2025-titanium-awards-at-the-24th-annual-bhf-conference/", date: "15 May 2025" },
        ],
        watchPoints: [
          "⚡ Watch for the 2026 Titanium Awards winners announcement on bhfglobal.com — any AfroCentric/Medscheme win is a reputation asset; any Bonitas/Momentum/PHA win hands the rival narrative ammunition",
        ],
        representative_voice: "Facing Headwinds — Thriving in the Unknown. — BHF 25th Annual Conference theme, 2026",
      },
      {
        theme: "✅ CONCLUDED 25 JUNE — Sanlam Benchmark 2026 Symposium — SA’s Premier Healthcare & Retirement Research Annual Launch",
        sentiment: "positive",
        what: "The 45th Sanlam Benchmark Symposium concluded 25 June 2026. Sanlam is AfroCentric’s controlling shareholder (~59% stake). AfroCentric’s Dr Nkateko Msimeki spoke at the 2025 edition, challenging the industry: ‘Do we have a healthcare system or a sick-care system? 63% of contributions goes to hospitals and specialists.’ The Benchmark covers healthcare, employee benefits, retirement reform, two-pot system, and NHI. Separately, Discovery Health Medical Scheme held its 2026 AGM virtually on 25 June: 2.7m+ beneficiaries, R89.4bn claims paid in 2025, contributions 17.7% lower than the next 7 largest open schemes on a like-for-like basis. Findings shape Sanlam Corporate’s employee benefits strategy — directly relevant to Medscheme’s closed scheme positioning and AfroCentric’s broader market strategy.",
        sources: [
          { name: "Sanlam Benchmark Symposium", url: "https://www.sanlamonline.co.za/corporate/retirement/benchmark-symposium", date: "25 Jun 2026" },
          { name: "EBnet — 2025 Benchmark Takeaways", url: "https://www.ebnet.co.za/the-2025-sanlam-benchmark-symposium/", date: "20 Jun 2025" },
        ],
        watchPoints: [
          "⚡ Sanlam is AfroCentric’s controlling shareholder — Benchmark strategy shapes employee benefits pipeline for Medscheme",
          "⚡ Watch: any 2026 Benchmark findings on healthcare affordability, NHI, or managed care will directly impact AfroCentric’s market positioning",
        ],
        representative_voice: "Do we have a healthcare system or do we have a sick-care system? 63% of contributions is spent on hospitals and specialists. — Dr Nkateko Msimeki, AfroCentric (Sanlam Benchmark 2025)",
      },
      {
        theme: `\ud83d\udd34 DAY ${DAY_COUNT} POST-HANDOVER: Bonitas Blames Medscheme for ~10,000 Outstanding Matters — Counter-Narrative Now Live`,
        sentiment: "NEGATIVE",
        what: "4 June 2026 (Moonstone): Bonitas issued a statement acknowledging that members, healthcare providers and intermediaries had 'experienced challenges' following the 1 June transition. However, Bonitas attributed the disruptions to ~10,000 outstanding matters — covering authorisations not granted, savings refunds, claims queries and other unresolved requests — which it claims had NOT been resolved during the final months of the previous administration (Medscheme). Bonitas also cited data anomalies in historical member data supplied by Medscheme as exacerbating the problems. This is a direct counter-narrative: Bonitas and Momentum are pointing the finger at Medscheme's wind-down, while Medscheme's court papers (9-10 June) will argue the handover was always going to cause irreversible harm. Day 4 member complaints continue: cancelled surgeries, 5-hour queues, authorisation bottlenecks at Entabeni Hospital. UPDATE: Medscheme WITHDREW the application (reported 16 Jul) — the case was never heard on its merits. Medscheme says its evidence went unanswered and accuses Bonitas/PHA of delaying tactics; Bonitas calls the withdrawal a capitulation. The CMS forensic investigation is now the arena, with the parties clashing over its scope.",
        sources: [
          { name: "Moonstone — service disruption", url: "https://www.moonstone.co.za/bonitas-members-caught-in-service-disruption-after-administration-switch/", date: "4 Jun 2026" },
          { name: "News24 — cancelled surgeries", url: "https://www.news24.com/business/money/bonitas-members-forced-to-cancel-surgeries-amid-switchover-logjam-20260603-0477", date: "3 Jun 2026" },
        ],
        representative_voice: "Following go-live on 1 June, a number of issues came to light that had not been resolved during the final months of the previous administration. These included close to 10,000 outstanding matters relating to authorisations, savings refunds and claims queries. — Bonitas Medical Fund, 4 June 2026",
      },
      {
        theme: "✅ CMS Industry Indaba CONCLUDED (13-14 May) — Circular 10 Directives Fully Operational",
        sentiment: "CAUTIOUS",
        what: "The CMS Industry Indaba 2026 concluded at the Sandton Convention Centre on 14 May. Day 1 (13 May): Minister Motsoaledi keynoted on Section 59 Reform; Retired CJ Ngcobo keynoted on Regulation, Fairness and Sustainability; Gala Dinner. Day 2 (14 May): sustainability, value-based care, strategic purchasing. Circular 10 of 2026 — immediate directives on fraud, waste and abuse — is now in full effect for all administrators including Medscheme. This marks the formal shift from regulatory findings to implementation framework. FASR submission deadline: 29 May — PASSED.",
        sources: [
          { name: "CMS", url: "https://www.medicalschemes.co.za/minister-of-health-to-deliver-keynote-at-cms-industry-indaba-2026/", date: "14 May 2026" },
          { name: "CMS Circular 10", url: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", date: "17 Mar 2026" },
        ],
        representative_voice: "The 2026 Indaba marks the culmination of the Section 59 recommendations — signalling a renewed focus on accountability, strengthened oversight and sustainable healthcare funding. — CMS",
      },
      {
        theme: `\ud83d\udfe2 1 June — Bonitas Handover COMPLETED. Momentum Administration ACTIVE. Day ${DAY_COUNT} — backlog largely cleared; complaints have eased through July.`,
        sentiment: "NEGATIVE",
        what: `1 June 2026: Bonitas transferred to Momentum Health. 750,000+ members now under Momentum administration and PHA managed care. Post-handover Day ${DAY_COUNT} (${TODAY_SHORT}): Bonitas claims most of the ~10,000 backlog items now resolved, but member complaints have gradually eased through July. Litigation WITHDRAWN by Medscheme (reported 16 Jul); dispute now sits with the CMS forensic investigation. Michael Avery (Financial Mail, 11 Jun) called out CMS for slow investigation pace. Medscheme retains responsibility for tax certificates and May commission payments. Fraudulent documents allegation (FACTS Consulting) unresolved. 40% of Medscheme administration income now permanently gone.`,
        sources: [
          { name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" },
          { name: "Moonstone — handover disruption", url: "https://www.moonstone.co.za/bonitas-members-caught-in-service-disruption-after-administration-switch/", date: "4 Jun 2026" },
        ],
        representative_voice: "I doubt there is any chance this is going to be stopped by the court before we move 750,000 members to our back office on 1 June. — Jeanette Marais, Momentum CEO",
      },
      {
        theme: "\ud83d\udfe2 Medscheme Wins Sisonke Health Mandate — Competitive Tender, Live from 1 May 2026",
        sentiment: "POSITIVE",
        what: "Medscheme secured the administration and managed care mandate for Sisonke Health Medical Scheme from 1 May 2026, selected across all categories in a competitive tender. Sisonke Health (formed from the Sisonke/Lonmin Medical Scheme amalgamation) covers employees of Sibanye-Stillwater, Gold Fields, and DRD Gold. A meaningful counterpoint to the Bonitas crisis — it demonstrates that Medscheme can still win new business through proper procurement at its most difficult period.",
        sources: [
          { name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" },
        ],
        representative_voice: "The Sisonke mandate provides Medscheme with an important foothold as it works to stabilise its position in a consolidating market. — Moonstone",
      },
      {
        theme: "\ud83d\udfe2 Lenacapavir HIV Prevention — LAUNCHED 5 JUNE 2026; Gauteng Rollout Confirmed (7 Jun) — 56,079 Clients, 133 Clinics",
        sentiment: "POSITIVE",
        what: "Launched 5 June 2026, Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00. President Ramaphosa officiated; Health Minister Motsoaledi, Mpumalanga Premier Ndlovu, SANAC civil society, Global Fund representatives attending. SA becomes the 9th African country to introduce lenacapavir for PrEP. 37,920 doses in country, deploying to 360 high-burden facilities. Near-100% efficacy. Target populations: adolescent girls and young women to age 24, pregnant/breastfeeding mothers, female sex workers, MSM, transgender people, injecting drug users. Supply caution: Gilead manufacturing constraints may limit 2026 volumes; 2027 orders must be placed now. Directly relevant: Aid for AIDS, Pharmacy Direct CCMDD, Scriptpharm.",
        sources: [
          { name: "SA Presidency", url: "https://www.gov.za/news/media-advisories/government-activities/president-cyril-ramaphosa-launches-rollout-lenacapavir", date: "5 Jun 2026" },
          { name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" },
        ],
        representative_voice: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "⚖️ NHI ConCourt — Judgment DELIVERED 24 May: Sections 36–40 Struck Down (Certificate of Need Unconstitutional); Substantive Challenges Remain",
        sentiment: "CAUTIOUS",
        what: "Constitutional Court delivered judgment on 24 May 2026: sections 36–40 of the National Health Act (certificate of need) struck down as unconstitutional. Justice Kate Savage authored the unanimous ruling. In a significant climbdown, the Department of Health issued a statement on 16 May apologising for Health Minister Motsoaledi's remarks questioning whether ConCourt judges could be impartial on NHI given their Parmed Medical Scheme membership. Departmental spokesperson Foster Mohale: 'If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise.' All other major NHI court challenges (SAMA, Solidarity, HASA, HFA, SAPPF, Sakeliga) are temporarily halted pending the ConCourt's ruling. BHF argued Parliament conducted a 'tick-box' public participation exercise. Government has agreed not to proclaim any NHI sections until the ConCourt rules.",
        sources: [
          { name: "EWN", url: "https://www.ewn.co.za/2026/05/07/concourt-reserves-judgment-in-nhi-challenge", date: "7 May 2026" },
          { name: "IOL", url: "https://iol.co.za/news/politics/2026-05-16-motsoaledi-apologises-after-saying-concourt-judges-benefit-from-private-healthcare-system/", date: "16 May 2026" },
        ],
        representative_voice: "Parliament had no intention of listening to the public — it was a tick-box exercise. Common-sense questions about cost and implementation were raised over and over and not properly addressed. — Advocate Leech, BHF",
      },
      {
        theme: "\ud83d\udd34 ACT.JO SLUMPS TO ~78 ZAC (6 Jul Close; -35% Early July) — 52-Wk Now 61–180; Decline Coincides With Activo Silence",
        sentiment: "CAUTIOUS",
        what: "ACT.JO fell sharply in early July: ~90 ZAC on 3 Jul (day range 85–90; Investing.com/Morningstar), then 78 ZAC at the 6 Jul close (-13.3%; Yahoo) — roughly -35% from ~120 in late June. 52-week range now 61–180 ZAC; just +28% above the 61 ZAC all-time low (20 Mar 2026). Market cap ~R640m at 78 ZAC (R737m at 90). Note: counter is illiquid with delayed quotes — treat single prints with caution. The decline coincides with the Activo Long-Stop silence and preceded the court-withdrawal news. No new SENS since AGM results (11 May). Key pending SENS event: Activo disposal Long Stop Date 30 June 2026 (PASSED 30 June — no SENS); buyer FHC Group (Laboratórios Basi, Portugal); carrying value ~R1.1bn; proceeds earmarked to deleverage balance sheet. H1 2026 interim results SENS: 1 Sep 2026.",
        sources: [
          { name: "Investing.com NG", url: "https://ng.investing.com/equities/afrocentric-investment-corp-chart", date: "7 July 2026" },
          { name: "TradingView JSE:ACT", url: "https://www.tradingview.com/symbols/JSE-ACT/", date: "7 July 2026" },
          { name: "Moneyweb ACT SENS", url: "https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/", date: "7 July 2026" },
          { name: "AfroCentric investor centre", url: "https://www.afrocentric.za.com/investor-centre/", date: "May 2026" },
        ],
        representative_voice: `ACT ~78 ZAC (6 Jul close; -35% early July). 52-wk 61–180. Activo Long Stop Date PASSED 30 JUNE — NO SENS as at ${TODAY_SHORT} (${DAYS_PAST_LONG_STOP} days past Long Stop). Deal may have lapsed or parties extended in writing. Watch for SENS announcement. The investor calendar confirms the next scheduled disclosure is Interim results SENS on 1 September 2026 (presentation 2 September) — the first results to carry a full period of the Bonitas revenue cliff, and the likely point at which the Activo position must be formally addressed.`,
      },
      {
        theme: "\ud83d\udfe2 Social Media Signals — Schwulst Op-Eds (55 Years + Public-Private), GEMS Golf, CMS Registrar Meeting",
        sentiment: "CAUTIOUS",
        what: "Four low-volume but strategically significant social signals from AfroCentric/Medscheme in April–May 2026. (1) CEO Andrew Schwulst published a thought leadership op-ed on Medscheme's 55 years of healthcare administration — value-based care, sustainable member-centric delivery. (2) A second Schwulst piece: 'Healthcare as a Pillar — How Public-Private Collaboration Can Transform Healthcare' — directly relevant to NHI positioning and Pharmacy Direct/CCMDD public sector work. (3) AfroCentric Facebook (~15 May): 'Medscheme and GEMS: Golfing with Purpose' — a visible relationship event with Medscheme's most critical remaining client at the most difficult moment. (4) CMS Registrar Dr Musa Gumede formally welcomed the Medscheme Holdings CEO and team — a signal of constructive regulatory engagement, particularly significant given Section 44/Indaba governance agenda.",
        sources: [
          { name: "AfroCentric LinkedIn — Schwulst 55 years", url: "https://www.linkedin.com/posts/afrocentric-group_medscheme-healthcare-thoughtleadership-activity-7455207989038268416-YYO_", date: "Late Apr 2026" },
          { name: "Medscheme LinkedIn — public-private", url: "https://www.linkedin.com/posts/medscheme-holdings_andrew-schwulst-healthcare-as-a-pillar-of-activity-7328025246781849601-9EDy", date: "Apr 2026" },
          { name: "AfroCentric Facebook — GEMS golf", url: "https://www.facebook.com/afrocentricHealth/", date: "~15 May 2026" },
          { name: "CMS LinkedIn — Registrar welcome", url: "https://www.linkedin.com/posts/council-for-medical-schemes_registrar-dr-musa-gumede-welcomed-medscheme-activity-7315005016237342720-nqqf", date: "Mar/Apr 2026" },
        ],
        representative_voice: "55 years of delivering sustainable, member-centric care through value-based approaches and smarter risk management. Healthcare as a pillar — public-private collaboration can transform healthcare in South Africa. — Andrew Schwulst, Medscheme CEO, April/May 2026",
      },
      {
        theme: "\ud83d\udd34 FY2025 Results — R1.27bn Basic Loss, No Dividend, Revenue Cliff — HIT 1 JUNE 2026",
        sentiment: "NEGATIVE",
        what: "AfroCentric Group FY2025: revenue R7.3bn (+93.9%), R1.59bn impairment charge (Activo, ADS Group, Wellworx disposals), R1.27bn basic loss (151.55c/share). Headline earnings R117.1m (13.92c/share). No dividend. Bonitas contributes approximately 40% of Medscheme admin income — that revenue exited permanently on 1 June 2026. AGM held 11 May. H1 2026 interim results SENS: 1 Sep 2026.",
        sources: [
          { name: "Business Day", url: "https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/", date: "4 Mar 2026" },
        ],
        representative_voice: "The all-time low of 61 ZAC on 20 March tells the full story. The market priced in the Bonitas loss, impairments, and deep uncertainty about FY2026.",
      },
      {
        theme: "\ud83d\udfe2 Scale Intact — 4 Million+ Lives, GEMS and Polmed the Priority Contracts",
        sentiment: "POSITIVE",
        what: "Despite the Bonitas loss, Medscheme administers 4 million+ lives including GEMS, Polmed, Fedhealth, and now Sisonke Health. GEMS and Polmed renewals are the most strategically critical contracts on the book. GEMS's 9.8% increase for 2026 (below the 21% market estimate) reflects cost discipline — an environment that favours Medscheme's scale efficiencies. Data depth across 12 million monthly claims and automated pre-authorisation remain structural assets no competitor can quickly replicate.",
        sources: [
          { name: "AfroCentric IAR 2025", url: "https://www.afrocentric.za.com" },
          { name: "Medical Brief", url: "https://www.medicalbrief.co.za/bonitas-cuts-ties-with-medscheme/", date: "Feb 2026" },
        ],
        representative_voice: "Medscheme currently has 14 medical scheme clients including GEMS. The Sisonke win adds a 15th. The question is whether GEMS and Polmed hold firm.",
      },
    ],
    topVoices: [
      { type: "Michael Avery, Financial Mail (11 Jun)", sentiment: "negative", quote: "Bonitas’ members are delivering their own verdict as they live with the consequences. The desperation and outrage on the Bonitas Facebook page make for grim reading. The CMS must account for why it has taken so long to conclude its investigation. The affidavit: ‘There can be no denying that Mr Ribbens is conflicted and that his conduct constitutes financial impropriety.’" },
      { type: "Bonitas (4 June counter-statement)", sentiment: "negative", quote: "Following go-live on 1 June, a number of issues came to light that had not been resolved during the final months of the previous administration. These included close to 10,000 outstanding matters relating to authorisations, savings refunds and claims queries, as well as data anomalies in historical member data." },
      { type: "Momentum CMO McHugh (3 June)", sentiment: "negative", quote: "We are aware that members requiring urgent pre-authorisations have experienced extended wait times and contact centre delays that fall short of our standard 24- to 48-hour turnaround. We take full responsibility for our part in resolving this." },
      { type: "DoH Spokesperson Mohale (16 May)", sentiment: "cautious", quote: "If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise and withdraw whatever statements may have been offensive. The Minister has full confidence and trust in the fairness and integrity of the judiciary." },
      { type: "Sanlam CEO Hanratty", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
      { type: "Schwulst (Medscheme CEO)", sentiment: "cautious", quote: "55 years of delivering sustainable, member-centric care through value-based approaches. Healthcare as a pillar — public-private collaboration can transform healthcare in South Africa." },
    ],
    watchPoints: [
      `🔴 ${TODAY_SHORT.toUpperCase()} DAY ${DAY_COUNT}: CASE WITHDRAWN (16 Jul) — dispute moves to CMS probe; scope now contested`,
      "\ud83d\udfe2 27 MAY — Bonitas claims switched to Momentum (final Medscheme claims run was 26 May)",
      "\ud83d\udd34 3–5 June — Post-handover chaos: cancelled surgeries, 5-hr queues, authorisation bottleneck; Momentum accepted responsibility (3 Jun); Bonitas counter-blame (4 Jun)",
      "🔴 11 June — Financial Mail: Michael Avery ‘Behind the Bonitas Outrage’ — calls out CMS delay and Ribbens conflict; ‘no denying Mr Ribbens is conflicted’ (affidavit)",
      "🔴 24 JUL — CMS CONTRADICTS MEDSCHEME on scope: ‘The scope was not extended, and no communication was issued either to Bonitas or Medscheme advising on the extension of scope.’ Bonitas’s version vindicated; reputational setback for Medscheme after its 16 Jul claim.",
      "⚡ CMS s44 investigation targets END-AUGUST conclusion — covers only the 2022 PHA/BonCap award and the 2024 Agile Business Solutions marketing/sales contract. Findings are the next material catalyst.",
      "⚡ Momentum/PHA appointment sits in a SEPARATE s43 inquiry (Board Notice 73 compliance) — BN73 bars appointing an administrator in which a trustee or officer holds a direct/indirect financial interest, which is where the Ribbens conflict allegation would land.",
      "🟢 Partial comfort for Medscheme: CMS confirms its court evidence WILL be considered in the s43 inquiry, and again if that inquiry escalates into a full investigation.",
      "🔴 16 JUL — Medscheme WITHDRAWS court case: says evidence went 'unanswered' and Bonitas/PHA used delaying tactics; Bonitas calls it 'capitulation'.",
      "\ud83d\udfe2 Lenacapavir — LAUNCHED 5 JUNE 2026; Gauteng rollout (7 Jun) targets 56,079 clients across 133 clinics by Mar 2027",
      "⚠️ FASR regulatory submission deadline — 29 May — PASSED",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 governance directives fully in effect for all administrators",
      "\ud83d\udfe2 Motsoaledi apologised for ConCourt judges impartiality remarks (16 May) — full confidence in judiciary affirmed",
      "\ud83d\udd34 24 MAY — ConCourt struck down Certificate of Need (Sections 36–40) — unconstitutional; DoH says no direct NHI impact",
      "NHI ConCourt — judgment DELIVERED 24 May 2026 7 May, no date set; all other NHI challenges (12+) halted pending ruling; Ramaphosa committed no proclamation until judgment",
      "\ud83d\udfe2 Sisonke mandate live 1 May — watch for further new business wins",
      "\ud83d\udd34 ACT.JO ~78 ZAC (6 Jul close) — -35% early-July slump; 52-wk 61–180; only +28% above all-time low",
      "🔴 30 June 2026 — Activo disposal Long Stop Date (PASSED 30 June — no SENS) — conditions precedent must be met; buyer FHC Group (Portugal); earnout up to R250m — calculated on the 3rd anniversary of closing, paid in three equal instalments on the 3rd, 4th and 5th anniversaries; deferred payment due ~50 business days post-closing and can be NEGATIVE (seller pays purchaser)",
      "\ud83d\udd34 SENS 23 Apr: Activo disposal REVISED TERMS — Long Stop Date 30 June 2026; shareholder circular pending",
      "\ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, revenue +4.8%, dividend 44c (+22.2%); Da Costa CEO Designate from 1 June",
      "\ud83d\udfe2 GEMS golf event (~15 May): 'Golfing with Purpose' — key relationship signal with most critical remaining client",
      "\ud83d\udfe2 Schwulst LinkedIn op-eds — 55 years + public-private collaboration; deliberate reputational positioning",
      "Fraudulent documents — criminal referral to SAPS or NPA still possible; NPA AFU has new leadership (Mtengwane, 14 May)",
      "GEMS and Polmed renewals — most strategically critical contracts remaining; Circular 10 implies benchmarking scrutiny",
      "H1 2026 interim results — SENS 1 Sep 2026, presentation 2 Sep — first full period showing Bonitas revenue impact",
    ],
    sourceCount: 61,
  },

  // ─── MEDSCHEME CHATTER ────────────────────────────────────────────────────
  medscheme: {
    overallSentiment: "NEGATIVE", sentimentScore: 24, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: `\ud83d\udd34 DAY ${DAY_COUNT} POST-HANDOVER (${TODAY_SHORT}): Bonitas counter-blames Medscheme for ~10,000 unresolved matters and data anomalies — narrative battle continues. 🔴 24 JUL — CMS CONTRADICTS MEDSCHEME: s44 scope ‘was not extended’; confined to 2022/2024 tenders, concludes END-AUGUST. Momentum appointment handled under separate s43 inquiry. CMS also rejects Medscheme’s claim the probe was paused. \ud83d\udfe2 Sisonke mandate live. ✅ FASR submitted 29 May. \ud83d\udd34 Fraudulent documents allegation unresolved. \ud83d\udfe2 Sisonke Health mandate won via competitive tender from 1 May — proof Medscheme can still win new business. \ud83d\udfe2 Momentum: R100m+ invested, 744 hires, 22 walk-in centres. \ud83d\udfe2 Scale intact — 4m+ lives; GEMS and Polmed now most critical contracts. ✅ CMS Indaba CONCLUDED — Circular 10 fully operational.`,
    themes: [
      {
        theme: `\ud83d\udd34 DAY ${DAY_COUNT} POST-HANDOVER — Bonitas Counter-Blames Medscheme for ~10,000 Outstanding Matters; Narrative Battle Intensifies`,
        sentiment: "NEGATIVE",
        what: "4 June 2026 (Moonstone): Bonitas issued a counter-statement attributing the post-handover disruptions partly to ~10,000 outstanding matters — authorisations not granted, savings refunds, claims queries and other unresolved requests — which it claims had NOT been resolved during the final months of Medscheme's administration. Bonitas also cited data anomalies in historical member data supplied by Medscheme as exacerbating operational issues. This is a major narrative shift: Bonitas and Momentum are no longer simply accepting responsibility — they are redirecting blame at Medscheme. These competing narratives were never tested in court — Medscheme withdrew its application (reported 16 Jul); they now fall to the CMS forensic investigation, whose scope the parties are contesting. Key member incidents reported: (1) One patient waited 9+ days without pre-authorisation for a scheduled ear operation at Entabeni Hospital; (2) Facebook and social media showing 5-hour queue times with dropped calls; (3) Hospital staff at Entabeni reporting a backlog of Bonitas authorisation requests. Momentum CMO McHugh accepted responsibility on 3 June; Bonitas's 4 June statement added the Medscheme counter-claim.",
        sources: [
          { name: "Moonstone — service disruption", url: "https://www.moonstone.co.za/bonitas-members-caught-in-service-disruption-after-administration-switch/", date: "4 Jun 2026" },
          { name: "News24 — cancelled surgeries", url: "https://www.news24.com/business/money/bonitas-members-forced-to-cancel-surgeries-amid-switchover-logjam-20260603-0477", date: "3 Jun 2026" },
        ],
        representative_voice: "Following go-live on 1 June, a number of issues came to light that had not been resolved during the final months of the previous administration. These included close to 10,000 outstanding matters relating to authorisations, savings refunds and claims queries, as well as data anomalies in historical member data. — Bonitas Medical Fund, 4 June 2026",
      },
      {
        theme: "\ud83d\udfe2 Sisonke Health Mandate Won — Competitive Tender, Live from 1 May 2026",
        sentiment: "POSITIVE",
        what: "Medscheme secured the administration and managed care mandate for Sisonke Health Medical Scheme from 1 May 2026, selected across all categories in a competitive tender. Sisonke Health (formed from the Sisonke/Lonmin Medical Scheme amalgamation, 1 April 2025) covers employees of Sibanye-Stillwater, Gold Fields, and DRD Gold. This is a meaningful counterpoint to the Bonitas narrative — it shows Medscheme can still win new business through proper procurement in its most difficult period.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" }],
        representative_voice: "The Sisonke mandate does not replace Bonitas in scale, but it provides Medscheme with an important foothold as it works to stabilise its position. — Moonstone",
      },
      {
        theme: "\ud83d\udfe2 1 JUNE — Bonitas Handover to Momentum COMPLETED; 43-Year Medscheme Relationship Ended",
        sentiment: "NEGATIVE",
        what: "OPERATIONAL MILESTONE (27 May): Medscheme's final claims run was 26 May — Bonitas claims switched to Momentum from 27 May; handover completed 1 June. Historic queries remain with Medscheme; Momentum will resolve new queries directly even for pre-31 May services. Tax certificates and May commission payments remain Medscheme's responsibility. Court: application WITHDRAWN by Medscheme (Jul 2026); the CMS probe continues. Momentum Business Hub decommissioned 26 May; new broker zone launched 1 June. PHA final processes concluded 29 May; PHA managed care live 1 June. Key member concern: Momentum's monthly payment runs vs Medscheme's weekly. Momentum: 22 walk-in centres, 744 new hires, R100m+ budgeted.",
        sources: [{ name: "Moonstone — PHA handover detail", url: "https://www.moonstone.co.za/pha-lays-out-its-case-as-bonitas-managed-care-handover-nears/", date: "May 2026" }, { name: "Moonstone — operational playbook", url: "https://www.moonstone.co.za/bonitas-move-momentum-health-sets-out-the-operational-playbook/", date: "May 2026" }, { name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" }],
        representative_voice: "Medscheme ensures weekly payment runs. Momentum has one run a month. As a healthcare provider, this is an administration nightmare. — Industry commenter, Moonstone",
      },
      {
        theme: "Fraudulent Documents — Most Explosive Unresolved Allegation",
        sentiment: "NEGATIVE",
        what: "AfroCentric Group confirmed: 'Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent.' FACTS Consulting conducted the analysis. Submitting fraudulent documents to a High Court is a criminal offence. No response from PHA or Bonitas published. High Court application removed from roll on 3 March. Criminal referral to SAPS or NPA remains possible — the NPA now has strengthened AFU leadership (Mtengwane appointed 14 May).",
        sources: [{ name: "AfroCentric", url: "https://www.afrocentric.za.com/medscheme-provides-evidence-bonitas-tender-process-was-compromised/", date: "Feb 2026" }],
        representative_voice: "If the forensic evidence of altered documents holds up, this stops being a commercial dispute and starts being a criminal matter. That changes everything.",
      },
      {
        theme: "Section 197 Rejected — 5,000 Staff Without Automatic Protection",
        sentiment: "NEGATIVE",
        what: "Momentum rejected Sanlam's Section 197 LRA application 'in spite of legal precedent'. Approximately 5,000 staff remain without automatic transfer protection. Sanlam's commitments: internal redeployment search, priority applications at Momentum's 744 new roles, provide further details. No headcount guarantee given. A separate LRA court challenge by Sanlam remains possible.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" }],
        representative_voice: "There is a bitter irony in Medscheme staff being told to apply to Momentum for jobs that only exist because Momentum won the contract Medscheme lost.",
      },
      {
        theme: "Scale Intact — 4 Million+ Lives, GEMS and Polmed the Priority Contracts",
        sentiment: "POSITIVE",
        what: "Despite the Bonitas loss, Medscheme administers 4 million+ lives including GEMS, Polmed, Fedhealth, and now Sisonke Health. GEMS and Polmed renewals are the most strategically critical contracts on the book. GEMS's 9.8% increase for 2026 (below the 21% market estimate) reflects cost discipline — an environment that favours Medscheme's scale efficiencies. Data depth across 12 million monthly claims and automated pre-authorisation remain structural assets no competitor can quickly replicate.",
        sources: [{ name: "AfroCentric IAR 2025", url: "https://www.afrocentric.za.com" }, { name: "Medical Brief", url: "https://www.medicalbrief.co.za/bonitas-cuts-ties-with-medscheme/", date: "Feb 2026" }],
        representative_voice: "Medscheme currently has 14 medical scheme clients including GEMS. The Sisonke win adds a 15th. The question is whether GEMS and Polmed hold firm.",
      },
    ],
    topVoices: [
      { type: "Bonitas (4 June counter-statement)", sentiment: "negative", quote: "Following go-live on 1 June, a number of issues came to light that had not been resolved during the final months of the previous administration — close to 10,000 outstanding matters, and data anomalies in historical member data." },
      { type: "Momentum CMO McHugh (3 June)", sentiment: "negative", quote: "We are aware that members requiring urgent pre-authorisations have experienced extended wait times and contact centre delays that fall short of our standard 24- to 48-hour turnaround. We take full responsibility for our part in resolving this." },
      { type: "AfroCentric Group", sentiment: "negative", quote: "Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent." },
    ],
    watchPoints: [
      `🔴 ${TODAY_SHORT.toUpperCase()} DAY ${DAY_COUNT}: CMS resolves scope clash against Medscheme (24 Jul); s44 concludes END-AUGUST; Momentum appointment in separate s43 inquiry`,
      "\ud83d\udfe2 27 MAY — Bonitas claims switched to Momentum (final Medscheme claims run was 26 May)",
      "\ud83d\udfe2 1 June 2026 — Bonitas handover COMPLETED",
      "🔴 16 JUL — Medscheme withdraws Bonitas litigation; Bonitas: 'capitulation'; Medscheme: evidence unanswered, delaying tactics prevented merits hearing",
      "⚠️ FASR regulatory submission deadline — 29 May — PASSED",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 governance directives now fully in effect",
      "\ud83d\udfe2 Sisonke live 1 May — watch for further new client pipeline",
      "Fraudulent documents — criminal referral to SAPS or NPA possible; NPA now has AFU leadership (Mtengwane appointed 14 May)",
      "Section 197 LRA — Sanlam separate court challenge possible",
      "GEMS and Polmed renewals — most strategic contracts remaining on the book",
      "Member experience post-1 June — Bonitas blaming Medscheme for 10,000 backlog; watch for CMS intervention",
    ],
    sourceCount: 36,
  },

  // ─── FINANCIAL ────────────────────────────────────────────────────────────
  financial: {
    overallSentiment: "NEGATIVE", sentimentScore: 21, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: `\ud83d\udd34 ACT.JO SLUMPS: ~78 ZAC (6 Jul close, Yahoo; -35% from ~120 late June; 85–90 range 2–3 Jul); 52-wk now 61–180 ZAC; just +28% above the 61 all-time low. Decline coincides with Activo Long-Stop silence. \ud83d\udd34 1 June 2026 — Bonitas 40% revenue cliff hit permanently. H1 2026 SENS: 1 Sep 2026 (first full Bonitas-loss period). 🔴 ACTIVO LONG STOP DATE PASSED (30 JUNE) — NO SENS ISSUED AS AT ${TODAY_SHORT.toUpperCase()} — ${DAYS_PAST_LONG_STOP} DAYS PAST LONG STOP. Deal may have lapsed or been extended in writing by parties; watch for SENS announcement. No new ACT SENS since 11 May AGM results. \ud83d\udd34 FY2025: R1.27bn basic loss, no dividend. \ud83d\udfe2 Momentum NHE +8%; market share 22%→30% active from 1 June. \ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9%, revenue R13.3bn, dividend 44c (+22.2%). \ud83d\udd34 Sanlam FY2025 headline earnings -18% to R20.08bn.`,
    themes: [
      {
        theme: "ACT.JO — ~78 ZAC (6 Jul Close; -35% Early July); 52-Wk 61–180 | Full SENS Log",
        sentiment: "CAUTIOUS",
        what: "ACT.JO ~78 ZAC (6 Jul close, Yahoo; -13.3% on the day; 85–90 range on 2–3 Jul) — roughly -35% from ~120 in late June. Market cap ~R640m. All-time high: 695 ZAC (Feb 2017); all-time low 61 ZAC (20 Mar 2026); 52-week range now 61–180 ZAC. Illiquid counter; quotes delayed. No new SENS since AGM results (11 May). Full SENS log: (1) 11 May — AGM results. (2) 23 Apr — Revised Activo disposal terms; Long Stop Date 30 June 2026; buyer FHC Group (Laboratórios Basi, Portugal); carrying value ~R1.1bn; proceeds to deleverage. (3) 08 Apr — IAR + AGM notice. (4) 09 Mar — Board change. (5) 04 Mar — FY2025 results (R1.27bn basic loss). (6) 02 Mar — Trading statement. Next: H1 2026 SENS 1 Sep; presentation 2 Sep.",
        sources: [
          { name: "Investing.com NG", url: "https://ng.investing.com/equities/afrocentric-investment-corp-chart", date: "7 July 2026" },
          { name: "TradingView JSE:ACT", url: "https://www.tradingview.com/symbols/JSE-ACT/", date: "7 July 2026" },
          { name: "Morningstar ACT", url: "https://www.morningstar.com/stocks/xjse/act/quote", date: "7 July 2026" },
          { name: "Moneyweb ACT SENS", url: "https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/", date: "7 July 2026" },
          { name: "AfroCentric investor centre", url: "https://www.afrocentric.za.com/investor-centre/", date: "May 2026" },
        ],
        representative_voice: "ACT ~78 ZAC (6 Jul close; -35% early July). 52-wk 61–180. Activo: REVISED TERMS (23 Apr SENS) — R100m upfront + deferred payment (revised down from R600m original). Long Stop Date 30 JUNE (5 DAYS) — CRITICAL: conditions precedent (shareholder approval – AGM passed 11 May; Competition Commission; product registrations) must be fulfilled by 30 June or parties must agree extension in writing. No completion SENS yet.",
      },
      {
        theme: "FY2025 — Revenue R7.3bn (+93.9%), Basic Loss R1.27bn, No Dividend",
        sentiment: "NEGATIVE",
        what: "Loss before tax R532m vs prior profit R225m. Basic loss R1.27bn (151.55c/share). Headline earnings R117.1m (13.92c/share). Revenue R7.3bn (+93.9%). No dividend (vs 6c prior). Impairments R1.59bn from Activo, ADS Group and Wellworx disposals. Results SENS 3 March 2026. AGM held 11 May 2026. Activo disposal revised terms announced — final completion still pending — 30 June 2026 Long Stop Date PASSED with no SENS.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/", date: "4 Mar 2026" }],
        representative_voice: "The R1.59bn impairment is largely non-cash but try explaining that to a retail investor who bought at 300c and is watching it trade at 130c.",
      },
      {
        theme: "\ud83d\udd34 Bonitas Revenue Cliff — 40% of Medscheme Income Gone Permanently (1 June 2026); H1 Impact in Sep Results",
        sentiment: "NEGATIVE",
        what: "Bonitas contributes approximately 40% of Medscheme's administration income. That revenue exited permanently on 1 June 2026. No FY2026 earnings guidance provided. H1 2026 interim results will be the most painful numbers in AfroCentric Group's listed history. The Sisonke mandate partially offsets at far lesser scale. Bonitas's counter-narrative (blaming Medscheme for ~10,000 unresolved matters) adds reputational risk to the financial impact.",
        sources: [{ name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/" }],
        representative_voice: "A 40% income concentration on a single client that you are now losing was always a risk that should have been managed more proactively.",
      },
      {
        theme: "Momentum — Market Share 22%→30% in 4 Days, Interim NHE +8%, Dividend +29%",
        sentiment: "POSITIVE",
        what: `Momentum is the defining competitive winner of 2026. R100m+ budget, 744 new hires, 22 walk-in centres. Market share shifted 22%→30% from 1 June (completed) — SA's second-largest administrator after Discovery. H1 FY2026: headline earnings +8% to R3.56bn, NHE +8% to R3.695bn, HEPS +13% to 274.4c, interim dividend 110c (+29%). F2027 targets — R7bn NHE, 20% ROE — intact. ROE already at 24%, above the 20% target. Post-handover chaos (days 1–${DAY_COUNT}) is a short-term operational risk; SLA recovery underway.`,
        sources: [{ name: "EWN", url: "https://www.ewn.co.za/momentum-health-taking-over-administration-of-bonitas-it-gives-us-incredible-scale/", date: "Mar 2026" }],
        representative_voice: "It results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. — Jeanette Marais, Momentum CEO",
      },
      {
        theme: "\ud83d\udfe2 Netcare H1 2026 — Adj. HEPS +21.9%, Revenue R13.3bn; Contrast With AfroCentric's Position",
        sentiment: "POSITIVE",
        competitor: "Netcare",
        what: "Netcare H1 FY2026 (25 May): revenue +4.8% R13.3bn; normalised EBITDA +6.6% R2.5bn; adj HEPS +21.9% 71.7c; div 44c (+22.2%). Sustainability: Blaauwberg certified first Green Hospital in Africa; wind power PPA on track for 6 Eskom hospitals from Sep 2026; 56 more from Mar 2027 (~60% renewable). Revenue +4.8% to R13.3bn; adjusted HEPS +21.9% to 71.7c; dividend 44c (+22.2%); profit +11.9% to R924m. Digital savings R705m since 2022. R6.1bn net debt at half-year end. Melanie Da Costa is Netcare CEO Designate from 1 June 2026. Contrast with AfroCentric: R1.27bn basic loss, no dividend, 40% revenue cliff — HIT 1 June 2026. Private healthcare demand is resilient; AfroCentric's crisis is structural, not sector-wide.",
        sources: [
          { name: "Moneyweb", url: "https://www.moneyweb.co.za/news/companies-and-deals/netcare-boosts-earnings-as-digital-strategy-delivers-meaningful-dividend/", date: "25 May 2026" },
          { name: "Business Day", url: "https://www.businessday.co.za/companies/earnings/2026-05-25-netcare-first-half-profit-rises-as-demand-remains-resilient/", date: "25 May 2026" },
        ],
        representative_voice: "Netcare adj. HEPS +21.9% vs AfroCentric R1.27bn basic loss — the divergence is stark. Private healthcare demand is resilient; AfroCentric's crisis is entirely self-inflicted by the Bonitas concentration.",
      },
      {
        theme: "Sanlam FY2025 — Headline Earnings Down 18% to R20.08bn | Benchmark 2026 Symposium CONCLUDED (25 Jun)",
        sentiment: "NEGATIVE",
        what: "SANLAM BENCHMARK 2026 SYMPOSIUM CONCLUDED (25 Jun) — SA's most referenced retirement & healthcare research annual launch; AfroCentric's Dr Nkateko Msimeki spoke at 2025 edition asking: 'Do we have a healthcare system or a sick-care system?' Sanlam is AfroCentric's controlling shareholder, making Benchmark findings directly relevant to employee benefits strategy and Medscheme positioning. | Sanlam reported FY2025 results on 12 March 2026 with headline earnings down 18% to R20.08bn. CEO Hanratty called the Bonitas situation a 'human tragedy' for AfroCentric staff while describing the financial impact on Sanlam as manageable. NRFFS was R15.9bn, up 3% actual. Sanlam holds ~59% of AfroCentric Group.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/sanlams-business-engines-a-look-at-the-groups-2025-performance/" }],
        representative_voice: "Sanlam calling it a financial irritation while describing 5,000 job losses as a human tragedy is a clear signal of where AfroCentric Group sits in Sanlam's priority stack.",
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "No dividend, R1.59bn impairments, Bonitas revenue exited 1 June 2026. H1 2026 interim results (SENS 1 Sep) will be the ugliest numbers AfroCentric Group has ever reported." },
      { type: "Momentum CEO", sentiment: "positive", quote: "The Bonitas appointment results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. Our F2027 targets remain intact." },
      { type: "Sanlam CEO", sentiment: "cautious", quote: "The Bonitas situation is not that big a deal for Sanlam financially. But for 5,000 people in that business it is a human tragedy." },
    ],
    watchPoints: [
      "⚡ 1 June 2026 — Bonitas revenue exits Medscheme's books PERMANENTLY",
      "🔴 30 June 2026 — Activo disposal Long Stop Date (PASSED 30 June — no SENS) — conditions precedent must be met; buyer FHC Group (Portugal); earnout up to R250m — calculated on the 3rd anniversary of closing, paid in three equal instalments on the 3rd, 4th and 5th anniversaries; deferred payment due ~50 business days post-closing and can be NEGATIVE (seller pays purchaser)",
      "\ud83d\udd34 ACT.JO ~78 ZAC (6 Jul close); -35% early-July slump; 52-wk 61–180; decline coincides with Activo silence",
      "No new ACT SENS since AGM results (11 May 2026)",
      "SENS 23 Apr: Activo revised terms — Long Stop Date 30 June; carrying value ~R1.1bn",
      "SENS 08 Apr: IAR + AGM notice posted; AGM held 11 May",
      "H1 2026 interim results — SENS 1 Sep 2026, presentation 2 Sep — first full period showing Bonitas revenue impact",
      "Dividend reinstatement — no guidance given",
      "Activo disposal — revised terms 23 Apr; Long Stop Date 30 June 2026; FHC Group buyer",
      "Sanlam stake — no change signalled but strategic review watch point",
    ],
    sourceCount: 23,
  },

  // ─── NHI & POLICY ─────────────────────────────────────────────────────────
  nhi: {
    overallSentiment: "CAUTIOUS", sentimentScore: 35, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "\ud83d\udfe2 5 JUNE — Lenacapavir LAUNCHED; Lilian Ngoyi Stadium, Secunda, 09h00; President Ramaphosa; SA 9th African country. Gauteng rollout (7 Jun): 56,079 clients across 133 clinics by Mar 2027. Supply caution: Gilead 2026 volumes constrained; 2027 orders must be placed now. ⚖️ NHI ConCourt — judgment DELIVERED (24 May); no date set; Ramaphosa committed to no proclamation until ruling. \ud83d\udd34 24 MAY — ConCourt struck down Certificate of Need (Sections 36–40). ✅ CMS Indaba CONCLUDED — Circular 10 fully operational. ⚠️ FASR deadline 29 May — PASSED. \ud83d\udfe2 AfroCentric CCMDD, GEMS and HIV portfolio — strongest NHI hedge in the group.",
    themes: [
      {
        theme: "\ud83d\udfe2 16 MAY — Motsoaledi Apologises for ConCourt Judges' Impartiality Remarks (16 May)",
        sentiment: "CAUTIOUS",
        what: "In a significant climbdown, the Department of Health issued a statement on Friday 16 May clarifying and apologising for Motsoaledi's 13 May remarks. Departmental spokesperson Foster Mohale: 'If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise and withdraw whatever statements may have been offensive.' The Department confirmed Motsoaledi has 'full confidence and trust in the fairness and integrity of the judiciary.' Judges Matter had described the original remarks as a 'gratuitous attack' on judicial independence. The ConCourt NHI judgment remains reserved (7 May) — no date announced. President Ramaphosa has committed not to proclaim any NHI provisions until the ConCourt rules. All other major NHI court challenges (SAMA, Solidarity, HASA, HFA, SAPPF, Sakeliga) are temporarily halted pending the ConCourt's ruling.",
        sources: [{ name: "IOL", url: "https://iol.co.za/news/politics/2026-05-16-motsoaledi-apologises-after-saying-concourt-judges-benefit-from-private-healthcare-system/", date: "16 May 2026" }],
        representative_voice: "If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise and withdraw whatever statements may have been offensive. — DoH spokesperson Foster Mohale, 16 May 2026",
      },
      {
        theme: "\ud83d\udd34 24 MAY — ConCourt Judgment: Certificate of Need (Sections 36–40) Struck Down as Unconstitutional",
        sentiment: "NEGATIVE",
        what: "On 18 May 2026, the Constitutional Court unanimously confirmed a Pretoria High Court ruling striking down Sections 36–40 of the National Health Act 61 of 2003 — the 'Certificate of Need' provisions that would have required healthcare professionals to obtain government approval before opening, relocating or expanding practices. Justice Kate Savage authored the unanimous judgment, finding the provisions irrational and inconsistent with the Constitution. Solidarity described the ruling as the collapse of 'one of the NHI's central pillars'. The Department of Health pushed back: 'The sections were passed 23 years ago and have never been brought into effect — there is no direct impact on the NHI Act.' The main NHI ConCourt challenge (public participation, BHF/Western Cape) remains separately reserved with no date set.",
        sources: [
          { name: "The Citizen", url: "https://www.citizen.co.za/news/concourt-strikes-down-law-giving-health-minister-power-over-where-doctors-can-work/", date: "18 May 2026" },
          { name: "SABC News", url: "https://www.sabcnews.com/sabcnews/concourt-strikes-down-key-nhi-provision/", date: "18 May 2026" },
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-24-its-back-to-the-drawing-board-after-concourts-nhi-judgment/", date: "24 May 2026" },
        ],
        representative_voice: "One of the NHI's central pillars has collapsed today. The government wanted to move healthcare practitioners around like its own pawns on a chessboard. Today the court said that South Africans are not state property. — Solidarity, 18 May 2026",
      },
      {
        theme: "⚖️ NHI ConCourt — Judgment DELIVERED 24 May: Sections 36–40 Struck Down (Certificate of Need Unconstitutional); Substantive Challenges Remain; No Proclamation Until Resolved",
        sentiment: "CAUTIOUS",
        what: "ConCourt delivered 24 May 2026: sections 36–40 struck down (certificate of need unconstitutional). Justice Kate Savage. Dept of Health says ruling does not affect the NHI Act itself. BHF and Western Cape public participation exercise. Parliament's advocate: 350,000+ written submissions. Government: NHI implementation is 'decades away'. Judgment DELIVERED 24 May 2026 — no date set. President Ramaphosa agreed not to proclaim or implement any sections of the NHI Act before the ConCourt delivers judgment — a court order confirmed this agreement. All major NHI court challenges (SAMA, Solidarity, HASA, HFA, SAPPF, Sakeliga) are temporarily halted until the ConCourt rules. If the ConCourt rules against Parliament, the Act could be sent back for fresh consultation. R74m budgeted for NHI litigation in 2026/27.",
        sources: [{ name: "EWN", url: "https://www.ewn.co.za/2026/05/07/concourt-reserves-judgment-in-nhi-challenge", date: "7 May 2026" }, { name: "Business Day — stay order", url: "https://www.businessday.co.za/news/law/2026-02-24-court-orders-halt-in-nhi-litigations-pending-concourt-judgment/", date: "24 Feb 2026" }],
        representative_voice: "Parliament had no intention of listening to the public — it was a tick-box exercise. Common-sense questions about cost and implementation were raised over and over and not properly addressed. — Advocate Leech, BHF",
      },
      {
        theme: "\ud83d\udfe2 Lenacapavir HIV Prevention — LAUNCHED 5 JUNE 2026; Gauteng Rollout Confirmed (7 Jun) — 56,079 Clients, 133 Clinics",
        sentiment: "POSITIVE",
        competitor: "Sector-Wide",
        what: "Launched 5 June 2026, Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00. President Ramaphosa officiated. Health Minister Motsoaledi, Mpumalanga Premier Ndlovu, SANAC civil society, Global Fund donors all attending. 37,920 doses in country, deploying to 360 high-burden facilities. Target populations: adolescent girls and young women to age 24, pregnant/breastfeeding mothers, female sex workers, MSM, transgender people and injecting drug users. Near-100% efficacy. Direct impact: Aid for AIDS, Pharmacy Direct CCMDD, Scriptpharm. SA also engaging Gilead for local production (expression of interest published 5 Mar 2026).",
        sources: [
          { name: "SA Presidency", url: "https://www.gov.za/news/media-advisories/government-activities/president-cyril-ramaphosa-launches-rollout-lenacapavir", date: "5 Jun 2026" },
          { name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" },
        ],
        representative_voice: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "✅ CMS Industry Indaba CONCLUDED (13-14 May) — Section 59 Implementation Operational. June: CMS Men’s Health Month. ⚡ 9 Jun 2026 Gazette: Notice of nominations for new Members of the Council for Medical Schemes — new CMS council composition incoming.",
        sentiment: "CAUTIOUS",
        what: "CMS Industry Indaba 2026 concluded at Sandton Convention Centre on 14 May. Circular 10 of 2026 — immediate directives — now fully in effect for all administrators. Day 1: Motsoaledi on Section 59 Reform; Ngcobo on Regulation, Fairness and Sustainability. Day 2: sustainability, value-based care, strategic purchasing. This marks the formal transition from regulatory findings to implementation framework for the entire sector.",
        sources: [{ name: "CMS", url: "https://www.medicalschemes.co.za/minister-of-health-to-deliver-keynote-at-cms-industry-indaba-2026/", date: "23 Mar 2026" }],
        representative_voice: "The 2026 Indaba marks the culmination of the Section 59 recommendations — from regulatory findings to implementation framework. — CMS",
      },
      {
        theme: "AfroCentric Group's NHI Positioning — CCMDD, HIV and GEMS Are Real Hedges",
        sentiment: "POSITIVE",
        what: "Pharmacy Direct administers CCMDD scripts for the NDoH. Aid for AIDS provides HIV managed care. Medscheme administers GEMS and Polmed. With lenacapavir rolling out 5 June, AfroCentric Group's HIV management portfolio is directly in the path of SA's most significant public health intervention in years. Already embedded in public health delivery at scale — a genuine competitive advantage in any NHI scenario.",
        sources: [{ name: "AfroCentric IAR 2025", url: "https://www.afrocentric.za.com" }],
        representative_voice: "AfroCentric Group already does NHI-style delivery at scale through CCMDD, GEMS and HIV management. That is a structural moat that no competitor can quickly replicate.",
      },
    ],
    topVoices: [
      { type: "DoH Spokesperson Mohale (16 May)", sentiment: "cautious", quote: "If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise. The Minister has full confidence and trust in the fairness and integrity of the judiciary." },
      { type: "Motsoaledi (14 May)", sentiment: "positive", quote: "We dare say we can eliminate HIV/Aids as a public health threat by 2030. Lenacapavir launches 5 June in Secunda, Mpumalanga — President Ramaphosa will officiate the launch." },
      { type: "BHF (ConCourt, 5 May)", sentiment: "negative", quote: "Parliament had no intention of listening to the public — it was a tick-box exercise." },
    ],
    watchPoints: [
      "\ud83d\udfe2 Lenacapavir — LAUNCHED 5 JUNE 2026; Gauteng rollout (7 Jun) targets 56,079 clients across 133 clinics by Mar 2027; SA 9th African country",
      "\ud83d\udd34 24 MAY — ConCourt struck down Certificate of Need (Sections 36–40 National Health Act) — Solidarity victory; DoH says no direct NHI impact",
      "⚠️ FASR regulatory submission deadline — 29 May — PASSED",
      "\ud83d\udfe2 Motsoaledi apologised (16 May) for ConCourt judges impartiality remarks — relationship with judiciary partially repaired",
      "\ud83c\udd95 Circular 14 of 2026 — PMB Definition Guideline; CMS inviting Clinical Advisory Committee nominations",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 implementation framework fully operational",
      "NHI ConCourt ruling — reserved 7 May, no date; could invalidate the Act or send back for fresh consultation; Ramaphosa committed to no proclamation until ruling",
      "All other NHI court challenges (12+) halted pending ConCourt ruling — court stay order in effect",
      "CCMDD, GEMS and HIV management portfolio renewals — core to AfroCentric's public sector positioning",
      "Lenacapavir supply watch — 37,920 doses in country; Gilead manufacturing constraints; 2027 orders must be placed urgently",
    ],
    sourceCount: 33,
  },

  // ─── EMPLOYER REPUTATION ──────────────────────────────────────────────────
  employer: {
    overallSentiment: "NEGATIVE", sentimentScore: 32, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: `\ud83d\udd34 DAY ${DAY_COUNT} POST-HANDOVER: Bonitas now blaming Medscheme for ~10,000 unresolved matters — reputational risk for outgoing administrator. \ud83d\udfe2 1 June handover completed. 5,000 jobs at risk — no S197 protection; S189 retrenchment notices watch in coming weeks. \ud83d\udfe2 Momentum hired 744 — Medscheme staff prioritised (15% absorption rate). \ud83d\udfe2 Sisonke win signals business still competitive. \ud83d\udfe2 Top Employer SA 2025 retained.`,
    themes: [
      {
        theme: "5,000 Jobs at Risk — No Automatic Protection — Post-Handover; Retrenchment Process Watch",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty confirmed ~5,000 jobs at risk across AfroCentric Group and Medscheme. Momentum rejected the Section 197 LRA application 'in spite of legal precedent.' Sanlam's three commitments: identify internal redeployment, prioritise Medscheme staff at Momentum's 744 new roles, provide further details. No headcount guarantee given. With the handover completed on 1 June 2026, staff in Bonitas-dedicated administration teams face the most immediate and imminent uncertainty. Bonitas's counter-narrative (blaming Medscheme for ~10,000 outstanding matters) adds reputational complexity for outgoing Medscheme teams.",
        sources: [{ name: "News24", url: "https://www.news24.com/business/companies/bonitas-medscheme-drama-puts-5-000-jobs-at-risk-says-sanlam-ceo-20260312-1095", date: "12 Mar 2026" }, { name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" }],
        representative_voice: "There are 5,000 people inside that business. It is a human tragedy because there could be massive job losses. — Paul Hanratty, Sanlam CEO",
      },
      {
        theme: "Momentum Hiring 744 — Medscheme Staff Being Prioritised",
        sentiment: "CAUTIOUS",
        what: "Momentum is hiring 744 staff for the Bonitas transition. Sanlam confirmed Medscheme staff applications will be prioritised. In practice, 744 roles represent approximately 15% of the 5,000 at risk — the majority face redeployment or retrenchment. Momentum has completed refurbishing its Sandton offices to accommodate the new employees.",
        sources: [{ name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" }],
        representative_voice: "There is a bitter irony in Medscheme staff having to apply to Momentum for jobs that only exist because Momentum won the contract Medscheme lost.",
      },
      {
        theme: "\ud83d\udfe2 Sisonke Win — A Signal the Business Can Still Operate and Compete",
        sentiment: "POSITIVE",
        what: "The Sisonke Health mandate win (1 May 2026) is a meaningful morale signal for Medscheme staff — it shows the organisation can still win competitive tenders and take on new clients in the middle of its most difficult period.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" }],
        representative_voice: "The Sisonke win matters internally — it tells staff that the business is still competing, still winning, and still has a future beyond Bonitas.",
      },
      {
        theme: "Top Employer Status Retained — Culture Holding Under Pressure",
        sentiment: "POSITIVE",
        what: "AfroCentric Group retained its Top Employer South Africa 2025 certification. The 2026 internship programme was active with a focus on managed care and pre-authorisation. LinkedIn engagement reflects continued pride in clinical and technology work. These markers remain intact even as the workforce navigates its most uncertain period.",
        sources: [{ name: "Top Employers Institute", url: "https://www.top-employers.com" }, { name: "AfroCentric IAR 2025", url: "https://www.afrocentric.za.com" }],
        representative_voice: "Maintaining Top Employer status in the middle of a 5,000-job crisis reflects something real about the organisational culture — even if the structural situation is dire.",
      },
    ],
    topVoices: [
      { type: "Sanlam CEO", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
      { type: "Employee (public forum)", sentiment: "mixed", quote: "Some people are updating their CVs. Others are waiting to see what redeployment looks like. The uncertainty is the hardest part." },
      { type: "Analyst", sentiment: "cautious", quote: "744 Momentum roles for 5,000 at-risk Medscheme staff means the majority face redeployment or retrenchment — not a comfortable ratio." },
    ],
    watchPoints: [
      "\ud83d\udfe2 1 June 2026 — Bonitas handover COMPLETED; retrenchment announcements and S189 processes likely in coming weeks",
      "\ud83d\udd34 Bonitas counter-blame (4 June): ~10,000 unresolved matters attributed to Medscheme — watch for reputational impact on outgoing teams",
      "Sanlam redeployment plan — further detail promised, not yet delivered",
      "Momentum 744 hiring — are Medscheme staff being prioritised in practice?",
      "Section 197 LRA — can Sanlam pursue via court? Watch for challenge",
      "Post-June retrenchment announcements — timing and scale",
      "AfroCentric Technologies talent — senior tech staff may be approached by competitors",
    ],
    sourceCount: 14,
  },

  // ─── COMPETITOR INTEL ─────────────────────────────────────────────────────
  competitors: {
    overallSentiment: "MIXED", sentimentScore: 54, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: `\ud83d\udd34 ${TODAY_SHORT.toUpperCase()} DAY ${DAY_COUNT} — CMS RESOLVES SCOPE CLASH (24 Jul) AGAINST Medscheme: s44 NOT extended, concludes END-AUGUST; Momentum appointment in separate s43 inquiry. Three-way blame: Momentum (3 Jun), Bonitas (4 Jun), Medscheme (5 Jun). \ud83d\udfe2 Lenacapavir LAUNCHED 5 JUNE 2026; SA 9th African country. \ud83d\udfe2 11 JUN — Netcare scales Quro Medical hospital-at-home nationally (55.88% stake, R121m). \ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9%, revenue R13.3bn, dividend 44c (+22.2%); AI wearable wards; Da Costa CEO Designate from 1 June. \ud83d\udd34 18 MAY — NFO ruled against Discovery Life on cancer SIB claim. \ud83d\udd34 24 MAY — ConCourt struck down Certificate of Need (Sections 36–40 National Health Act). \ud83d\udfe2 Discovery H1 FY2026: NHE +27% to R5.75bn — record results. \ud83d\udd34 Sizwe Hosmed — curator Ian Fleming; solvency now compliant (Apr 2026); amalgamation being explored. \ud83d\udfe2 Fedhealth+Sanlam 'Built Different' live Jan 2026; BestMed 6.8% lowest open scheme increase. ✅ CMS Indaba CONCLUDED.`,
    themes: [
      {
        theme: `🔴 ${TODAY_SHORT.toUpperCase()} DAY ${DAY_COUNT} — CMS RESOLVES SCOPE CLASH AGAINST MEDSCHEME (24 Jul): s44 ‘Not Extended’, Concludes END-AUGUST; Momentum Appointment in Separate s43 Inquiry`,
        sentiment: "NEGATIVE",
        competitor: "Momentum",
        what: "4 June 2026 (Moonstone, 19 hours ago): Bonitas issued a counter-statement acknowledging member disruptions but attributing them partly to ~10,000 outstanding matters — authorisations not granted, savings refunds, claims queries — which it claims had NOT been resolved during Medscheme's final administration period. Data anomalies in historical member data also cited. This is a direct counter-narrative to Momentum CMO McHugh's 3 June acceptance of responsibility. The case was never tested: Medscheme withdrew (reported 16 Jul), saying delaying tactics prevented a merits hearing; Bonitas calls it capitulation. The CMS forensic probe — its scope now contested — is the arena. Context: this is actually helpful for Medscheme's narrative position — Bonitas's own statement admits there were pre-existing backlogs, which validates the complexity argument Medscheme made about irreversible harm from an accelerated handover.",
        sources: [
          { name: "Moonstone — service disruption", url: "https://www.moonstone.co.za/bonitas-members-caught-in-service-disruption-after-administration-switch/", date: "4 Jun 2026" },
          { name: "News24 — cancelled surgeries", url: "https://www.news24.com/business/money/bonitas-members-forced-to-cancel-surgeries-amid-switchover-logjam-20260603-0477", date: "3 Jun 2026" },
        ],
        representative_voice: "Following go-live on 1 June, a number of issues came to light that had not been resolved during the final months of the previous administration — close to 10,000 outstanding matters, and data anomalies in historical member data. — Bonitas Medical Fund, 4 June 2026",
      },
      {
        theme: "\ud83d\udfe2 25 MAY — Netcare H1 2026: HEPS +21.9%, Revenue R13.3bn, Dividend 44c (+22.2%) — AND AI/Wearable Wards Pilot (World's Biggest Rollout)",
        sentiment: "POSITIVE",
        competitor: "Netcare",
        what: "FIVE major Netcare developments. (0) QURO EXPANSION (11 Jun): hospital-at-home partnership scaled nationally; Netcare holds 55.88% stake (R121m, Dec 2025 acquisition) plus 2027 EBITDA earn-out; R14m revenue already generated; Quro adding remote diagnostics and AI-assisted clinical decision support. (1) DIGITAL: R705m cumulative savings since 2022 exceeding total CapEx; wearable ward pilot (Corsano Health) underway in general wards for continuous vital sign monitoring; ROIC 12.4%. (2) BUYBACK: 12.6% of issued share capital bought back since Sep 2023; 21.6m shares Oct 2025–Mar 2026 at avg R16.18. (3) CEO SUCCESSION: Melanie Da Costa became CEO Designate on 1 June 2026; formally takes over 1 January 2027. Friedland retires 31 December 2026 after 18 years as CEO. (2) H1 FY2026 RESULTS (25 May): revenue +4.8% to R13.3bn; EBITDA +6.6% to R2.5bn (margin 18.8%); adjusted HEPS +21.9% to 71.7c; profit +11.9% to R924m; interim dividend 44c (+22.2%). Digital strategy generated R705m in cumulative savings since 2022. Net debt R6.1bn at half-year end. Share rose ~5% on results day. Primary care revenue -10.1% (non-renewal of large occupational health contract). FY2026 guidance revised: revenue growth 4.0–4.8%. (3) AI & WEARABLES: Netcare is piloting clinical-grade wearable monitoring (Corsano Health, Swiss MedTech) in general wards — described as the biggest such rollout in the world. Ambient AI listening launching this year. Relevance to AfroCentric: Netcare's AI-driven efficiency gains contrast sharply with Medscheme's structural revenue crisis.",
        sources: [
          { name: "Moneyweb — H1 2026 results", url: "https://www.moneyweb.co.za/news/companies-and-deals/netcare-boosts-earnings-as-digital-strategy-delivers-meaningful-dividend/", date: "25 May 2026" },
          { name: "Business Day — H1 2026", url: "https://www.businessday.co.za/companies/earnings/2026-05-25-netcare-first-half-profit-rises-as-demand-remains-resilient/", date: "25 May 2026" },
          { name: "Business Day — Da Costa CEO", url: "https://www.businessday.co.za/companies/2026-05-19-netcare-names-melanie-da-costa-as-next-ceo/", date: "19 May 2026" },
        ],
        representative_voice: "You are getting an ICU experience in a general ward and it is effortless — all you have to do is wear a watch. — Dr Richard Friedland, Netcare CEO, 25 May 2026",
      },
      {
        theme: "\ud83d\udd34 MAY 2026 — National Financial Ombud Rules AGAINST Discovery Life in Cancer SIB Claim",
        sentiment: "NEGATIVE",
        competitor: "Discovery",
        what: "The National Financial Ombud Scheme (NFO) ruled on 18 May 2026 in favour of a cancer patient in a Severe Illness Benefit (SIB) dispute with Discovery Life. Discovery had used a 'technical defence', arguing the life-changing event occurred on the date of histological confirmation of the cancer diagnosis — which happened to fall on a day when premiums had lapsed. Lead Ombud Denise Gabriels rejected this: 'In the absence of a deeming provision, the date of the life-changing event is the actual date of occurrence.' The ruling is precedent-setting: the illness itself, not the paperwork confirming it, is decisive for SIB claims. Broader sector implications — all life insurers' SIB policy wording now under scrutiny.",
        sources: [{ name: "IOL", url: "https://iol.co.za/news/south-africa/2026-05-18-cancer-claim-dispute-how-discovery-lifes-technical-defence-failed/", date: "18 May 2026" }],
        representative_voice: "Discovery Life has yet to point to the provision in the policy which stipulates that a life-changing event is deemed to have occurred on the date medical confirmation of a covered condition has been received. — Lead Ombud Denise Gabriels, NFO, 18 May 2026",
      },
      {
        theme: "\ud83d\udd34 7 MAY 2026 — Discovery Vitality Sleep Rewards Launched — World's First Sleep Pillar; Dr Matt Walker in SA",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery launched Vitality AI in partnership with Google Cloud — an advanced global health intelligence system combining Google Cloud analytics with Vitality’s behavioural datasets. Also launched Vitality Sleep Score and Sleep Rewards (7 May 2026) — first new core Vitality pillar in almost 20 years. Backed by 'The Sleep Factor' research across 47 million sleep records. Vitality CEO Dinesh Govender: improving sleep linked to up to 24% lower mortality risk and 36% lower motor vehicle accident risk. Oura Ring 4 fully fundable over 24 months with qualifying Discovery Bank account. Dr Matt Walker (author of 'Why We Sleep') is visiting SA. Sleep metrics also integrating into Discovery Insure Vitality Drive. Members can earn Discovery Miles or boost Personal Health Fund by up to R3,000/year.",
        sources: [{ name: "Discovery", url: "https://www.mynewsdesk.com/za/discovery-holdings-ltd/pressreleases/getting-paid-to-sleep-well-vitality-launches-world-first-sleep-rewards-3446938", date: "7 May 2026" }],
        representative_voice: "We have long known that exercise, nutrition and screening are modifiable lifestyle behaviours, but the data is now unequivocal: sleep deserves to stand alongside them. — Dinesh Govender, Discovery Vitality CEO",
      },
      {
        theme: "\ud83d\udfe2 Discovery Holdings H1 FY2026 — Record Results: NHE +27% to R5.75bn, Dividend 111c. Feb 2026: Discovery Place HQ purchased for R4bn",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery Holdings (JSE:DSY) reported record interim results for H1 FY2026 (six months to December 2025) on 4 March 2026. Normalised headline earnings +27% to R5.75bn. Profit before tax +29%. HEPS +29%. Interim dividend 111c/share (+27%). Discovery Bank swung to profitability (monthly profit in December 2025 ahead of plan). New business +12%. Five-year target: 15–20% annual normalised profit growth — Group is tracking ahead. Adrian Gore: 'We have emerged from our cycle of significant investment.'",
        sources: [{ name: "FX Leaders", url: "https://www.fxleaders.com/news/2026/03/04/discovery-delivers-record-earnings-posts-29-profit-surge-as-share-price-jse-trades-at-record-levels/", date: "4 Mar 2026" }],
        representative_voice: "We have emerged from our cycle of significant investment — years of building platforms are now translating into tangible financial returns. — Adrian Gore, Discovery CEO, 4 March 2026",
      },
      {
        theme: "\ud83d\udfe2 Vitality AI + Google Cloud — Global Launch (Nov 2025); Potential to Extend Life Expectancy 8 Years",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery launched Vitality AI globally in November 2025 in partnership with Google Cloud. Built on Personal Health Pathways (PHP) — a South African innovation — and Google Cloud's AI and analytics capabilities. Aims to help millions manage their health through precision-driven insights and personalisation. Potential to extend healthy life expectancy by up to 8 years. PHP saw nearly 4× improvement in completion rates and 5× increase in total health actions completed from 2024 to 2025.",
        sources: [{ name: "iAfrica", url: "https://iafrica.com/discovery-and-google-launch-vitality-ai-exporting-south-african-born-health-innovation-to-the-world/", date: "Nov 2025" }],
        representative_voice: "It's a South African innovation now being exported to the world, with the potential to reshape the global health and insurance landscape. — Discovery, November 2025",
      },
      {
        theme: "\ud83d\udfe2 20 MAY — Discovery Health Rebrands Africa Employer Business to 'Global Health Solutions' — Continental Expansion",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery Health announced that Vitality Health International (Africa) — its employer health insurance business — has rebranded to Discovery Health – Global Health Solutions, effective 1 January 2026. The rebrand covers operations in Nigeria (Leadway Health HMO partner), Kenya (APA Insurance partner), Ghana (Acacia Health Insurance partner) and wider Africa. CEO of the new entity: Emma Knox. Two strategic pillars: (1) continue partnering with in-market insurers across Africa; (2) expand into Administration Services Only (ASO). Relevance to AfroCentric: Discovery is now directly competing in the employer health administration space across Africa — the same territory where AfroCentric's Healthcare Africa segment (Botswana, Mauritius, Namibia) operates.",
        sources: [
          { name: "GNA — Ghana rebrand", url: "https://gna.org.gh/2026/06/discovery-health-rebrands-africa-business-deepens-partnership-with-acacia-health-in-ghana/", date: "1 Jun 2026" },
          { name: "Bizcommunity", url: "https://www.bizcommunity.com/article/discovery-rebrands-vitality-health-international-to-meet-africa-evolving-health-needs-951764a", date: "25 Feb 2026" },
        ],
        representative_voice: "While our name has changed, our commitment to our core purpose — to make people healthier and to enhance and protect their lives — remains the same. — Emma Knox, CEO Discovery Health Global Health Solutions, May 2026",
      },
      {
        theme: "\ud83d\udd34 Discovery Health — CMS Intervenes in Pharmacy Overpayment Recovery Saga (January 2026). CMS Registrar’s Rulings May 2026: two separate rulings against DHMS (M obo L, MJ obo M)",
        sentiment: "NEGATIVE",
        competitor: "Discovery",
        what: "In early January 2026, Discovery Health (DHMS administrator) began recovering funds from members who had been overpaid on pharmacy claims. The CMS intervened after Medicheck escalated concerns. Three issues: (1) systemic claims processing errors; (2) compliance with Regulation 6 of the Medical Schemes Act; (3) governance under Section 57 and Regulation 17. Discovery Health defended the recoveries as lawful under Section 59(3)(a) and DHMS Rules 15.5 and 16.4, and apologised. Relevance to AfroCentric: Medscheme faces heightened operational scrutiny under Circular 10 — any analogous processing error would be extremely high-risk.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/cms-steps-in-as-discovery-health-begins-recovering-pharmacy-overpayments/", date: "Jan 2026" }],
        representative_voice: "We deeply regret the error and inconvenience. In keeping with fairness to all members, the affected members are not legally entitled to retain funds paid in error. — Discovery Health, January 2026",
      },
      {
        theme: "Momentum Health — Market Share 22%→30% LIVE (from 1 June); NHE +8% to R3.7bn; Health4Me 200,000 Members",
        sentiment: "POSITIVE",
        competitor: "Momentum",
        what: `\ud83d\udfe2 1 JUNE: Bonitas handover to Momentum WENT LIVE — 750,000+ members under Momentum administration from 1 June. Claims switched from 27 May; final Medscheme claims run was 26 May. Momentum Health is the defining competitive winner of 2026. R100m+ budget, 744 new hires, 22 walk-in centres. Market share 22%→30% — SA's second-largest administrator after Discovery. H1 FY2026 (Momentum Group): NHE +8% to R3.695bn, HEPS +13% to 274.4c, interim dividend 110c (+29%), ROE 24% vs 20% target. F2027 targets intact. Post-handover: Day 1-${DAY_COUNT} disruptions; Bonitas counter-narrative emerging; short-term operational risk being managed.`,
        sources: [{ name: "BusinessTech", url: "https://businesstech.co.za/news/business/854369/end-of-an-era-for-one-of-the-biggest-medical-aids-in-south-africa-after-43-years/", date: "19 Mar 2026" }],
        representative_voice: "This deal adds more than 750,000 beneficiaries under our administration, bringing the Group's health beneficiaries in Africa to over 3.3 million and worldwide to more than 25 million. — Hannes Viljoen, Momentum Health CEO",
      },
      {
        theme: "\ud83d\udd34 PHA (Private Health Administrators) — Bonitas Managed Care from 1 June; Fraudulent Documents Allegation Unresolved",
        sentiment: "NEGATIVE",
        competitor: "PHA",
        what: "From 1 June 2026, Private Health Administrators (PHA) takes over ALL managed care functions for Bonitas. AfroCentric confirmed cyber-forensic analysis (FACTS Consulting) shows 'documents relied upon by PHA and provided to the court were altered and fraudulent.' No response from PHA published. Submitting fraudulent documents to a High Court is a criminal offence. Court: Medscheme withdrew its application (16 Jul 2026) — the fraudulent-documents allegation was never tested in court. Per the CMS (24 Jul), the s44 investigation covers only the 2022 PHA/BonCap and 2024 Agile awards and concludes end-August; the 2026 Momentum/PHA appointment is assessed separately under a s43 Board Notice 73 inquiry. PHA CEO is Tobie du Preez — a former AfroCentric Group executive. The CMS Section 44 investigation into the 2022 BonCap appointment of PHA (while du Preez was linked to AfroCentric) remains active.",
        sources: [
          { name: "Moonstone — PHA handover", url: "https://www.moonstone.co.za/pha-lays-out-its-case-as-bonitas-managed-care-handover-nears/", date: "May 2026" },
          { name: "AfroCentric — fraudulent documents", url: "https://www.afrocentric.za.com/medscheme-provides-evidence-bonitas-tender-process-was-compromised/", date: "Feb 2026" },
        ],
        representative_voice: "Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent. — AfroCentric Group, February 2026",
      },
      {
        theme: "BestMed — 6.8% Lowest Open Scheme Increase; New Cancer Screening, Cochlear, Adenoidectomy Benefits",
        sentiment: "POSITIVE",
        competitor: "BestMed",
        what: "BestMed implemented the sector's lowest 2026 open scheme contribution increase at 6.8%, with some options as low as 5.1% and a maximum of 7.8%. Principal membership has grown 28% over five years. 2026 benefit enhancements: average benefit increase of 4.6%; faecal occult colon cancer screening added every 24 months for members over 40; adenoidectomy added to Rhythm 1; cochlear implant and BAHA limits raised to R350,000 on Pace 4.",
        sources: [{ name: "IOL", url: "https://iol.co.za/personal-finance/financial-planning/2025-10-29-2026-medical-scheme-contribution-increases-relief-for-members-after-a-year-of-sharp-hikes/", date: "Oct 2025" }],
        representative_voice: "Healthcare inflation remains one of the biggest challenges facing households. Our responsibility is to safeguard the depth of benefits while ensuring contributions remain competitive. — Leo Dlamini, BestMed CEO",
      },
      {
        theme: "🔴 Medihelp — Solvency 20.99% (BELOW 25% Statutory Minimum); 8.46% Increase; New Co-Payment Rule",
        sentiment: "CAUTIOUS",
        competitor: "Medihelp",
        what: "Medihelp's 2026 weighted average increase is 8.46%, with 'most members seeing increases of 7.5% or less' (principal officer Varsha Vala). New 2026 rule: only the highest procedure-specific co-payment per admission will apply — reducing out-of-pocket costs during hospitalisation. Moneyweb noted that for the second consecutive year, Medihelp failed to maintain the required 25% statutory solvency ratio as of mid-2025.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "This elevates Medihelp from simply allocating savings to actively empowering members to manage and grow their benefits. — Varsha Vala, Medihelp Principal Officer",
      },
      {
        theme: "🟢 Fedhealth Remains STANDALONE — Medshield Amalgamation TERMINATED (10 Nov 2025); Fedhealth Stays a Medscheme Administration Client. Fedhealth+Sanlam 'Built Different' Live Jan 2026",
        sentiment: "POSITIVE",
        competitor: "Fedhealth",
        what: "CORRECTION (27 Jul 2026): the Fedhealth–Medshield amalgamation is NOT proceeding. The Competition Commission recommended approval on 22 Aug 2025, but on 10 November 2025 both boards MUTUALLY TERMINATED discussions after independent actuarial evaluations concluded an amalgamation was not in members' best interests. Earlier projections of a top-four combined scheme (135,000+ principal members, 250,000 beneficiaries, R3.3bn reserves, 36.9% solvency) are void. STRATEGIC READ FOR AFROCENTRIC: this is mildly positive — Fedhealth remains standalone and a Medscheme administration client, so the contract-risk scenario of a merged entity re-tendering its administrator has fallen away. Fedhealth's strategy now runs through the Sanlam partnership rather than consolidation. | Fedhealth launched its bold partnership scheme with Sanlam under the 'Built Different' brand from 1 January 2026. Five core values: affordability, customisation, inclusivity, simplicity and trust. 9.6% 2026 contribution increase. Fedhealth gained 7,800 Sanlam employees as part of the partnership. On-site clinics: 32 nationwide. 2026 benefit enhancements: FlexiFED 1 expanded maternity, mental health depression cover on entry-level plans, emergency contraception across all options, pneumococcal vaccine for members 65+.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "Together we're turning the concept of medical aid on its head — building something transparent, trustworthy, affordable and straightforward. — Jeremy Yatt, Fedhealth Principal Officer",
      },
      {
        theme: "\ud83d\udd34 Sizwe Hosmed — Curator Ian Fleming (Feb 2026); Solvency Now COMPLIES With Regulatory Requirements (Apr 2026 Update); Still Under CMS Watch; Amalgamation Explored",
        sentiment: "NEGATIVE",
        competitor: "Sizwe Hosmed",
        what: "Sizwe Hosmed remains under curatorship following placement under CMS oversight in September 2025. First curator Lebogang Mpakati was removed by High Court order on 10 February 2026 — replaced by Ian Fleming (previously curator of Thebemed). Solvency improved from 5% (September 2025) to 30% (Ian Fleming's April 2026 update) — now ABOVE the 25% statutory minimum. 19.15% contribution increase (effective 1 November 2025) stabilised finances. SALGA municipal workers given green light to leave early. Membership continues declining. Prior curator Mpakati had faced sequestration orders. TFS Africa Forensics identified potential duplicate claims exceeding R522m and over 245,000 stale claims totalling R81m. Fleming: 'The scheme's financial position continues to strengthen.' Amalgamation with a stronger scheme actively being explored.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/sizwe-hosmed-high-court-blocks-board-comeback-new-curator-installed/", date: "Feb 2026" }, { name: "Sizwe Hosmed", url: "https://sizwehosmed.co.za/curator-update/", date: "Apr 2026" }],
        representative_voice: "The scheme's financial position continues to strengthen. As at the date of this update, the scheme complies with the regulatory requirements. — Curator Ian Fleming, April 2026",
      },
      {
        theme: "GEMS 9.8% (Below 21% Market Estimate); Polmed — Both Medscheme's Most Strategic Remaining Contracts",
        sentiment: "CAUTIOUS",
        competitor: "GEMS & Polmed",
        what: "GEMS (Government Employees Medical Scheme), administered by Medscheme, implemented a 9.8% increase for 2026 — significantly below the 21% market estimate and reflecting deliberate cost discipline. With Bonitas now exited (1 June), GEMS and Polmed (Police Medical Scheme, also Medscheme-administered) become the most strategically critical contracts on Medscheme's book. The post-Bonitas governance environment (CMS Circular 10 in full effect, Circular 14 PMB review underway) means both GEMS and Polmed may face CMS pressure to benchmark their contracts.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "GEMS at 9.8% vs 21% market estimate is extraordinary cost discipline at scale. It's the kind of efficiency that makes Medscheme's contract look irreplaceable — until it doesn't.",
      },
      {
        theme: "\ud83d\udfe2 Lenacapavir HIV Prevention — Launched 5 June, Gauteng Rollout Confirmed 7 June — Sector-Wide Managed Care Protocol Changes Required",
        sentiment: "POSITIVE",
        what: "Launched 5 June 2026, Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00; President Ramaphosa officiated. SA is the 9th African country to introduce lenacapavir. 37,920 doses in country, deploying to 360 high-burden facilities. All scheme administrators and MCOs will need to adapt HIV management protocols. Discovery Health, Momentum Health and Vitality programmes will need to integrate lenacapavir into HIV prevention benefits. AfroCentric Group is directly in the implementation path: Aid for AIDS, Pharmacy Direct CCMDD, Scriptpharm.",
        sources: [{ name: "SA Presidency", url: "https://www.gov.za/news/media-advisories/government-activities/president-cyril-ramaphosa-launches-rollout-lenacapavir", date: "5 Jun 2026" }],
        representative_voice: "We dare say we can eliminate HIV/Aids as a public health threat by 2030. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "\ud83d\udd34 24 MAY — ConCourt Judgment: Certificate of Need (Sections 36–40) Struck Down — Sector-Wide Implications",
        sentiment: "NEGATIVE",
        competitor: "Sector-Wide",
        what: "The Constitutional Court unanimously struck down Sections 36–40 of the National Health Act on 18 May 2026. These provisions would have required all healthcare professionals to obtain a government Certificate of Need before opening, relocating or expanding practices. Justice Kate Savage authored the judgment. Solidarity declared it the collapse of 'one of the NHI's central pillars.' The Department of Health pushed back, saying the sections were never operational and the ruling has no direct impact on the NHI Act itself. For private hospital groups (Netcare, Life Healthcare), medical scheme administrators and specialist networks, the ruling removes a major threat to private healthcare expansion.",
        sources: [
          { name: "The Citizen", url: "https://www.citizen.co.za/news/concourt-strikes-down-law-giving-health-minister-power-over-where-doctors-can-work/", date: "18 May 2026" },
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-24-its-back-to-the-drawing-board-after-concourts-nhi-judgment/", date: "24 May 2026" },
        ],
        representative_voice: "One of the NHI's central pillars has collapsed today. The government wanted to move health practitioners around like its own pawns. Today the court said professionals are not pawns of the government. — Solidarity, 18 May 2026",
      },
      {
        theme: "\ud83d\udfe2 28 MAY — Life Healthcare H1 2026: HEPS +19% to 55.1c, Revenue R12.4bn (+2.4%), Dividend 23c (+9.5%) — Sizwe Hosmed Cost Patient Days",
        sentiment: "CAUTIOUS",
        competitor: "Life Healthcare",
        what: "Life Healthcare (JSE:LHC) released H1 FY2026 interim results on 28 May 2026. Revenue +2.4% to R12.4bn — below the expected ~5%, partly because the Sizwe Hosmed curatorship disrupted elective admissions and lost patient days that cannot be recovered in the current financial year. Normalised HEPS +19% to 55.1c; dividend 23c (+9.5%). Life is pivoting from traditional acute hospitals to day-clinics, non-acute services and out-of-pocket payers (MyLife Clinic: R300 consultations).",
        sources: [
          { name: "TradingView JSE:LHC", url: "https://www.tradingview.com/symbols/JSE-LHC/", date: "7 July 2026" },
          { name: "Moneyweb LHC SENS", url: "https://www.moneyweb.co.za/tools-and-data/click-a-company/LHC/", date: "7 July 2026" },
        ],
        representative_voice: "Life Healthcare H1 2026 below plan — Sizwe Hosmed curatorship disrupted elective admissions; lost patient days cannot be recovered this financial year.",
      },
      {
        theme: "Discovery Health Medical Scheme — 7.2% Increase (Effective 5.4%), Active Smart 22,000 Lives",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "DHMS weighted average 7.2% for 2026, deferred to 1 April (effective annual rate 5.4% — the lowest among big-five). Members saved R1.5bn from the deferral. Active Smart plan: R1,350/month, 0% increase, 22,000 lives, 80%+ under 40 — fastest-growing new DHMS plan ever. Two new 2026 benefits: Nurture at Home (NICU support) and Perinatal Bereavement Counselling. DHMS manages ~39% of total SA medical scheme membership.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "By deferring the 2026 contribution increase to 1 April, the scheme provides significant financial relief while continuing to deliver industry-leading healthcare benefits. — Dr Ron Whelan, Discovery Health CEO",
      },
      {
        theme: `✅ Evergreen Contracts & Governance — Sector Changed Permanently. CMS Circular 17 of 2026: Evergreen Contracts comment deadline 31 JULY — ${countdown(2026,6,31,"COMMENT PERIOD CLOSED — CMS now considering submissions on revised accreditation standards")}. ⚡ Smart Health Africa 2026 — CONCLUDED 24 June, Vodacom World Midrand. Confirmed speakers: Dr Mosima Mabunda (Discovery Vitality CCO), Gershon Venkatsamy (Netcare Chief Data & AI Officer), Dr Claude Ndlovu (GEMS CHO), Dr Shay Ganesh (MediHelp CMIO)`,
        sentiment: "CAUTIOUS",
        competitor: "Sector-Wide",
        what: "The Bonitas-Medscheme dispute has permanently changed how the sector views long-term administration contracts. CMS Circular 10 of 2026 — immediate directives on fraud, waste, abuse, transitional measures and sector-wide corrections — is now fully in effect for all administrators. Two solvency failures in 2025 (Medihelp below 25%, Sizwe Hosmed at 5%) and Sizwe Hosmed's curatorship show the CMS is willing to act decisively. Medscheme's remaining contracts (GEMS, Polmed) are now under implicit scrutiny.",
        sources: [{ name: "CMS", url: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", date: "17 Mar 2026" }],
        representative_voice: "Every long-term administration contract in SA is now under implicit review. The Bonitas case has permanently changed the governance landscape.",
      },
    ],
    topVoices: [
      { type: "Bonitas (4 June counter-statement)", sentiment: "negative", quote: "Following go-live on 1 June, a number of issues came to light that had not been resolved during the final months of the previous administration — close to 10,000 outstanding matters, and data anomalies in historical member data." },
      { type: "Momentum CMO McHugh (3 June)", sentiment: "negative", quote: "We are aware that members requiring urgent pre-authorisations have experienced extended wait times and contact centre delays that fall short of our standard 24- to 48-hour turnaround. We take full responsibility for our part in resolving this." },
      { type: "Netcare H1 2026 Results (25 May)", sentiment: "positive", quote: "Adjusted HEPS +21.9% to 71.7c; interim dividend 44c (+22.2%); digitisation generating a meaningful dividend — R705m in savings since 2022." },
      { type: "NFO Lead Ombud Gabriels (18 May)", sentiment: "negative", quote: "Discovery Life has yet to point to the provision in the policy which stipulates that a life-changing event is deemed to have occurred on the date medical confirmation of a covered condition has been received." },
      { type: "Momentum Health CEO Viljoen", sentiment: "positive", quote: "This deal results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. Our F2027 targets of R7bn NHE remain intact." },
      { type: "Sizwe Hosmed Curator Fleming (Apr 2026)", sentiment: "cautious", quote: "The scheme's financial position continues to strengthen. As at the date of this update, the scheme complies with the regulatory requirements." },
    ],
    watchPoints: [
      `🔴 ${TODAY_SHORT.toUpperCase()} DAY ${DAY_COUNT} — CMS: s44 scope NOT extended (24 Jul); concludes END-AUGUST; Momentum appointment in separate s43 inquiry`,
      "🟢 Bestmed wins TWO 2026 Titanium Awards (gala 6 Jul): Access to Quality Healthcare + Member Service Cat A — first confirmed 2026 winners; full list still unpublished",
      "⚡ BHF Conference 4–8 Jul (CTICC) — Titanium Awards gala held; 2026 winners pending. PHA CEO Dr Ayanda Mbuli (BHF board) directed clinical workshop — rival visibility high",
      "🟢 CORRECTED — Fedhealth–Medshield amalgamation TERMINATED 10 Nov 2025 (mutual, post-actuarial review). Fedhealth stays standalone and remains a Medscheme administration client; the merged-entity re-tender risk has fallen away",
      "🔴 Medihelp solvency 20.99% — BELOW the 25% statutory minimum; scheme under pressure",
      "\ud83d\udfe2 11 JUN — Netcare-Quro Medical hospital-at-home expansion (55.88% stake, R121m, R14m revenue generated). \ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, revenue R13.3bn, dividend 44c (+22.2%)",
      "\ud83d\udfe2 28 MAY — Life Healthcare H1 2026: normalised HEPS +19% to 55.1c, revenue R12.4bn (+2.4%), dividend 23c (+9.5%); below plan — Sizwe Hosmed disrupted elective admissions",
      "🔴 16 JUL — Medscheme withdraws Bonitas litigation; Bonitas: 'capitulation'; Medscheme: evidence unanswered, delaying tactics prevented merits hearing",
      "\ud83d\udd34 PHA — managed care live 1 June; fraudulent-documents allegation unresolved; CMS s44 probe (2022 BonCap award) concludes END-AUGUST",
      "\ud83d\udfe2 1 June 2026 — Melanie Da Costa NOW Netcare CEO Designate; Bonitas handover to Momentum COMPLETED",
      "\ud83d\udd34 24 MAY — ConCourt struck down Certificate of Need (Sections 36–40 National Health Act)",
      "\ud83d\udd34 18 MAY — NFO rules against Discovery Life — illness date, not confirmation paperwork, is decisive for SIB claims; sector-wide policy wording review likely",
      "⚡ Discovery Vitality Sleep Rewards Launched (7 May) — Oura Ring 4 fully fundable; Dr Matt Walker visited SA",
      "🟢 Lenacapavir LAUNCHED 5 JUNE 2026 — Gauteng rollout ongoing (56,079 clients, 133 clinics by Mar 2027); managed care protocol updates required",
      "\ud83d\udfe2 Discovery H1 FY2026 record: NHE +27% to R5.75bn, interim dividend 111c, Discovery Bank profitable",
      "\ud83d\udfe2 Discovery Health Global Health Solutions (rebrand of Vitality Health International Africa) — ASO expansion into Nigeria, Kenya, Ghana; direct competition with AfroCentric Healthcare Africa",
      "\ud83d\udfe2 Vitality AI + Google Cloud — global platform, potential to extend life expectancy 8 years",
      "Netcare: 87-bed Akeso Polokwane commissioned 16 Mar; 88-bed Montana facility Oct 2026",
      "Netcare FY2026 guidance: 4–4.8% revenue growth; share buyback R292m since Oct 2025",
      "Momentum Health4Me AI triage (Hello Doctor) — 90-second symptom checker live 2026",
      "BestMed 6.8% — lowest open scheme; new cancer screening, cochlear, adenoidectomy benefits",
      "Medihelp — solvency watch; new single-highest co-payment rule",
      "Fedhealth+Sanlam 'Built Different' — live Jan 2026; 32 on-site clinics; 7,800 Sanlam employees added",
      "\ud83d\udd34 Sizwe Hosmed — curator Ian Fleming; solvency 30% (above 25% minimum); TFS Africa Forensics: R522m+ potential duplicate claims; amalgamation being explored",
      "GEMS and Polmed renewals — most strategic contracts remaining on Medscheme's book; Circular 10 governance implies benchmarking scrutiny",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 in full effect; all administrators under governance expectations",
      "NHI ConCourt ruling — no date; Ramaphosa committed no proclamation until ruling; all other NHI challenges halted",
    ],
    sourceCount: 97,
  },
};

const SOURCE_LINKS = {
  "Business Day":           "https://www.businessday.co.za",
  "Moneyweb":               "https://www.moneyweb.co.za",
  "Moonstone":              "https://www.moonstone.co.za",
  "Medical Brief":          "https://www.medicalbrief.co.za",
  "Daily Maverick":         "https://www.dailymaverick.co.za",
  "TimesLive":              "https://www.timeslive.co.za",
  "JSE":                    "https://www.jse.co.za",
  "AfroCentric IAR 2025":   "https://www.afrocentric.za.com",
  "AfroCentric SENS":       "https://www.jse.co.za/current-companies/company-announcements",
  "AfroCentric":            "https://www.afrocentric.za.com",
  "NDoH":                   "https://www.health.gov.za",
  "CMS":                    "https://www.medicalschemes.gov.za",
  "CMS Circular 10":        "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/",
  "BHF":                    "https://www.bhfglobal.com",
  "TradingView":            "https://www.tradingview.com/symbols/JSE-ACT/",
  "Investing.com NG":       "https://ng.investing.com/equities/afrocentric-investment-corp-chart",
  "Google Finance":         "https://www.google.com/finance/beta/quote/ACT:JSE",
  "Investing.com ZA":       "https://za.investing.com/equities/afrocentric-investment-corp",
  "Top Employers Institute": "https://www.top-employers.com",
  "LinkedIn":               "https://www.linkedin.com/company/afrocentric-group",
  "Daily Investor":         "https://dailyinvestor.com",
  "Bizcommunity":           "https://www.bizcommunity.com",
  "SA Jewish Report":       "https://www.sajr.co.za",
  "BusinessTech":           "https://businesstech.co.za",
  "News24":                 "https://www.news24.com",
  "SAnews":                 "https://www.sanews.gov.za",
  "EWN":                    "https://www.ewn.co.za",
  "IOL":                    "https://www.iol.co.za",
  "The Citizen":            "https://www.citizen.co.za",
  "Parliament":             "https://www.parliament.gov.za",
  "Netcare Investor Calendar": "https://www.netcare.co.za/Netcare-Investor-Relations/News/Key-date-calendar1",
  "SABC News":              "https://www.sabcnews.com",
  "The Witness":            "https://witness.co.za",
  "M&G":                    "https://mg.co.za",
  "Discovery":              "https://www.discovery.co.za",
  "Bhekisisa":              "https://bhekisisa.org",
  "SA Presidency":          "https://www.gov.za",
};

const sentimentColor = (s, T) => {
  if (!s || !T) return "#6B7F93";
  const u = s.toUpperCase();
  if (u === "POSITIVE") return T.green;
  if (u === "NEGATIVE") return T.red;
  return T.yellow;
};

const voiceColor = (type, T) => {
  if (!T) return "#6B7F93";
  const m = { Investor: T.blue, Employee: T.green, Member: T.purple, Media: T.yellow, Analyst: T.blue, Regulator: T.red };
  return m[type] || T.dim;
};

const font = "-apple-system,BlinkMacSystemFont,SF Pro Display,SF Pro Text,Helvetica Neue,Arial,sans-serif";
const mono = "SF Mono,SFMono-Regular,Menlo,Monaco,Consolas,monospace";

function decodeEntities(str) {
  if (!str) return "";
  return str
    .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(parseInt(c, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, c) => String.fromCharCode(parseInt(c, 16)))
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "\u2013").replace(/&mdash;/g, "\u2014")
    .replace(/&lsquo;/g, "\u2018").replace(/&rsquo;/g, "\u2019")
    .replace(/&ldquo;/g, "\u201C").replace(/&rdquo;/g, "\u201D");
}

const Tag = ({ label, color }) => (
  <span style={{
    fontSize: 9, letterSpacing: "1.5px", padding: "2px 8px",
    border: `1px solid ${color}55`, color, background: `${color}18`,
    display: "inline-block", fontFamily: mono,
  }}>{label}</span>
);

const SA_HEALTH_FEEDS = [
  { name: "Medical Schemes",    url: "https://news.google.com/rss/search?q=medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Medical Aid SA",     url: "https://news.google.com/rss/search?q=medical+aid+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Discovery Health",   url: "https://news.google.com/rss/search?q=Discovery+Health+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Momentum Health",    url: "https://news.google.com/rss/search?q=Momentum+Health+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Bonitas",            url: "https://news.google.com/rss/search?q=Bonitas+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "BestMed",            url: "https://news.google.com/rss/search?q=BestMed+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Medihelp",           url: "https://news.google.com/rss/search?q=Medihelp+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Fedhealth",          url: "https://news.google.com/rss/search?q=Fedhealth+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "GEMS",               url: "https://news.google.com/rss/search?q=GEMS+government+employees+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Polmed",             url: "https://news.google.com/rss/search?q=Polmed+police+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Medshield",          url: "https://news.google.com/rss/search?q=Medshield+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "CompCare",           url: "https://news.google.com/rss/search?q=CompCare+Hosmed+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Scheme Innovation",  url: "https://news.google.com/rss/search?q=medical+scheme+benefit+launch+innovation+app+wellness+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Vitality Sleep",     url: "https://news.google.com/rss/search?q=Discovery+Vitality+Sleep+Rewards+Score+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Lenacapavir",        url: "https://news.google.com/rss/search?q=lenacapavir+south+africa+HIV+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "NHI & Policy" },
  { name: "NHI & Policy",       url: "https://news.google.com/rss/search?q=NHI+national+health+insurance+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "NHI & Policy" },
  { name: "Public Hospitals",   url: "https://news.google.com/rss/search?q=south+africa+public+hospital+clinic+health+department&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Public Health" },
  { name: "HIV & TB",           url: "https://news.google.com/rss/search?q=HIV+tuberculosis+TB+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "HIV & TB" },
  { name: "Health Technology",  url: "https://news.google.com/rss/search?q=digital+health+technology+telemedicine+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Health Technology" },
  { name: "Health Insurance",   url: "https://news.google.com/rss/search?q=%22gap+cover%22+OR+%22primary+health+insurance%22+OR+%22income+protection%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Health Insurance" },
  { name: "Value-Based Care",   url: "https://news.google.com/rss/search?q=%22value-based+care%22+OR+%22value+based+care%22+south+africa+health&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Value-Based Care" },
  { name: "Bhekisisa",          url: "https://bhekisisa.org/feed/", group: "Other" },
  { name: "Health-e News",      url: "https://health-e.org.za/feed/", group: "Other" },
  { name: "Medical Brief",      url: "https://www.medicalbrief.co.za/feed/", group: "Other" },
  { name: "Spotlight",          url: "https://www.spotlightnsp.co.za/feed/", group: "Other" },
  { name: "Health Policy Watch", url: "https://healthpolicy-watch.news/feed/", group: "Other" },
  { name: "SAHPRA",             url: "https://www.sahpra.org.za/feed/", group: "Other" },
  { name: "Moonstone",          url: "https://www.moonstone.co.za/feed/", group: "Other" },
  { name: "BHF",                url: "https://www.bhfglobal.com/feed/", group: "Other" },
  { name: "Life Healthcare",    url: "https://www.lifehealthcare.co.za/news-and-media/feed/", group: "Other" },
  { name: "News24 Health",      url: "https://feeds.news24.com/articles/health24/HealthNews/rss", group: "Other" },
  { name: "IOL Health",         url: "https://www.iol.co.za/rss/health", group: "Other" },
  { name: "DM Health",          url: "https://www.dailymaverick.co.za/category/health/feed/", group: "Other" },
  { name: "M&G Health",         url: "https://mg.co.za/section/health/feed", group: "Other" },
  { name: "Sowetan Health",     url: "https://www.sowetanlive.co.za/health/rss/", group: "Other" },
  { name: "Bizcommunity",       url: "https://www.bizcommunity.com/rss/196/365.rss", group: "Other" },
  { name: "BusinessTech",       url: "https://businesstech.co.za/news/category/medical-aid/feed/", group: "Other" },
  { name: "TimesLive Health",   url: "https://www.timeslive.co.za/health/rss", group: "Other" },
  { name: "CMS",                url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "CMS Circulars",      url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+%22circular%22+OR+%22CMS+circular%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Netcare",            url: "https://news.google.com/rss/search?q=Netcare+south+africa+health&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Other" },
  { name: "CMS Circular",       url: "https://news.google.com/rss/search?q=%22CMS+circular%22+%22Council+for+Medical+Schemes%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "CMS Regulatory",     url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+circular+OR+directive+OR+guideline+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "CMS Investigation",  url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+investigation+OR+%22section+44%22+OR+indaba+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "BHF Regulatory",     url: "https://news.google.com/rss/search?q=%22Board+of+Healthcare+Funders%22+circular+OR+regulatory+OR+policy+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "Paul Hanratty",      url: "https://news.google.com/rss/search?q=%22Paul+Hanratty%22+Sanlam&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Kanyisa Mkhize",     url: "https://news.google.com/rss/search?q=%22Kanyisa+Mkhize%22+Sanlam&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Abigail Mukhuba",    url: "https://news.google.com/rss/search?q=%22Abigail+Mukhuba%22+Sanlam&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Theo Mabaso",        url: "https://news.google.com/rss/search?q=%22Theo+Mabaso%22+Sanlam&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Sanlam AfroCentric", url: "https://news.google.com/rss/search?q=%22Sanlam%22+%22AfroCentric%22+OR+%22Sanlam%22+%22Medscheme%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Sanlam Results",     url: "https://news.google.com/rss/search?q=%22Sanlam%22+%22headline+earnings%22+OR+%22Sanlam+SENS%22+OR+%22Sanlam+interim+results%22+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Sanlam Strategy",    url: "https://news.google.com/rss/search?q=%22Sanlam+Group%22+%22acquisition%22+OR+%22Sanlam+Group%22+%22disposal%22+OR+%22Sanlam+Group%22+%22strategic%22+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Gerald van Wyk",    url: "https://news.google.com/rss/search?q=%22Gerald+van+Wyk%22+AfroCentric&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "Andrew Schwulst",   url: "https://news.google.com/rss/search?q=%22Andrew+Schwulst%22+Medscheme&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "Thato Moloele",     url: "https://news.google.com/rss/search?q=%22Thato+Moloele%22+AfroCentric&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "AfroCentric Exco",  url: "https://news.google.com/rss/search?q=%22Aklaaq+Mahmood%22+OR+%22Satish+Antony%22+OR+%22Mujeeb+Bray%22+OR+%22Monwabisi+Kula%22+OR+%22Ashley+Singh%22+OR+%22Lindiwe+Miyambu%22+OR+%22David+Carolus%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "ACT SENS",          url: "https://news.google.com/rss/search?q=%22AfroCentric%22+%22SENS%22+OR+%22AfroCentric+Group+results%22+OR+%22AfroCentric+Group+announces%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "ACT Conferences",   url: "https://news.google.com/rss/search?q=%22AfroCentric%22+%22conference%22+OR+%22AfroCentric%22+%22indaba%22+OR+%22BHF+conference%22+%22AfroCentric%22+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "AfroCentric News",  url: "https://news.google.com/rss/search?q=%22AfroCentric+Group%22+south+africa+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
];

const GOOGLE_NEWS_FEEDS = new Set([
  "Medical Schemes", "Medical Aid SA", "Scheme Innovation",
  "Discovery Health", "Momentum Health", "Bonitas", "BestMed",
  "Medihelp", "Fedhealth", "GEMS", "Polmed", "Medshield", "CompCare",
  "NHI & Policy", "Lenacapavir", "Public Hospitals", "HIV & TB",
  "Health Technology", "Health Insurance", "Value-Based Care",
  "CMS", "CMS Circulars", "CMS Circular", "CMS Regulatory", "CMS Investigation", "BHF Regulatory", "Netcare",
  "Vitality Sleep",
  "Paul Hanratty", "Kanyisa Mkhize", "Abigail Mukhuba", "Theo Mabaso",
  "Sanlam AfroCentric", "Sanlam Results", "Sanlam Strategy",
  "Gerald van Wyk", "Andrew Schwulst", "Thato Moloele", "AfroCentric Exco",
  "ACT SENS", "ACT Conferences", "AfroCentric News",
]);

const PAYWALLED_SOURCES = new Set([
  "News24 Health", "IOL Health", "Business Day", "TimesLive Health",
  "Sowetan Health", "M&G Health", "Briefly", "MSN Health SA", "BusinessTech",
]);

const SOURCE_COLORS = {
  "Medical Schemes": "#1A6ED4", "Medical Aid SA": "#1A6ED4", "Discovery Health": "#1A6ED4",
  "Momentum Health": "#007A5E", "Bonitas": "#D4A017", "BestMed": "#E03050",
  "Medihelp": "#9B6DFF", "Fedhealth": "#FF8C00", "GEMS": "#2E86AB", "Polmed": "#3A9EFF",
  "Medshield": "#C9184A", "CompCare": "#5C6BC0", "Scheme Innovation": "#00C48C",
  "Vitality Sleep": "#1A6ED4", "Lenacapavir": "#C9184A", "BusinessTech": "#FF6B35",
  "TimesLive Health": "#C9184A", "CMS": "#D4A017", "Netcare": "#1A6ED4",
  "Health Insurance": "#0077B6", "Value-Based Care": "#2D6A4F", "NHI & Policy": "#D4A017",
  "Public Hospitals": "#E03050", "HIV & TB": "#9B6DFF", "Health Technology": "#20639B",
  "Bhekisisa": "#00C48C", "Health-e News": "#1A6ED4", "Medical Brief": "#D4A017",
  "Spotlight": "#7B68EE", "Moonstone": "#5C6BC0", "Bizcommunity": "#FF8C00",
  "News24 Health": "#FF6B35", "IOL Health": "#2E86AB", "BHF": "#6040C0",
  "DM Health": "#023E8A", "Health Policy Watch": "#7B2D8B",
  "Gerald van Wyk": "#30D158", "Andrew Schwulst": "#30D158", "Thato Moloele": "#30D158",
  "AfroCentric Exco": "#30D158", "ACT SENS": "#0A84FF", "ACT Conferences": "#BF5AF2",
  "AfroCentric News": "#30D158",
  "Paul Hanratty": "#FF9F0A", "Kanyisa Mkhize": "#FF9F0A", "Abigail Mukhuba": "#FF9F0A",
  "Theo Mabaso": "#FF9F0A", "Sanlam AfroCentric": "#FF9F0A", "Sanlam Results": "#FF9F0A",
  "Sanlam Strategy": "#FF9F0A",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const datePart = date.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
  const timePart = date.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
  return `${datePart} · ${timePart}`;
}

const TOPIC_GROUPS = [
  { heading: "BONITAS / MEDSCHEME / AFROCENTRIC",      color: "#B02040", pattern: /bonitas|medscheme|afrocentric/i },
  { heading: "NHI & CONSTITUTIONAL COURT",             color: "#8A6800", pattern: /\bnhi\b|national health insurance|constitutional court.*health|concourt.*nhi|nhi.*concourt|section 59.*health|motsoaledi.*apolog|apolog.*motsoaledi|nhi.*judges|judges.*nhi/i },
  { heading: "LENACAPAVIR / HIV PREVENTION",           color: "#C9184A", pattern: /lenacapavir|hiv prevention injection|twice.yearly.*hiv|hiv.*prevention.*inject/i },
  { heading: "DISCOVERY VITALITY SLEEP",               color: "#1A6ED4", pattern: /vitality sleep|sleep rewards|sleep score|oura ring|sleep factor/i },
  { heading: "NETCARE — H1 RESULTS & CEO SUCCESSION",  color: "#1A6ED4", pattern: /netcare.*da costa|da costa.*netcare|melanie da costa|netcare.*results|netcare.*interim|netcare.*friedland|netcare.*ceo/i },
  { heading: "CMS REGULATORY & CIRCULARS",             color: "#D4A017", pattern: /cms.*indaba|indaba.*cms|cms.*circular|circular.*cms|council for medical schemes|cms.*directive|\bfasr\b|financial annual statutory/i },
  { heading: "MEDICAL SCHEMES — CONTRIBUTIONS & PLANS",color: "#1A6ED4", pattern: /medical scheme|medical aid|discovery health|momentum health|\bbestmed\b|\bmedihelp\b|\bfedhealth\b|\bgems\b.*scheme|\bpolmed\b|scheme member|scheme contribution/i },
  { heading: "HIV & TB",                               color: "#C9184A", pattern: /\bhiv\b|\baids\b|tuberculosis|\bmdrtb\b|antiretroviral|\barv\b|treatment adherence/i },
  { heading: "MENTAL HEALTH",                          color: "#9B6DFF", pattern: /mental health|psychiatric|counselling|\bakeso\b|psycholog|suicide prevention/i },
  { heading: "PHARMACY & MEDICINES",                   color: "#6040C0", pattern: /\bpharmacy\b|pharmaceutical|\bsahpra\b|ozempic|semaglutide|weight.loss drug|glp-1|\bccmdd\b|pharmacy direct|medicine.*scheme/i },
  { heading: "HEALTH TECHNOLOGY & DIGITAL",            color: "#20639B", pattern: /digital health|health.*technology|telemedicine|ai.*health|health.*ai|health.*app|wearable.*health|vitality ai/i },
  { heading: "PUBLIC HEALTH SYSTEM",                   color: "#007A5E", pattern: /public hospital|public health|department of health|provincial health|health system|health facility|health worker|ndo[hH]/i },
  { heading: "SANLAM / AFROCENTRIC SHAREHOLDER",       color: "#FF9F0A", pattern: /paul hanratty|kanyisa mkhize|sanlam.*afrocentric|afrocentric.*sanlam|sanlam.*medscheme|sanlam.*stake|sanlam.*health.*results|sanlam corporate/i },
  { heading: "AFROCENTRIC GROUP EXCO",                 color: "#30D158", pattern: /gerald van wyk|andrew schwulst|thato moloele|mujeeb bray|satish antony|monwabisi kula/i },
  { heading: "VALUE-BASED CARE & WELLNESS",            color: "#2D6A4F", pattern: /value.based care|chronic disease management|managed care.*health|\bmcoi\b/i },
  { heading: "HEALTH INSURANCE & GAP COVER",           color: "#0077B6", pattern: /gap cover|primary health insurance|health insurance.*south africa|income protection.*health/i },
  { heading: "SIZWE HOSMED / SCHEME DISTRESS",         color: "#E03050", pattern: /sizwe hosmed|scheme.*curator|curator.*scheme|scheme.*solvency|solvency.*scheme/i },
];

function InsightsTab({ articles, loading, onRefresh }) {
  const T = useT();
  const [period, setPeriod] = useState("30d");
  const [activeSection, setActiveSection] = useState("overview");
  const [watchlist, setWatchlist] = useState([
    "AfroCentric Group", "Medscheme", "Bonitas", "Sanlam AfroCentric",
    "Gerald van Wyk", "Andrew Schwulst", "Paul Hanratty",
    "Netcare", "Melanie Da Costa", "Discovery Health", "Momentum Health",
    "Lenacapavir", "Vitality Sleep", "NHI ConCourt", "Motsoaledi",
    "GEMS", "Polmed", "Sizwe Hosmed", "BestMed",
  ]);
  const [newKeyword, setNewKeyword] = useState("");
  const [showWatchlist, setShowWatchlist] = useState(false);

  const PERIODS = [
    { id: "24h", label: "Last 24 Hours", ms: 24 * 60 * 60 * 1000 },
    { id: "30d", label: "Last 30 Days",  ms: 30 * 24 * 60 * 60 * 1000 },
  ];
  const sel = PERIODS.find(p => p.id === period);
  const now = Date.now();

  const addKeyword = () => {
    const kw = newKeyword.trim();
    if (kw && !watchlist.includes(kw)) setWatchlist([...watchlist, kw]);
    setNewKeyword("");
  };

  const recent = articles.filter(a => {
    if (!a.pubDate) return false;
    const d = new Date(a.pubDate);
    if (isNaN(d.getTime())) return false;
    return now - d.getTime() < sel.ms;
  });

  const stripHtml = (str) => {
    if (!str) return "";
    const stripped = str.replace(/<[^>]+>/g, " ").replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim();
    return decodeEntities(stripped);
  };

  const watchMatches = watchlist.map(kw => ({
    kw,
    arts: recent.filter(a => {
      const text = (a.title + " " + (a.description || "")).toLowerCase();
      const k = kw.toLowerCase();
      if (!k.includes(" ") && k.length <= 8) {
        return new RegExp("\\b" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b").test(text);
      }
      return text.includes(k);
    }),
  }));

  const clean = (str) => {
    if (!str) return "";
    return str.replace(/<[^>]+>/g, " ").replace(/&#(\d+);/g, (_, c) => String.fromCharCode(parseInt(c, 10)))
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim();
  };

  const wordOverlap = (a, b) => {
    const stopwords = new Set(["that","this","with","have","from","they","will","been","were","what","when","their","there","about","which","after","south","africa","african"]);
    const words = str => new Set(str.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(w => w.length > 3 && !stopwords.has(w)));
    const wa = words(a); const wb = words(b);
    if (wa.size === 0 || wb.size === 0) return 0;
    const inter = [...wa].filter(w => wb.has(w)).length;
    return inter / Math.min(wa.size, wb.size);
  };

  const groupArticles = (arts) => {
    const used = new Set();
    return TOPIC_GROUPS.map(g => {
      const matched = arts.filter(a => {
        const text = a.title + " " + (a.description || "");
        return !used.has(a.link || a.title) && g.pattern.test(text);
      });
      matched.forEach(a => used.add(a.link || a.title));
      const deduped = [];
      matched.forEach(a => {
        const titleNorm = clean(a.title || "").toLowerCase();
        const isDupe = deduped.some(b => wordOverlap(titleNorm, clean(b.title || "").toLowerCase()) > 0.5);
        if (!isDupe) deduped.push(a);
      });
      return { ...g, arts: deduped };
    }).filter(g => g.arts.length > 0);
  };

  const buildSummary = (arts) => {
    if (arts.length === 0) return "";
    const pieces = arts.slice(0, 12).map(a => {
      const title = clean(a.title || "");
      const desc = clean(a.description || "");
      const src = a.publisher || a.source || "";
      const tNorm = title.toLowerCase().replace(/[^a-z0-9]/g, "");
      const dNorm = desc.toLowerCase().replace(/[^a-z0-9]/g, "");
      const descIsTitle = tNorm.length > 20 && dNorm.startsWith(tNorm.slice(0, Math.floor(tNorm.length * 0.6)));
      const body = (desc.length > 80 && !descIsTitle) ? desc : "";
      return { title, body, src };
    });

    const facts = [];
    pieces.forEach(({ title, body, src }) => {
      const candidate = (body && body.length > 80) ? body : title;
      const norm = candidate.toLowerCase();
      const isDupe = facts.some(f => wordOverlap(norm, f.norm) > 0.45);
      if (!isDupe && candidate.length > 20) {
        facts.push({ text: candidate.replace(/\.$/, ""), norm, src });
      }
    });

    if (facts.length === 0) return "";
    const selected = facts.slice(0, 2);
    if (selected.length === 1) return `${selected[0].text} (${selected[0].src}).`;
    return `${selected[0].text} (${selected[0].src}). ${selected[1].text} (${selected[1].src}).`;
  };

  const [briefings, setBriefings] = useState({});
  const [briefingLoading, setBriefingLoading] = useState(false);
  const [generatedPeriods, setGeneratedPeriods] = useState({});
  const [hasTriedLoad, setHasTriedLoad] = useState(false);

  const todayKey = () => new Date().toISOString().slice(0, 10);
  const cacheKey = (p) => `briefing:${p}:${todayKey()}`;

  useEffect(() => {
    const loaded = {}; const generated = {};
    ["24h", "30d"].forEach(p => {
      try {
        const raw = localStorage.getItem(cacheKey(p));
        if (raw) { const cached = JSON.parse(raw); if (cached.sections?.length > 0) { loaded[p] = cached.sections; generated[p] = true; } }
      } catch {}
    });
    if (Object.keys(loaded).length > 0) setBriefings(loaded);
    if (Object.keys(generated).length > 0) setGeneratedPeriods(generated);
    setHasTriedLoad(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const generateBriefing = (arts, p) => {
    if (!arts || arts.length === 0) return;
    setBriefingLoading(true);
    const groups = groupArticles(arts);
    const final = groups.map(g => {
      const text = buildSummary(g.arts);
      return text ? { ...g, text, count: g.arts.length, sources: g.arts.slice(0, 5) } : null;
    }).filter(Boolean);
    setBriefings(prev => ({ ...prev, [p]: final }));
    setGeneratedPeriods(prev => ({ ...prev, [p]: true }));
    setBriefingLoading(false);
    try { localStorage.setItem(cacheKey(p), JSON.stringify({ sections: final })); } catch {}
  };

  useEffect(() => {
    if (!hasTriedLoad) return;
    if (!articles || articles.length === 0) return;
    if (generatedPeriods[period]) return;
    const ms = period === "24h" ? 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
    const filtered = articles.filter(a => { if (!a.pubDate) return false; return Date.now() - new Date(a.pubDate).getTime() < ms; });
    if (filtered.length === 0) return;
    generateBriefing(filtered, period);
  }, [hasTriedLoad, articles.length, period]); // eslint-disable-line react-hooks/exhaustive-deps

  const uniqueSources = [...new Set(recent.map(a => a.publisher || a.source))].length;

  if (loading && articles.length === 0) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "80px 0" }}>
      <div style={{ width: 32, height: 32, border: `2px solid ${T.border2}`, borderTop: `2px solid ${T.green}`, borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
      <div style={{ fontSize: 11, letterSpacing: "2px", color: T.muted, fontFamily: mono }}>FETCHING LIVE FEEDS…</div>
    </div>
  );

  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {PERIODS.map(p => (
          <button key={p.id} onClick={() => setPeriod(p.id)} style={{
            background: period === p.id ? T.blue : "transparent", color: period === p.id ? "#fff" : T.muted,
            border: `1px solid ${period === p.id ? T.blue : T.border}`, fontSize: 11, fontWeight: 600,
            padding: "6px 20px", borderRadius: 20, cursor: "pointer", fontFamily: mono, letterSpacing: "0.5px", transition: "all 0.15s",
          }}>{p.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 1, marginBottom: 24, background: T.border }}>
        <div style={{ flex: 1, background: T.surface, padding: "16px 20px" }}>
          <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 6 }}>ARTICLES TRACKED</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: T.blue, fontFamily: mono }}>{recent.length}</div>
        </div>
        <div style={{ flex: 1, background: T.surface, padding: "16px 20px" }}>
          <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 6 }}>SOURCES ACTIVE</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: T.green, fontFamily: mono }}>{uniqueSources}</div>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, marginBottom: 24 }}>
        {[{ id: "overview", label: "NEWS BRIEFING" }, { id: "news", label: "SA HEALTH NEWS" }].map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            background: "transparent", border: "none",
            borderBottom: activeSection === s.id ? `2px solid ${T.blue}` : "2px solid transparent",
            color: activeSection === s.id ? T.blue : T.muted,
            fontSize: 10, fontWeight: 700, padding: "10px 20px", cursor: "pointer",
            fontFamily: mono, letterSpacing: "1.5px", marginBottom: -1, transition: "all 0.15s",
          }}>{s.label}</button>
        ))}
      </div>

      {activeSection === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>
          <div>
            {recent.length === 0
              ? <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "48px 32px", textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: T.muted, fontFamily: font, fontStyle: "italic" }}>No articles in this period. Switch to Last 30 Days or check back soon.</div>
                </div>
              : briefingLoading
              ? <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {["BONITAS / MEDSCHEME", "NHI & CONSTITUTIONAL COURT", "LENACAPAVIR / HIV"].map((h, i) => (
                    <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: mono, letterSpacing: "1.5px" }}>{h}</span>
                        <div style={{ width: 16, height: 16, border: `2px solid ${T.border2}`, borderTop: `2px solid ${T.blue}`, borderRadius: "50%", animation: "spin 0.9s linear infinite", marginLeft: 4 }} />
                      </div>
                      {[90, 75, 82].map((w, j) => <div key={j} style={{ height: 12, background: T.border, borderRadius: 4, marginBottom: 8, width: `${w}%` }} />)}
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: T.muted, fontFamily: mono, letterSpacing: "1px", textAlign: "center", paddingTop: 8 }}>BUILDING BRIEFING…</div>
                </div>
              : !briefings[period] || briefings[period].length === 0
              ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "80px 0" }}>
                  <div style={{ width: 32, height: 32, border: `2px solid ${T.border2}`, borderTop: `2px solid ${T.blue}`, borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
                  <div style={{ fontSize: 11, letterSpacing: "2px", color: T.muted, fontFamily: mono }}>PREPARING BRIEFING…</div>
                </div>
              : <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontSize: 9, color: T.muted, fontFamily: mono, letterSpacing: "1px" }}>INTELLIGENCE BRIEFING · {todayKey()}</span>
                    <button onClick={() => {
                      const ms = period === "24h" ? 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
                      const filtered = articles.filter(a => a.pubDate && Date.now() - new Date(a.pubDate).getTime() < ms);
                      setGeneratedPeriods(prev => ({ ...prev, [period]: false }));
                      generateBriefing(filtered, period);
                    }} style={{ background: "transparent", border: `1px solid ${T.border2}`, color: T.muted, fontSize: 9, letterSpacing: "1.5px", padding: "4px 12px", cursor: "pointer", fontFamily: mono, borderRadius: 4 }}>↻ REFRESH</button>
                  </div>
                  {(briefings[period] || []).map((b, i) => (
                    <div key={i} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: i < (briefings[period].length - 1) ? `1px solid ${T.border}` : "none" }}>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: mono, letterSpacing: "1.5px" }}>{b.heading}</span>
                        <span style={{ fontSize: 10, color: T.muted, fontFamily: mono, marginLeft: 12 }}>{b.count} article{b.count !== 1 ? "s" : ""}</span>
                      </div>
                      <p style={{ fontSize: 14, color: T.text, lineHeight: 1.9, fontFamily: font, margin: "0 0 12px 0" }}>{b.text}</p>
                      {b.sources.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {[...new Map(b.sources.map(s => [s.publisher || s.source, s])).values()].slice(0, 5).map((s, j) => (
                            <a key={j} href={s.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                              <span style={{ fontSize: 10, fontWeight: 600, color: T.muted, fontFamily: mono, background: T.panel, border: `1px solid ${T.border}`, padding: "2px 8px", borderRadius: 3 }}>{s.publisher || s.source}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
            }
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono }}>WATCH LIST</div>
                <button onClick={() => setShowWatchlist(!showWatchlist)} style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 10, color: T.muted, fontFamily: mono, cursor: "pointer", padding: "2px 8px" }}>{showWatchlist ? "DONE" : "EDIT"}</button>
              </div>
              {showWatchlist && (
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                  <input value={newKeyword} onChange={e => setNewKeyword(e.target.value)} onKeyDown={e => e.key === "Enter" && addKeyword()} placeholder="Add keyword..."
                    style={{ flex: 1, fontSize: 12, padding: "5px 10px", border: `1px solid ${T.border}`, borderRadius: 6, background: T.panel, color: T.bright, fontFamily: font, outline: "none" }} />
                  <button onClick={addKeyword} style={{ background: T.blue, color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, padding: "5px 12px", cursor: "pointer", fontFamily: mono }}>+</button>
                </div>
              )}
              {watchlist.map((kw, i) => {
                const match = watchMatches.find(w => w.kw === kw);
                const count = match?.arts.length || 0;
                return (
                  <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < watchlist.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: count > 0 ? 5 : 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {showWatchlist && <button onClick={() => setWatchlist(watchlist.filter(w => w !== kw))} style={{ background: "transparent", border: "none", color: "#C00021", cursor: "pointer", fontSize: 14, padding: "0 2px", lineHeight: 1 }}>×</button>}
                        <span style={{ fontSize: 12, fontWeight: 600, color: count > 0 ? T.bright : T.muted, fontFamily: font }}>{kw}</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, fontFamily: mono, color: count > 0 ? "#fff" : T.muted, background: count > 0 ? T.blue : "transparent", border: `1px solid ${count > 0 ? T.blue : T.border}`, padding: "1px 7px", borderRadius: 10 }}>{count}</span>
                    </div>
                    {count > 0 && match.arts.slice(0, 2).map((a, j) => (
                      <a key={j} href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", padding: "3px 0" }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                        <div style={{ fontSize: 11, color: T.blue, lineHeight: 1.45 }}>{stripHtml(a.title).slice(0, 75)}{stripHtml(a.title).length > 75 ? "…" : ""}</div>
                        <div style={{ fontSize: 10, color: T.muted, fontFamily: mono }}>{a.publisher || a.source} · {formatDate(a.pubDate)}</div>
                      </a>
                    ))}
                  </div>
                );
              })}
            </div>

            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 14 }}>LATEST HEADLINES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: T.border }}>
                {recent.slice(0, 8).map((a, i) => (
                  <a key={i} href={a.link} target="_blank" rel="noopener noreferrer" style={{ background: T.surface, padding: "9px 12px", textDecoration: "none", display: "block" }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.panel; }} onMouseLeave={e => { e.currentTarget.style.background = T.surface; }}>
                    <div style={{ fontSize: 12, color: T.bright, lineHeight: 1.5, fontFamily: font, fontWeight: 500, marginBottom: 3 }}>{stripHtml(a.title)}</div>
                    <div style={{ fontSize: 10, color: T.muted, fontFamily: mono }}>{a.publisher || a.source} · {formatDate(a.pubDate)}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "news" && <SAHealthNews key="insights-news" onArticlesLoaded={null} embeddedMode={true} />}
    </div>
  );
}

function SAHealthNews({ onArticlesLoaded, embeddedMode = false }) {
  const T = useT();
  const [articles, setArticles] = useState([]);
  const [rssLoading, setRssLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState(null);

  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  const HEALTH_KEYWORDS = [
    "health", "hospital", "clinic", "patient", "medical", "medicine", "nurse", "gap cover",
    "health insurance", "nhi", "vaccine", "hiv", "aids", "tb", "tuberculosis", "cancer",
    "pharmacy", "drug", "scheme", "medscheme", "bonitas", "discovery health", "momentum health",
    "healthcare", "surgery", "clinical", "wellness", "sahpra", "pharmacist", "chronic", "acute",
    "vitality", "sleep rewards", "sleep score", "lenacapavir", "netcare", "da costa",
    "motsoaledi", "department of health", "nih", "ccmdd", "afrocentric",
  ];

  const isHealthRelated = (a) => {
    const text = ((a.title || "") + " " + (a.description || "")).toLowerCase();
    return HEALTH_KEYWORDS.some(k => text.includes(k));
  };

  const getCategory = (a) => {
    const text = ((a.title || "") + " " + (a.description || "")).toLowerCase();
    if (/motsoaledi.*apolog|apolog.*motsoaledi|nhi.*judges|judges.*nhi/.test(text)) return { label: "NHI Apology", color: "#007A5E" };
    if (/lenacapavir|hiv prevention injection|twice.yearly.*hiv/.test(text)) return { label: "Lenacapavir", color: "#C9184A" };
    if (/netcare.*da costa|da costa.*netcare|melanie da costa|netcare.*results|netcare.*interim/i.test(text)) return { label: "Netcare", color: "#1A6ED4" };
    if (/vitality sleep|sleep rewards|sleep score|oura ring/.test(text)) return { label: "Vitality Sleep", color: "#1A6ED4" };
    if (/paul hanratty|kanyisa mkhize|sanlam.*afrocentric|afrocentric.*sanlam|sanlam.*medscheme/.test(text)) return { label: "Sanlam / Shareholder", color: "#FF9F0A" };
    if (/gerald van wyk|andrew schwulst|thato moloele/.test(text)) return { label: "AfroCentric Exco", color: "#30D158" };
    if (/bonitas|medscheme|afrocentric/.test(text)) return { label: "Bonitas/Medscheme", color: "#B02040" };
    if (/\bnhi\b|national health insurance/.test(text)) return { label: "NHI & Policy", color: "#8A6800" };
    if (/medical scheme|medical aid|discovery health|momentum health|\bbestmed\b|\bmedihelp\b|\bfedhealth\b|\bpolmed\b/.test(text)) return { label: "Medical Schemes", color: "#1A6ED4" };
    if (/gap cover|primary health insurance|health insurance.*south africa/.test(text)) return { label: "Health Insurance", color: "#0077B6" };
    if (/\bpharmacy\b|pharmaceutical|\bsahpra\b|ozempic|semaglutide|\bccmdd\b/.test(text)) return { label: "Pharmacy", color: "#6040C0" };
    if (/public hospital|public health|department of health|\bndoh\b/.test(text)) return { label: "Public Health", color: "#007A5E" };
    if (/\bhiv\b|\baids\b|tuberculosis|antiretroviral/.test(text)) return { label: "HIV & TB", color: "#C9184A" };
    if (/mental health|psychiatric|counselling/.test(text)) return { label: "Mental Health", color: "#9B6DFF" };
    return { label: "Health", color: "#3D4F60" };
  };

  const cleanDesc = (title, desc) => {
    if (!desc || desc.length < 10) return "";
    let d = desc.replace(/<[^>]+>/g, " ").replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim();
    d = decodeEntities(d);
    if (d.length < 10) return "";
    const tn = title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const dn = d.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (tn.length > 20 && dn.startsWith(tn.slice(0, Math.floor(tn.length * 0.75)))) return "";
    return d.length > 280 ? d.slice(0, 280).trim() + "…" : d;
  };

  const load = async () => {
    setRssLoading(true);
    const results = await Promise.allSettled(
      SA_HEALTH_FEEDS.map(f =>
        fetch(`/api/rss?url=${encodeURIComponent(f.url)}`)
          .then(r => r.json())
          .then(d => (d.items || []).map(a => ({ ...a, source: f.name })))
          .catch(() => [])
      )
    );
    const now = Date.now();
    const seen = new Set();
    const all = results
      .flatMap(r => r.status === "fulfilled" ? r.value : [])
      .filter(a => {
        const key = a.link || a.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        const pub = (a.publisher || "").toLowerCase();
        if (["msn", "the south african", "briefly news"].includes(pub)) return false;
        if (a.pubDate) { const age = now - new Date(a.pubDate).getTime(); if (!isNaN(age) && age > THIRTY_DAYS) return false; }
        return true;
      })
      .filter(isHealthRelated)
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    setArticles(all);
    setFetchedAt(new Date());
    setRssLoading(false);
    if (typeof onArticlesLoaded === "function") onArticlesLoaded(all, false);
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fade">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 4 }}>FEED STATUS</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: rssLoading ? T.yellow : T.green, fontFamily: mono }}>{rssLoading ? "FETCHING…" : "● LIVE RSS"}</div>
          </div>
          <div style={{ width: 1, height: 32, background: T.border }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 4 }}>ARTICLES</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.blue, fontFamily: mono }}>{rssLoading ? "—" : articles.length}</div>
          </div>
          <div style={{ width: 1, height: 32, background: T.border }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 4 }}>LAST REFRESH</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.dim, fontFamily: mono }}>{fetchedAt ? fetchedAt.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }) : "—"}</div>
          </div>
        </div>
        <button onClick={load} disabled={rssLoading} style={{ background: "transparent", border: `1px solid ${T.border2}`, color: T.muted, fontSize: 9, letterSpacing: "1.5px", padding: "6px 16px", cursor: rssLoading ? "not-allowed" : "pointer", fontFamily: mono, opacity: rssLoading ? 0.4 : 1 }}>{rssLoading ? "…" : "↻ REFRESH"}</button>
      </div>

      {rssLoading && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "80px 0" }}>
          <div style={{ width: 32, height: 32, border: `2px solid ${T.border2}`, borderTop: `2px solid ${T.green}`, borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
          <div style={{ fontSize: 11, letterSpacing: "2px", color: T.muted, fontFamily: mono }}>FETCHING RSS FEEDS</div>
        </div>
      )}

      {!rssLoading && articles.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", color: T.muted, fontSize: 13, fontFamily: font }}>No articles found — feeds may be temporarily unavailable.</div>
      )}

      {!rssLoading && articles.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 8 }}>
          {articles.map((a, i) => {
            const cat = getCategory(a);
            const col = SOURCE_COLORS[a.source] || T.muted;
            const desc = cleanDesc(a.title || "", a.description || "");
            return (
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = col; e.currentTarget.style.boxShadow = `0 2px 12px ${col}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}>
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", gap: 0 }}>
                  <div style={{ flexShrink: 0, width: 110, minHeight: 90, background: T.panel, position: "relative" }}>
                    {a.image && (a.image.startsWith("http://") || a.image.startsWith("https://"))
                      ? <img src={a.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 90 }} onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.style.background = "#88888818"; }} />
                      : <div style={{ width: "100%", height: 90, background: `${col}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 22, opacity: 0.3 }}>\ud83d\udcf0</span>
                        </div>
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: col, fontFamily: mono, letterSpacing: "0.5px" }}>{a.publisher || a.source}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: cat.color, fontFamily: mono, background: `${cat.color}15`, border: `1px solid ${cat.color}40`, padding: "1px 5px", borderRadius: 3 }}>{cat.label}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.bright, lineHeight: 1.45, fontFamily: font, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {decodeEntities(a.title || "")}
                    </div>
                    <div style={{ fontSize: 10, color: T.muted, fontFamily: mono, marginTop: "auto" }}>{formatDate(a.pubDate)}</div>
                  </div>
                </a>
                {(desc || GOOGLE_NEWS_FEEDS.has(a.source) || PAYWALLED_SOURCES.has(a.source)) && (
                  <div style={{ padding: "8px 12px 10px 12px", borderTop: `1px solid ${T.border}` }}>
                    {desc
                      ? <div style={{ fontSize: 12, color: T.dim, lineHeight: 1.7, fontFamily: font }}>{desc}</div>
                      : PAYWALLED_SOURCES.has(a.source)
                        ? <div style={{ fontSize: 11, color: T.muted, fontFamily: font, fontStyle: "italic" }}>\ud83d\udd12 Paywalled — click to read full article.</div>
                        : <div style={{ fontSize: 11, color: T.muted, fontFamily: font, fontStyle: "italic" }}>Headline only — no summary available.</div>
                    }
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CMSTab() {
  const T = useT();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState(null);

  const KNOWN_CIRCULARS = [
    { title: "✅ CMS Industry Indaba 2026 — CONCLUDED (13-14 May, Sandton) — Circular 10 Directives Fully Operational", link: "https://www.medicalschemes.co.za/registration-for-the-2026-cms-industry-indaba-is-now-open/", pubDate: "14 May 2026", description: "The CMS Industry Indaba 2026 concluded 13–14 May at the Sandton Convention Centre. Circular 10 of 2026 — immediate directives on fraud, waste and abuse, transitional measures and sector-wide corrections — is now in full effect for all administrators including Medscheme. This marks the formal shift from findings to implementation framework. FASR submission deadline: 29 May — PASSED.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Indaba" },
    { title: "✅ FASR 29 MAY 2026 — Deadline PASSED; Financial Annual Statutory Returns Submitted", link: "https://www.medicalschemes.co.za/latest-publication/circular-13-of-2026-financial-annual-statutory-returns-for-the-financial-year-ended-31-december-2025/", pubDate: "16 Apr 2026", description: "The CMS has finalised the 2025 FASR online system. Electronic submission via the statutory return portal was due 29 May 2026 — PASSED. Critical compliance date for all medical scheme administrators including Medscheme.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "\ud83c\udd95 Circular 14 of 2026: PMB Definition Guideline Development — Clinical Advisory Committee Nominations Open", link: "https://www.medicalschemes.co.za/", pubDate: "May 2026", description: "The CMS has published Circular 14 of 2026 on the development of a PMB Definition Guideline. Stakeholders invited to nominate experts for the Clinical Advisory Committee (CAC). Submit nominations with CV to pmbreview@medicalschemes.co.za.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 12 of 2026: Notification of Registration of Medical Schemes", link: "https://www.medicalschemes.co.za/latest-publication/circular-12-of-2026-notification-of-registration-of-medical-schemes/", pubDate: "Mar 2026", description: "CMS confirms the publication of the list of medical schemes registered for 2026, as detailed in Government Gazette Notice No. 54417.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 10 of 2026: Section 59 Final Investigation Report — Immediate Directives (NOW FULLY IN EFFECT)", link: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", pubDate: "17 Mar 2026", description: "CMS communicates immediate regulatory expectations following the Section 59 Investigation Report. Sets directives on fraud, waste and abuse processes and transitional measures pending the Universal Code of Conduct. Now fully in effect for all medical scheme administrators following the Indaba (13-14 May). Affects Medscheme and all administrators on contract benchmarking obligations.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Investigation" },
    { title: "Circular 9 of 2026: Financial Annual Statutory Returns for 2025 — Submission Date 29 May 2026 (PASSED)", link: "https://www.medicalschemes.co.za/latest-publication/circular-9-of-2026-financial-annual-statutory-returns-for-2025/", pubDate: "13 Mar 2026", description: "Update on the expected go-live and submission dates for the 2025 FASR. Submission date: 29 May 2026 — PASSED.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 7 of 2026: Categorisation of Assets (Regulation 30, Medical Schemes Act)", link: "https://www.medicalschemes.co.za/latest-publication/circular-7-of-2026-categorisation-of-assets-in-terms-of-annexure-b-to-the-regulations-of-the-medical-schemes-act/", pubDate: "2 Mar 2026", description: "CMS publishes guidelines on categorising assets in terms of Regulation 30 of the Medical Schemes Act.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 2 of 2026: Broker Fee Adjustment — R125.86/month plus VAT from 1 January 2026", link: "https://www.medicalschemes.co.za/latest-publication/circular-2-of-2026-adjustment-of-fees-payable-to-brokers-with-effect-from-1-january-2026/", pubDate: "29 Jan 2026", description: "Maximum broker fees adjusted to R125.86 per month plus VAT, effective 1 January 2026.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Section 44 Investigation: Bonitas — CMS Targets END-AUGUST 2026 Conclusion; Scope NOT Extended", link: "https://www.moonstone.co.za/bonitas-medscheme-split-what-the-cms-probe-means-for-members/", pubDate: "Feb 2026", description: "CMS (24 Jul 2026) confirmed the s44 investigation is confined to the 2022 PHA/BonCap appointment and the 2024 Agile Business Solutions contract, and expects to conclude by END-AUGUST 2026. The scope was NOT extended to the 2026 Momentum/PHA appointment, which is assessed separately under a s43 Board Notice 73 inquiry. CMS: the investigation was never paused.", source: "CMS / Moonstone", publisher: "Council for Medical Schemes", category: "CMS Investigation" },
    { title: "Circular 24 of 2025: Contribution Increase and Benefits Guidance for 2026 — CMS Recommends 3.3% Cap", link: "https://www.medicalschemes.co.za/latest-publication/circular-24-of-2025-guidance-on-contribution-increases-and-benefits-changes-for-2026/", pubDate: "1 Sep 2025", description: "CMS recommends contribution increases for 2026 be limited to 3.3% plus reasonable utilisation estimates. Actual increases: Discovery 7.2%, BestMed 6.8% (lowest), Medihelp 8.46%, Bonitas 8.8%, Fedhealth 9.6%, Momentum 9.9%, GEMS (restricted) 9.8%.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
  ];

  const load = async () => {
    setLoading(true);
    const cmsWebResult = await fetch("/api/cms-scrape").then(r => r.json()).then(d => d.items || []).catch(() => []);
    const scraped = cmsWebResult.length > 0 ? cmsWebResult : KNOWN_CIRCULARS;
    const seen = new Set();
    const all = scraped.filter(a => { const key = a.link || a.title; if (!key || seen.has(key)) return false; seen.add(key); return true; }).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    setArticles(all);
    setFetchedAt(new Date());
    setLoading(false);
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCategory = (a) => {
    if (a.category) {
      const catColors = { "CMS Circular": "#1A6ED4", "CMS Investigation": "#B02040", "CMS Indaba": "#007A5E", "Press Release": "#8A6800", "Government Gazette": "#6040C0", "CMS Publication": "#3D4F60" };
      return { label: a.category, color: catColors[a.category] || "#3D4F60" };
    }
    const text = (a.title + " " + (a.description || "")).toLowerCase();
    if (/circular/.test(text)) return { label: "Circular", color: "#1A6ED4" };
    if (/section 44|section 43|investigation|forensic/.test(text)) return { label: "Investigation", color: "#B02040" };
    if (/indaba|conference/.test(text)) return { label: "Indaba", color: "#007A5E" };
    if (/directive|guideline|board notice/.test(text)) return { label: "Directive", color: "#8A6800" };
    return { label: "Regulatory", color: "#3D4F60" };
  };

  return (
    <div className="fade">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 4 }}>FEED STATUS</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: loading ? T.yellow : T.green, fontFamily: mono }}>{loading ? "FETCHING…" : "● LIVE RSS"}</div>
          </div>
          <div style={{ width: 1, height: 32, background: T.border }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 4 }}>PUBLICATIONS</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.blue, fontFamily: mono }}>{loading ? "—" : articles.length}</div>
          </div>
          <div style={{ width: 1, height: 32, background: T.border }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 4 }}>LAST REFRESH</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.dim, fontFamily: mono }}>{fetchedAt ? fetchedAt.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }) : "—"}</div>
          </div>
        </div>
        <button onClick={load} disabled={loading} style={{ background: "transparent", border: `1px solid ${T.border2}`, color: T.muted, fontSize: 9, letterSpacing: "1.5px", padding: "6px 16px", cursor: loading ? "not-allowed" : "pointer", fontFamily: mono, opacity: loading ? 0.4 : 1 }}>{loading ? "…" : "↻ REFRESH"}</button>
      </div>

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "80px 0" }}>
          <div style={{ width: 32, height: 32, border: `2px solid ${T.border2}`, borderTop: `2px solid ${T.green}`, borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
          <div style={{ fontSize: 11, letterSpacing: "2px", color: T.muted, fontFamily: mono }}>FETCHING CMS FEEDS</div>
        </div>
      )}

      {!loading && articles.length === 0 && <div style={{ textAlign: "center", padding: "80px 0", color: T.muted, fontSize: 13, fontFamily: font }}>No CMS regulatory articles found.</div>}

      {!loading && articles.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 8 }}>
          {articles.map((a, i) => {
            const cat = getCategory(a);
            const col = cat.color;
            const desc = (a.description || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
            const tn = (a.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
            const dn = desc.toLowerCase().replace(/[^a-z0-9]/g, "");
            const showDesc = desc.length > 20 && !(tn.length > 20 && dn.startsWith(tn.slice(0, Math.floor(tn.length * 0.75))));
            return (
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, borderLeft: `3px solid ${col}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: col, fontFamily: mono, letterSpacing: "0.5px" }}>{a.publisher || a.source}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: col, fontFamily: mono, background: `${col}15`, border: `1px solid ${col}40`, padding: "2px 7px", borderRadius: 3 }}>{cat.label}</span>
                    <span style={{ fontSize: 11, color: T.muted, fontFamily: mono }}>{formatDate(a.pubDate)}</span>
                  </div>
                </div>
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.bright, lineHeight: 1.5, fontFamily: font }}>{decodeEntities(a.title || "")}</div>
                </a>
                {showDesc && <div style={{ fontSize: 13, color: T.dim, lineHeight: 1.75, fontFamily: font }}>{desc.length > 280 ? desc.slice(0, 280) + "…" : desc}</div>}
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: col, fontFamily: font, fontWeight: 600, textDecoration: "none", marginTop: "auto" }}>Read full article →</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Competitor Intel Tab ─────────────────────────────────────────────────────
const COMPETITOR_ENTITIES = [
  { id: "all",          label: "All Competitors",   icon: "⊕", color: "#0A84FF" },
  { id: "Netcare",      label: "Netcare",            icon: "\ud83d\udfe2", color: "#1A6ED4" },
  { id: "Discovery",    label: "Discovery",          icon: "\ud83d\udd35", color: "#0071E3" },
  { id: "Momentum",     label: "Momentum Health",    icon: "\ud83d\udfe2", color: "#007A5E" },
  { id: "PHA",          label: "PHA",                icon: "\ud83d\udd34", color: "#B02040" },
  { id: "BestMed",      label: "BestMed",            icon: "\ud83d\udd35", color: "#E03050" },
  { id: "Medihelp",     label: "Medihelp",           icon: "\ud83d\udd35", color: "#9B6DFF" },
  { id: "Fedhealth",    label: "Fedhealth",          icon: "\ud83d\udd35", color: "#FF8C00" },
  { id: "Sizwe Hosmed", label: "Sizwe Hosmed",       icon: "\ud83d\udd34", color: "#C00021" },
  { id: "GEMS & Polmed",label: "GEMS & Polmed",      icon: "\ud83d\udd35", color: "#2E86AB" },
  { id: "Sector-Wide",    label: "Sector-Wide",       icon: "⚖️", color: "#D4A017" },
  { id: "Life Healthcare", label: "Life Healthcare",   icon: "⚡", color: "#1A6ED4" },
  { id: "Mediclinic",      label: "Mediclinic",        icon: "\ud83d\udd35", color: "#5C6BC0" },
  { id: "Medshield",       label: "Medshield",         icon: "\ud83d\udd35", color: "#20639B" },
  { id: "Bonitas",         label: "Bonitas",           icon: "⚠️", color: "#D4A017" },
];

const COMPETITOR_CARDS = [
  { id: "Netcare",       label: "Netcare",        metric: "Adj. HEPS +21.9%", sub: "Revenue R13.3bn · Div 44c",       sentiment: "POSITIVE",  note: "H1 2026 25 May; Da Costa CEO Designate 1 Jun" },
  { id: "Discovery",     label: "Discovery",      metric: "NHE +27% R5.75bn", sub: "Record H1 · Bank profitable",     sentiment: "POSITIVE",  note: "NFO SIB ruling vs Discovery Life (18 May)" },
  { id: "Momentum",      label: "Momentum",       metric: "22%→30% share",    sub: "NHE +8% R3.7bn · ROE 24%",       sentiment: "POSITIVE",  note: "\ud83d\udd34 Day 4 chaos; Bonitas counter-blames Medscheme" },
  { id: "PHA",           label: "PHA",            metric: "Managed care live", sub: "1 June 2026 · BonCap since 2020", sentiment: "NEGATIVE",  note: "Fraudulent docs allegation; s44 concludes end-Aug" },
  { id: "BestMed",       label: "BestMed",        metric: "2x Titanium Awards 2026",    sub: "6.8% lowest increase · gala 6 Jul",     sentiment: "POSITIVE",  note: "Access to Quality Healthcare + Member Service Cat A" },
  { id: "Medihelp",      label: "Medihelp",       metric: "8.46% increase",   sub: "Solvency below 25% (2025)",       sentiment: "CAUTIOUS",  note: "New single co-payment rule" },
  { id: "Fedhealth",     label: "Fedhealth",      metric: "9.6% increase",    sub: "7,800 Sanlam staff · 32 clinics", sentiment: "POSITIVE",  note: "'Built Different' live Jan 2026" },
  { id: "Sizwe Hosmed",  label: "Sizwe Hosmed",   metric: "Solvency compliant",     sub: "Apr 2026 update · Curator Fleming",    sentiment: "NEGATIVE",  note: "R522m+ duplicate claims flagged; amalgamation" },
  { id: "GEMS & Polmed",  label: "GEMS & Polmed",   metric: "9.8% GEMS",         sub: "vs 21% market estimate",           sentiment: "CAUTIOUS",  note: "Most critical Medscheme contracts post-Bonitas" },
  { id: "Life Healthcare", label: "Life Healthcare", metric: "HEPS +19% to 55.1c", sub: "Revenue R12.4bn (+2.4%) · 28 May",  sentiment: "POSITIVE",  note: "Below plan — Sizwe Hosmed hurt patient days" },
  { id: "Mediclinic",      label: "Mediclinic",      metric: "Remgro-owned",      sub: "SA + Switzerland + UAE",            sentiment: "POSITIVE",  note: "CoN ruling removes expansion threat" },
  { id: "Medshield",       label: "Medshield",       metric: "7.5% increase",     sub: "AA rating · ~139k beneficiaries",   sentiment: "POSITIVE",  note: "Standalone — Fedhealth merger terminated Nov 2025" },
  { id: "Bonitas",         label: "Bonitas",         metric: "COUNTER-NARRATIVE", sub: "~10,000 unresolved matters claim",   sentiment: "CAUTIOUS", note: "\ud83d\udd34 Day 4: blaming Medscheme for backlog; 9-10 Jun court" },
];

function CompetitorIntelTab({ data }) {
  const T = useT();
  const [selected, setSelected] = useState("all");

  // Competitor Intel is neutral — colours from AfroCentric perspective only
  const sentColor = () => T.dim;

  const filteredThemes = selected === "all"
    ? (data.themes || [])
    : (data.themes || []).filter(t => t.competitor === selected);

  const entity = COMPETITOR_ENTITIES.find(e => e.id === selected);

  const TOP_SIGNALS = (data.themes || [])
    .filter(t => t.theme.startsWith("⚡") || t.theme.startsWith("\ud83d\udd34"))
    .slice(0, 5);

  return (
    <div className="fade">
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 10 }}>TOP SIGNALS — {TODAY_UPPER}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
          {TOP_SIGNALS.map((t, i) => {
            const isRed = t.theme.startsWith("\ud83d\udd34");
            const accentColor = T.border2;  // neutral — no red/yellow on competitor signals
            const compEntity = COMPETITOR_ENTITIES.find(e => e.id === t.competitor);
            return (
              <div key={i}
                onClick={() => t.competitor && setSelected(t.competitor)}
                style={{
                  background: T.surface,
                  border: `1px solid ${accentColor}`,
                  borderLeft: `4px solid ${accentColor}`,
                  borderRadius: 10,
                  padding: "14px 16px",
                  cursor: t.competitor ? "pointer" : "default",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}08`; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.surface; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: T.muted, fontFamily: mono, letterSpacing: "1.5px" }}>
                    {isRed ? "BREAKING" : "URGENT"}
                  </span>
                  {t.competitor && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: compEntity?.color || T.muted, fontFamily: mono, background: `${compEntity?.color || T.muted}15`, border: `1px solid ${compEntity?.color || T.muted}40`, padding: "1px 7px", borderRadius: 3 }}>
                      {t.competitor}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.bright, lineHeight: 1.5, fontFamily: font, marginBottom: 6 }}>
                  {t.theme.replace(/^[⚡\ud83d\udd34\ud83d\udfe2✅⚠️⚖️\ud83c\udd95]\s?/u, "")}
                </div>
                <div style={{ fontSize: 12, color: T.dim, lineHeight: 1.6, fontFamily: font }}>
                  {(t.what || "").slice(0, 120).trim()}{(t.what || "").length > 120 ? "…" : ""}
                </div>
                {t.competitor && (
                  <div style={{ fontSize: 10, color: accentColor, fontFamily: mono, marginTop: 8, fontWeight: 600 }}>
                    TAP TO FILTER →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 10 }}>MARKET LANDSCAPE — {TODAY_UPPER}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
          {COMPETITOR_CARDS.map((c, i) => {
            const isActive = selected === c.id;
            const sentC = sentColor(c.sentiment);
            return (
              <div key={i} onClick={() => setSelected(isActive ? "all" : c.id)}
                style={{
                  background: isActive ? `${sentC}12` : T.surface,
                  border: `1px solid ${isActive ? sentC : T.border}`,
                  borderLeft: `3px solid ${sentC}`,
                  borderRadius: 10, padding: "12px 14px", cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = sentC; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = T.border; }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: T.bright, fontFamily: font, marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: sentC, fontFamily: mono, marginBottom: 2 }}>{c.metric}</div>
                <div style={{ fontSize: 10, color: T.muted, fontFamily: mono, marginBottom: 4 }}>{c.sub}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: font, fontStyle: "italic" }}>{c.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono }}>FILTER BY COMPETITOR</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {COMPETITOR_ENTITIES.map(e => (
            <button key={e.id} onClick={() => setSelected(e.id)} style={{
              background: selected === e.id ? e.color : "transparent",
              color: selected === e.id ? "#fff" : T.muted,
              border: `1px solid ${selected === e.id ? e.color : T.border}`,
              fontSize: 10, fontWeight: 600, padding: "4px 14px", borderRadius: 20,
              cursor: "pointer", fontFamily: mono, transition: "all 0.15s",
            }}>{e.label}</button>
          ))}
        </div>
      </div>

      <div style={{ background: T.surface, borderLeft: `3px solid ${T.border2}`, border: `1px solid ${T.border}`, padding: "14px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 10, fontFamily: mono }}>
          {selected === "all" ? `COMPETITOR INTELLIGENCE SUMMARY — ${TODAY_UPPER}` : `${entity?.label?.toUpperCase()} — INTELLIGENCE SUMMARY`}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {(selected === "all" ? data.oneLiner : filteredThemes.map(t => `${t.theme}`).join(". "))
            .split(/(?<=\.)\s+(?=[⚡\ud83d\udd34\ud83d\udfe2✅⚠️⚖️\ud83c\udd95])/)
            .map((line, i) => {
              const isHot = line.startsWith("⚡") || line.startsWith("\ud83d\udd34");
              const isGood = line.startsWith("\ud83d\udfe2") || line.startsWith("✅");
              const isWarn = line.startsWith("⚠️") || line.startsWith("⚖️");
              const color = isHot ? T.red : isGood ? T.green : isWarn ? T.yellow : T.dim;
              return (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color, flexShrink: 0, fontSize: 13, lineHeight: "1.6" }}>
                    {line.match(/^[⚡\ud83d\udd34\ud83d\udfe2✅⚠️⚖️\ud83c\udd95]/u)?.[0] || "·"}
                  </span>
                  <span style={{ fontSize: 13, color: isHot ? T.bright : T.text, lineHeight: 1.65, fontFamily: font, fontWeight: isHot ? 500 : 400 }}>
                    {line.replace(/^[⚡\ud83d\udd34\ud83d\udfe2✅⚠️⚖️\ud83c\udd95]\s?/, "")}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 10, fontFamily: mono }}>
            {selected === "all" ? `ALL THEMES · ${filteredThemes.length} FOUND` : `${entity?.label?.toUpperCase()} · ${filteredThemes.length} THEME${filteredThemes.length !== 1 ? "S" : ""}`}
          </div>
          {filteredThemes.length === 0 && (
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "32px", textAlign: "center", color: T.muted, fontSize: 13, fontFamily: font, fontStyle: "italic" }}>
              No themes found for this competitor.
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filteredThemes.map((t, i) => (
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, borderLeft: `3px solid ${T.border2}`, padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8 }}>
                  <span style={{ fontWeight: 700, color: T.bright, fontSize: 14, fontFamily: font }}>{t.theme}</span>
                  {t.competitor && selected === "all" && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: COMPETITOR_ENTITIES.find(e => e.id === t.competitor)?.color || T.muted, fontFamily: mono, background: `${COMPETITOR_ENTITIES.find(e => e.id === t.competitor)?.color || T.muted}15`, border: `1px solid ${COMPETITOR_ENTITIES.find(e => e.id === t.competitor)?.color || T.muted}40`, padding: "2px 8px", borderRadius: 3, whiteSpace: "nowrap", flexShrink: 0 }}>{t.competitor}</span>
                  )}
                </div>
                <p style={{ color: T.dim, lineHeight: 1.8, marginBottom: 10, fontSize: 13, fontFamily: font }}>{t.what}</p>
                {t.representative_voice && (
                  <div style={{ background: `${entity?.color || T.blue}08`, border: `1px solid ${entity?.color || T.blue}22`, padding: "9px 12px", fontSize: 13, color: T.text, lineHeight: 1.75, fontStyle: "italic", fontFamily: font, marginBottom: t.sources?.length ? 10 : 0 }}>
                    "{t.representative_voice}"
                  </div>
                )}
                {t.sources?.length > 0 && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                    {t.sources.map((s, j) => {
                      const name = typeof s === "object" ? s.name : s;
                      const url = typeof s === "object" ? s.url : SOURCE_LINKS[s];
                      const date = typeof s === "object" ? s.date : null;
                      const label = date ? `${name} · ${date}` : name;
                      return url
                        ? <a key={j} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><Tag label={label} color={entity?.color || T.blue} /></a>
                        : <Tag key={j} label={label} color={T.muted} />;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selected === "all" && (
          <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 12, fontFamily: mono }}>VOICE BREAKDOWN</div>
              {(data.topVoices || []).map((v, i) => (
                <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < (data.topVoices.length - 1) ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.dim, letterSpacing: "1px", display: "block", marginBottom: 4 }}>{v.type?.toUpperCase()}</span>
                  <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.75, fontFamily: font }}>{v.quote}</p>
                </div>
              ))}
            </div>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 12, fontFamily: mono }}>WATCH POINTS</div>
              {(data.watchPoints || []).map((w, i) => {
                const isHot = w.startsWith("⚡") || w.startsWith("\ud83d\udd34");
                const icon = w.match(/^[⚡\ud83d\udd34\ud83d\udfe2✅\ud83c\udd95⚠️]/u)?.[0] || "▲";
                const label = w.replace(/^[⚡\ud83d\udd34\ud83d\udfe2✅\ud83c\udd95⚠️]\s?/u, "");
                return (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: isHot ? T.red : w.startsWith("\ud83d\udfe2") || w.startsWith("✅") ? T.green : T.yellow, flexShrink: 0 }}>{icon}</span>
                    <span style={{ fontSize: 12, color: isHot ? T.bright : T.dim, lineHeight: 1.7, fontFamily: font, fontWeight: isHot ? 600 : 400 }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default function App() {
  const [activeId, setActiveId] = useState("insights");
  const [results] = useState(STATIC_DATA);
  const [loading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [sharedArticles, setSharedArticles] = useState([]);
  const [sharedLoading, setSharedLoading] = useState(false);

  const fetchFeeds = () => {
    setSharedLoading(true);
    Promise.allSettled(
      SA_HEALTH_FEEDS.map(f =>
        fetch(`/api/rss?url=${encodeURIComponent(f.url)}`)
          .then(r => r.json())
          .then(d => (d.items || []).map(a => ({ ...a, source: f.name, publisher: a.publisher || "" })))
          .catch(() => [])
      )
    ).then(feedResults => {
      const now = Date.now();
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
      const seen = new Set();
      const all = feedResults
        .flatMap(r => r.status === "fulfilled" ? r.value : [])
        .filter(a => {
          const key = a.link || a.title;
          if (!key || seen.has(key)) return false;
          seen.add(key);
          const pub = (a.publisher || "").toLowerCase();
          if (["msn", "the south african", "briefly news"].includes(pub)) return false;
          if (a.pubDate) { const age = now - new Date(a.pubDate).getTime(); if (!isNaN(age) && age > THIRTY_DAYS) return false; }
          return true;
        })
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setSharedArticles(all);
      setSharedLoading(false);
    });
  };

  useEffect(() => {
    fetchFeeds();
    const interval = setInterval(fetchFeeds, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const T = isDark ? DARK : LIGHT;
  const activeQuery = QUERIES.find(q => q.id === activeId);
  const data = results[activeId];
  const CUSTOM_TABS = new Set(["insights", "cms", "competitors"]);

  return (
    <ThemeCtx.Provider value={T}>
      <div style={{ background: T.bg, minHeight: "100vh", fontFamily: font, color: T.text, fontSize: 13, transition: "background 0.2s, color 0.2s" }}>
        <style>{`
          * { box-sizing:border-box; margin:0; padding:0; }
          ::-webkit-scrollbar { width:6px; background:transparent; }
          ::-webkit-scrollbar-thumb { background:${T.border2}; border-radius:3px; }
          @keyframes spin { to { transform:rotate(360deg); } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
          .fade { animation:fadeUp 0.35s ease forwards; }
          .tab-btn { border-radius:8px; transition:all 0.2s; }
          .tab-btn:hover { background:${T.panel} !important; color:${T.bright} !important; }
          .main-grid { display:grid; grid-template-columns:1fr 300px; gap:20px; }
          .header-subtitle { display:block; }
          a { color: inherit; }
          .card { background:${T.surface}; border:1px solid ${T.border}; border-radius:12px; padding:18px 20px; }
          @media (max-width: 768px) {
            .main-grid { grid-template-columns:1fr !important; }
            .header-subtitle { display:none !important; }
            .header-logo { height:24px !important; }
            .body-pad { padding:12px !important; }
          }
        `}</style>

        {/* HEADER */}
        <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="AfroCentric Group" className="header-logo" style={{ height: 32 }} />
            <div className="header-subtitle" style={{ fontSize: 9, color: T.muted, letterSpacing: "1.5px" }}>AfroCentric GROUP · NEWS & INTELLIGENCE MONITOR — JSE:ACT · {TODAY_UPPER}</div>
          </div>
          <button onClick={() => setIsDark(d => !d)} style={{
            background: "transparent", border: `1px solid ${T.border2}`, color: T.dim,
            fontSize: 9, letterSpacing: "1.5px", padding: "5px 14px", cursor: "pointer",
            fontFamily: mono, transition: "all 0.15s", flexShrink: 0,
          }}>{isDark ? "☀ LIGHT" : "☾ DARK"}</button>
        </div>

        {/* TABS */}
        <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", overflowX: "auto" }}>
          {QUERIES.map(q => (
            <button key={q.id} className="tab-btn" onClick={() => setActiveId(q.id)} style={{
              background: "transparent", color: activeId === q.id ? T.blue : T.muted,
              border: "none", borderBottom: activeId === q.id ? `2px solid ${T.blue}` : "2px solid transparent",
              padding: "12px 16px", cursor: "pointer",
              fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif",
              fontSize: 12, fontWeight: 500, letterSpacing: "-0.1px", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s",
            }}>
              <span style={{ color: activeId === q.id ? T.green : T.muted, fontSize: 13 }}>{q.icon}</span>
              {q.label.toUpperCase()}
              {results[q.id] && (
                <span style={{ fontSize: 9, fontFamily: mono, color: T.muted, letterSpacing: "0.5px" }}>
                  {results[q.id]?.sourceCount || ""}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="body-pad" style={{ padding: "20px 24px", maxWidth: 1200, margin: "0 auto" }}>
          {activeId === "cms"         && <CMSTab />}
          {activeId === "insights"    && <InsightsTab articles={sharedArticles} loading={sharedLoading} onRefresh={fetchFeeds} />}
          {activeId === "competitors" && results.competitors && <CompetitorIntelTab data={results.competitors} />}

          {!CUSTOM_TABS.has(activeId) && loading && !data && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "80px 0" }}>
              <div style={{ width: 36, height: 36, border: `2px solid ${T.border2}`, borderTop: `2px solid ${T.green}`, borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
              <div style={{ fontSize: 10, letterSpacing: "3px", color: T.dim, fontFamily: mono }}>SCANNING LIVE DATA</div>
            </div>
          )}

          {!CUSTOM_TABS.has(activeId) && data && (
            <div className="fade">
              <div style={{ display: "flex", gap: 1, marginBottom: 16, background: T.border }}>
                {[
                  { label: "OVERALL SENTIMENT", value: data.overallSentiment, color: sentimentColor(data.overallSentiment, T) },
                  { label: "SOURCES TRACKED",   value: data.sourceCount || "—", color: T.blue },
                  { label: "LAST UPDATED",       value: TODAY_FULL,          color: T.muted },
                ].map((s, i) => (
                  <div key={i} style={{ background: T.surface, padding: "14px 24px", flex: 1 }}>
                    <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 8, fontFamily: mono }}>{s.label}</div>
                    <div style={{ fontSize: i === 2 ? 14 : 20, fontWeight: 700, color: s.color, fontFamily: mono }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: T.surface, borderLeft: `3px solid ${T.green}`, border: `1px solid ${T.border}`, padding: "14px 20px", marginBottom: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 10, fontFamily: mono }}>INTELLIGENCE SUMMARY — {TODAY_UPPER}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {(data.oneLiner || "").split(/(?<=\.)\s+(?=[⚡\ud83d\udd34\ud83d\udfe2✅⚠️⚖️\ud83c\udd95])/).map((line, i) => {
                    const isHot = line.startsWith("⚡") || line.startsWith("\ud83d\udd34");
                    const isGood = line.startsWith("\ud83d\udfe2") || line.startsWith("✅");
                    const isWarn = line.startsWith("⚠️") || line.startsWith("⚖️");
                    const color = isHot ? T.red : isGood ? T.green : isWarn ? T.yellow : T.dim;
                    return (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color, flexShrink: 0, fontSize: 13, lineHeight: "1.6" }}>
                          {line.match(/^[⚡\ud83d\udd34\ud83d\udfe2✅⚠️⚖️\ud83c\udd95]/u)?.[0] || "·"}
                        </span>
                        <span style={{ fontSize: 13, color: isHot ? T.bright : T.text, lineHeight: 1.65, fontFamily: font, fontWeight: isHot ? 500 : 400 }}>
                          {line.replace(/^[⚡\ud83d\udd34\ud83d\udfe2✅⚠️⚖️\ud83c\udd95]\s?/, "")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="main-grid">
                <div>
                  <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 10, fontFamily: mono }}>
                    CONVERSATION THEMES · {data.themes?.length || 0} FOUND
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {(data.themes || []).map((t, i) => (
                      <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, borderLeft: `3px solid ${T.blue}`, padding: "14px 16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, color: T.bright, fontSize: 14, fontFamily: font }}>{t.theme}</span>
                        </div>
                        <p style={{ color: T.dim, lineHeight: 1.8, marginBottom: 10, fontSize: 13, fontFamily: font }}>{t.what}</p>
                        {t.representative_voice && (
                          <div style={{ background: `${T.blue}08`, border: `1px solid ${T.blue}22`, padding: "9px 12px", fontSize: 13, color: T.text, lineHeight: 1.75, fontStyle: "italic", fontFamily: font, marginBottom: t.sources?.length ? 10 : 0 }}>
                            "{t.representative_voice}"
                          </div>
                        )}
                        {t.sources?.length > 0 && (
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                            {t.sources.map((s, j) => {
                              const name = typeof s === "object" ? s.name : s;
                              const url  = typeof s === "object" ? s.url  : SOURCE_LINKS[s];
                              const date = typeof s === "object" ? s.date : null;
                              const label = date ? `${name} · ${date}` : name;
                              return url
                                ? <a key={j} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><Tag label={label} color={T.blue} /></a>
                                : <Tag key={j} label={label} color={T.muted} />;
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 12, fontFamily: mono }}>VOICE BREAKDOWN</div>
                    {(data.topVoices || []).map((v, i) => (
                      <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < (data.topVoices.length - 1) ? `1px solid ${T.border}` : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: voiceColor(v.type, T), letterSpacing: "1px" }}>{v.type?.toUpperCase()}</span>
                        </div>
                        <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.75, fontFamily: font }}>{v.quote}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 12, fontFamily: mono }}>WATCH POINTS</div>
                    {(data.watchPoints || []).map((w, i) => {
                      const isHot = w.startsWith("⚡") || w.startsWith("\ud83d\udd34");
                      const icon = w.startsWith("⚡") ? "⚡" : w.startsWith("\ud83d\udd34") ? "\ud83d\udd34" : w.startsWith("\ud83d\udfe2") ? "\ud83d\udfe2" : w.startsWith("✅") ? "✅" : w.startsWith("\ud83c\udd95") ? "\ud83c\udd95" : w.startsWith("⚠️") ? "⚠️" : "▲";
                      const label = w.replace(/^[⚡\ud83d\udd34\ud83d\udfe2✅\ud83c\udd95⚠️]\s?/, "");
                      return (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                          <span style={{ color: isHot ? T.red : w.startsWith("\ud83d\udfe2") || w.startsWith("✅") ? T.green : w.startsWith("⚠️") ? T.yellow : T.yellow, flexShrink: 0 }}>{icon}</span>
                          <span style={{ fontSize: 13, color: isHot ? T.bright : T.dim, lineHeight: 1.75, fontFamily: font, fontWeight: isHot ? 600 : 400 }}>{label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 4, fontFamily: mono }}>SOURCES</div>
                      <div style={{ fontSize: 26, fontWeight: 700, color: T.blue }}>{data.sourceCount || "—"}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 4, fontFamily: mono }}>TOPIC</div>
                      <div style={{ fontSize: 11, color: T.text }}>{activeQuery?.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "16px 20px", background: T.surface, marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 9, color: T.muted, letterSpacing: "1px", fontFamily: mono }}>AfroCentric GROUP · NEWS & INTELLIGENCE MONITOR · POWERED BY CLAUDE AI (ANTHROPIC)</span>
            <span style={{ fontSize: 9, color: T.muted, letterSpacing: "1px", fontFamily: mono }}>SA HEALTH NEWS: LIVE · INTELLIGENCE TABS: UPDATED {TODAY_UPPER}</span>
          </div>
          <div style={{ fontSize: 11, color: T.muted, fontFamily: font, lineHeight: 1.8, borderTop: `1px solid ${T.border}`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div><strong style={{ color: T.dim }}>AI disclosure:</strong>{" "}Intelligence summaries are researched and drafted with AI assistance (Claude by Anthropic). Content represents a synthesis of publicly available media coverage and does not constitute financial, legal or investment advice.</div>
            <div><strong style={{ color: T.dim }}>Subscription sources:</strong>{" "}Some publications linked in this dashboard require a paid subscription. Please use your <strong style={{ color: T.dim }}>personal email address</strong> rather than your company email for any subscriptions.</div>
            <div><strong style={{ color: T.dim }}>Content ownership:</strong>{" "}All article content remains the intellectual property of the respective publishing organisations. AfroCentric Group does not own or control linked third-party content.</div>
          </div>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}