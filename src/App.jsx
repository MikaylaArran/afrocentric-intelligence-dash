import { useState, useEffect, createContext, useContext } from "react";

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
    oneLiner: "18 days to Bonitas handover (1 June). ⚡ CMS Industry Indaba Day 2 UNDERWAY TODAY (14 May, Sandton) — sustainability, value-based care & strategic purchasing on agenda. 🔴 Phala Phala: Ramaphosa files judicial review of Section 89 Ngcobo panel report (announced 11 May); Parliament forming impeachment committee per ConCourt order (8 May). 🔴 Motsoaledi questions ConCourt judges' impartiality (13 May) — DA threatening Ramaphosa question. 🟢 Lenacapavir HIV shot launch set for 5 June Mpumalanga — stocks hitting 360 facilities. NHI ConCourt: judgment reserved (7 May). Medscheme wins Sisonke mandate. ACT.JO ~115 ZAC (all-time low 61 ZAC, 20 Mar). AGM held 11 May. R1.27bn basic loss. 5,000 jobs at risk.",
    themes: [
      {
        theme: "⚡ CMS Industry Indaba Day 2 TODAY (14 May) — Sustainability, Value-Based Care & Strategic Purchasing",
        sentiment: "CAUTIOUS",
        what: "The CMS Industry Indaba 2026 concludes TODAY (Day 2, 14 May) at the Sandton Convention Centre. Day 2 focuses on sustainability, innovation, value-based care and strategic purchasing. Day 1 yesterday (13 May) saw Health Minister Motsoaledi deliver the keynote on Section 59 Reform and Circular 10 implementation directives. Retired Chief Justice Sandile Ngcobo — who chaired the Health Market Inquiry (2014–2019) and the Phala Phala Section 89 panel (2022) — delivered a keynote on Regulation, Fairness and Sustainability. Last night's Gala Dinner was the sector's flagship black-tie event. The Indaba marks the culmination of the Section 59 investigation and the shift from regulatory findings to implementation framework — with immediate directives from Circular 10 of 2026 now in effect.",
        sources: [{ name: "CMS", url: "https://www.medicalschemes.co.za/minister-of-health-to-deliver-keynote-at-cms-industry-indaba-2026/", date: "23 Mar 2026" }, { name: "CMS", url: "https://www.medicalschemes.co.za/cms-industry-indaba-2026-preliminary-programme-release-gala-dinner-info/", date: "Apr 2026" }],
        representative_voice: "This is where the industry moves from discussion to direction — from regulatory findings to practical frameworks, and from policy intent to implementation. — CMS",
      },
      {
        theme: "🔴 Motsoaledi Questions ConCourt Judges' Impartiality on NHI (13 May)",
        sentiment: "NEGATIVE",
        what: "Health Minister Motsoaledi publicly questioned whether Constitutional Court judges could be impartial on the NHI challenge, saying he wished judges would 'become sober about universal health coverage' — suggesting judges are 'beneficiaries' of the same private healthcare system he seeks to dismantle via NHI. He noted judges are members of Parmed Medical Scheme. The DA's Karl le Roux hit back, calling on Motsoaledi to instead remove Section 33 of the NHI Act and reform the private healthcare sector. The DA said it will submit a question to President Ramaphosa asking whether Motsoaledi's conduct meets executive ethics standards. This follows the ConCourt reserving judgment in the NHI public participation challenge on 7 May — no ruling date has been set.",
        sources: [{ name: "News24", url: "https://www.news24.com/southafrica/health-news/be-sober-motsoaledi-queries-judges-nhi-impartiality-over-their-state-paid-medical-aid-20260512-1170", date: "13 May 2026" }, { name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" }],
        representative_voice: "Instead of questioning the impartiality of the judges on the Constitutional Court, why don't you remove Section 33 of the NHI Act and reform the private health care sector? — Karl le Roux, DA",
      },
      {
        theme: "🟢 Lenacapavir HIV Prevention Shot — Stocks Deploying, Launch 5 June (Mpumalanga)",
        sentiment: "POSITIVE",
        what: "In his 14 May budget vote speech, Health Minister Motsoaledi announced that lenacapavir — a twice-yearly HIV prevention injection with near-100% efficacy — will launch officially on 5 June 2026 in Mpumalanga. Stocks are already being delivered to 360 high-burden health facilities in the next two weeks. Priority populations: adolescent girls and young women (up to 24), pregnant and breastfeeding mothers, female sex workers, MSM, transgender people and injecting drug users. Motsoaledi: 'We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030.' This is a significant public health milestone and directly relevant to AfroCentric Group's HIV-management portfolio (Aid for AIDS, Pharmacy Direct's CCMDD book, Scriptpharm).",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" }, { name: "SAnews", url: "https://www.sanews.gov.za/south-africa/groundbreaking-hiv-drug-lenacapavir-be-launched-next-month", date: "14 May 2026" }],
        representative_voice: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. All we have to do is work hard together as South Africans. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "🔴 Phala Phala ESCALATION — Ramaphosa Files Judicial Review (11 May), Impeachment Committee Forming",
        sentiment: "CAUTIOUS",
        what: "Announced 11 May: Ramaphosa will not resign and is taking the Section 89 Ngcobo panel report on judicial review, citing 'grave errors of law'. The ConCourt had ruled on 8 May (EFF & ATM case) that Parliament must constitute an impeachment committee and that Rule 129I of NA rules was unconstitutional. Speaker Thoko Didiza outlined six steps, including tabling the report and forming the committee. Experts warn Ramaphosa's review bid will be 'difficult' — courts are reluctant to interfere in parliamentary accountability processes at a preliminary stage. The Presidency insists the review does not stop Parliament proceeding. Political crisis deepens and significantly distracts from the NHI and health reform agenda.",
        sources: [{ name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-11-ramaphosa-bets-on-legal-review-to-stall-phala-phala-impeachment-proceedings/", date: "11 May 2026" }, { name: "EWN", url: "https://www.ewn.co.za/2026/05/12/phala-phala-report-review-ramaphosa-not-interrupting-parliament-s-process-presidency", date: "12 May 2026" }, { name: "IOL", url: "https://iol.co.za/news/politics/2026-05-13-ramaphosa-to-face-uphill-battle-in-phala-phala-review-bid-experts-warn/", date: "13 May 2026" }],
        representative_voice: "I remain here; I will not resign. — President Ramaphosa, 11 May 2026. / It would likely be difficult. Courts are generally cautious about interfering in parliamentary accountability procedures. — Dr Shadi Maganoe, Wits Law",
      },
      {
        theme: "🟢 Medscheme Wins Sisonke Health Mandate — Competitive Tender, Live from 1 May 2026",
        sentiment: "POSITIVE",
        what: "Medscheme secured the administration and managed care mandate for Sisonke Health Medical Scheme from 1 May 2026, selected across all categories in a competitive tender. Sisonke Health (formed from the Sisonke/Lonmin Medical Scheme amalgamation, 1 April 2025) covers employees of Sibanye-Stillwater, Gold Fields, and DRD Gold. A meaningful counterpoint to the Bonitas crisis: it shows Medscheme can still win new business through proper procurement and implementation in the middle of its most difficult period.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" }],
        representative_voice: "The Sisonke mandate provides Medscheme with an important foothold as it works to stabilise its position in a consolidating market. — Moonstone",
      },
      {
        theme: "Bonitas Transition — 18 Days to Handover, Momentum R100m+ Investment",
        sentiment: "NEGATIVE",
        what: "18 days remain until Bonitas formally transfers to Momentum Health on 1 June. Momentum has committed R100m+, hired 744 staff, established 22 walk-in centres and refurbished its Sandton offices. CEO Jeanette Marais: 'I doubt there is any chance this is going to be stopped by the court before we move 750,000 members to our back office on 1 June.' Medscheme's urgent court application was removed from the roll on 3 March — found frivolous and not ready. Fraudulent documents allegation (FACTS Consulting forensic evidence of altered PHA documents) remains unresolved. Bonitas members worried about monthly vs Medscheme's weekly payment runs.",
        sources: [{ name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" }, { name: "BusinessTech", url: "https://businesstech.co.za/news/business/854369/end-of-an-era-for-one-of-the-biggest-medical-aids-in-south-africa-after-43-years/", date: "Mar 2026" }],
        representative_voice: "Being selected as the preferred healthcare administration partner for Bonitas affirms our leadership. It is the biggest transfer of a medical scheme from one provider to another in the history of South Africa. — Jeanette Marais, Momentum CEO",
      },
      {
        theme: "5,000 Jobs at Risk — Section 197 LRA Rejected, No Automatic Protection",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty confirmed approximately 5,000 jobs at risk across AfroCentric Group and Medscheme. Momentum rejected Sanlam's Section 197 LRA application — which would have automatically transferred Medscheme staff — 'in spite of legal precedent'. Sanlam's commitments: internal redeployment search, priority applications at Momentum's 744 new roles. No headcount guarantee given. Staff in Bonitas-dedicated teams face the highest risk with 18 days remaining.",
        sources: [{ name: "News24", url: "https://www.news24.com/business/companies/bonitas-medscheme-drama-puts-5-000-jobs-at-risk-says-sanlam-ceo-20260312-1095", date: "12 Mar 2026" }, { name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" }],
        representative_voice: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses. — Paul Hanratty, Sanlam CEO",
      },
      {
        theme: "FY2025 Results — R1.27bn Basic Loss, No Dividend, Revenue Cliff in 18 Days",
        sentiment: "NEGATIVE",
        what: "AfroCentric Group reported FY2025 results on 3–4 March 2026: revenue surged 93.9% to R7.3bn but a R1.59bn impairment charge (Activo, ADS Group, Wellworx disposals) pushed the group to a R1.27bn basic loss (151.55c/share). Headline earnings recovered to R117.1m (13.92c/share). No dividend declared. Bonitas contributes ~40% of Medscheme's administration income — that revenue cliff arrives in 18 days. AGM held 11 May. H1 2026 interim results SENS scheduled 1 September 2026. ACT.JO ~115 ZAC (all-time low 61 ZAC, 20 March 2026), 52-week range 61–180 ZAC.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/", date: "4 Mar 2026" }],
        representative_voice: "The all-time low of 61 ZAC on 20 March tells the full story. The market priced in the Bonitas loss, impairments, and deep uncertainty about FY2026.",
      },
    ],
    topVoices: [
      { type: "Motsoaledi (NHI / Budget Vote)", sentiment: "negative", quote: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. [On ConCourt judges:] I wish judges would become sober about universal health coverage. — 14 May 2026" },
      { type: "Ramaphosa (Phala Phala)", sentiment: "negative", quote: "I remain here; I will not resign. I was advised by my legal team that the panel report is capable of being reviewed on grounds including grave errors of law and unfounded conclusions of fact. — 11 May 2026" },
      { type: "Sanlam CEO (Hanratty)", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
    ],
    watchPoints: [
      "⚡ TODAY — CMS Industry Indaba Day 2 (14 May) — sustainability, value-based care, strategic purchasing, Sandton Convention Centre",
      "⚡ 1 June 2026 — Bonitas handover to Momentum (18 days)",
      "⚡ 5 June 2026 — Lenacapavir HIV injection launch, Mpumalanga — stocks deploying to 360 facilities",
      "🔴 Motsoaledi questions ConCourt judges' impartiality (13 May) — DA challenging via Ramaphosa question",
      "🔴 Ramaphosa judicial review of Section 89 report — filed 11 May; could take up to a year, may run parallel to impeachment committee",
      "🔴 Parliament impeachment committee — being constituted per ConCourt order (8 May); EFF challenging review",
      "🟢 Sisonke mandate live 1 May — watch for further new business wins",
      "NHI ConCourt — judgment reserved 7 May, no date, could reshape entire sector",
      "ACT.JO — all-time low 61 ZAC (20 Mar 2026), 52-week range 61–180 ZAC, ~115 ZAC now — H1 results SENS 1 Sep",
      "Fraudulent documents — criminal referral to SAPS or NPA possible",
      "H1 2026 interim results — SENS 1 Sep 2026, presentation 2 Sep 2026",
    ],
    sourceCount: 32,
  },

  // ─── MEDSCHEME CHATTER ────────────────────────────────────────────────────
  medscheme: {
    overallSentiment: "NEGATIVE", sentimentScore: 24, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "18 days to handover. 🟢 Sisonke Health won via competitive tender from 1 May — proof Medscheme still wins. Momentum: R100m+, 744 hires, 22 walk-in centres, fully operational-ready. Section 197 rejected. Court stalled. Fraudulent documents allegation unresolved. GEMS and Polmed now the most critical contracts on the book. Members concerned about Momentum's monthly payment runs vs Medscheme's weekly. CMS Indaba Day 2 TODAY — governance reform on agenda.",
    themes: [
      {
        theme: "🟢 Sisonke Health Mandate Won — Competitive Tender, Live from 1 May 2026",
        sentiment: "POSITIVE",
        what: "Medscheme secured the administration and managed care mandate for Sisonke Health Medical Scheme from 1 May 2026, selected across all categories in a competitive tender. Sisonke Health (formed from the Sisonke/Lonmin Medical Scheme amalgamation, 1 April 2025) covers employees of Sibanye-Stillwater, Gold Fields, and DRD Gold. This is a meaningful counterpoint to the Bonitas narrative — it shows Medscheme can still win new business through proper procurement. Implementation planning is already underway.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" }],
        representative_voice: "The Sisonke mandate does not replace Bonitas in scale, but it provides Medscheme with an important foothold as it works to stabilise its position. — Moonstone",
      },
      {
        theme: "Bonitas Transition — 18 Days Away, Members Anxious About Momentum Service",
        sentiment: "NEGATIVE",
        what: "With 18 days to go, Bonitas members and healthcare providers are expressing concern about the switch. Key concerns: Momentum's monthly payment runs versus Medscheme's weekly runs; slower turnaround on claims; less responsive escalation processes. Momentum says 22 walk-in centres and 744 new hires are in place and has budgeted R100m+. CEO Marais is confident the transition cannot be stopped by court before 1 June. CMS Indaba Day 2 (TODAY, 14 May) is expected to address governance lessons from the Bonitas dispute.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/", date: "Feb 2026" }, { name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" }],
        representative_voice: "Medscheme ensures weekly payment runs. Momentum has one run a month. As a healthcare provider, this is an administration nightmare. — Industry commenter, Moonstone",
      },
      {
        theme: "Fraudulent Documents — Most Explosive Unresolved Allegation",
        sentiment: "NEGATIVE",
        what: "AfroCentric Group confirmed: 'Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent.' FACTS Consulting conducted the analysis. Submitting fraudulent documents to a High Court is a criminal offence. No response from PHA or Bonitas has been published. The High Court application was removed from the roll on 3 March and cannot be re-enrolled until interlocutory matters are resolved. A criminal referral to SAPS or NPA remains possible.",
        sources: [{ name: "AfroCentric", url: "https://www.afrocentric.za.com/medscheme-provides-evidence-bonitas-tender-process-was-compromised/", date: "Feb 2026" }],
        representative_voice: "If the forensic evidence of altered documents holds up, this stops being a commercial dispute and starts being a criminal matter. That changes everything.",
      },
      {
        theme: "Section 197 Rejected — 5,000 Staff Without Automatic Protection",
        sentiment: "NEGATIVE",
        what: "Momentum rejected Sanlam's Section 197 LRA application 'in spite of legal precedent'. Approximately 5,000 staff remain without automatic transfer protection. Sanlam's commitments: internal redeployment search, priority applications at Momentum's 744 new roles. No headcount guarantee given. A separate LRA court challenge by Sanlam remains possible.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" }],
        representative_voice: "There is a bitter irony in Medscheme staff being told to apply to Momentum for jobs that only exist because Momentum won the contract Medscheme lost.",
      },
      {
        theme: "Scale Intact — 4 Million+ Lives, GEMS and Polmed the Priority Contracts",
        sentiment: "POSITIVE",
        what: "Despite the Bonitas loss, Medscheme administers 4 million+ lives including GEMS, Polmed, Fedhealth, and now Sisonke Health. GEMS and Polmed renewals are the most strategically critical contracts on the book. A competitive tender for either would represent a second existential moment. The data depth across 12 million monthly claims and automated pre-authorisation across major hospital groups remain structural assets no competitor can quickly replicate.",
        sources: [{ name: "AfroCentric IAR 2025", url: "https://www.afrocentric.za.com" }, { name: "Medical Brief", url: "https://www.medicalbrief.co.za/bonitas-cuts-ties-with-medscheme/", date: "Feb 2026" }],
        representative_voice: "Medscheme currently has 14 medical scheme clients including GEMS. The Sisonke win adds a 15th. The question is whether GEMS and Polmed hold firm.",
      },
    ],
    topVoices: [
      { type: "Moonstone (Sisonke)", sentiment: "positive", quote: "The Sisonke mandate provides Medscheme with an important foothold as it works to stabilise its position in a consolidating market." },
      { type: "Healthcare provider", sentiment: "negative", quote: "Medscheme ensures weekly payment runs. Momentum has one run a month. Medscheme ensures quick turnaround on claims. Momentum takes time. This is an administration nightmare." },
      { type: "AfroCentric Group", sentiment: "negative", quote: "Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent." },
    ],
    watchPoints: [
      "⚡ 1 June 2026 — Bonitas operational handover (18 days)",
      "⚡ TODAY — CMS Indaba Day 2 (14 May) — sustainability, value-based care, governance lessons",
      "🟢 Sisonke live 1 May — watch for further new client pipeline",
      "Fraudulent documents — criminal referral to SAPS or NPA possible",
      "Section 197 LRA — separate court challenge by Sanlam possible",
      "GEMS and Polmed renewals — most strategic contracts remaining",
      "Member experience post-1 June — watch for claims backlogs or payment delays at Momentum",
    ],
    sourceCount: 26,
  },

  // ─── FINANCIAL ────────────────────────────────────────────────────────────
  financial: {
    overallSentiment: "NEGATIVE", sentimentScore: 21, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "ACT.JO all-time low 61 ZAC (20 Mar 2026), 52-week range 61–180 ZAC, now ~115 ZAC. AGM held 11 May 2026. H1 2026 interim results SENS: 1 Sep 2026, presentation 2 Sep. FY2025: R1.27bn basic loss, no dividend, 40% revenue cliff arrives in 18 days. Sanlam headline earnings down 18%. Momentum interim NHE +8% to R3.7bn — the financial winner. H1 2026 will be AfroCentric Group's ugliest results ever.",
    themes: [
      {
        theme: "ACT.JO — All-Time Low 61 ZAC (20 March 2026), Trading ~115 ZAC | 52-week Range 61–180 ZAC",
        sentiment: "NEGATIVE",
        what: "ACT.JO hit its all-time low of 61 ZAC on 20 March 2026 — down from a 2017 high of 695 ZAC. The stock is trading around 115 ZAC in mid-May 2026 (52-week range: 61–180 ZAC, market cap ~R967m). AfroCentric Group's AGM was held 11 May 2026. The next key financial milestone is the H1 2026 interim results SENS on 1 September 2026, presentation on 2 September — the first full reporting period to capture the Bonitas revenue exit. The Bonitas revenue cliff arrives in 18 days.",
        sources: [{ name: "Google Finance", url: "https://www.google.com/finance/beta/quote/ACT:JSE", date: "May 2026" }, { name: "TradingView", url: "https://www.tradingview.com/symbols/JSE-ACT/", date: "May 2026" }],
        representative_voice: "ACT reached its all-time low of 61 ZAC on 20 March 2026. The stock has recovered to ~115 ZAC but the Bonitas revenue cliff arrives in 18 days — H1 2026 results will be a true test.",
      },
      {
        theme: "FY2025 — Revenue R7.3bn (+93.9%), Basic Loss R1.27bn, No Dividend",
        sentiment: "NEGATIVE",
        what: "Loss before tax R532m vs prior profit R225m. Basic loss R1.27bn (151.55c/share). Headline earnings R117.1m (13.92c/share). Revenue R7.3bn (+93.9%). No dividend (vs 6c prior). Impairments R1.59bn from Activo, ADS Group and Wellworx disposals. Results published SENS 3 March 2026. AGM held 11 May 2026. Integrated Annual Report available.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/", date: "4 Mar 2026" }, { name: "Moneyweb", url: "https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/", date: "May 2026" }],
        representative_voice: "The R1.59bn impairment is largely non-cash but try explaining that to a retail investor who bought at 300c and is watching it trade at 115c.",
      },
      {
        theme: "Bonitas Revenue Cliff — 40% of Medscheme Income Exits in 18 Days",
        sentiment: "NEGATIVE",
        what: "Bonitas contributes approximately 40% of Medscheme's administration income. That revenue exits permanently on 31 May 2026 — 18 days from today. No formal FY2026 earnings guidance has been provided. H1 2026 interim results will be the first full reporting period showing the Bonitas impact — the most painful numbers in AfroCentric Group's listed history. The Sisonke mandate partially offsets the loss but not at comparable scale.",
        sources: [{ name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/" }, { name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" }],
        representative_voice: "A 40% income concentration on a single client that you are now losing was always a risk that should have been managed more proactively.",
      },
      {
        theme: "Momentum — Market Share 22%→30% in 18 Days, Interim NHE +8% to R3.7bn",
        sentiment: "POSITIVE",
        what: "Momentum is the defining competitive winner of 2026. R100m+ budget, 744 new hires, 22 walk-in centres, Sandton offices refurbished. Market share shifts from 22% to 30% after 1 June — SA's second-largest administrator after Discovery. Interim results (H1 FY2026): headline earnings +8% to R3.56bn, NHE +8% to R3.695bn, HEPS +13% to 274.4c. F2027 targets — R7bn NHE, 20% ROE — intact. The Medscheme legal challenge was 'kicked to touch' on 3 March.",
        sources: [{ name: "EWN", url: "https://www.ewn.co.za/momentum-health-taking-over-administration-of-bonitas-it-gives-us-incredible-scale/", date: "Mar 2026" }, { name: "BusinessTech", url: "https://businesstech.co.za/news/business/854369/end-of-an-era-for-one-of-the-biggest-medical-aids-in-south-africa-after-43-years/", date: "Mar 2026" }],
        representative_voice: "It results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. — Jeanette Marais, Momentum CEO",
      },
      {
        theme: "Sanlam FY2025 — Headline Earnings Down 18% to R20.08bn",
        sentiment: "NEGATIVE",
        what: "Sanlam reported FY2025 results on 12 March 2026 with headline earnings down 18% to R20.08bn. CEO Hanratty called the Bonitas situation a 'human tragedy' for AfroCentric Group staff while describing the financial impact on Sanlam as manageable. NRFFS was R15.9bn, up 3% actual and ~20% normalised. Sanlam holds ~59% of AfroCentric Group. No change to Sanlam's long-term strategic direction was announced regarding the AfroCentric stake.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/sanlams-business-engines-a-look-at-the-groups-2025-performance/" }, { name: "Medical Brief", url: "https://www.medicalbrief.co.za/bonitas-medscheme-row-threatens-jobs-sanlam-ceo/" }],
        representative_voice: "Sanlam calling it a financial irritation while describing 5,000 job losses as a human tragedy is a clear signal of where AfroCentric Group sits in Sanlam's priority stack.",
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "No dividend, R1.59bn impairments, Bonitas ending in 18 days. H1 2026 interim results will be the ugliest numbers AfroCentric Group has ever reported." },
      { type: "Momentum CEO", sentiment: "positive", quote: "The Bonitas appointment results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. Our F2027 targets remain intact." },
      { type: "Sanlam CEO", sentiment: "cautious", quote: "The Bonitas situation is not that big a deal for Sanlam financially. But for 5,000 people in that business it is a human tragedy." },
    ],
    watchPoints: [
      "⚡ 1 June 2026 — Bonitas revenue exits Medscheme's books (18 days)",
      "ACT.JO — all-time low 61 ZAC (20 Mar), 52-week range 61–180 ZAC, ~115 ZAC — watch 100 ZAC support",
      "H1 2026 interim results — SENS 1 Sep 2026, presentation 2 Sep 2026 — first full period showing Bonitas revenue impact",
      "Dividend reinstatement — no guidance given",
      "Activo disposal — revised terms announced, final completion pending",
      "Sanlam stake — no change signalled but strategic review watch point",
    ],
    sourceCount: 18,
  },

  // ─── NHI & POLICY ─────────────────────────────────────────────────────────
  nhi: {
    overallSentiment: "CAUTIOUS", sentimentScore: 35, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "⚖️ NHI ConCourt JUDGMENT RESERVED (7 May) — no date. 🔴 NEW: Motsoaledi questions ConCourt judges' impartiality (13 May) — suggests judges conflicted as Parmed members. DA pushing back hard. 🟢 NEW: Lenacapavir HIV injection — Motsoaledi announces 5 June launch date in budget vote (14 May), stocks deploying to 360 facilities. Ramaphosa refuses to resign, files Phala Phala review (11 May) — political crisis deepens. CMS Indaba Day 2 TODAY (14 May). AfroCentric Group's CCMDD/GEMS book is its strongest NHI hedge.",
    themes: [
      {
        theme: "🔴 NEW — Motsoaledi Challenges ConCourt Judges' NHI Impartiality (13 May)",
        sentiment: "NEGATIVE",
        what: "In a controversial statement on 13 May 2026, Health Minister Motsoaledi questioned whether the Constitutional Court judges could be impartial on the NHI challenge, suggesting they are 'beneficiaries' of the private healthcare system as members of Parmed Medical Scheme. He expressed hope that judges would 'become sober about universal health coverage.' The DA's Karl le Roux responded sharply, calling for Motsoaledi to instead remove Section 33 of the NHI Act and reform the private sector. The DA said it will ask Ramaphosa whether Motsoaledi's conduct meets executive ethics standards. Former Health Minister Nkosazana Dlamini-Zuma at the 5 May hearing had said: 'We have a strong case. I'm not sure about the judges, but we have a strong case.'",
        sources: [{ name: "News24", url: "https://www.news24.com/southafrica/health-news/be-sober-motsoaledi-queries-judges-nhi-impartiality-over-their-state-paid-medical-aid-20260512-1170", date: "13 May 2026" }, { name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" }],
        representative_voice: "Instead of questioning the impartiality and fairness of the judges on the Constitutional Court, why don't you remove Section 33 of the NHI Act? — Karl le Roux, DA",
      },
      {
        theme: "🟢 NEW — Lenacapavir HIV Prevention Launch: 5 June 2026, Mpumalanga (Budget Vote 14 May)",
        sentiment: "POSITIVE",
        what: "In his Health Department budget vote speech on 14 May 2026, Motsoaledi announced lenacapavir — a twice-yearly injection with near-100% HIV prevention efficacy — will launch officially on 5 June in Mpumalanga. Stocks are being delivered to 360 high-burden health facilities in the next two weeks. Priority populations: adolescent girls and young women (up to 24), pregnant/breastfeeding mothers, female sex workers, MSM, transgender people, injecting drug users. Life expectancy has risen to 66.9 years as of 2025. Motsoaledi: 'We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030.' This directly impacts AfroCentric Group — Aid for AIDS, Pharmacy Direct CCMDD, and Scriptpharm all operate in the HIV management space.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" }, { name: "SAnews", url: "https://www.sanews.gov.za/south-africa/groundbreaking-hiv-drug-lenacapavir-be-launched-next-month", date: "14 May 2026" }],
        representative_voice: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. All we have to do is work hard and work hard together. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "⚖️ NHI ConCourt — Judgment Reserved 7 May, No Date Announced",
        sentiment: "CAUTIOUS",
        what: "The Constitutional Court concluded the first NHI legal challenge from 5-7 May 2026. BHF and Western Cape Government argued Parliament conducted a 'tick-box' public participation exercise. Advocate Bruce Leech (BHF): 'Parliament had no intention of listening to the public.' Western Cape argued the NCOP failed to consider the province's report and Gauteng submitted none. Parliament's advocate argued 350,000+ written submissions were received, well exceeding constitutional threshold. Government claims NHI implementation timeline is 'decades away'. Judgment reserved — no date announced. This is only the first of 12+ challenges.",
        sources: [{ name: "EWN", url: "https://www.ewn.co.za/2026/05/07/concourt-reserves-judgment-in-nhi-challenge", date: "7 May 2026" }, { name: "The Citizen", url: "https://www.citizen.co.za/news/south-africa/courts/parliament-public-participation-concourt-nhi/", date: "5 May 2026" }, { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-05-public-participation-process-in-frightfully-expensive-nhi-scheme-under-scrutiny-in-concourt-/", date: "5 May 2026" }],
        representative_voice: "Parliament plainly relies on the department to do some of its work. Those common-sense issues — how much will this cost, what will I get, how will this work — were raised over and over. They were not properly addressed. — Advocate Bruce Leech, BHF",
      },
      {
        theme: "⚡ CMS Industry Indaba Day 2 TODAY (14 May) — Section 59 Implementation Now Operational",
        sentiment: "CAUTIOUS",
        what: "The CMS Industry Indaba concludes TODAY (Day 2, 14 May) at Sandton Convention Centre. Day 2 focuses on sustainability, value-based care and strategic purchasing. Yesterday (Day 1) Minister Motsoaledi keynoted on Section 59 implementation — the most anticipated moment in SA medical scheme regulation in years. Retired Chief Justice Ngcobo keynoted on Regulation, Fairness and Sustainability. Circular 10 of 2026 (17 March) sets out immediate directives flowing from the Section 59 investigation report. The Indaba marks culmination of Section 59 and transition from findings to implementation framework.",
        sources: [{ name: "CMS", url: "https://www.medicalschemes.co.za/minister-of-health-to-deliver-keynote-at-cms-industry-indaba-2026/", date: "23 Mar 2026" }, { name: "CMS Circular 10", url: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", date: "17 Mar 2026" }],
        representative_voice: "The 2026 Indaba marks the culmination of the Section 59 recommendations — signalling a renewed focus on accountability, strengthened oversight and sustainable healthcare funding. — CMS",
      },
      {
        theme: "🔴 Phala Phala ESCALATION — Ramaphosa Files Review (11 May), Refuses to Resign",
        sentiment: "CAUTIOUS",
        what: "Announced 11 May: Ramaphosa will not resign and is taking the Section 89 Ngcobo panel report on judicial review. ConCourt ruled 8 May (EFF & ATM case) that Rule 129I was unconstitutional and Parliament must form an impeachment committee. Speaker Didiza outlined six steps including tabling the report and forming the committee. Experts warn Ramaphosa's review will be 'difficult' — courts are reluctant to interfere in parliamentary accountability processes at preliminary stages. Political crisis significantly distracts from the NHI and health reform agenda.",
        sources: [{ name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-11-ramaphosa-bets-on-legal-review-to-stall-phala-phala-impeachment-proceedings/", date: "11 May 2026" }, { name: "IOL", url: "https://iol.co.za/news/politics/2026-05-13-ramaphosa-to-face-uphill-battle-in-phala-phala-review-bid-experts-warn/", date: "13 May 2026" }],
        representative_voice: "I remain here; I will not resign. — Ramaphosa, 11 May 2026. / It would likely be difficult. Courts are generally cautious about interfering in parliamentary accountability procedures, especially at a preliminary stage. — Dr Shadi Maganoe, Wits Law",
      },
      {
        theme: "Government — R74m NHI Litigation Budget, Implementation Suspended",
        sentiment: "CAUTIOUS",
        what: "Health Minister Motsoaledi confirmed R74m budgeted for NHI litigation in 2026/27 — up from R9.1m the prior year — facing 15 legal cases at R2-3m each. President Ramaphosa agreed not to promulgate any NHI Act provisions pending the ConCourt ruling. The Pretoria High Court also issued an order prohibiting the Minister from implementing any provision until the public participation challenges are resolved. Sakeliga is monitoring compliance closely.",
        sources: [{ name: "BusinessTech", url: "https://businesstech.co.za", date: "Apr 2026" }, { name: "Sakeliga", url: "https://www.sakeliga.org.za", date: "Feb 2026" }],
        representative_voice: "The R74m litigation budget signals government is preparing for a prolonged court battle, not a negotiated settlement.",
      },
      {
        theme: "AfroCentric Group's NHI Positioning — CCMDD, HIV and GEMS Are Real Hedges",
        sentiment: "POSITIVE",
        what: "Pharmacy Direct administers CCMDD scripts for the NDoH. Aid for AIDS provides HIV managed care. Medscheme administers GEMS and Polmed. With lenacapavir rolling out on 5 June, AfroCentric Group's HIV management portfolio (Aid for AIDS, Scriptpharm, Pharmacy Direct) is directly in the path of the country's most significant public health intervention in years. These contracts position AfroCentric Group as already embedded in public health delivery at scale — a genuine competitive advantage in any NHI scenario.",
        sources: [{ name: "AfroCentric IAR 2025", url: "https://www.afrocentric.za.com" }],
        representative_voice: "AfroCentric Group already does NHI-style delivery at scale through CCMDD, GEMS and HIV management. That is a structural moat that no competitor can quickly replicate.",
      },
    ],
    topVoices: [
      { type: "Motsoaledi (13-14 May)", sentiment: "negative", quote: "I wish judges would become sober about universal health coverage. [On lenacapavir:] We dare say we can eliminate HIV/Aids as a public health threat by 2030. — Budget Vote 14 May 2026" },
      { type: "BHF (ConCourt, 5 May)", sentiment: "negative", quote: "Parliament had no intention of listening to the public — it was a tick-box exercise. Common-sense questions about cost and implementation were raised over and over and not properly addressed." },
      { type: "Wits Law Expert (Phala Phala)", sentiment: "cautious", quote: "It would likely be difficult. Courts are generally cautious about interfering in parliamentary internal processes, including their accountability procedures, especially at a preliminary stage." },
    ],
    watchPoints: [
      "⚡ TODAY — CMS Indaba Day 2 (14 May) — sustainability, value-based care, strategic purchasing, Sandton",
      "⚡ 5 June 2026 — Lenacapavir HIV shot launch in Mpumalanga — stocks deploying to 360 facilities NOW",
      "🔴 Motsoaledi questions ConCourt judges' impartiality (13 May) — DA challenging; executive ethics scrutiny",
      "🆕 Circular 14 of 2026 — PMB Definition Guideline; CMS inviting Clinical Advisory Committee nominations",
      "NHI ConCourt ruling — reserved 7 May, no date, could invalidate the Act or send back for fresh consultation",
      "12+ substantive NHI constitutional challenges — will follow once ConCourt rules on participation",
      "Section 33 amendment campaign — Discovery lobbying hard, watch for policy response",
      "🔴 Ramaphosa judicial review of Section 89 report — filed 11 May; could take up to a year",
      "🔴 Parliament impeachment committee — being constituted; may run parallel to Ramaphosa review",
      "CCMDD, GEMS and HIV management portfolio renewals — core to AfroCentric Group's public sector positioning",
    ],
    sourceCount: 24,
  },

  // ─── EMPLOYER REPUTATION ──────────────────────────────────────────────────
  employer: {
    overallSentiment: "NEGATIVE", sentimentScore: 32, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "18 days to handover. 5,000 jobs at risk with no automatic protection after Section 197 rejection. Momentum hiring 744 — Medscheme staff may apply. 🟢 Sisonke win shows the business can still recruit and deliver. Top Employer SA 2025 status retained. Staff morale in Bonitas-dedicated teams is the biggest internal watch point.",
    themes: [
      {
        theme: "5,000 Jobs at Risk — No Automatic Protection, 18 Days to Go",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty confirmed ~5,000 jobs at risk across AfroCentric Group and Medscheme. Momentum rejected the Section 197 LRA application 'in spite of legal precedent.' Sanlam's three commitments: identify internal redeployment, prioritise Medscheme staff at Momentum, provide further details. No headcount guarantee given. With 18 days to the handover, staff in Bonitas-dedicated administration teams face the most immediate uncertainty.",
        sources: [{ name: "News24", url: "https://www.news24.com/business/companies/bonitas-medscheme-drama-puts-5-000-jobs-at-risk-says-sanlam-ceo-20260312-1095", date: "12 Mar 2026" }, { name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" }],
        representative_voice: "There are 5,000 people inside that business. It is a human tragedy because there could be massive job losses. — Paul Hanratty, Sanlam CEO",
      },
      {
        theme: "Momentum Hiring 744 — Medscheme Staff Being Prioritised",
        sentiment: "CAUTIOUS",
        what: "Momentum is hiring 744 staff for the Bonitas transition including walk-in centre staff, claims processors and systems configurators. Sanlam confirmed Medscheme staff applications will be prioritised. In practice, 744 roles represent approximately 15% of the 5,000 at risk — the majority face redeployment or retrenchment. Momentum has begun refurbishing its Sandton offices to accommodate the new employees.",
        sources: [{ name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" }, { name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" }],
        representative_voice: "There is a bitter irony in Medscheme staff having to apply to Momentum for jobs that only exist because Momentum won the contract Medscheme lost.",
      },
      {
        theme: "🟢 Sisonke Win — A Signal the Business Can Still Operate and Compete",
        sentiment: "POSITIVE",
        what: "The Sisonke Health mandate win (1 May 2026) is a meaningful morale signal for Medscheme staff — it shows the organisation can still win competitive tenders and take on new clients in the middle of its most difficult period. Implementation planning for Sisonke is underway, which means new operational work and purpose for teams beyond the Bonitas wind-down.",
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
      "⚡ 1 June 2026 — Bonitas handover — highest-risk moment for affected staff (18 days)",
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
    oneLiner: "🔴 Discovery Vitality Sleep Rewards LIVE (7 May) — earn up to 6,000 pts/year, Oura Ring 4 funded, world-first new Vitality pillar. 🟢 NEW: Lenacapavir HIV injection launch 5 June — Motsoaledi budget vote (14 May). Momentum: R100m, 744 hires, 22 walk-in centres — market share 22%→30% in 18 days. Adrian Gore book 'The Four Principles' out 30 July. Discovery 7.2% increase (lowest big-five). BestMed 6.8%. Sector governance changed permanently via CMS Indaba (13-14 May). NHI ConCourt reserved.",
    themes: [
      {
        theme: "🔴 LIVE — Discovery Vitality Sleep Rewards (7 May) — World's First Sleep Pillar",
        sentiment: "POSITIVE",
        what: "Discovery launched the Vitality Sleep Score and Sleep Rewards on 7 May 2026 — the first new core Vitality pillar in almost 20 years, joining Screening, Physical Activity and Nutrition. Backed by 'The Sleep Factor' research across 47 million sleep records. Vitality CEO Dinesh Govender: improving sleep associated with up to a 24% lower risk of mortality and 36% lower risk of motor vehicle accidents. Members earn dynamic weekly personalised sleep goals. Tracked via Oura Ring 4 (fully fundable over 24 months with a qualifying Discovery Bank account — R9,997 value, R999 activation fee), Apple Watch, Garmin, Samsung, or in-app Vitality Sleep Tracker (mobile, coming soon). Discovery Bank investigating whether better sleepers qualify for improved loan interest rates. Sleep metrics also being integrated into Discovery Insure's Vitality Drive programme.",
        sources: [{ name: "Daily Investor", url: "https://dailyinvestor.com/business/133145/discovery-paying-south-africans-to-sleep/", date: "7 May 2026" }, { name: "Bizcommunity", url: "https://www.bizcommunity.com/article/earn-while-you-sleep-discovery-vitality-launches-sleep-rewards-programme-281067a", date: "7 May 2026" }, { name: "BusinessTech", url: "https://businesstech.co.za/news/lifestyle/859716/big-changes-for-discovery-vitality-in-south-africa/", date: "7 May 2026" }],
        representative_voice: "We have long known that exercise, nutrition and screening are modifiable lifestyle behaviours, but the data is now unequivocal: sleep deserves to stand alongside them. — Dinesh Govender, Discovery Vitality CEO",
      },
      {
        theme: "🟢 NEW — Lenacapavir HIV Prevention Launch (5 June) — Motsoaledi Budget Vote 14 May",
        sentiment: "POSITIVE",
        what: "Health Minister Motsoaledi announced in his 14 May 2026 budget vote that lenacapavir — a twice-yearly HIV prevention injection with near-100% efficacy — will launch 5 June in Mpumalanga. Stocks deploying to 360 facilities now. This is a sector-wide development: all medical scheme administrators and managed care organisations will need to adapt HIV management protocols. Discovery Health and Momentum Health Vitality programmes will need to integrate lenacapavir into HIV prevention benefits and chronic medication lists. AfroCentric Group's HIV portfolio (Aid for AIDS, Scriptpharm, Pharmacy Direct CCMDD) is directly in the implementation path.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" }, { name: "SAnews", url: "https://www.sanews.gov.za/south-africa/groundbreaking-hiv-drug-lenacapavir-be-launched-next-month", date: "14 May 2026" }],
        representative_voice: "We will be delivering Lenacapavir stocks to depots and health facilities in the next two weeks, starting with 360 health facilities in the high-burden districts. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "Momentum — Market Share 22%→30% in 18 Days, Interim NHE +8%",
        sentiment: "POSITIVE",
        what: "Momentum is the defining competitive winner of 2026. R100m+ budget, 744 new hires, 22 walk-in centres, Sandton offices refurbished, enterprise systems configured with Bonitas-specific rules. Market share shifts from 22% to 30% after 1 June — SA's second-largest administrator after Discovery. Interim results (H1 FY2026): headline earnings +8% to R3.56bn, NHE +8% to R3.695bn, HEPS +13%. F2027 targets — R7bn NHE, 20% ROE — intact. Health4Me (health insurance) grew 20% to 200,000+ members.",
        sources: [{ name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" }, { name: "EWN", url: "https://www.ewn.co.za/momentum-health-taking-over-administration-of-bonitas-it-gives-us-incredible-scale/", date: "Mar 2026" }],
        representative_voice: "It results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. — Jeanette Marais, Momentum CEO",
      },
      {
        theme: "Adrian Gore — 'The Four Principles' Book, Out 30 July 2026",
        sentiment: "POSITIVE",
        what: "Discovery CEO Adrian Gore (61) has written 'The Four Principles: Multiply Your Impact in Life and Leadership' (Pan Macmillan), releasing 30 July 2026. He also joined the Business Leadership South Africa board in May 2026. Gore said at half-year results (March 2026) that NHI requires a decade or more to reach meaningful maturity and near-term implementation is not grounded in reality. Discovery is pushing for Section 33 amendments to allow schemes to operate alongside NHI.",
        sources: [{ name: "SA Jewish Report", url: "https://www.sajr.co.za/the-four-principles-behind-gores-leadership-success/", date: "7 May 2026" }, { name: "Billionaires Africa", url: "https://www.billionaires.africa/2026/04/24/61-year-old-south-african-businessman-adrian-gore-ran-the-boston-marathon-and-wrote-a-new-book-while-leading-discovery/", date: "24 Apr 2026" }],
        representative_voice: "The idea that NHI is functional and people can walk into any private hospital is not realistic. We do not have the resources or the doctors. It cannot be done. — Adrian Gore, Discovery CEO",
      },
      {
        theme: "Discovery Health — Active Smart 22,000 Lives, 7.2% Increase, Sleep Pillar",
        sentiment: "POSITIVE",
        what: "Discovery Health deferred 2026 increases to 1 April saving members R1.5bn. Weighted average increase 7.2% — the lowest of the five largest open schemes. Active Smart plan (R1,350/month, 0% increase) reached 22,000 lives with 80%+ of members under 40 — the fastest-growing new DHMS plan ever. Sleep Rewards programme launched 7 May — the fourth Vitality pillar. Discovery managing approximately 39% of total SA medical scheme membership.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "Active Smart at R1,350 with zero increase is Discovery's most serious affordability play. The sleep pillar launch six days later shows their innovation pipeline has not slowed.",
      },
      {
        theme: "BestMed — 6.8% Lowest Sector Increase, 28% Membership Growth in 5 Years",
        sentiment: "POSITIVE",
        what: "BestMed implemented the sector's lowest 2026 contribution increase at 6.8% — the only major scheme close to the CMS recommended cap. Some options as low as 5.1%. Principal membership has grown 28% over five years. Comparison: Discovery 7.2%, Medihelp 8.46%, Bonitas 8.8%, Fedhealth 9.6%, Momentum 9.9%.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "In a year where most schemes are 7-9%, BestMed at 6.8% is the standout on affordability. This is a deliberate strategic differentiator.",
      },
      {
        theme: "Evergreen Contracts — Sector Governance Changed Permanently via CMS Indaba",
        sentiment: "CAUTIOUS",
        what: "The Bonitas-Medscheme dispute has permanently changed how the sector views long-term administration contracts. The CMS Indaba (13-14 May, concluding TODAY) is formalising governance expectations on contract benchmarking via Circular 10 of 2026 directives. Medscheme's remaining long-term relationships with GEMS and Polmed are now implicitly under scrutiny. Any scheme that has not recently benchmarked its administrator faces reputational risk under the new CMS posture on evergreen arrangements.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/" }, { name: "Bonitas", url: "https://www.bonitas.co.za/news-article/appointment-of-administration-and-managed-care-providers/", date: "Jan 2026" }],
        representative_voice: "Every long-term administration contract in SA is now under implicit review. The Bonitas case has permanently changed the governance landscape.",
      },
    ],
    topVoices: [
      { type: "Discovery Vitality CEO", sentiment: "positive", quote: "We have long known that exercise, nutrition and screening are modifiable lifestyle behaviours, but the data is now unequivocal: sleep deserves to stand alongside them." },
      { type: "Momentum CEO", sentiment: "positive", quote: "It results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. Our F2027 targets remain intact." },
      { type: "Motsoaledi (Budget Vote 14 May)", sentiment: "positive", quote: "We dare say we can eliminate HIV/Aids as a public health threat by 2030. Lenacapavir launches 5 June in Mpumalanga." },
    ],
    watchPoints: [
      "⚡ Discovery Vitality Sleep Rewards LIVE (7 May) — Oura Ring 4 fully fundable, Vitality Sleep Tracker app coming soon",
      "⚡ 5 June 2026 — Lenacapavir HIV injection launch, Mpumalanga — sector-wide managed care implications",
      "⚡ 1 June 2026 — Bonitas to Momentum (18 days) — watch for member experience issues post-handover",
      "⚡ TODAY — CMS Indaba Day 2 (14 May) — governance direction will affect all administrators",
      "Adrian Gore 'The Four Principles' — pre-order live, release 30 July 2026",
      "GEMS and Polmed renewals — will they run competitive tenders post-Bonitas?",
      "NHI ConCourt ruling — no date, H2 2026 likely, sector-wide implications",
      "BestMed — will 6.8% drive accelerated member switching from higher-increase schemes?",
      "Motsoaledi judges impartiality remarks — watch for judicial or parliamentary response",
    ],
    sourceCount: 30,
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
  "BHF":                    "https://www.bhfglobal.com",
  "TradingView":            "https://www.tradingview.com/symbols/JSE-ACT/",
  "Google Finance":         "https://www.google.com/finance/beta/quote/ACT:JSE",
  "Investing.com ZA":       "https://za.investing.com/equities/afrocentric-investment-corp",
  "Top Employers Institute": "https://www.top-employers.com",
  "LinkedIn":               "https://www.linkedin.com/company/afrocentric-group",
  "Discovery Annual Results 2025":     "https://www.discovery.co.za/info/2025annualresults",
  "Momentum Metropolitan Holdings":    "https://www.momentummetropolitan.co.za",
  "Daily Investor":         "https://dailyinvestor.com",
  "Bizcommunity":           "https://www.bizcommunity.com",
  "SA Jewish Report":       "https://www.sajr.co.za",
  "Billionaires Africa":    "https://www.billionaires.africa",
  "BusinessTech":           "https://businesstech.co.za",
  "News24":                 "https://www.news24.com",
  "SAnews":                 "https://www.sanews.gov.za",
  "EWN":                    "https://www.ewn.co.za",
  "IOL":                    "https://www.iol.co.za",
  "The Citizen":            "https://www.citizen.co.za",
  "Business Explainer":     "https://businessexplainer.co.za",
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

const SA_HEALTH_FEEDS = [
  { name: "Medical Schemes",    url: "https://news.google.com/rss/search?q=medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                         group: "Medical Schemes" },
  { name: "Medical Aid SA",     url: "https://news.google.com/rss/search?q=medical+aid+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                            group: "Medical Schemes" },
  { name: "Discovery Health",   url: "https://news.google.com/rss/search?q=Discovery+Health+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                        group: "Medical Schemes" },
  { name: "Momentum Health",    url: "https://news.google.com/rss/search?q=Momentum+Health+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                         group: "Medical Schemes" },
  { name: "Bonitas",            url: "https://news.google.com/rss/search?q=Bonitas+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                 group: "Medical Schemes" },
  { name: "BestMed",            url: "https://news.google.com/rss/search?q=BestMed+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                 group: "Medical Schemes" },
  { name: "Medihelp",           url: "https://news.google.com/rss/search?q=Medihelp+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                group: "Medical Schemes" },
  { name: "Fedhealth",          url: "https://news.google.com/rss/search?q=Fedhealth+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                               group: "Medical Schemes" },
  { name: "GEMS",               url: "https://news.google.com/rss/search?q=GEMS+government+employees+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",               group: "Medical Schemes" },
  { name: "Polmed",             url: "https://news.google.com/rss/search?q=Polmed+police+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                           group: "Medical Schemes" },
  { name: "Medshield",          url: "https://news.google.com/rss/search?q=Medshield+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                               group: "Medical Schemes" },
  { name: "CompCare",           url: "https://news.google.com/rss/search?q=CompCare+Hosmed+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                         group: "Medical Schemes" },
  { name: "Scheme Innovation",  url: "https://news.google.com/rss/search?q=medical+scheme+benefit+launch+innovation+app+wellness+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",  group: "Medical Schemes" },
  { name: "Vitality Sleep",     url: "https://news.google.com/rss/search?q=Discovery+Vitality+Sleep+Rewards+Score+2026&hl=en-ZA&gl=ZA&ceid=ZA:en",                         group: "Medical Schemes" },
  { name: "Lenacapavir",        url: "https://news.google.com/rss/search?q=lenacapavir+south+africa+HIV+2026&hl=en-ZA&gl=ZA&ceid=ZA:en",                                   group: "NHI & Policy" },
  { name: "NHI & Policy",       url: "https://news.google.com/rss/search?q=NHI+national+health+insurance+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                          group: "NHI & Policy" },
  { name: "Public Hospitals",   url: "https://news.google.com/rss/search?q=south+africa+public+hospital+clinic+health+department&hl=en-ZA&gl=ZA&ceid=ZA:en",               group: "Public Health" },
  { name: "HIV & TB",           url: "https://news.google.com/rss/search?q=HIV+tuberculosis+TB+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                    group: "HIV & TB" },
  { name: "Health Technology",  url: "https://news.google.com/rss/search?q=digital+health+technology+telemedicine+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                 group: "Health Technology" },
  { name: "Health Insurance",   url: "https://news.google.com/rss/search?q=%22gap+cover%22+OR+%22primary+health+insurance%22+OR+%22income+protection%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Health Insurance" },
  { name: "Value-Based Care",   url: "https://news.google.com/rss/search?q=%22value-based+care%22+OR+%22value+based+care%22+south+africa+health&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Value-Based Care" },
  { name: "Bhekisisa",          url: "https://bhekisisa.org/feed/",                                                group: "Other" },
  { name: "Health-e News",      url: "https://health-e.org.za/feed/",                                              group: "Other" },
  { name: "Medical Brief",      url: "https://www.medicalbrief.co.za/feed/",                                       group: "Other" },
  { name: "Spotlight",          url: "https://www.spotlightnsp.co.za/feed/",                                       group: "Other" },
  { name: "Health Policy Watch", url: "https://healthpolicy-watch.news/feed/",                                     group: "Other" },
  { name: "SAHPRA",             url: "https://www.sahpra.org.za/feed/",                                            group: "Other" },
  { name: "Moonstone",          url: "https://www.moonstone.co.za/feed/",                                          group: "Other" },
  { name: "BHF",                url: "https://www.bhfglobal.com/feed/",                                            group: "Other" },
  { name: "Life Healthcare",    url: "https://www.lifehealthcare.co.za/news-and-media/feed/",                      group: "Other" },
  { name: "News24 Health",      url: "https://feeds.news24.com/articles/health24/HealthNews/rss",                  group: "Other" },
  { name: "IOL Health",         url: "https://www.iol.co.za/rss/health",                                           group: "Other" },
  { name: "DM Health",          url: "https://www.dailymaverick.co.za/category/health/feed/",                      group: "Other" },
  { name: "M&G Health",         url: "https://mg.co.za/section/health/feed",                                       group: "Other" },
  { name: "Sowetan Health",     url: "https://www.sowetanlive.co.za/health/rss/",                                   group: "Other" },
  { name: "Bizcommunity",       url: "https://www.bizcommunity.com/rss/196/365.rss",                               group: "Other" },
  { name: "BusinessTech",       url: "https://businesstech.co.za/news/category/medical-aid/feed/",                 group: "Other" },
  { name: "TimesLive Health",   url: "https://www.timeslive.co.za/health/rss",                                     group: "Other" },
  { name: "CMS",                url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "CMS Circulars",      url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+%22circular%22+OR+%22CMS+circular%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Netcare",            url: "https://news.google.com/rss/search?q=Netcare+south+africa+health&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Other" },
  { name: "CMS Circular",       url: "https://news.google.com/rss/search?q=%22CMS+circular%22+%22Council+for+Medical+Schemes%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "CMS Regulatory",     url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+circular+OR+directive+OR+guideline+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "CMS Investigation",  url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+investigation+OR+%22section+44%22+OR+indaba+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "BHF Regulatory",     url: "https://news.google.com/rss/search?q=%22Board+of+Healthcare+Funders%22+circular+OR+regulatory+OR+policy+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "Paul Hanratty",      url: "https://news.google.com/rss/search?q=%22Paul+Hanratty%22+Sanlam&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Kanyisa Mkhize",     url: "https://news.google.com/rss/search?q=%22Kanyisa+Mkhize%22+OR+%22Sanlam+Corporate+CEO%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Abigail Mukhuba",    url: "https://news.google.com/rss/search?q=%22Abigail+Mukhuba%22+OR+%22Sanlam+finance+director%22+OR+%22Sanlam+CFO%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Theo Mabaso",        url: "https://news.google.com/rss/search?q=%22Theo+Mabaso%22+Sanlam&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Sanlam AfroCentric", url: "https://news.google.com/rss/search?q=Sanlam+AfroCentric+OR+%22Sanlam+health%22+OR+%22Sanlam+stake%22+OR+%22Sanlam+Medscheme%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Sanlam Results",     url: "https://news.google.com/rss/search?q=Sanlam+results+OR+%22Sanlam+SENS%22+OR+%22Sanlam+earnings%22+OR+%22Sanlam+headline%22+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Sanlam Strategy",    url: "https://news.google.com/rss/search?q=%22Sanlam+Group%22+strategy+OR+acquisition+OR+disposal+OR+announcement+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Sanlam" },
  { name: "Gerald van Wyk",    url: "https://news.google.com/rss/search?q=%22Gerald+van+Wyk%22+OR+%22AfroCentric+CEO%22+OR+%22AfroCentric+chief+executive%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "Andrew Schwulst",   url: "https://news.google.com/rss/search?q=%22Andrew+Schwulst%22+OR+%22Medscheme+CEO%22+OR+%22Medscheme+chief+executive%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "Thato Moloele",     url: "https://news.google.com/rss/search?q=%22Thato+Moloele%22+OR+%22AfroCentric+CFO%22+OR+%22AfroCentric+chief+financial%22+OR+%22Lindiwe+Miyambu%22+OR+%22David+Carolus%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "AfroCentric Exco",  url: "https://news.google.com/rss/search?q=%22Aklaaq+Mahmood%22+OR+%22Satish+Antony%22+OR+%22Mujeeb+Bray%22+OR+%22Monwabisi+Kula%22+OR+%22Ashley+Singh%22+OR+%22Lindiwe+Miyambu%22+OR+%22David+Carolus%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "ACT SENS",          url: "https://news.google.com/rss/search?q=AfroCentric+SENS+OR+%22investor+relations%22+OR+%22AfroCentric+Group+announces%22+OR+%22AfroCentric+Group+results%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "ACT Conferences",   url: "https://news.google.com/rss/search?q=AfroCentric+conference+OR+keynote+OR+panel+OR+%22industry+indaba%22+OR+%22BHF+conference%22+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
  { name: "AfroCentric News",  url: "https://news.google.com/rss/search?q=site:afrocentric.za.com+OR+%22afrocentric.za.com%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Exco" },
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
  "Medical Schemes":   "#1A6ED4",
  "Medical Aid SA":    "#1A6ED4",
  "Discovery Health":  "#1A6ED4",
  "Momentum Health":   "#007A5E",
  "Bonitas":           "#D4A017",
  "BestMed":           "#E03050",
  "Medihelp":          "#9B6DFF",
  "Fedhealth":         "#FF8C00",
  "GEMS":              "#2E86AB",
  "Polmed":            "#3A9EFF",
  "Medshield":         "#C9184A",
  "CompCare":          "#5C6BC0",
  "Scheme Innovation": "#00C48C",
  "Vitality Sleep":    "#1A6ED4",
  "Lenacapavir":       "#C9184A",
  "BusinessTech":      "#FF6B35",
  "TimesLive Health":  "#C9184A",
  "CMS":               "#D4A017",
  "Netcare":           "#1A6ED4",
  "Health Insurance":  "#0077B6",
  "Value-Based Care":  "#2D6A4F",
  "NHI & Policy":      "#D4A017",
  "Public Hospitals":  "#E03050",
  "HIV & TB":          "#9B6DFF",
  "Health Technology": "#20639B",
  "Bhekisisa":         "#00C48C",
  "Health-e News":     "#1A6ED4",
  "Medical Brief":     "#D4A017",
  "Spotlight":         "#7B68EE",
  "Moonstone":         "#5C6BC0",
  "Bizcommunity":      "#FF8C00",
  "News24 Health":     "#FF6B35",
  "IOL Health":        "#2E86AB",
  "BHF":               "#6040C0",
  "Mail & Guardian":   "#6B2D8B",
  "GroundUp":          "#2D6A4F",
  "Life Healthcare":   "#0096C7",
  "SAHPRA":            "#C9184A",
  "Sowetan Health":    "#F77F00",
  "DM Health":         "#023E8A",
  "Health Policy Watch": "#7B2D8B",
  "Gerald van Wyk": "#30D158",
  "Andrew Schwulst": "#30D158",
  "Thato Moloele": "#30D158",
  "AfroCentric Exco": "#30D158",
  "ACT SENS": "#0A84FF",
  "ACT Conferences": "#BF5AF2",
  "AfroCentric News": "#30D158",
  "Paul Hanratty": "#FF9F0A",
  "Kanyisa Mkhize": "#FF9F0A",
  "Abigail Mukhuba": "#FF9F0A",
  "Theo Mabaso": "#FF9F0A",
  "Sanlam AfroCentric": "#FF9F0A",
  "Sanlam Results": "#FF9F0A",
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

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: 9, letterSpacing: "1.5px", padding: "2px 8px",
      border: `1px solid ${color}55`, color, background: `${color}18`,
      display: "inline-block", fontFamily: mono,
    }}>
      {label}
    </span>
  );
}

// ─── InsightsTab ──────────────────────────────────────────────────────────────
function InsightsTab({ articles, loading, onRefresh }) {
  const T = useT();
  const [period, setPeriod] = useState("30d");
  const [activeSection, setActiveSection] = useState("overview");
  const [watchlist, setWatchlist] = useState([
    "Paul Hanratty", "Kanyisa Mkhize", "Sanlam", "Gerald van Wyk", "Andrew Schwulst",
    "Medscheme", "Bonitas", "AfroCentric Group", "NHI", "ACT.JO", "Momentum", "GEMS",
    "Vitality Sleep", "Phala Phala", "Ramaphosa", "Lenacapavir",
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

  const getDesc = (a) => {
    let d = stripHtml(a.description || "");
    if (!d || d.length < 20) return "";
    d = d.replace(/^[A-Z\s]{5,30}\s*[|—–]\s*/g, "");
    const tn = (a.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const dn = d.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (tn.length > 20 && dn.startsWith(tn.slice(0, Math.floor(tn.length * 0.75)))) return "";
    const chunk = d.slice(0, 200);
    const last = Math.max(chunk.lastIndexOf(". "), chunk.lastIndexOf("! "), chunk.lastIndexOf("? "));
    if (last > 40) return chunk.slice(0, last + 1).trim();
    return chunk.trim() + (d.length > 200 ? "…" : "");
  };

  const watchMatches = watchlist.map(kw => ({
    kw,
    arts: recent.filter(a =>
      (a.title + " " + (a.description || "")).toLowerCase().includes(kw.toLowerCase())
    ),
  }));

  const TOPIC_GROUPS = [
    { heading: "LENACAPAVIR HIV PREVENTION LAUNCH",  color: "#C9184A", pattern: /lenacapavir|hiv prevention injection|twice.yearly injection/i },
    { heading: "DISCOVERY VITALITY SLEEP LAUNCH",    color: "#1A6ED4", pattern: /vitality sleep|sleep rewards|sleep score|oura ring|sleep factor/i },
    { heading: "BONITAS / MEDSCHEME",                color: "#B02040", pattern: /bonitas|medscheme|afrocentric/i },
    { heading: "NHI & POLICY / CMS INDABA",          color: "#8A6800", pattern: /nhi|national health insurance|constitutional court.*health|cms.*indaba|indaba.*cms|section 59/i },
    { heading: "PHALA PHALA / RAMAPHOSA",            color: "#C00021", pattern: /phala phala|ramaphosa|section 89|impeachment/i },
    { heading: "MEDICAL SCHEMES",                    color: "#1A6ED4", pattern: /medical scheme|medical aid|discovery health|momentum health|bestmed|medihelp|fedhealth|gems|polmed|contribution|administrator/i },
    { heading: "PHARMACY & MEDICINES",               color: "#6040C0", pattern: /pharmacy|medicine|\bdrug\b|sahpra|ozempic|semaglutide|weight.loss|glp/i },
    { heading: "SANLAM / SHAREHOLDER",               color: "#FF9F0A", pattern: /paul hanratty|kanyisa mkhize|abigail mukhuba|theo mabaso|sanlam.*afrocentric|sanlam.*health|sanlam.*stake|sanlam.*results|sanlam.*sens|sanlam corporate|sanlam group/i },
    { heading: "AFROCENTRIC GROUP EXCO",             color: "#30D158", pattern: /van wyk|schwulst|moloele|mujeeb bray|satish antony|monwabisi kula|ashley singh|aklaaq mahmood|lindiwe miyambu|david carolus|wouter dercksen|afrocentric ceo|afrocentric cfo|medscheme ceo/i },
    { heading: "PUBLIC HEALTH",                      color: "#007A5E", pattern: /hospital|clinic|public health|department of health|hiv|aids|tuberculosis|\btb\b|maternal|mental health|cancer|diabetes/i },
  ];

  const clean = (str) => {
    if (!str) return "";
    return str
      .replace(/<[^>]+>/g, " ")
      .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(parseInt(c, 10)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, c) => String.fromCharCode(parseInt(c, 16)))
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ")
      .replace(/&ndash;/g, "–").replace(/&mdash;/g, "—")
      .replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'")
      .replace(/&rdquo;/g, '"').replace(/&ldquo;/g, '"')
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\s+/g, " ").trim();
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
      const usedTitles = new Set();
      matched.forEach(a => {
        const tKey = clean(a.title || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40);
        const isDupe = [...usedTitles].some(prev => {
          const overlap = [...tKey].filter((c, i) => prev[i] === c).length;
          return overlap / Math.max(tKey.length, prev.length) > 0.7;
        });
        if (!isDupe) { usedTitles.add(tKey); deduped.push(a); }
        else {
          const existing = deduped[deduped.length - 1];
          if ((a.description || "").length > (existing?.description || "").length) deduped[deduped.length - 1] = a;
        }
      });
      return { ...g, arts: deduped };
    }).filter(g => g.arts.length > 0);
  };

  const buildSummary = (arts) => {
    if (arts.length === 0) return "";
    const pieces = arts.slice(0, 8).map(a => {
      const title = clean(a.title || "");
      const desc = clean(a.description || "");
      const src = a.publisher || a.source || "";
      const tShort = title.toLowerCase().replace(/[^a-z0-9]/g, "");
      const dShort = desc.toLowerCase().replace(/[^a-z0-9]/g, "");
      const isRepeat = tShort.length > 20 && dShort.startsWith(tShort.slice(0, Math.floor(tShort.length * 0.65)));
      const body = (desc.length > 60 && !isRepeat) ? desc : "";
      return { title, body, src };
    });
    const facts = [];
    const seenPhrases = new Set();
    pieces.forEach(({ title, body, src }) => {
      const sentences = (body || title).split(/(?<=[.!?])\s+/).filter(s => s.length > 30);
      const best = sentences[0] || body || title;
      const key = best.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 50);
      if (!seenPhrases.has(key) && best.length > 20) { seenPhrases.add(key); facts.push({ text: best.replace(/\.$/, ""), src }); }
    });
    if (facts.length === 0) return "";
    if (facts.length === 1) return `${facts[0].text} (${facts[0].src}).`;
    const connectors = ["", "This follows reports that", "Separately,", "Also of note,", "Further,"];
    return facts.slice(0, 5).map((f, i) => {
      const t = f.text; const s = f.src;
      if (i === 0) return `${t} (${s}).`;
      const conn = connectors[i] || "Additionally,";
      const lower = t.charAt(0).toLowerCase() + t.slice(1);
      return `${conn} ${lower} (${s}).`;
    }).join(" ");
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
            background: period === p.id ? T.blue : "transparent",
            color: period === p.id ? "#fff" : T.muted,
            border: `1px solid ${period === p.id ? T.blue : T.border}`,
            fontSize: 11, fontWeight: 600, padding: "6px 20px", borderRadius: 20,
            cursor: "pointer", fontFamily: mono, letterSpacing: "0.5px", transition: "all 0.15s",
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
                  <div style={{ fontSize: 13, color: T.muted, fontFamily: font, fontStyle: "italic" }}>No articles tracked in this period. Switch to Last 30 Days or check back soon.</div>
                </div>
              : briefingLoading
              ? <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {["BONITAS / MEDSCHEME", "NHI & POLICY", "MEDICAL SCHEMES"].map((h, i) => (
                    <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                        <div style={{ width: 3, height: 16, background: T.border2, borderRadius: 2 }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, fontFamily: mono, letterSpacing: "1.5px" }}>{h}</span>
                        <div style={{ width: 16, height: 16, border: `2px solid ${T.border2}`, borderTop: `2px solid ${T.blue}`, borderRadius: "50%", animation: "spin 0.9s linear infinite", marginLeft: 4 }} />
                      </div>
                      <div style={{ height: 12, background: T.border, borderRadius: 4, marginBottom: 8, width: "90%" }} />
                      <div style={{ height: 12, background: T.border, borderRadius: 4, marginBottom: 8, width: "75%" }} />
                      <div style={{ height: 12, background: T.border, borderRadius: 4, width: "82%" }} />
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
                    <div key={i} style={{ marginBottom: 24 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>
                        <div style={{ width: 3, height: 16, background: b.color, borderRadius: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: b.color, fontFamily: mono, letterSpacing: "1.5px" }}>{b.heading}</span>
                        <span style={{ fontSize: 10, color: T.muted, fontFamily: mono }}>{b.count} article{b.count !== 1 ? "s" : ""}</span>
                      </div>
                      <p style={{ fontSize: 14, color: T.text, lineHeight: 1.9, fontFamily: font, margin: "0 0 12px 0" }}>{b.text}</p>
                      {b.sources.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {[...new Map(b.sources.map(s => [s.publisher || s.source, s])).values()].slice(0, 5).map((s, j) => (
                            <a key={j} href={s.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                              <span style={{ fontSize: 10, fontWeight: 600, color: b.color, fontFamily: mono, background: `${b.color}10`, border: `1px solid ${b.color}30`, padding: "2px 8px", borderRadius: 3 }}>{s.publisher || s.source}</span>
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

// ─── SAHealthNews ─────────────────────────────────────────────────────────────
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
    "vitality", "sleep rewards", "sleep score", "lenacapavir",
  ];

  const isHealthRelated = (a) => {
    const text = ((a.title || "") + " " + (a.description || "")).toLowerCase();
    return HEALTH_KEYWORDS.some(k => text.includes(k));
  };

  const getCategory = (a) => {
    const text = ((a.title || "") + " " + (a.description || "")).toLowerCase();
    if (/lenacapavir|twice.yearly.*hiv|hiv.*injection/.test(text)) return { label: "Lenacapavir", color: "#C9184A" };
    if (/vitality sleep|sleep rewards|sleep score|oura ring/.test(text)) return { label: "Vitality Sleep", color: "#1A6ED4" };
    if (/paul hanratty|kanyisa mkhize|abigail mukhuba|theo mabaso|sanlam.*afrocentric|sanlam.*health|sanlam.*stake|sanlam.*medscheme|sanlam.*results|sanlam corporate|sanlam group/.test(text)) return { label: "Sanlam / Shareholder", color: "#FF9F0A" };
    if (/van wyk|schwulst|moloele|mujeeb bray|satish antony|monwabisi kula|ashley singh|aklaaq mahmood|lindiwe miyambu|david carolus|wouter dercksen|afrocentric ceo|afrocentric cfo|medscheme ceo/.test(text)) return { label: "AfroCentric Exco", color: "#30D158" };
    if (/bonitas|medscheme|afrocentric/.test(text)) return { label: "Bonitas/Medscheme", color: "#B02040" };
    if (/\bnhi\b|national health insurance|constitutional court/.test(text)) return { label: "NHI & Policy", color: "#8A6800" };
    if (/medical scheme|medical aid|discovery health|momentum health|bestmed|medihelp|fedhealth|gems|polmed/.test(text)) return { label: "Medical Schemes", color: "#1A6ED4" };
    if (/gap cover|health insurance|income protection/.test(text)) return { label: "Health Insurance", color: "#0077B6" };
    if (/pharmacy|medicine|\bdrug\b|sahpra|ozempic|semaglutide/.test(text)) return { label: "Pharmacy", color: "#6040C0" };
    if (/hospital|clinic|public health|ndoh/.test(text)) return { label: "Public Health", color: "#007A5E" };
    if (/\bhiv\b|\baids\b|tuberculosis|\btb\b|antiretroviral/.test(text)) return { label: "HIV & TB", color: "#C9184A" };
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
            <div style={{ fontSize: 16, fontWeight: 700, color: T.dim, fontFamily: mono }}>
              {fetchedAt ? fetchedAt.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }) : "—"}
            </div>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
          {articles.map((a, i) => {
            const cat = getCategory(a);
            const col = SOURCE_COLORS[a.source] || T.muted;
            const desc = cleanDesc(a.title || "", a.description || "");
            return (
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, borderLeft: `3px solid ${col}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 2px 16px ${col}20`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: col, fontFamily: mono, letterSpacing: "0.5px" }}>{a.publisher || a.source}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: cat.color, fontFamily: mono, background: `${cat.color}15`, border: `1px solid ${cat.color}40`, padding: "2px 7px", borderRadius: 3 }}>{cat.label}</span>
                    <span style={{ fontSize: 11, color: T.muted, fontFamily: mono }}>{formatDate(a.pubDate)}</span>
                  </div>
                </div>
                {a.image && (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", margin: "0 -20px", overflow: "hidden", maxHeight: 160 }}>
                    <img src={a.image} alt={a.title} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} onError={e => { e.target.style.display = "none"; }} />
                  </a>
                )}
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.bright, lineHeight: 1.5, fontFamily: font }}>{decodeEntities(a.title || "")}</div>
                </a>
                {desc
                  ? <div style={{ fontSize: 13, color: T.dim, lineHeight: 1.75, fontFamily: font }}>{desc}</div>
                  : GOOGLE_NEWS_FEEDS.has(a.source)
                    ? <div style={{ fontSize: 11, color: T.muted, fontFamily: font, fontStyle: "italic" }}>Headline only — no summary available.</div>
                    : PAYWALLED_SOURCES.has(a.source)
                      ? <div style={{ fontSize: 11, color: T.muted, fontFamily: font, fontStyle: "italic" }}>🔒 Paywalled — click to read full article.</div>
                      : null
                }
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: col, fontFamily: font, fontWeight: 600, textDecoration: "none", marginTop: "auto" }}>Read full article →</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── CMSTab ───────────────────────────────────────────────────────────────────
function CMSTab() {
  const T = useT();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState(null);

  const KNOWN_CIRCULARS = [
    { title: "⚡ CMS Industry Indaba 2026 — Day 2 UNDERWAY TODAY (14 May) — Sustainability, Value-Based Care & Strategic Purchasing", link: "https://www.medicalschemes.co.za/registration-for-the-2026-cms-industry-indaba-is-now-open/", pubDate: "14 May 2026", description: "The CMS Industry Indaba 2026 concludes TODAY (Day 2, 14 May) at the Sandton Convention Centre. Day 2 focuses on sustainability, innovation, value-based care and strategic purchasing. Yesterday (Day 1, 13 May) Minister Motsoaledi keynoted on Section 59 Reform (Circular 10 directives now in effect), and Retired Chief Justice Sandile Ngcobo — who chaired the Health Market Inquiry (2014–2019) and the Phala Phala Section 89 panel (2022) — keynoted on Regulation, Fairness and Sustainability. The Gala Dinner took place last night (13 May) — formal black-tie event. The Indaba marks the culmination of Section 59 and the transition from findings to implementation framework.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Indaba" },
    { title: "🆕 Circular 14 of 2026: PMB Definition Guideline Development — Call for Clinical Advisory Committee Experts", link: "https://www.medicalschemes.co.za/", pubDate: "May 2026", description: "The CMS has published Circular 14 of 2026 on the development of a Prescribed Minimum Benefit (PMB) Definition Guideline, and invites stakeholders to nominate experts to participate in the Clinical Advisory Committee (CAC). The CAC supports the development of PMB guidance and recommendations to the Minister of Health as part of the ongoing PMB benefit definition project — a core regulatory function affecting all 14+ medical scheme clients administered by Medscheme. Nominations must include a comprehensive CV and a brief motivation, submitted to pmbreview@medicalschemes.co.za.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 13 of 2026: Financial Annual Statutory Returns for the financial year ended 31 December 2025 — Submission Due 29 May 2026", link: "https://www.medicalschemes.co.za/latest-publication/circular-13-of-2026-financial-annual-statutory-returns-for-the-financial-year-ended-31-december-2025/", pubDate: "16 Apr 2026", description: "The CMS has finalised the 2025 Financial Annual Statutory Return online system. Electronic submission via the statutory return portal must occur by 29 May 2026. Critical compliance date for all medical scheme administrators including Medscheme.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 12 of 2026: Notification of registration of medical schemes", link: "https://www.medicalschemes.co.za/latest-publication/circular-12-of-2026-notification-of-registration-of-medical-schemes/", pubDate: "Mar 2026", description: "The CMS confirms the publication of the list of medical schemes registered for 2026, as detailed in Government Gazette Notice No. 54417.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 11 of 2026: CMS Industry Indaba 2026 Announcement", link: "https://www.medicalschemes.co.za/registration-for-the-2026-cms-industry-indaba-is-now-open/", pubDate: "12 Mar 2026", description: "Formal announcement of the CMS Industry Indaba 2026 at Sandton Convention Centre, 13-14 May 2026.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Indaba" },
    { title: "Circular 10 of 2026: Implementation of the Section 59 Final Investigation Report — Immediate Directives, Transitional Expectations and Sector-Wide Corrections", link: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", pubDate: "17 Mar 2026", description: "This Circular communicates the CMS' immediate regulatory expectations following the Section 59 Investigation Report. Sets directives on fraud, waste and abuse processes and transitional measures pending the Universal Code of Conduct. Central agenda item at the Indaba. Now in effect.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Investigation" },
    { title: "Circular 9 of 2026: Financial Annual Statutory Returns for 2025", link: "https://www.medicalschemes.co.za/latest-publication/circular-9-of-2026-financial-annual-statutory-returns-for-2025/", pubDate: "13 Mar 2026", description: "Update on the expected go-live and submission dates for the 2025 FASR. Anticipated submission date is 29 May 2026.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 7 of 2026: Categorisation of assets in terms of Annexure B to the Regulations of the Medical Schemes Act", link: "https://www.medicalschemes.co.za/latest-publication/circular-7-of-2026-categorisation-of-assets-in-terms-of-annexure-b-to-the-regulations-of-the-medical-schemes-act/", pubDate: "2 Mar 2026", description: "The CMS publishes guidelines on categorising assets in terms of Regulation 30 of the Medical Schemes Act.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 2 of 2026: Adjustment of fees payable to brokers with effect from 1 January 2026", link: "https://www.medicalschemes.co.za/latest-publication/circular-2-of-2026-adjustment-of-fees-payable-to-brokers-with-effect-from-1-january-2026/", pubDate: "29 Jan 2026", description: "Maximum broker fees adjusted to R125.86 per month plus VAT, effective 1 January 2026.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Section 44 Investigation: Bonitas Medical Fund — CMS Forensic Probe (ONGOING)", link: "https://www.moonstone.co.za/bonitas-medscheme-split-what-the-cms-probe-means-for-members/", pubDate: "Feb 2026", description: "CMS confirmed Section 44 investigation into Bonitas focused on specific historical procurement decisions. Does not prevent the Momentum appointment on 1 June 2026. The probe is separate from Bonitas' operational transition. CMS does not believe the RFP outcome implementation undermines its investigation.", source: "CMS / Moonstone", publisher: "Council for Medical Schemes", category: "CMS Investigation" },
    { title: "Circular 24 of 2025: Guidance on contribution increases and benefits changes for 2026", link: "https://www.medicalschemes.co.za/latest-publication/circular-24-of-2025-guidance-on-contribution-increases-and-benefits-changes-for-2026/", pubDate: "1 Sep 2025", description: "CMS recommends that contribution increases for 2026 be limited to 3.3% plus reasonable utilisation estimates.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
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

// ─── App ──────────────────────────────────────────────────────────────────────
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

  const CUSTOM_TABS = new Set(["insights", "cms"]);

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
            <div className="header-subtitle" style={{ fontSize: 9, color: T.muted, letterSpacing: "1.5px" }}>AfroCentric GROUP · NEWS & INTELLIGENCE MONITOR — JSE:ACT</div>
          </div>
          <button onClick={() => setIsDark(d => !d)} style={{
            background: "transparent", border: `1px solid ${T.border2}`, color: T.dim,
            fontSize: 9, letterSpacing: "1.5px", padding: "5px 14px", cursor: "pointer",
            fontFamily: mono, transition: "all 0.15s", flexShrink: 0,
          }}>
            {isDark ? "☀ LIGHT" : "☾ DARK"}
          </button>
        </div>

        {/* TABS */}
        <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", overflowX: "auto" }}>
          {QUERIES.map(q => (
            <button key={q.id} className="tab-btn" onClick={() => setActiveId(q.id)} style={{
              background: "transparent",
              color: activeId === q.id ? T.blue : T.muted,
              border: "none", borderBottom: activeId === q.id ? `2px solid ${T.blue}` : "2px solid transparent",
              padding: "12px 16px", cursor: "pointer",
              fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif",
              fontSize: 12, fontWeight: 500, letterSpacing: "-0.1px", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s",
            }}>
              <span style={{ color: activeId === q.id ? T.green : T.muted, fontSize: 13 }}>{q.icon}</span>
              {q.label.toUpperCase()}
              {results[q.id] && (
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: sentimentColor(results[q.id]?.overallSentiment, T), flexShrink: 0 }} />
              )}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="body-pad" style={{ padding: "20px 24px", maxWidth: 1200, margin: "0 auto" }}>
          {activeId === "cms"      && <CMSTab />}
          {activeId === "insights" && <InsightsTab articles={sharedArticles} loading={sharedLoading} onRefresh={fetchFeeds} />}

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
                  { label: "LAST UPDATED",       value: "14 May 2026",          color: T.muted },
                ].map((s, i) => (
                  <div key={i} style={{ background: T.surface, padding: "14px 24px", flex: 1 }}>
                    <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 8, fontFamily: mono }}>{s.label}</div>
                    <div style={{ fontSize: i === 2 ? 14 : 20, fontWeight: 700, color: s.color, fontFamily: mono }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: T.surface, borderLeft: `3px solid ${T.green}`, border: `1px solid ${T.border}`, padding: "14px 20px", marginBottom: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 6, fontFamily: mono }}>INTELLIGENCE SUMMARY — 14 MAY 2026</div>
                <div style={{ fontSize: 15, color: T.bright, lineHeight: 1.7, fontFamily: font }}>{data.oneLiner}</div>
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
                    {(data.watchPoints || []).map((w, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                        <span style={{ color: w.startsWith("⚡") ? T.red : w.startsWith("🔴") ? T.red : w.startsWith("🟢") ? T.green : T.yellow, flexShrink: 0 }}>{w.startsWith("⚡") ? "⚡" : w.startsWith("🔴") ? "🔴" : w.startsWith("🟢") ? "🟢" : "▲"}</span>
                        <span style={{ fontSize: 13, color: (w.startsWith("⚡") || w.startsWith("🔴")) ? T.bright : T.dim, lineHeight: 1.75, fontFamily: font, fontWeight: (w.startsWith("⚡") || w.startsWith("🔴")) ? 600 : 400 }}>{w.replace("⚡ ", "").replace("🔴 ", "").replace("🟢 ", "")}</span>
                      </div>
                    ))}
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
            <span style={{ fontSize: 9, color: T.muted, letterSpacing: "1px", fontFamily: mono }}>SA HEALTH NEWS: LIVE · INTELLIGENCE TABS: UPDATED 14 MAY 2026</span>
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