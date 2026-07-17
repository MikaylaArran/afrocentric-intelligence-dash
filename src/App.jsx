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
    overallSentiment: "CAUTIOUS", sentimentScore: 38, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: `🔴 16 JUL — MEDSCHEME WITHDRAWS High Court application against Bonitas — clears the way for the CMS forensic (Section 44) investigation into the tender award to proceed; no court finding of wrongdoing against any party. \ud83d\udfe2 Titanium Awards Gala held 6 July (CTICC, BHF Conference) — BestMed won 2 categories; no confirmed AfroCentric/Medscheme win this year. ⚖️ Main NHI ConCourt case (BHF/Western Cape) remains RESERVED — reportedly may not be decided until early 2027. \ud83d\udd34 ACTIVO LONG STOP DATE PASSED (30 JUNE) — NO COMPLETION SENS ISSUED AS AT ${TODAY_SHORT.toUpperCase()} — ${DAYS_PAST_LONG_STOP} DAYS PAST LONG STOP. \ud83d\udd34 FY2025: R1.27bn basic loss, no dividend. \ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, dividend 44c (+22.2%). \ud83d\udd34 1 June 2026 — Bonitas 40% revenue cliff hit permanently; H1 2026 interim results (SENS 1 Sep) will show first full impact.`,
    themes: [
      {
        theme: "🔴 16 JULY — Medscheme WITHDRAWS Its High Court Application Against Bonitas; CMS Forensic Investigation Now Proceeds",
        sentiment: "NEGATIVE",
        what: "Medscheme has withdrawn its High Court application against Bonitas Medical Fund, which had sought to interdict the implementation of Bonitas's 2025 RFP awards (administration to Momentum Health, managed care to PHA) pending a CMS forensic probe. The withdrawal hands the matter back to the Council for Medical Schemes to continue its Section 44 investigation into alleged tender manipulation and conflicts of interest around Bonitas's earlier 2022 (BonCap/PHA) and 2024 (Agile Business Solutions) contract awards. Critically, none of Medscheme's allegations were tested in court, and no finding of wrongdoing has been made against Bonitas, PHA or any other party; equally, Bonitas's rebuttal (that the disputed tenders are unrelated to the earlier ones under CMS scrutiny) was also never tested. Medscheme has accused Bonitas and PHA of using delaying tactics to avoid a substantive hearing before the 1 June handover; Bonitas maintains the later contracts were lawfully concluded and the interdict had become moot once implementation began. The question of whether the tender processes were properly run now rests entirely with the CMS regulator.",
        sources: [
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-07-16-medscheme-drops-bonitas-court-fight-clearing-path-for-regulators-forensic-tender-investigation/", date: "16 Jul 2026" },
        ],
        watchPoints: [
          "⚡ Watch for CMS Section 44 investigation findings/timeline now that the court case is out of the way",
          "⚡ Bonitas principal officer Lee Callakoppen's rebuttal (that PHA is properly accredited and the tenders are unrelated) also remains untested — CMS findings will be the first authoritative word",
        ],
        representative_voice: "Those allegations have not been tested in court, and no finding of wrongdoing has been made against Bonitas, Private Health Administrators or any other party. — Daily Maverick, 16 July 2026",
      },
      {
        theme: "⚡ BHF 25th ANNUAL CONFERENCE (4–8 July, CTICC) — Titanium Awards Gala Held 6 July; BestMed Wins 2 Categories; No Confirmed AfroCentric/Medscheme Win",
        sentiment: "CAUTIOUS",
        what: "The 25th Annual BHF Conference ran 4–8 July 2026 at the CTICC, Cape Town — theme: 'Facing Headwinds — Thriving in the Unknown'. The 11th Annual Titanium Awards Gala Banquet was held on 6 July. BestMed Medical Scheme was recognised with two awards: Excellence in Creating Access to Quality Healthcare, and Service to Membership (Category A: open/closed/self-administered schemes, administrators and MCOs). No confirmed win for AfroCentric Group or Medscheme has surfaced in coverage so far this year — a contrast with 2024 (AfroCentric won Best Integrated Report) and 2025 (Bonitas won Service to Membership — Operational Excellence while still a Medscheme client). Competitor visibility note: Dr Ayanda Mbuli, CEO of Private Health Administrators (PHA) — the managed-care provider that took the Bonitas contract from Medscheme — sits on the BHF Board.",
        sources: [
          { name: "Cover Magazine — Titanium Awards", url: "https://www.cover.co.za/news/bestmed-medical-scheme-recognised-at-board-of-healthcare-funders-titanium-awards", date: "6 Jul 2026" },
          { name: "BHF 2026 Conference", url: "https://bhfglobal.com/bhf-conferences/2026-summary/" },
        ],
        watchPoints: [
          "⚡ Watch bhfglobal.com for a full 2026 Titanium Awards winners list — no AfroCentric/Medscheme win confirmed yet is itself a mild reputational signal given the Bonitas loss",
        ],
        representative_voice: "Facing Headwinds — Thriving in the Unknown. — BHF 25th Annual Conference theme, 2026",
      },
      {
        theme: "⚖️ NHI ConCourt — Main Public Participation Challenge STILL RESERVED; Commentary Suggests Judgment May Not Land Until Early 2027",
        sentiment: "CAUTIOUS",
        what: "The Constitutional Court heard the combined BHF and Western Cape government applications on 6–7 May 2026, seeking to have the NHI Act set aside for failing to follow proper public participation процесses, and reserved judgment. As at mid-July 2026 no ruling has been delivered, and legal commentary (TimesLive/Bhekisisa, 7 July) notes judgment could plausibly only come 'possibly until early 2027'. This is separate from the Certificate of Need ruling (Sections 36–40 of the National Health Act) which the ConCourt DID hand down on 18 May 2026, striking those provisions down as unconstitutional — that earlier ruling does not resolve the main NHI Act challenge. Government has committed not to proclaim or implement any NHI Act sections until the ConCourt rules on the main case, and all other NHI-related litigation remains stayed pending that judgment.",
        sources: [
          { name: "TimesLive/Bhekisisa", url: "https://www.timeslive.co.za/news/south-africa/2026-07-07-why-you-can-trust-the-concourts-nhi-ruling-whichever-way-it-goes/", date: "7 Jul 2026" },
          { name: "EWN — judgment reserved", url: "https://www.ewn.co.za/2026/05/07/concourt-reserves-judgment-in-nhi-challenge", date: "7 May 2026" },
        ],
        representative_voice: "After two days of argument, the court reserved judgment, possibly until early 2027. — TimesLive/Bhekisisa, 7 July 2026",
      },
      {
        theme: "\ud83d\udfe2 1 June — Bonitas Handover COMPLETED. Momentum Administration ACTIVE. Revenue Cliff Now Permanent for Medscheme.",
        sentiment: "NEGATIVE",
        what: `1 June 2026: Bonitas transferred to Momentum Health administration and PHA managed care — 750,000+ members. The operational disruption reported in the first days of June (cancelled surgeries, long queues, authorisation backlogs) had largely eased by early-to-mid June according to prior coverage, and with Medscheme's court challenge now withdrawn (16 July), the Bonitas/Medscheme dispute has shifted from an active legal battle to a purely regulatory one sitting with the CMS. Medscheme retains responsibility for tax certificates and historical commission reconciliations. 40% of Medscheme's administration income is now permanently gone from 1 June 2026 onward.`,
        sources: [
          { name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" },
          { name: "Daily Maverick — withdrawal", url: "https://www.dailymaverick.co.za/article/2026-07-16-medscheme-drops-bonitas-court-fight-clearing-path-for-regulators-forensic-tender-investigation/", date: "16 Jul 2026" },
        ],
        representative_voice: "The new arrangements took effect on 1 June after Medscheme's contracts expired on 31 May. — Daily Maverick, 16 July 2026",
      },
      {
        theme: "\ud83d\udfe2 Medscheme Wins Sisonke Health Mandate — Competitive Tender, Live from 1 May 2026",
        sentiment: "POSITIVE",
        what: "Medscheme secured the administration and managed care mandate for Sisonke Health Medical Scheme from 1 May 2026, selected across all categories in a competitive tender. Sisonke Health (formed from the Sisonke/Lonmin Medical Scheme amalgamation) covers employees of Sibanye-Stillwater, Gold Fields, and DRD Gold. A meaningful counterpoint to the Bonitas story — it demonstrates that Medscheme can still win new business through proper procurement at its most difficult period.",
        sources: [
          { name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" },
        ],
        representative_voice: "The Sisonke mandate provides Medscheme with an important foothold as it works to stabilise its position in a consolidating market. — Moonstone",
      },
      {
        theme: "\ud83d\udd34 FY2025 Results — R1.27bn Basic Loss, No Dividend, Revenue Cliff — HIT 1 JUNE 2026; H1 2026 SENS Due 1 Sep",
        sentiment: "NEGATIVE",
        what: "AfroCentric Group FY2025: revenue R7.3bn (+93.9%), R1.59bn impairment charge (Activo, ADS Group, Wellworx disposals), R1.27bn basic loss (151.55c/share). Headline earnings R117.1m (13.92c/share). No dividend. Bonitas contributed approximately 40% of Medscheme admin income — that revenue exited permanently on 1 June 2026. H1 2026 interim results SENS is due 1 September 2026 and will be the first period to show the full Bonitas-loss impact.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/", date: "4 Mar 2026" }],
        representative_voice: "The all-time low earlier this year tells the full story. The market priced in the Bonitas loss, impairments, and deep uncertainty about FY2026.",
      },
      {
        theme: "\ud83d\udfe2 Lenacapavir HIV Prevention — LAUNCHED 5 JUNE 2026; Gauteng Rollout Ongoing",
        sentiment: "POSITIVE",
        what: "Launched 5 June 2026, Lilian Ngoyi Stadium, Secunda, Mpumalanga. President Ramaphosa officiated; Health Minister Motsoaledi, Mpumalanga Premier Ndlovu, SANAC civil society, Global Fund representatives attended. SA became the 9th African country to introduce lenacapavir for PrEP. Near-100% efficacy. Target populations: adolescent girls and young women to age 24, pregnant/breastfeeding mothers, female sex workers, MSM, transgender people, injecting drug users. Directly relevant to AfroCentric: Aid for AIDS, Pharmacy Direct CCMDD, Scriptpharm.",
        sources: [
          { name: "SA Presidency", url: "https://www.gov.za/news/media-advisories/government-activities/president-cyril-ramaphosa-launches-rollout-lenacapavir", date: "5 Jun 2026" },
        ],
        representative_voice: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "⚖️ Certificate of Need Struck Down (24 May) — Distinct From, Not the Same As, the Main NHI ConCourt Case",
        sentiment: "CAUTIOUS",
        what: "On 18 May 2026 the Constitutional Court unanimously struck down sections 36–40 of the National Health Act (certificate of need) as unconstitutional — Justice Kate Savage's judgment. The Department of Health apologised on 16 May for Minister Motsoaledi's earlier remarks questioning ConCourt judges' impartiality on NHI. This ruling is separate from the still-reserved main NHI Act public-participation challenge (BHF/Western Cape) — commentary suggests that judgment could take until early 2027.",
        sources: [
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-24-its-back-to-the-drawing-board-after-concourts-nhi-judgment/", date: "24 May 2026" },
        ],
        representative_voice: "The National Health Insurance now lies in ruins and adjustments will need to be made. — Daily Maverick analysis, 24 May 2026",
      },
      {
        theme: "\ud83d\udfe2 ACT.JO — Recovering From March Lows; Still No Completion SENS on Activo Disposal",
        sentiment: "CAUTIOUS",
        what: `Data providers show a wide range for ACT.JO through early-to-mid July 2026 (roughly 78–105 ZAC depending on source/date, versus the 61 ZAC all-time low hit on 20 March 2026), reflecting continued thin, volatile trade in the counter. No new SENS has been issued confirming completion of the Activo Health disposal to FHC Group (Portugal); the 30 June 2026 Long Stop Date has PASSED — ${DAYS_PAST_LONG_STOP} days ago as at ${TODAY_SHORT} — with no announcement of completion, lapse, or a written extension. H1 2026 interim results SENS is due 1 September 2026.`,
        sources: [
          { name: "Investing.com ZA", url: "https://za.investing.com/equities/afrocentric-investment-corp", date: "Jul 2026" },
          { name: "Morningstar ACT", url: "https://www.morningstar.com/stocks/xjse/act/quote", date: "Jul 2026" },
        ],
        representative_voice: `ACT remains well above its 61 ZAC all-time low but trade is thin and price quotes vary noticeably by source. Activo Long Stop Date PASSED 30 JUNE with no completion SENS as at ${TODAY_SHORT} (${DAYS_PAST_LONG_STOP} days past). Watch for a SENS announcement.`,
      },
    ],
    topVoices: [
      { type: "Daily Maverick (16 Jul)", sentiment: "negative", quote: "Medscheme's decision to withdraw its lawsuit against Bonitas hands the baton back to the regulator to investigate allegations of tender manipulation and conflicts of interest." },
      { type: "Bonitas PO Lee Callakoppen (via DM, 16 Jul)", sentiment: "cautious", quote: "There was no link between the earlier tenders under regulatory scrutiny and the new contracts Medscheme sought to interdict; the later tender processes had already been completed and binding contracts signed." },
      { type: "TimesLive/Bhekisisa (7 Jul)", sentiment: "cautious", quote: "After two days of argument, the [Constitutional] court reserved judgment, possibly until early 2027." },
      { type: "Sanlam CEO Hanratty", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
    ],
    watchPoints: [
      `🔴 ${TODAY_SHORT.toUpperCase()}: Medscheme's court withdrawal (16 Jul) is the dominant headline — CMS Section 44 investigation now the sole live process`,
      "\ud83d\udfe2 6 July — BHF Titanium Awards Gala held; BestMed won two categories; no confirmed AfroCentric/Medscheme win found in coverage",
      "⚖️ Main NHI ConCourt case (BHF/Western Cape) — STILL reserved as at 7 July; commentary suggests possibly not until early 2027",
      "\ud83d\udd34 30 June 2026 — Activo disposal Long Stop Date PASSED — no completion SENS as at today; watch for announcement of completion, lapse, or written extension",
      "\ud83d\udfe2 Lenacapavir — launched 5 June; Gauteng rollout continuing toward Mar 2027 targets",
      "\ud83d\udd34 24 MAY — ConCourt struck down Certificate of Need (Sections 36–40) — separate from, and does not resolve, the main NHI case",
      "H1 2026 interim results — SENS 1 Sep 2026 — first full period showing Bonitas revenue impact",
      "GEMS and Polmed renewals — most strategically critical Medscheme contracts remaining",
      "Watch for CMS commentary/timeline on the Section 44 forensic investigation now that the court matter has been withdrawn",
    ],
    sourceCount: 61,
  },

  // ─── MEDSCHEME CHATTER ────────────────────────────────────────────────────
  medscheme: {
    overallSentiment: "CAUTIOUS", sentimentScore: 34, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: `🔴 16 JUL — Medscheme WITHDRAWS its High Court application against Bonitas — CMS Section 44 forensic investigation now the only live process; no court finding against any party. \ud83d\udfe2 Sisonke mandate live since 1 May. ✅ FASR submitted 29 May. \ud83d\udd34 Fraudulent-documents allegation (raised earlier by AfroCentric) was never tested in court and remains unresolved. \ud83d\udfe2 Momentum: R100m+ invested, 744 hires. \ud83d\udfe2 Scale intact — 4m+ lives; GEMS and Polmed now most critical contracts. ✅ CMS Indaba CONCLUDED — Circular 10 fully operational.`,
    themes: [
      {
        theme: "🔴 16 JULY — Medscheme Withdraws High Court Application Against Bonitas",
        sentiment: "NEGATIVE",
        what: "Medscheme has withdrawn the High Court application it launched in December 2025 seeking to interdict Bonitas's implementation of its 2025 RFP awards (administration to Momentum Health, managed care to PHA) pending a CMS forensic probe into earlier (2022/2024) Bonitas procurement decisions. The withdrawal means the interdict application will no longer determine the dispute — Medscheme's allegations of tender manipulation were never tested in court, and neither was Bonitas's rebuttal (that the disputed 2025 tenders are unrelated to the earlier contracts under CMS scrutiny, and that PHA is a properly accredited, CMS-inspected administrator). The matter now rests entirely with the CMS's Section 44 forensic investigation. Medscheme has suggested Bonitas and PHA used delaying tactics to avoid a substantive hearing before the 1 June handover; both Bonitas and PHA have denied any wrongdoing throughout.",
        sources: [
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-07-16-medscheme-drops-bonitas-court-fight-clearing-path-for-regulators-forensic-tender-investigation/", date: "16 Jul 2026" },
        ],
        representative_voice: "Medscheme's withdrawal means the interdict application will no longer determine the dispute. Bonitas's rebuttal has also not been tested through a substantive court hearing. — Daily Maverick, 16 July 2026",
      },
      {
        theme: "\ud83d\udfe2 Sisonke Health Mandate Won — Competitive Tender, Live from 1 May 2026",
        sentiment: "POSITIVE",
        what: "Medscheme secured the administration and managed care mandate for Sisonke Health Medical Scheme from 1 May 2026, selected across all categories in a competitive tender. Sisonke Health (formed from the Sisonke/Lonmin Medical Scheme amalgamation, 1 April 2025) covers employees of Sibanye-Stillwater, Gold Fields, and DRD Gold. This is a meaningful counterpoint to the Bonitas narrative — it shows Medscheme can still win new business through proper procurement in its most difficult period.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" }],
        representative_voice: "The Sisonke mandate does not replace Bonitas in scale, but it provides Medscheme with an important foothold as it works to stabilise its position. — Moonstone",
      },
      {
        theme: "\ud83d\udfe2 1 JUNE — Bonitas Handover to Momentum COMPLETED; 44-Year Medscheme Relationship Ended",
        sentiment: "NEGATIVE",
        what: "OPERATIONAL MILESTONE (27 May): Medscheme's final claims run was 26 May — Bonitas claims switched to Momentum from 27 May; handover completed 1 June. Historic queries remain with Medscheme; Momentum resolves new queries directly even for pre-31 May services. Tax certificates and prior commission payments remain Medscheme's responsibility. With the High Court case now withdrawn (16 July), the dispute is settled in the sense that no litigation remains outstanding — only the CMS's regulatory investigation continues.",
        sources: [{ name: "Moonstone — PHA handover detail", url: "https://www.moonstone.co.za/pha-lays-out-its-case-as-bonitas-managed-care-handover-nears/", date: "May 2026" }, { name: "Daily Maverick — withdrawal", url: "https://www.dailymaverick.co.za/article/2026-07-16-medscheme-drops-bonitas-court-fight-clearing-path-for-regulators-forensic-tender-investigation/", date: "16 Jul 2026" }],
        representative_voice: "The new arrangements took effect on 1 June after Medscheme's contracts expired on 31 May. — Daily Maverick, 16 July 2026",
      },
      {
        theme: "Fraudulent Documents Allegation — Raised, Never Tested, Now Effectively Moot",
        sentiment: "NEGATIVE",
        what: "Earlier in 2026, AfroCentric Group stated that cyber-forensic analysis (FACTS Consulting) indicated documents relied upon by PHA and provided to the court were altered. This allegation was part of the broader court dispute and, like all of Medscheme's claims in that case, was never tested by a judge — the case has now been withdrawn rather than adjudicated. Whether the CMS's ongoing Section 44 investigation examines this allegation independently is unclear.",
        sources: [{ name: "AfroCentric", url: "https://www.afrocentric.za.com/medscheme-provides-evidence-bonitas-tender-process-was-compromised/", date: "Feb 2026" }],
        representative_voice: "The allegation was serious, but with the case withdrawn rather than heard, it remains just that — an allegation, not a finding.",
      },
      {
        theme: "Section 197 Rejected — 5,000 Staff Without Automatic Protection",
        sentiment: "NEGATIVE",
        what: "Momentum rejected Sanlam's Section 197 LRA application. Approximately 5,000 staff remain without automatic transfer protection. Sanlam's commitments: internal redeployment search, priority applications at Momentum's 744 new roles. No headcount guarantee given.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" }],
        representative_voice: "There is a bitter irony in Medscheme staff being told to apply to Momentum for jobs that only exist because Momentum won the contract Medscheme lost.",
      },
      {
        theme: "Scale Intact — 4 Million+ Lives, GEMS and Polmed the Priority Contracts",
        sentiment: "POSITIVE",
        what: "Despite the Bonitas loss, Medscheme administers 4 million+ lives including GEMS, Polmed, Fedhealth, and now Sisonke Health. GEMS and Polmed renewals are the most strategically critical contracts on the book. GEMS's 9.8% increase for 2026 (below the 21% market estimate) reflects cost discipline.",
        sources: [{ name: "AfroCentric IAR 2025", url: "https://www.afrocentric.za.com" }],
        representative_voice: "Medscheme currently has 14 medical scheme clients including GEMS. The Sisonke win adds a 15th. The question is whether GEMS and Polmed hold firm.",
      },
    ],
    topVoices: [
      { type: "Daily Maverick (16 Jul)", sentiment: "negative", quote: "Medscheme's decision to withdraw its lawsuit against Bonitas hands the baton back to the regulator to investigate allegations of tender manipulation and conflicts of interest." },
      { type: "Bonitas PO Callakoppen (via DM, 16 Jul)", sentiment: "cautious", quote: "There was no link between the earlier tenders under regulatory scrutiny and the new contracts Medscheme sought to interdict." },
    ],
    watchPoints: [
      `🔴 ${TODAY_SHORT.toUpperCase()}: Medscheme's court withdrawal (16 Jul) is the dominant story — regulatory process with CMS now the only live thread`,
      "\ud83d\udfe2 1 June 2026 — Bonitas handover COMPLETED",
      "⚠️ FASR regulatory submission deadline — 29 May — PASSED",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 governance directives now fully in effect",
      "\ud83d\udfe2 Sisonke live 1 May — watch for further new client pipeline",
      "Fraudulent documents allegation — untested in court; unclear if CMS Section 44 probe will examine it",
      "Section 197 LRA — Sanlam separate court challenge possible",
      "GEMS and Polmed renewals — most strategic contracts remaining on the book",
      "CMS Section 44 forensic investigation — now the sole live process; watch for timeline/findings",
    ],
    sourceCount: 30,
  },

  // ─── FINANCIAL ────────────────────────────────────────────────────────────
  financial: {
    overallSentiment: "CAUTIOUS", sentimentScore: 27, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: `\ud83d\udfe2 ACT.JO trading well above its 61 ZAC all-time low (20 Mar), though quotes vary noticeably by data provider (roughly 78–105 ZAC through early-to-mid July) reflecting thin trade. \ud83d\udd34 1 June 2026 — Bonitas 40% revenue cliff hit permanently. H1 2026 SENS: 1 Sep 2026 (first full Bonitas-loss period). 🔴 ACTIVO LONG STOP DATE PASSED (30 JUNE) — NO COMPLETION SENS ISSUED AS AT ${TODAY_SHORT.toUpperCase()} — ${DAYS_PAST_LONG_STOP} DAYS PAST LONG STOP. \ud83d\udd34 FY2025: R1.27bn basic loss, no dividend. \ud83d\udfe2 Momentum NHE +8%; market share 22%→30% active from 1 June. \ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9%, dividend 44c (+22.2%). 🔴 16 Jul — Medscheme withdrew its Bonitas court case; removes litigation overhang but leaves the CMS's regulatory probe as an open question.`,
    themes: [
      {
        theme: "ACT.JO — Wide Range Across Data Providers (~78–105 ZAC, Early-Mid July); All-Time Low 61 ZAC (20 Mar) | SENS Log",
        sentiment: "CAUTIOUS",
        what: "Data providers disagree materially on ACT.JO's exact level through early-to-mid July 2026 — quotes span roughly 78 ZAC to 105 ZAC depending on source and date, reflecting thin, illiquid trade in the counter. What is consistent: the stock remains well above the 61 ZAC all-time low hit on 20 March 2026, but well below its 52-week high (reported variously as 180–223 ZAC depending on provider). Market cap is in the region of R700–780m. No new SENS confirming completion of the Activo disposal has been issued. Full SENS log this year: (1) 11 May — AGM results. (2) 23 Apr — Revised Activo disposal terms; Long Stop Date 30 June 2026; buyer FHC Group (Laboratórios Basi, Portugal); carrying value ~R1.1bn. (3) 08 Apr — IAR + AGM notice. (4) 09 Mar — Board change. (5) 04 Mar — FY2025 results (R1.27bn basic loss). (6) 02 Mar — Trading statement. Next: H1 2026 SENS 1 Sep; presentation 2 Sep.",
        sources: [
          { name: "Investing.com ZA", url: "https://za.investing.com/equities/afrocentric-investment-corp", date: "Jul 2026" },
          { name: "Morningstar ACT", url: "https://www.morningstar.com/stocks/xjse/act/quote", date: "Jul 2026" },
          { name: "Digrin ACT.JO", url: "https://www.digrin.com/stocks/detail/ACT.JO/price", date: "Jul 2026" },
        ],
        representative_voice: `ACT.JO quotes vary noticeably across data providers this month, underlining how thinly the stock trades — but all sources agree it remains well clear of the 61 ZAC all-time low from 20 March. Activo Long Stop Date PASSED 30 JUNE — NO SENS as at ${TODAY_SHORT} (${DAYS_PAST_LONG_STOP} days past Long Stop).`,
      },
      {
        theme: "FY2025 — Revenue R7.3bn (+93.9%), Basic Loss R1.27bn, No Dividend",
        sentiment: "NEGATIVE",
        what: "Loss before tax R532m vs prior profit R225m. Basic loss R1.27bn (151.55c/share). Headline earnings R117.1m (13.92c/share). Revenue R7.3bn (+93.9%). No dividend (vs 6c prior). Impairments R1.59bn from Activo, ADS Group and Wellworx disposals. AGM held 11 May 2026.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/", date: "4 Mar 2026" }],
        representative_voice: "The R1.59bn impairment is largely non-cash but try explaining that to a retail investor who bought at 300c and is watching it trade at a fraction of that.",
      },
      {
        theme: "\ud83d\udd34 Bonitas Revenue Cliff — 40% of Medscheme Income Gone Permanently (1 June 2026); H1 Impact in Sep Results",
        sentiment: "NEGATIVE",
        what: "Bonitas contributed approximately 40% of Medscheme's administration income. That revenue exited permanently on 1 June 2026. No FY2026 earnings guidance provided. H1 2026 interim results will be the most painful numbers in AfroCentric Group's listed history. With Medscheme's court case now withdrawn (16 July), the litigation overhang is gone, but investors will still want to see how the CMS's Section 44 investigation and the revenue loss show up in the September results.",
        sources: [{ name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/" }],
        representative_voice: "A 40% income concentration on a single client that you are now losing was always a risk that should have been managed more proactively.",
      },
      {
        theme: "Momentum — Market Share 22%→30%, Interim NHE +8%, Dividend +29%",
        sentiment: "POSITIVE",
        what: `Momentum is the defining competitive winner of 2026. R100m+ budget, 744 new hires, 22 walk-in centres. Market share shifted 22%→30% from 1 June — SA's second-largest administrator after Discovery. H1 FY2026: headline earnings +8% to R3.56bn, NHE +8% to R3.695bn, HEPS +13% to 274.4c, interim dividend 110c (+29%). ROE 24%, above the 20% F2027 target.`,
        sources: [{ name: "EWN", url: "https://www.ewn.co.za/momentum-health-taking-over-administration-of-bonitas-it-gives-us-incredible-scale/", date: "Mar 2026" }],
        representative_voice: "It results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. — Jeanette Marais, Momentum CEO",
      },
      {
        theme: "\ud83d\udfe2 Netcare H1 2026 — Adj. HEPS +21.9%, Revenue R13.3bn; Contrast With AfroCentric's Position",
        sentiment: "POSITIVE",
        competitor: "Netcare",
        what: "Netcare H1 FY2026 (25 May): revenue +4.8% R13.3bn; normalised EBITDA +6.6% R2.5bn; adj HEPS +21.9% 71.7c; div 44c (+22.2%); profit +11.9% to R924m. Digital savings R705m since 2022. Melanie Da Costa is Netcare CEO Designate from 1 June 2026. Contrast with AfroCentric: R1.27bn basic loss, no dividend, 40% revenue cliff — HIT 1 June 2026. Private healthcare demand is resilient; AfroCentric's crisis is structural, not sector-wide.",
        sources: [
          { name: "Moneyweb", url: "https://www.moneyweb.co.za/news/companies-and-deals/netcare-boosts-earnings-as-digital-strategy-delivers-meaningful-dividend/", date: "25 May 2026" },
        ],
        representative_voice: "Netcare adj. HEPS +21.9% vs AfroCentric R1.27bn basic loss — the divergence is stark. Private healthcare demand is resilient; AfroCentric's crisis is entirely self-inflicted by the Bonitas concentration.",
      },
      {
        theme: "Sanlam FY2025 — Headline Earnings Down 18% to R20.08bn",
        sentiment: "NEGATIVE",
        what: "Sanlam reported FY2025 results on 12 March 2026 with headline earnings down 18% to R20.08bn. CEO Hanratty called the Bonitas situation a 'human tragedy' for AfroCentric staff while describing the financial impact on Sanlam as manageable. Sanlam holds ~59% of AfroCentric Group.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/sanlams-business-engines-a-look-at-the-groups-2025-performance/" }],
        representative_voice: "Sanlam calling it a financial irritation while describing 5,000 job losses as a human tragedy is a clear signal of where AfroCentric Group sits in Sanlam's priority stack.",
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "No dividend, R1.59bn impairments, Bonitas revenue exited 1 June 2026. H1 2026 interim results (SENS 1 Sep) will be the ugliest numbers AfroCentric Group has ever reported." },
      { type: "Momentum CEO", sentiment: "positive", quote: "The Bonitas appointment results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa." },
      { type: "Daily Maverick (16 Jul)", sentiment: "cautious", quote: "Medscheme's withdrawal means the interdict application will no longer determine the dispute — the question now moves back to the regulator." },
    ],
    watchPoints: [
      "⚡ 1 June 2026 — Bonitas revenue exits Medscheme's books PERMANENTLY",
      "🔴 30 June 2026 — Activo disposal Long Stop Date PASSED — no completion SENS yet; buyer FHC Group (Portugal)",
      "\ud83d\udfe2 ACT.JO price quotes vary by provider (~78–105 ZAC, early-mid July); well above 61 ZAC all-time low",
      "H1 2026 interim results — SENS 1 Sep 2026, presentation 2 Sep — first full period showing Bonitas revenue impact",
      "Dividend reinstatement — no guidance given",
      "Sanlam stake — no change signalled but strategic review watch point",
      "🔴 16 Jul — Medscheme's court withdrawal removes litigation overhang; CMS Section 44 investigation remains outstanding",
    ],
    sourceCount: 20,
  },

  // ─── NHI & POLICY ─────────────────────────────────────────────────────────
  nhi: {
    overallSentiment: "CAUTIOUS", sentimentScore: 38, volumeSignal: "MEDIUM", dataQuality: "HIGH",
    oneLiner: "⚖️ Main NHI ConCourt case (BHF/Western Cape public-participation challenge) remains RESERVED as at early July — commentary suggests judgment may not land until early 2027. \ud83d\udd34 24 MAY — Separate ruling struck down Certificate of Need (Sections 36–40, National Health Act) — does NOT resolve the main NHI Act challenge. \ud83d\udfe2 5 JUNE — Lenacapavir LAUNCHED; SA 9th African country; Gauteng rollout ongoing. ✅ CMS Indaba CONCLUDED — Circular 10 fully operational. \ud83d\udfe2 AfroCentric CCMDD, GEMS and HIV portfolio — strongest NHI hedge in the group.",
    themes: [
      {
        theme: "⚖️ Main NHI ConCourt Case STILL Reserved — Commentary Suggests Judgment Could Take Until Early 2027",
        sentiment: "CAUTIOUS",
        what: "The Constitutional Court heard the combined Board of Healthcare Funders (BHF) and Western Cape government applications on 6–7 May 2026, challenging whether Parliament properly followed public-participation processes in passing the NHI Act, and reserved judgment. As at early-mid July 2026, no ruling has been delivered. A TimesLive/Bhekisisa analysis published 7 July 2026 notes the court 'reserved judgment, possibly until early 2027' — indicating this could remain unresolved for months yet. Government (via Deputy DG Dr Nicholas Crisp) has committed not to proclaim or implement any NHI Act sections until the ConCourt rules, and other NHI-related litigation (SAMA, Solidarity, HASA, HFA, SAPPF, Sakeliga) remains stayed pending the outcome.",
        sources: [
          { name: "TimesLive/Bhekisisa", url: "https://www.timeslive.co.za/news/south-africa/2026-07-07-why-you-can-trust-the-concourts-nhi-ruling-whichever-way-it-goes/", date: "7 Jul 2026" },
          { name: "EWN", url: "https://www.ewn.co.za/2026/05/07/concourt-reserves-judgment-in-nhi-challenge", date: "7 May 2026" },
        ],
        representative_voice: "After two days of argument, the court reserved judgment, possibly until early 2027. — TimesLive/Bhekisisa, 7 July 2026",
      },
      {
        theme: "\ud83d\udd34 18 MAY — ConCourt Strikes Down Certificate of Need (Sections 36–40) — A Separate Ruling, Not the Main NHI Case",
        sentiment: "NEGATIVE",
        what: "On 18 May 2026, the Constitutional Court unanimously confirmed a Pretoria High Court ruling striking down Sections 36–40 of the National Health Act 61 of 2003 — the 'Certificate of Need' provisions requiring healthcare professionals to obtain government approval before opening, relocating or expanding practices. Justice Kate Savage authored the unanimous judgment. Solidarity called it the collapse of 'one of the NHI's central pillars'; the Department of Health initially pushed back that the sections were never operational, though ActionSA and others noted the Department's own court papers had described the struck-down scheme as 'a central pillar in the implementation of the NHI Act'. This ruling is distinct from — and does not resolve — the still-reserved main challenge to the NHI Act itself.",
        sources: [
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-24-its-back-to-the-drawing-board-after-concourts-nhi-judgment/", date: "24 May 2026" },
          { name: "Politicsweb — ActionSA", url: "https://www.politicsweb.co.za/news/dohs-claim-that-concourt-ruling-unrelated-to-nhi-not-correct-actionsa", date: "20 May 2026" },
        ],
        representative_voice: "One of the NHI's central pillars has collapsed today. The government wanted to move healthcare practitioners around like its own pawns on a chessboard. — Solidarity, 18 May 2026",
      },
      {
        theme: "\ud83d\udfe2 Lenacapavir HIV Prevention — LAUNCHED 5 JUNE 2026; Gauteng Rollout Ongoing",
        sentiment: "POSITIVE",
        competitor: "Sector-Wide",
        what: "Launched 5 June 2026, Lilian Ngoyi Stadium, Secunda, Mpumalanga. President Ramaphosa officiated. Health Minister Motsoaledi, Mpumalanga Premier Ndlovu, SANAC civil society, Global Fund donors all attending. Target populations: adolescent girls and young women to age 24, pregnant/breastfeeding mothers, female sex workers, MSM, transgender people and injecting drug users. Near-100% efficacy. Direct impact: Aid for AIDS, Pharmacy Direct CCMDD, Scriptpharm.",
        sources: [
          { name: "SA Presidency", url: "https://www.gov.za/news/media-advisories/government-activities/president-cyril-ramaphosa-launches-rollout-lenacapavir", date: "5 Jun 2026" },
        ],
        representative_voice: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "✅ CMS Industry Indaba CONCLUDED (13-14 May) — Section 59 Implementation Operational",
        sentiment: "CAUTIOUS",
        what: "CMS Industry Indaba 2026 concluded at Sandton Convention Centre on 14 May. Circular 10 of 2026 — immediate directives — now fully in effect for all administrators. This marks the formal transition from regulatory findings to implementation framework for the entire sector.",
        sources: [{ name: "CMS", url: "https://www.medicalschemes.co.za/minister-of-health-to-deliver-keynote-at-cms-industry-indaba-2026/", date: "23 Mar 2026" }],
        representative_voice: "The 2026 Indaba marks the culmination of the Section 59 recommendations — from regulatory findings to implementation framework. — CMS",
      },
      {
        theme: "AfroCentric Group's NHI Positioning — CCMDD, HIV and GEMS Are Real Hedges",
        sentiment: "POSITIVE",
        what: "Pharmacy Direct administers CCMDD scripts for the NDoH. Aid for AIDS provides HIV managed care. Medscheme administers GEMS and Polmed. With lenacapavir rolling out from 5 June, AfroCentric Group's HIV management portfolio is directly in the path of SA's most significant public health intervention in years.",
        sources: [{ name: "AfroCentric IAR 2025", url: "https://www.afrocentric.za.com" }],
        representative_voice: "AfroCentric Group already does NHI-style delivery at scale through CCMDD, GEMS and HIV management. That is a structural moat that no competitor can quickly replicate.",
      },
    ],
    topVoices: [
      { type: "TimesLive/Bhekisisa (7 Jul)", sentiment: "cautious", quote: "After two days of argument, the court reserved judgment, possibly until early 2027." },
      { type: "Motsoaledi (14 May)", sentiment: "positive", quote: "We dare say we can eliminate HIV/Aids as a public health threat by 2030." },
      { type: "Solidarity (18 May)", sentiment: "negative", quote: "One of the NHI's central pillars has collapsed today." },
    ],
    watchPoints: [
      "⚖️ Main NHI ConCourt ruling (BHF/Western Cape) — still reserved; commentary suggests possibly not until early 2027",
      "\ud83d\udfe2 Lenacapavir — launched 5 June; Gauteng rollout continuing toward Mar 2027 targets",
      "\ud83d\udd34 18 MAY — ConCourt struck down Certificate of Need (Sections 36–40) — separate ruling, does not resolve the main NHI case",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 implementation framework fully operational",
      "All other NHI court challenges remain stayed pending the main ConCourt ruling",
      "CCMDD, GEMS and HIV management portfolio renewals — core to AfroCentric's public sector positioning",
    ],
    sourceCount: 24,
  },

  // ─── EMPLOYER REPUTATION ──────────────────────────────────────────────────
  employer: {
    overallSentiment: "CAUTIOUS", sentimentScore: 36, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: `🔴 16 JUL — Medscheme's withdrawal of its Bonitas court case closes one chapter of uncertainty but leaves the CMS investigation open. \ud83d\udfe2 1 June handover completed. 5,000 jobs at risk — no S197 protection; S189 retrenchment process watch ongoing. \ud83d\udfe2 Momentum hired 744 — Medscheme staff prioritised. \ud83d\udfe2 Sisonke win signals business still competitive. \ud83d\udfe2 Top Employer SA 2025 retained.`,
    themes: [
      {
        theme: "5,000 Jobs at Risk — No Automatic Protection — Retrenchment Process Watch Continues",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty confirmed ~5,000 jobs at risk across AfroCentric Group and Medscheme. Momentum rejected the Section 197 LRA application. Sanlam's three commitments: identify internal redeployment, prioritise Medscheme staff at Momentum's 744 new roles, provide further details. No headcount guarantee given. With the handover completed 1 June and Medscheme's court case now withdrawn (16 July), staff face a clearer but still uncertain picture — the CMS's ongoing investigation adds continued reputational noise for the outgoing Medscheme team.",
        sources: [{ name: "News24", url: "https://www.news24.com/business/companies/bonitas-medscheme-drama-puts-5-000-jobs-at-risk-says-sanlam-ceo-20260312-1095", date: "12 Mar 2026" }],
        representative_voice: "There are 5,000 people inside that business. It is a human tragedy because there could be massive job losses. — Paul Hanratty, Sanlam CEO",
      },
      {
        theme: "Momentum Hiring 744 — Medscheme Staff Being Prioritised",
        sentiment: "CAUTIOUS",
        what: "Momentum is hiring 744 staff for the Bonitas transition. Sanlam confirmed Medscheme staff applications will be prioritised. In practice, 744 roles represent approximately 15% of the 5,000 at risk — the majority face redeployment or retrenchment.",
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
        what: "AfroCentric Group retained its Top Employer South Africa 2025 certification. LinkedIn engagement reflects continued pride in clinical and technology work. These markers remain intact even as the workforce navigates its most uncertain period.",
        sources: [{ name: "Top Employers Institute", url: "https://www.top-employers.com" }],
        representative_voice: "Maintaining Top Employer status in the middle of a 5,000-job crisis reflects something real about the organisational culture — even if the structural situation is dire.",
      },
    ],
    topVoices: [
      { type: "Sanlam CEO", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
      { type: "Employee (public forum)", sentiment: "mixed", quote: "Some people are updating their CVs. Others are waiting to see what redeployment looks like. The uncertainty is the hardest part." },
    ],
    watchPoints: [
      "\ud83d\udfe2 1 June 2026 — Bonitas handover COMPLETED; retrenchment announcements and S189 processes possible in coming months",
      "🔴 16 Jul — Medscheme court withdrawal — regulatory (CMS) process continues; reputational impact on outgoing teams remains a watch item",
      "Sanlam redeployment plan — further detail promised, not yet delivered",
      "Momentum 744 hiring — are Medscheme staff being prioritised in practice?",
      "Section 197 LRA — can Sanlam pursue via court? Watch for challenge",
      "AfroCentric Technologies talent — senior tech staff may be approached by competitors",
    ],
    sourceCount: 13,
  },

  // ─── COMPETITOR INTEL ─────────────────────────────────────────────────────
  competitors: {
    overallSentiment: "MIXED", sentimentScore: 55, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: `🔴 16 JUL — Medscheme WITHDRAWS its High Court case against Bonitas — CMS forensic (Section 44) investigation is now the only live process; no finding against any party. \ud83d\udfe2 6 JUL — BHF Titanium Awards Gala held (CTICC); BestMed won 2 categories. \ud83d\udfe2 Lenacapavir LAUNCHED 5 JUNE 2026; SA 9th African country. \ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9%, dividend 44c (+22.2%); Da Costa CEO Designate from 1 June. \ud83d\udd34 18 MAY — NFO ruled against Discovery Life on cancer SIB claim. \ud83d\udd34 18 MAY — ConCourt struck down Certificate of Need (Sections 36–40); main NHI case still reserved, possibly to early 2027. \ud83d\udfe2 Discovery H1 FY2026: NHE +27% to R5.75bn — record results. \ud83d\udd34 Sizwe Hosmed — curator Ian Fleming; solvency now compliant; amalgamation being explored. \ud83d\udfe2 Fedhealth+Sanlam 'Built Different' live Jan 2026; BestMed 6.8% lowest open scheme increase. ✅ CMS Indaba CONCLUDED.`,
    themes: [
      {
        theme: "🔴 16 JULY — Medscheme Withdraws Bonitas Court Case; Momentum/PHA/Bonitas Left Standing Without a Court Test of Either Side's Claims",
        sentiment: "CAUTIOUS",
        competitor: "Momentum",
        what: "Medscheme has withdrawn its High Court application against Bonitas, which had sought to interdict Bonitas's 2025 RFP awards to Momentum (administration) and PHA (managed care) pending a CMS forensic investigation into earlier procurement decisions. For Momentum and PHA, this removes a lingering legal cloud over the validity of their contracts — though it is a procedural win rather than a vindication, since none of Medscheme's allegations were tested and disproven; they were simply not pursued to judgment. Bonitas's position — that the 2025 tenders are unrelated to the 2022/2024 contracts under CMS scrutiny — likewise remains untested. The CMS's Section 44 forensic investigation is now the only mechanism left to establish what, if anything, went wrong in the earlier procurement decisions.",
        sources: [
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-07-16-medscheme-drops-bonitas-court-fight-clearing-path-for-regulators-forensic-tender-investigation/", date: "16 Jul 2026" },
        ],
        representative_voice: "Medscheme's withdrawal means the interdict application will no longer determine the dispute. Bonitas's rebuttal has also not been tested through a substantive court hearing. — Daily Maverick, 16 July 2026",
      },
      {
        theme: "\ud83d\udfe2 6 JUL — BHF Titanium Awards Gala Held at CTICC; BestMed Wins 2 Categories",
        sentiment: "POSITIVE",
        competitor: "BestMed",
        what: "The 11th Annual BHF Titanium Awards Gala Banquet was held 6 July 2026 at the CTICC, as part of the 25th Annual BHF Conference (4–8 July). BestMed Medical Scheme won Excellence in Creating Access to Quality Healthcare (its fourth time winning this category, having previously won in 2020, 2022 and 2023) plus Service to Membership (Category A: open/closed/self-administered schemes, administrators and MCOs) — citing its sponsorship of Unjani Clinic Health Pods in the Western Cape and Free State. No confirmed AfroCentric/Medscheme win has surfaced in coverage of this year's awards.",
        sources: [
          { name: "Cover Magazine", url: "https://www.cover.co.za/news/bestmed-medical-scheme-recognised-at-board-of-healthcare-funders-titanium-awards", date: "6 Jul 2026" },
        ],
        representative_voice: "Bestmed's sponsorship of two Unjani Clinic Health Pods... have made a positive impact in underserviced areas. — Karen Pienaar, Bestmed Sponsorship and CSI Specialist, July 2026",
      },
      {
        theme: "\ud83d\udfe2 25 MAY — Netcare H1 2026: HEPS +21.9%, Revenue R13.3bn, Dividend 44c (+22.2%) — AND AI/Wearable Wards Pilot",
        sentiment: "POSITIVE",
        competitor: "Netcare",
        what: "Netcare H1 FY2026 (25 May): revenue +4.8% to R13.3bn; normalised EBITDA +6.6% to R2.5bn (margin 18.8%); adjusted HEPS +21.9% to 71.7c; profit +11.9% to R924m; interim dividend 44c (+22.2%). Digital strategy generated R705m in cumulative savings since 2022. Melanie Da Costa became CEO Designate on 1 June 2026, taking over 1 January 2027 from Dr Richard Friedland. Netcare is piloting clinical-grade wearable monitoring (Corsano Health) in general wards. Separately, Netcare's Quro Medical hospital-at-home partnership (55.88% stake) has been scaling nationally.",
        sources: [
          { name: "Moneyweb — H1 2026 results", url: "https://www.moneyweb.co.za/news/companies-and-deals/netcare-boosts-earnings-as-digital-strategy-delivers-meaningful-dividend/", date: "25 May 2026" },
        ],
        representative_voice: "You are getting an ICU experience in a general ward and it is effortless — all you have to do is wear a watch. — Dr Richard Friedland, Netcare CEO, 25 May 2026",
      },
      {
        theme: "\ud83d\udd34 MAY 2026 — National Financial Ombud Rules AGAINST Discovery Life in Cancer SIB Claim",
        sentiment: "NEGATIVE",
        competitor: "Discovery",
        what: "The National Financial Ombud Scheme (NFO) ruled on 18 May 2026 in favour of a cancer patient in a Severe Illness Benefit (SIB) dispute with Discovery Life. Discovery had argued the life-changing event occurred on the date of histological confirmation — a day when premiums had lapsed. Lead Ombud Denise Gabriels rejected this technical defence as unsupported by the policy wording. The ruling is precedent-setting for SIB claims sector-wide.",
        sources: [{ name: "IOL", url: "https://iol.co.za/news/south-africa/2026-05-18-cancer-claim-dispute-how-discovery-lifes-technical-defence-failed/", date: "18 May 2026" }],
        representative_voice: "Discovery Life has yet to point to the provision in the policy which stipulates that a life-changing event is deemed to have occurred on the date medical confirmation of a covered condition has been received. — Lead Ombud Denise Gabriels, NFO, 18 May 2026",
      },
      {
        theme: "\ud83d\udfe2 Discovery Holdings H1 FY2026 — Record Results: NHE +27% to R5.75bn, Dividend 111c",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery Holdings (JSE:DSY) reported record interim results for H1 FY2026 (six months to December 2025) on 4 March 2026. Normalised headline earnings +27% to R5.75bn. Interim dividend 111c/share (+27%). Discovery Bank swung to profitability. Five-year target: 15–20% annual normalised profit growth — Group tracking ahead.",
        sources: [{ name: "FX Leaders", url: "https://www.fxleaders.com/news/2026/03/04/discovery-delivers-record-earnings-posts-29-profit-surge-as-share-price-jse-trades-at-record-levels/", date: "4 Mar 2026" }],
        representative_voice: "We have emerged from our cycle of significant investment — years of building platforms are now translating into tangible financial returns. — Adrian Gore, Discovery CEO, 4 March 2026",
      },
      {
        theme: "Momentum Health — Market Share 22%→30% LIVE (from 1 June); NHE +8% to R3.7bn",
        sentiment: "POSITIVE",
        competitor: "Momentum",
        what: `1 JUNE: Bonitas handover to Momentum WENT LIVE — 750,000+ members. With Medscheme's court case now withdrawn (16 July), Momentum's contract stands without a pending legal challenge, though the underlying CMS investigation into the earlier procurement decisions continues. Momentum Health is the defining competitive winner of 2026 — R100m+ budget, 744 new hires, 22 walk-in centres. H1 FY2026 (Momentum Group): NHE +8% to R3.695bn, HEPS +13% to 274.4c, interim dividend 110c (+29%), ROE 24% vs 20% target.`,
        sources: [{ name: "BusinessTech", url: "https://businesstech.co.za/news/business/854369/end-of-an-era-for-one-of-the-biggest-medical-aids-in-south-africa-after-43-years/", date: "19 Mar 2026" }],
        representative_voice: "This deal adds more than 750,000 beneficiaries under our administration, bringing the Group's health beneficiaries in Africa to over 3.3 million. — Hannes Viljoen, Momentum Health CEO",
      },
      {
        theme: "\ud83d\udd34 PHA (Private Health Administrators) — Bonitas Managed Care Live Since 1 June; CMS Section 44 Investigation Now the Central Question",
        sentiment: "CAUTIOUS",
        competitor: "PHA",
        what: "From 1 June 2026, Private Health Administrators (PHA) took over all managed care functions for Bonitas. With Medscheme's High Court case withdrawn (16 July), the immediate legal threat to PHA's contract has lifted, but the CMS's Section 44 investigation into PHA's earlier 2022 BonCap appointment (and the question of any links to former AfroCentric executives) remains active and unresolved. PHA CEO Dr Ayanda Mbuli sits on the BHF board.",
        sources: [
          { name: "Moonstone — PHA handover", url: "https://www.moonstone.co.za/pha-lays-out-its-case-as-bonitas-managed-care-handover-nears/", date: "May 2026" },
          { name: "Daily Maverick — withdrawal", url: "https://www.dailymaverick.co.za/article/2026-07-16-medscheme-drops-bonitas-court-fight-clearing-path-for-regulators-forensic-tender-investigation/", date: "16 Jul 2026" },
        ],
        representative_voice: "PHA had previously provided administration and managed-care services to other medical schemes, had been inspected and accredited by the CMS, and had its Bonitas administration agreement reviewed by the regulator. — Bonitas PO Lee Callakoppen, via Daily Maverick, 16 July 2026",
      },
      {
        theme: "BestMed — 6.8% Lowest Open Scheme Increase; Now Also 2026 Titanium Award Double-Winner",
        sentiment: "POSITIVE",
        competitor: "BestMed",
        what: "BestMed implemented the sector's lowest 2026 open scheme contribution increase at 6.8%. Principal membership has grown 28% over five years. It has now also won two Titanium Awards at the 6 July 2026 BHF gala — Excellence in Creating Access to Quality Healthcare and Service to Membership (Category A) — reinforcing a strong 2026 for the scheme on both cost and reputation.",
        sources: [{ name: "IOL", url: "https://iol.co.za/personal-finance/financial-planning/2025-10-29-2026-medical-scheme-contribution-increases-relief-for-members-after-a-year-of-sharp-hikes/", date: "Oct 2025" }, { name: "Cover Magazine", url: "https://www.cover.co.za/news/bestmed-medical-scheme-recognised-at-board-of-healthcare-funders-titanium-awards", date: "6 Jul 2026" }],
        representative_voice: "Healthcare inflation remains one of the biggest challenges facing households. Our responsibility is to safeguard the depth of benefits while ensuring contributions remain competitive. — Leo Dlamini, BestMed CEO",
      },
      {
        theme: "🔴 Medihelp — Solvency Below Statutory Minimum; 8.46% Increase; New Co-Payment Rule",
        sentiment: "CAUTIOUS",
        competitor: "Medihelp",
        what: "Medihelp's 2026 weighted average increase is 8.46%. For the second consecutive year, Medihelp failed to maintain the required 25% statutory solvency ratio as of mid-2025. New 2026 rule: only the highest procedure-specific co-payment per admission applies.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "This elevates Medihelp from simply allocating savings to actively empowering members to manage and grow their benefits. — Varsha Vala, Medihelp Principal Officer",
      },
      {
        theme: "🔴 Fedhealth + Medshield AMALGAMATION Announced — Combined: Top-4 Open Scheme, 250,000 Beneficiaries",
        sentiment: "POSITIVE",
        competitor: "Fedhealth",
        what: "Fedhealth and Medshield have announced plans to amalgamate (subject to CMS/regulatory approval). Combined: 135,000+ principal members, 250,000 beneficiaries, R3.3bn reserves, projected solvency 36.9%. Strategic significance for Medscheme: Fedhealth is a Medscheme administration client — the amalgamated entity's administrator choice is a critical contract watch item.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "Together we're turning the concept of medical aid on its head — building something transparent, trustworthy, affordable and straightforward. — Jeremy Yatt, Fedhealth Principal Officer",
      },
      {
        theme: "\ud83d\udd34 Sizwe Hosmed — Curator Ian Fleming; Solvency Now Compliant; Amalgamation Being Explored",
        sentiment: "NEGATIVE",
        competitor: "Sizwe Hosmed",
        what: "Sizwe Hosmed remains under curatorship. Curator Ian Fleming reported solvency improving from 5% (September 2025) to 30% (April 2026 update) — above the 25% statutory minimum. TFS Africa Forensics identified potential duplicate claims exceeding R522m. Amalgamation with a stronger scheme is actively being explored.",
        sources: [{ name: "Sizwe Hosmed", url: "https://sizwehosmed.co.za/curator-update/", date: "Apr 2026" }],
        representative_voice: "The scheme's financial position continues to strengthen. As at the date of this update, the scheme complies with the regulatory requirements. — Curator Ian Fleming, April 2026",
      },
      {
        theme: "GEMS 9.8% (Below 21% Market Estimate); Polmed — Both Medscheme's Most Strategic Remaining Contracts",
        sentiment: "CAUTIOUS",
        competitor: "GEMS & Polmed",
        what: "GEMS, administered by Medscheme, implemented a 9.8% increase for 2026 — significantly below the 21% market estimate. With Bonitas now exited, GEMS and Polmed become the most strategically critical contracts on Medscheme's book.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "GEMS at 9.8% vs 21% market estimate is extraordinary cost discipline at scale.",
      },
      {
        theme: "\ud83d\udd34 18 MAY — ConCourt Strikes Down Certificate of Need — Sector-Wide Implications; Main NHI Case Still Reserved",
        sentiment: "NEGATIVE",
        competitor: "Sector-Wide",
        what: "The Constitutional Court unanimously struck down Sections 36–40 of the National Health Act on 18 May 2026, removing a threat to private healthcare expansion for hospital groups and administrators. This is separate from the still-reserved main NHI Act challenge (BHF/Western Cape), which as at 7 July 2026 commentary suggests could take until early 2027 to be decided.",
        sources: [
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-24-its-back-to-the-drawing-board-after-concourts-nhi-judgment/", date: "24 May 2026" },
          { name: "TimesLive/Bhekisisa", url: "https://www.timeslive.co.za/news/south-africa/2026-07-07-why-you-can-trust-the-concourts-nhi-ruling-whichever-way-it-goes/", date: "7 Jul 2026" },
        ],
        representative_voice: "One of the NHI's central pillars has collapsed today. — Solidarity, 18 May 2026",
      },
      {
        theme: "Discovery Health Medical Scheme — 7.2% Increase (Effective 5.4%), Active Smart 22,000 Lives",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "DHMS weighted average 7.2% for 2026, deferred to 1 April (effective annual rate 5.4% — the lowest among big-five). Active Smart plan: R1,350/month, 0% increase, 22,000 lives, 80%+ under 40. DHMS manages ~39% of total SA medical scheme membership.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "By deferring the 2026 contribution increase to 1 April, the scheme provides significant financial relief while continuing to deliver industry-leading healthcare benefits. — Dr Ron Whelan, Discovery Health CEO",
      },
      {
        theme: "✅ Evergreen Contracts & Governance — Sector Changed Permanently",
        sentiment: "CAUTIOUS",
        competitor: "Sector-Wide",
        what: "The Bonitas-Medscheme dispute — even withdrawn rather than decided — has permanently changed how the sector views long-term administration contracts. CMS Circular 10 of 2026 is now fully in effect for all administrators. Medscheme's remaining contracts (GEMS, Polmed) are now under implicit scrutiny.",
        sources: [{ name: "CMS", url: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", date: "17 Mar 2026" }],
        representative_voice: "Every long-term administration contract in SA is now under implicit review. The Bonitas case has permanently changed the governance landscape — even without a court ruling on the merits.",
      },
    ],
    topVoices: [
      { type: "Daily Maverick (16 Jul)", sentiment: "cautious", quote: "Medscheme's decision to withdraw its lawsuit against Bonitas hands the baton back to the regulator to investigate allegations of tender manipulation and conflicts of interest." },
      { type: "Bonitas PO Callakoppen (via DM, 16 Jul)", sentiment: "cautious", quote: "There was no link between the earlier tenders under regulatory scrutiny and the new contracts Medscheme sought to interdict." },
      { type: "Netcare H1 2026 Results (25 May)", sentiment: "positive", quote: "Adjusted HEPS +21.9% to 71.7c; interim dividend 44c (+22.2%); digitisation generating a meaningful dividend." },
      { type: "NFO Lead Ombud Gabriels (18 May)", sentiment: "negative", quote: "Discovery Life has yet to point to the provision in the policy which stipulates when a life-changing event is deemed to have occurred." },
      { type: "Sizwe Hosmed Curator Fleming (Apr 2026)", sentiment: "cautious", quote: "The scheme's financial position continues to strengthen. As at the date of this update, the scheme complies with the regulatory requirements." },
    ],
    watchPoints: [
      `🔴 ${TODAY_SHORT.toUpperCase()} — Medscheme's Bonitas court withdrawal (16 Jul) is the top story; CMS Section 44 investigation now the only live process`,
      "\ud83d\udfe2 6 Jul — BHF Titanium Awards gala held; BestMed won 2 categories; no confirmed AfroCentric/Medscheme win",
      "🔴 Fedhealth + Medshield amalgamation announced (regulatory approval pending) — Fedhealth is a Medscheme client; administrator decision for combined entity is a critical watch",
      "🔴 Medihelp solvency — below the 25% statutory minimum; scheme under pressure",
      "\ud83d\udfe2 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, dividend 44c (+22.2%)",
      "\ud83d\udd34 PHA — managed care live 1 June; CMS Section 44 probe now the sole open question after Medscheme's withdrawal",
      "\ud83d\udd34 18 MAY — ConCourt struck down Certificate of Need (Sections 36–40 National Health Act)",
      "⚖️ Main NHI ConCourt case still reserved — commentary suggests possibly not until early 2027",
      "\ud83d\udd34 18 MAY — NFO rules against Discovery Life — sector-wide SIB policy wording review likely",
      "🟢 Lenacapavir LAUNCHED 5 JUNE 2026 — Gauteng rollout ongoing; managed care protocol updates required",
      "\ud83d\udfe2 Discovery H1 FY2026 record: NHE +27% to R5.75bn, interim dividend 111c",
      "GEMS and Polmed renewals — most strategic contracts remaining on Medscheme's book",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 in full effect",
    ],
    sourceCount: 95,
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
  "Cover Magazine":         "https://www.cover.co.za",
  "Politicsweb":            "https://www.politicsweb.co.za",
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
    { title: "🔴 Medscheme WITHDRAWS High Court Application — CMS Section 44 Forensic Investigation Now Sole Live Process", link: "https://www.dailymaverick.co.za/article/2026-07-16-medscheme-drops-bonitas-court-fight-clearing-path-for-regulators-forensic-tender-investigation/", pubDate: "16 Jul 2026", description: "Medscheme has withdrawn its High Court application against Bonitas Medical Fund, clearing the way for the CMS to proceed with its forensic (Section 44) investigation into allegations of improper procurement and conflicts of interest around Bonitas's 2022 and 2024 contract awards. No finding of wrongdoing has been made against any party.", source: "CMS / Daily Maverick", publisher: "Council for Medical Schemes", category: "CMS Investigation" },
    { title: "✅ CMS Industry Indaba 2026 — CONCLUDED (13-14 May, Sandton) — Circular 10 Directives Fully Operational", link: "https://www.medicalschemes.co.za/registration-for-the-2026-cms-industry-indaba-is-now-open/", pubDate: "14 May 2026", description: "The CMS Industry Indaba 2026 concluded 13–14 May at the Sandton Convention Centre. Circular 10 of 2026 — immediate directives on fraud, waste and abuse, transitional measures and sector-wide corrections — is now in full effect for all administrators including Medscheme. FASR submission deadline: 29 May — PASSED.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Indaba" },
    { title: "✅ FASR 29 MAY 2026 — Deadline PASSED; Financial Annual Statutory Returns Submitted", link: "https://www.medicalschemes.co.za/latest-publication/circular-13-of-2026-financial-annual-statutory-returns-for-the-financial-year-ended-31-december-2025/", pubDate: "16 Apr 2026", description: "The CMS has finalised the 2025 FASR online system. Electronic submission via the statutory return portal was due 29 May 2026 — PASSED. Critical compliance date for all medical scheme administrators including Medscheme.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "\ud83c\udd95 Circular 14 of 2026: PMB Definition Guideline Development — Clinical Advisory Committee Nominations Open", link: "https://www.medicalschemes.co.za/", pubDate: "May 2026", description: "The CMS has published Circular 14 of 2026 on the development of a PMB Definition Guideline. Stakeholders invited to nominate experts for the Clinical Advisory Committee (CAC).", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 12 of 2026: Notification of Registration of Medical Schemes", link: "https://www.medicalschemes.co.za/latest-publication/circular-12-of-2026-notification-of-registration-of-medical-schemes/", pubDate: "Mar 2026", description: "CMS confirms the publication of the list of medical schemes registered for 2026, as detailed in Government Gazette Notice No. 54417.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 10 of 2026: Section 59 Final Investigation Report — Immediate Directives (NOW FULLY IN EFFECT)", link: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", pubDate: "17 Mar 2026", description: "CMS communicates immediate regulatory expectations following the Section 59 Investigation Report. Now fully in effect for all medical scheme administrators following the Indaba (13-14 May). Affects Medscheme and all administrators on contract benchmarking obligations.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Investigation" },
    { title: "Circular 9 of 2026: Financial Annual Statutory Returns for 2025 — Submission Date 29 May 2026 (PASSED)", link: "https://www.medicalschemes.co.za/latest-publication/circular-9-of-2026-financial-annual-statutory-returns-for-2025/", pubDate: "13 Mar 2026", description: "Update on the expected go-live and submission dates for the 2025 FASR. Submission date: 29 May 2026 — PASSED.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 7 of 2026: Categorisation of Assets (Regulation 30, Medical Schemes Act)", link: "https://www.medicalschemes.co.za/latest-publication/circular-7-of-2026-categorisation-of-assets-in-terms-of-annexure-b-to-the-regulations-of-the-medical-schemes-act/", pubDate: "2 Mar 2026", description: "CMS publishes guidelines on categorising assets in terms of Regulation 30 of the Medical Schemes Act.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 2 of 2026: Broker Fee Adjustment — R125.86/month plus VAT from 1 January 2026", link: "https://www.medicalschemes.co.za/latest-publication/circular-2-of-2026-adjustment-of-fees-payable-to-brokers-with-effect-from-1-january-2026/", pubDate: "29 Jan 2026", description: "Maximum broker fees adjusted to R125.86 per month plus VAT, effective 1 January 2026.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
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
  { id: "PHA",          label: "PHA",                icon: "\ud83d\udfe1", color: "#B02040" },
  { id: "BestMed",      label: "BestMed",            icon: "\ud83d\udd35", color: "#E03050" },
  { id: "Medihelp",     label: "Medihelp",           icon: "\ud83d\udd35", color: "#9B6DFF" },
  { id: "Fedhealth",    label: "Fedhealth",          icon: "\ud83d\udd35", color: "#FF8C00" },
  { id: "Sizwe Hosmed", label: "Sizwe Hosmed",       icon: "\ud83d\udd34", color: "#C00021" },
  { id: "GEMS & Polmed",label: "GEMS & Polmed",      icon: "\ud83d\udd35", color: "#2E86AB" },
  { id: "Sector-Wide",    label: "Sector-Wide",       icon: "⚖️", color: "#D4A017" },
  { id: "Life Healthcare", label: "Life Healthcare",   icon: "⚡", color: "#1A6ED4" },
  { id: "Mediclinic",      label: "Mediclinic",        icon: "\ud83d\udd35", color: "#5C6BC0" },
  { id: "Medshield",       label: "Medshield",         icon: "\ud83d\udd35", color: "#20639B" },
  { id: "Bonitas",         label: "Bonitas",           icon: "\ud83d\udfe1", color: "#D4A017" },
];

const COMPETITOR_CARDS = [
  { id: "Netcare",       label: "Netcare",        metric: "Adj. HEPS +21.9%", sub: "Revenue R13.3bn · Div 44c",       sentiment: "POSITIVE",  note: "H1 2026 25 May; Da Costa CEO Designate 1 Jun" },
  { id: "Discovery",     label: "Discovery",      metric: "NHE +27% R5.75bn", sub: "Record H1 · Bank profitable",     sentiment: "POSITIVE",  note: "NFO SIB ruling vs Discovery Life (18 May)" },
  { id: "Momentum",      label: "Momentum",       metric: "22%→30% share",    sub: "NHE +8% R3.7bn · ROE 24%",       sentiment: "POSITIVE",  note: "\ud83d\udfe2 Court case against contract withdrawn 16 Jul" },
  { id: "PHA",           label: "PHA",            metric: "Managed care live", sub: "1 June 2026 · BonCap since 2020", sentiment: "CAUTIOUS",  note: "Court threat lifted 16 Jul; CMS Section 44 probe continues" },
  { id: "BestMed",       label: "BestMed",        metric: "6.8% — lowest",    sub: "+ 2 Titanium Awards (6 Jul)",     sentiment: "POSITIVE",  note: "Strong 2026 on cost and reputation" },
  { id: "Medihelp",      label: "Medihelp",       metric: "8.46% increase",   sub: "Solvency below 25% (2025)",       sentiment: "CAUTIOUS",  note: "New single co-payment rule" },
  { id: "Fedhealth",     label: "Fedhealth",      metric: "9.6% increase",    sub: "7,800 Sanlam staff · 32 clinics", sentiment: "POSITIVE",  note: "'Built Different' live Jan 2026" },
  { id: "Sizwe Hosmed",  label: "Sizwe Hosmed",   metric: "Solvency compliant",     sub: "Apr 2026 update · Curator Fleming",    sentiment: "NEGATIVE",  note: "R522m+ duplicate claims flagged; amalgamation" },
  { id: "GEMS & Polmed",  label: "GEMS & Polmed",   metric: "9.8% GEMS",         sub: "vs 21% market estimate",           sentiment: "CAUTIOUS",  note: "Most critical Medscheme contracts post-Bonitas" },
  { id: "Life Healthcare", label: "Life Healthcare", metric: "HEPS +19% to 55.1c", sub: "Revenue R12.4bn (+2.4%) · 28 May",  sentiment: "POSITIVE",  note: "Below plan — Sizwe Hosmed hurt patient days" },
  { id: "Mediclinic",      label: "Mediclinic",      metric: "Remgro-owned",      sub: "SA + Switzerland + UAE",            sentiment: "POSITIVE",  note: "CoN ruling removes expansion threat" },
  { id: "Medshield",       label: "Medshield",       metric: "7.5% increase",     sub: "AA rating · 250,000 lives",         sentiment: "POSITIVE",  note: "Fedhealth amalgamation announced" },
  { id: "Bonitas",         label: "Bonitas",         metric: "Court case withdrawn", sub: "16 Jul — Medscheme drops case",   sentiment: "CAUTIOUS", note: "CMS Section 44 probe now sole live process" },
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