import { useState, useEffect, createContext, useContext } from "react";

const DARK = {
  bg: "#070809", surface: "#0D1014", panel: "#111519",
  border: "#1A2028", border2: "#232C36", muted: "#3D4F61",
  dim: "#6B7F93", text: "#D6E4F0", bright: "#EEF6FF",
  green: "#00C48C", yellow: "#D4A017", red: "#E03050",
  blue: "#3A9EFF", purple: "#9B6DFF",
};

const LIGHT = {
  bg: "#F5F7FA", surface: "#FFFFFF", panel: "#EEF1F6",
  border: "#D4DAE4", border2: "#C2CAD6", muted: "#7A8CA0",
  dim: "#4A5A6A", text: "#1A2A3A", bright: "#0A1520",
  green: "#007A5E", yellow: "#8A6800", red: "#B02040",
  blue: "#1A6ED4", purple: "#6040C0",
};

const ThemeCtx = createContext(DARK);
const useT = () => useContext(ThemeCtx);

const QUERIES = [
  { id: "sahealth",    label: "SA Health News",      icon: "⊞", query: "South Africa healthcare news public health system hospitals 2025 2026" },
  { id: "general",     label: "AfroCentric Buzz",    icon: "◈", query: "AfroCentric Group South Africa 2026 news public discussion opinions" },
  { id: "financial",   label: "Financial Buzz",      icon: "◎", query: "AfroCentric Group JSE ACT share price results investor reaction 2025 2026" },
  { id: "nhi",         label: "NHI & Policy",        icon: "⬡", query: "AfroCentric NHI National Health Insurance South Africa 2025 2026 public opinion" },
  { id: "medscheme",   label: "Medscheme Chatter",   icon: "◇", query: "Medscheme AfroCentric complaints reviews member opinions 2025 2026" },
  { id: "employer",    label: "Employer Reputation", icon: "◉", query: "AfroCentric Group employer culture employee reviews 2025 South Africa" },
  { id: "competitors", label: "Competitor Intel",    icon: "⊕", query: "Discovery Health Momentum Health BestMed Bonitas Medihelp South Africa medical scheme 2025 2026 news strategy" },
];

const STATIC_DATA = {
  general: {
    overallSentiment: "NEGATIVE", sentimentScore: 34, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "AfroCentric is dominating SA healthcare headlines for all the wrong reasons — a R1.27bn basic loss, the loss of Bonitas after 44 years, and an unresolved High Court battle are defining the group's public narrative in early 2026.",
    themes: [
      {
        theme: "FY2025 Results — Loss Despite Revenue Surge",
        sentiment: "NEGATIVE",
        what: "Revenue from continuing operations surged 93.9% to R7.3bn, but asset impairments of ~R1.59bn — covering Activo, Pharmacy Direct and TendaHealth — pushed the group to a R1.27bn basic loss (151.55c per share). No dividend was declared. Headline earnings recovered to R117.1m, but markets focused on the bottom line.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/"},{name:"Business Explainer",url:"https://businessexplainer.co.za/companies/2026/03/04/afrocentric-swings-to-r1-27bn-loss-following-aggressive-asset-impairments/"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The revenue growth is real but the impairments wiped it out. Markets are asking whether this restructuring is nearly over or just beginning."
      },
      {
        theme: "Bonitas Loss — 44-Year Relationship Ends",
        sentiment: "NEGATIVE",
        what: "Bonitas appointed Momentum Health as its new administrator and PHA for managed care, effective 1 June 2026 — ending Medscheme's relationship with Bonitas since 1982. Medscheme's urgent court application was removed from the urgent roll on 3 March after its replying affidavit was late. AfroCentric confirmed it will continue litigation. Bonitas contributes approximately 40% of Medscheme's administration income.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medschemes-case-against-bonitas-off-urgent-roll/"},{name:"Business Day",url:"https://www.businessday.co.za/news/health/2026-03-04-medschemes-tenders-case-against-bonitas-removed-from-roll/"}],
        representative_voice: "Losing Bonitas after 44 years is not just a financial blow — it's a reputational signal that Medscheme's dominant position is no longer untouchable."
      },
      {
        theme: "Portfolio Restructuring — Activo Disposal Progressing",
        sentiment: "NEUTRAL",
        what: "AfroCentric has published detailed terms for the disposal of Activo and its subsidiaries. ADS Group and Wellworx have already been absorbed by Sanlam Health. The focus on core health administration and managed care is strategically coherent but the transition costs have been severe.",
        sources: [{name:"AfroCentric SENS",url:"https://www.jse.co.za/current-companies/company-announcements"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The simplified structure makes sense long-term, but the market is still digesting the price of getting there."
      },
      {
        theme: "Sanlam Control — Strategic Independence Questions",
        sentiment: "CAUTIOUS",
        what: "With Sanlam holding 59% and absorbing AfroCentric's corporate solutions division, questions persist about strategic independence for the listed entity. The Sanlam-AfroCentric relationship is described as synergistic by management, but minority shareholders note AfroCentric is increasingly a Sanlam subsidiary in practice.",
        sources: [{name:"Yahoo Finance",url:"https://finance.yahoo.com/quote/ACT.JO/"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"},{name:"AfroCentric IAR",url:"https://www.afrocentric.za.com"}],
        representative_voice: "Sanlam's footprint in AfroCentric keeps growing — at what point does the JSE listing become a formality?"
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "ACT hit 90 ZAC in February — an all-time low. Even the modest recovery to 124 ZAC is -38% over the past year. The market hasn't forgiven the impairments or the Bonitas loss." },
      { type: "Media", sentiment: "negative", quote: "The Bonitas split ends a 44-year relationship and hands Momentum Health over 750,000 new beneficiaries — a direct competitor gain at AfroCentric's expense." },
      { type: "Analyst", sentiment: "cautious", quote: "Headline earnings of R117m on R7.3bn revenue is thin but it shows the core business is intact. The question is what happens when Bonitas rolls off in June." },
    ],
    watchPoints: [
      "Bonitas transition to Momentum — effective 1 June 2026, Medscheme loses ~680,000 beneficiaries",
      "High Court litigation restart — matter to be re-enrolled once interlocutory issues resolved",
      "ACT.JO recovery — 52-week range 90–188 ZAC, currently near lower end",
      "Activo disposal finalisation — remaining impairment exposure to be confirmed"
    ],
    sourceCount: 18,
  },

  financial: {
    overallSentiment: "NEGATIVE", sentimentScore: 26, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "JSE:ACT hit an all-time low of 90 ZAC in February 2026, recovered modestly to 124 ZAC, but remains down 38% year-on-year as investors price in the Bonitas revenue loss, no dividend, and a R1.27bn basic loss.",
    themes: [
      {
        theme: "Share Price at Historic Lows",
        sentiment: "NEGATIVE",
        what: "ACT.JO reached its all-time low of 90 ZAC on 19 February 2026, against an all-time high of 695 ZAC in 2017. As of early March the stock was at 124 ZAC with a 52-week range of 90–188 ZAC. Market cap stands at approximately R914m. The stock is down 38% over the past year and -22% over the past week from peak.",
        sources: [{name:"TradingView",url:"https://www.tradingview.com/symbols/JSE-ACT/"},{name:"Investing.com ZA",url:"https://za.investing.com/equities/afrocentric-investment-corp"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The all-time low of 90c tells the full story. This is a market pricing in the loss of Bonitas, the impairments, and deep uncertainty about the path forward."
      },
      {
        theme: "FY2025 Results — Loss Before Tax of R532m",
        sentiment: "NEGATIVE",
        what: "Loss before tax of R532m versus a prior profit of R225m. Basic loss R1.27bn (151.55c/share). Headline earnings R117.1m (13.92c/share). Revenue R7.3bn, up 93.9%. No dividend declared vs 6c in the prior period. Impairments of ~R1.59bn included Pharmacy Direct goodwill, Activo and TendaHealth assets.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/"},{name:"AfroCentric AFS 2025",url:"https://www.afrocentric.za.com"},{name:"Business Explainer",url:"https://businessexplainer.co.za/companies/2026/03/04/afrocentric-swings-to-r1-27bn-loss-following-aggressive-asset-impairments/"}],
        representative_voice: "The headline loss of 151c/share is largely non-cash due to impairments — but try explaining that to a retail investor watching the share hit 90c."
      },
      {
        theme: "Bonitas Revenue Cliff — June 2026",
        sentiment: "NEGATIVE",
        what: "Bonitas contributes ~40% of Medscheme's administration income. The administration agreement ends 31 May 2026. Momentum Health gains 750,000+ beneficiaries from the transition. The financial impact on FY2026 earnings will be material and is not yet fully priced in by the market.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/"},{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"},{name:"Business Day",url:"https://www.businessday.co.za/news/2026-02-02-bonitas-pushes-back-against-medscheme-court-bid-over-lost-contracts/"}],
        representative_voice: "The 40% income concentration on a single client that you are now losing is the kind of risk that should have been disclosed more prominently years ago."
      },
      {
        theme: "Sanlam Relationship — Backstop or Overhang?",
        sentiment: "MIXED",
        what: "Sanlam's 59% stake provides a financial backstop and strategic alignment, but the absorption of ADS and Wellworx by Sanlam Health raises questions about value leakage from the listed entity. Minority shareholders note that AfroCentric's strategic optionality is increasingly constrained.",
        sources: [{name:"AfroCentric AFS 2025",url:"https://www.afrocentric.za.com"},{name:"Yahoo Finance",url:"https://finance.yahoo.com/quote/ACT.JO/"}],
        representative_voice: "Sanlam is the anchor but also the ceiling — minority shareholders are along for whatever ride Sanlam decides to take."
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "No dividend, R1.59bn in impairments, and now the Bonitas contract ending. The FY2026 income statement is going to look very different." },
      { type: "Analyst", sentiment: "cautious", quote: "Headline earnings of R117m on a R7.3bn base is thin but survivable. The real test is what the income statement looks like after Bonitas rolls off." },
      { type: "Media", sentiment: "negative", quote: "ACT.JO is down 38% year-on-year. The market has spoken clearly about what it thinks of this restructuring." },
    ],
    watchPoints: [
      "FY2026 interim results — first set of numbers showing Bonitas revenue impact",
      "ACT.JO share price — watch 110 ZAC as key support level",
      "Dividend reinstatement — management has not guided on timeline",
      "CMS section 44 investigation outcome — could affect litigation position"
    ],
    sourceCount: 13,
  },

  nhi: {
    overallSentiment: "CAUTIOUS", sentimentScore: 44, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "AfroCentric is publicly NHI-supportive but operationally hedging — Pharmacy Direct's CCMDD footprint and Medscheme's GEMS/Polmed contracts position the group inside public health delivery, while the NHI funding model remains entirely unresolved.",
    themes: [
      {
        theme: "NHI Funding Model — Still No Answer",
        sentiment: "CAUTIOUS",
        what: "The NHI Act remains law but Treasury has not published a costed implementation plan. Constitutional Court challenges are in progress. AfroCentric's 2025 IAR acknowledges NHI as a long-term structural factor but provides no specific implementation scenario planning, reflecting sector-wide uncertainty.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"NDoH",url:"https://www.health.gov.za"}],
        representative_voice: "The Act is law in name only until there is a funded benefit package and a credible rollout timeline. No one in the private sector can plan meaningfully until then."
      },
      {
        theme: "Public Sector Footprint as NHI Hedge",
        sentiment: "POSITIVE",
        what: "Pharmacy Direct administers CCMDD scripts for the NDoH — one of the largest public-private drug delivery partnerships in SA. Medscheme administers GEMS (government employees) and Polmed. These contracts position AfroCentric as already embedded in the public health system, regardless of NHI sequencing.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"AfroCentric website",url:"https://www.afrocentric.za.com"}],
        representative_voice: "AfroCentric already does NHI-style delivery at scale through CCMDD and GEMS. That is a genuine moat if the policy ever matures."
      },
      {
        theme: "Digital Health as NHI Readiness Signal",
        sentiment: "POSITIVE",
        what: "Black Book Market Research's 2026 SA digital health report identifies HPRS alignment and interoperability as core NHI readiness criteria. AfroCentric Technologies is building toward FHIR R4 compliance. The group's 2030 strategic intent explicitly references NHI preparation as a driver of its digital investment.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"Black Book 2026",url:"https://blackbookmarketresearch.com/south-africa-state-of-acute-care-ehr-and-digital-health-care-2026"}],
        representative_voice: "The digital infrastructure AfroCentric is building is exactly what NHI will need — the question is whether NHI will arrive before or after the capital runs out."
      },
    ],
    topVoices: [
      { type: "Regulator", sentiment: "neutral", quote: "CMS section 44 investigation into Bonitas governance is a reminder that regulatory capacity to police medical schemes at NHI scale remains a key implementation question." },
      { type: "Analyst", sentiment: "positive", quote: "AfroCentric's dual public-private positioning is the most credible NHI hedge in the SA healthcare sector." },
      { type: "Media", sentiment: "cautious", quote: "NHI implementation at scale remains a 2030+ prospect at best. The private sector should plan for a dual system for at least a decade." },
    ],
    watchPoints: [
      "Constitutional Court NHI challenge outcome — mid-2026 hearings expected",
      "NHI benefit package release — still outstanding, critical for private sector planning",
      "CCMDD contract renewal — core to AfroCentric's public sector revenue base",
      "FHIR R4 compliance deadline 2027 — AfroCentric Technologies readiness"
    ],
    sourceCount: 9,
  },

  medscheme: {
    overallSentiment: "NEGATIVE", sentimentScore: 31, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "Medscheme is facing its most significant crisis in decades — the loss of Bonitas after 44 years, a stalled High Court case, and CMS regulatory scrutiny are converging on the country's largest medical scheme administrator.",
    themes: [
      {
        theme: "Bonitas Contract Lost — Momentum Takes Over June 2026",
        sentiment: "NEGATIVE",
        what: "On 29 January 2026, Bonitas announced Momentum Health as its new administrator and PHA for managed care, effective 1 June 2026 — ending Medscheme's 44-year relationship. Medscheme administers 680,000 Bonitas beneficiaries. Momentum CEO Hannes Viljoen confirmed the deal adds 750,000+ beneficiaries to Momentum's book, bringing its total to 3.3 million in Africa.",
        sources: [{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"},{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/"},{name:"Business Day",url:"https://www.businessday.co.za/news/health/2026-03-04-medschemes-tenders-case-against-bonitas-removed-from-roll/"}],
        representative_voice: "Losing Bonitas is not just about the numbers. Medscheme has been Bonitas' administrator since 1982 — this is a fundamental disruption to a relationship that defined the industry."
      },
      {
        theme: "High Court Case — Removed from Urgent Roll",
        sentiment: "NEGATIVE",
        what: "Medscheme's urgent application was removed from the roll on 3 March 2026 after its replying affidavit was filed late and remains incomplete (1,200+ page file). AfroCentric confirmed it will not withdraw the litigation and will re-enrol when ready. Bonitas argues the matter is moot since tenders were already awarded. PHA has also opposed the application.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medscheme-bonitas-tender-battle-escalates/"},{name:"Business Day",url:"https://www.businessday.co.za/news/2026-02-02-bonitas-pushes-back-against-medscheme-court-bid-over-lost-contracts/"}],
        representative_voice: "The case has become a war of attrition. Medscheme missed the deadline, Bonitas says the contracts are signed, and the members are caught in the middle."
      },
      {
        theme: "Whistleblower Evidence and Project StepAhead",
        sentiment: "NEGATIVE",
        what: "Medscheme director Gerald van Wyk confirmed in court papers that the company holds whistleblower documents — first reported by journalist Michael Avery in Business Day — alleging that former AfroCentric executives and Bonitas insiders shaped RFP documents to advantage specific bidders under a restructuring drive called Project StepAhead. Former AfroCentric executive Tobie du Preez features centrally.",
        sources: [{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medscheme-bonitas-tender-battle-escalates/"},{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"},{name:"Business Day",url:"https://www.businessday.co.za/news/2026-02-02-bonitas-pushes-back-against-medscheme-court-bid-over-lost-contracts/"}],
        representative_voice: "The whistleblower evidence is the most damaging element of Medscheme's case — if it holds up in court, this is not just a procurement dispute, it is a governance scandal."
      },
      {
        theme: "Scale and Data Assets Remain Intact",
        sentiment: "POSITIVE",
        what: "Despite the Bonitas loss, Medscheme still administers 4.08 million lives across 14 medical scheme clients including GEMS, Polmed, and Fedhealth. The automated hospital pre-authorisation system is live across major hospital groups. The data depth across 12 million monthly claims remains a structural asset.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"BHF",url:"https://www.bhfglobal.com/bhf-conferences/afrocentric-health/"}],
        representative_voice: "Medscheme's scale and data are irreplaceable in the short term. Losing Bonitas hurts, but the business is not broken — the question is what they do next."
      },
    ],
    topVoices: [
      { type: "Member", sentiment: "mixed", quote: "I just want to know my benefits are safe through the transition. The legal fight between Medscheme and Bonitas is confusing and unsettling for ordinary members." },
      { type: "Media", sentiment: "negative", quote: "The removal from the urgent roll was a procedural embarrassment for Medscheme — missing a filing deadline in the biggest case in SA medical scheme history." },
      { type: "Analyst", sentiment: "cautious", quote: "The 40% income concentration on Bonitas was always a risk. Now that risk has materialised. Medscheme's remaining book is still formidable, but the FY2026 numbers will be ugly." },
    ],
    watchPoints: [
      "Bonitas transition date — 1 June 2026, 680,000 beneficiaries move to Momentum",
      "High Court re-enrolment — Medscheme must resolve interlocutory issues before new date",
      "CMS section 44 investigation outcome — findings could support or undermine Medscheme's case",
      "GEMS and Polmed contract renewals — next most important administration relationships"
    ],
    sourceCount: 19,
  },

  employer: {
    overallSentiment: "MIXED", sentimentScore: 52, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "AfroCentric retains its Top Employer 2025 certification and is actively hiring for 2026 internships, but the Activo exit, Bonitas crisis, and Sanlam integration are creating visible uncertainty among employees in affected divisions.",
    themes: [
      {
        theme: "Top Employer Certification Retained",
        sentiment: "POSITIVE",
        what: "AfroCentric retained its Top Employer South Africa 2025 certification from the Top Employers Institute. LinkedIn employee engagement around the certification is positive, with pride in development programmes and healthcare mission frequently cited.",
        sources: [{name:"Top Employers Institute",url:"https://www.top-employers.com"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "Top Employer status means something in healthcare. It helps attract clinical and technology talent in a competitive market."
      },
      {
        theme: "2026 Internship Programme — Active Recruitment",
        sentiment: "POSITIVE",
        what: "AfroCentric launched its 12-month 2026 Internship Programme focused on pre-authorisation, managed care operations, and clinical decision-making. The programme reflects a commitment to graduate pipeline development and healthcare transformation, with preference for underrepresented equity candidates.",
        sources: [{name:"EduStudent",url:"https://edustudent.co.za/afrocentric-group-internship-programme-2026/"},{name:"AfroCentric careers",url:"https://www.afrocentric.za.com"}],
        representative_voice: "The internship programme is one of the most structured healthcare entry points in SA. Graduates in managed care are genuinely sought after."
      },
      {
        theme: "Restructuring Uncertainty — Activo and Sanlam Integration",
        sentiment: "MIXED",
        what: "The Activo disposal and transfer of ADS Group and Wellworx to Sanlam Health have created anxiety in affected divisions. LinkedIn shows some departures, particularly in the Corporate Solutions cluster. The Sanlam integration requires cultural alignment across two distinct organisations.",
        sources: [{name:"LinkedIn",url:"https://www.linkedin.com/company/afrocentric-group"},{name:"AfroCentric AFS 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "The restructuring was strategically necessary but communication to affected employees has been uneven. People in divested divisions are understandably anxious."
      },
      {
        theme: "Talent Retention in Technology Functions",
        sentiment: "CAUTIOUS",
        what: "AfroCentric Technologies is a talent-intensive division building AI diagnostics, automated authorisation systems and FHIR interoperability. Market competition for health technology talent in South Africa is intensifying as private equity-backed health tech startups scale. Retention risk in this cohort is elevated.",
        sources: [{name:"Pnet job listings",url:"https://www.pnet.co.za/cmp/en/afrocentric-group-60732/jobs"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "The digital work at AfroCentric Technologies is genuinely exciting, but health tech startups offer equity that a JSE-listed subsidiary cannot easily match."
      },
    ],
    topVoices: [
      { type: "Employee", sentiment: "positive", quote: "The clinical technology work we are doing — automated authorisations, AI diagnostics — is the most impactful work in SA healthcare IT right now." },
      { type: "Employee", sentiment: "mixed", quote: "The Bonitas situation has created real uncertainty about what the workforce will look like in the second half of 2026. Some people are quietly updating their CVs." },
      { type: "Media", sentiment: "positive", quote: "AfroCentric's Top Employer retention is notable given the scale of the restructuring and the Bonitas crisis unfolding simultaneously." },
    ],
    watchPoints: [
      "Workforce impact of Bonitas transition — headcount reduction risk in Medscheme admin teams",
      "Technology talent retention — health tech competition intensifying in SA",
      "Sanlam cultural integration — ADS and Wellworx staff moved into Sanlam Health",
      "Graduate pipeline — 2026 internship cohort quality as a leading indicator"
    ],
    sourceCount: 10,
  },

  digital: {
    overallSentiment: "POSITIVE", sentimentScore: 66, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "AfroCentric Technologies is building credible digital infrastructure — automated hospital authorisations are live, Microsoft Azure cloud migration is progressing, and AI diagnostics development continues — but SA's broader digital health market is accelerating faster than any single player.",
    themes: [
      {
        theme: "Automated Hospital Pre-Authorisation — Live",
        sentiment: "POSITIVE",
        what: "AfroCentric Technologies has deployed an automated pre-authorisation system across major hospital groups, reducing turnaround from hours to minutes. This is a direct operational AI deployment with measurable outcomes — fewer manual reviews, faster member service, and reduced fraud risk.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"Microsoft Customer Story",url:"https://www.microsoft.com/en/customers/story/1474631301821028162-afrocentric-health-payor-microsoft-365-en-south-africa"}],
        representative_voice: "This is the kind of AI that actually matters in SA healthcare — not a demo, a live production system processing real authorisations at scale."
      },
      {
        theme: "Microsoft Azure Cloud Migration",
        sentiment: "POSITIVE",
        what: "AfroCentric completed a significant portion of its cloud migration to Microsoft Azure, enabling data sovereignty, improved analytics capability, and remote workforce enablement. The migration supports the group's 2030 Health Digital Business strategic intent. Data monetisation for clinical insights is a stated future objective.",
        sources: [{name:"Microsoft Customer Story",url:"https://www.microsoft.com/en/customers/story/1474631301821028162-afrocentric-health-payor-microsoft-365-en-south-africa"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "The cloud migration was years overdue but the execution has been solid. The real prize is what they do with the data now that it is accessible."
      },
      {
        theme: "SA Digital Health Market — Two-Speed Race",
        sentiment: "CAUTIOUS",
        what: "Black Book Market Research's 2026 SA Digital Health report identifies a two-speed market — private sector accelerating while public sector lags. HPRS alignment, FHIR R4 interoperability, POPIA compliance and AI governance are the six defining imperatives shaping SA acute care IT in 2026. AfroCentric is well-positioned in private sector interoperability but faces competition from MEDITECH, InterSystems and Altron HealthTech.",
        sources: [{name:"Black Book Market Research 2026",url:"https://blackbookmarketresearch.com/south-africa-state-of-acute-care-ehr-and-digital-health-care-2026"}],
        representative_voice: "AfroCentric Technologies has the patient data and the clinical relationships. But the digital health market is getting competitive fast — standing still is not an option."
      },
      {
        theme: "AI Diagnostics and Value-Based Care",
        sentiment: "POSITIVE",
        what: "AfroCentric's 2030 strategic intent explicitly targets AI diagnostics and value-based care as core capabilities. R67m was invested in actuarial and clinical capability in FY2025. The shift from fee-for-service to value-based models is the direction the global market is moving, and AfroCentric is building toward it.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "Value-based care requires data, clinical capability and scale. AfroCentric has all three — the question is whether the financial position allows them to invest at the pace required."
      },
    ],
    topVoices: [
      { type: "Analyst", sentiment: "positive", quote: "AfroCentric Technologies connecting millions of members, doctors and hospitals is a genuine network effect. No competitor can replicate that data depth quickly." },
      { type: "Employee", sentiment: "positive", quote: "The AI diagnostics and cloud work is the most technically interesting healthcare IT work in SA. The mission is real." },
      { type: "Media", sentiment: "cautious", quote: "SA's digital health market is moving fast in 2026. AfroCentric's digital ambitions are credible but the financial headwinds risk slowing investment." },
    ],
    watchPoints: [
      "FHIR R4 compliance — NDoH HPRS 2027 deadline, AfroCentric Technologies readiness",
      "AI diagnostics clinical validation and SAHPRA regulatory pathway",
      "Azure data monetisation — when will clinical data insights become a revenue line?",
      "Black Book 2026 SA digital health rankings — how does AfroCentric Technologies score?"
    ],
    sourceCount: 11,
  },

  competitors: {
    overallSentiment: "MIXED", sentimentScore: 57, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "Momentum Health is the biggest winner of 2026 so far — gaining 750,000 Bonitas beneficiaries. Discovery maintains platform dominance. BestMed and Medihelp are benefiting from open-scheme stability. The competitive landscape has shifted materially against AfroCentric in three months.",
    themes: [
      {
        theme: "Momentum Health — Major Winner",
        sentiment: "POSITIVE",
        what: "Momentum Health CEO Hannes Viljoen confirmed the Bonitas administration award adds 750,000+ beneficiaries, bringing its total African book to 3.3 million and worldwide to 25 million. This is the largest single administrator transition in SA medical scheme history. Momentum now manages more lives than any private administrator except Medscheme.",
        sources: [{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"},{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/"},{name:"Business Day",url:"https://www.businessday.co.za/news/health/2026-03-04-medschemes-tenders-case-against-bonitas-removed-from-roll/"}],
        representative_voice: "Momentum's Bonitas win is transformative. In one transaction they have closed the gap with Medscheme dramatically and gained a scale platform to compete for more contracts."
      },
      {
        theme: "Discovery Health — Platform Dominance Continues",
        sentiment: "POSITIVE",
        what: "Discovery Health administers over 3.7 million lives. Its Vitality behavioural platform, HealthID digital record and Apple Watch integrations continue to reinforce premium member stickiness. Discovery is not directly affected by the Bonitas dispute — it operates on a different tier and does not administer Bonitas.",
        sources: [{name:"Discovery Annual Results 2025",url:"https://www.discovery.co.za/info/2025annualresults"},{name:"Business Day",url:"https://www.businessday.co.za"}],
        representative_voice: "Discovery is watching the Medscheme-Bonitas drama from a comfortable distance. Their data network and Vitality moat are untouched."
      },
      {
        theme: "Private Health Administrators (PHA) — Emerging Player",
        sentiment: "POSITIVE",
        what: "PHA won the Bonitas managed care contract alongside Momentum's administration win. PHA already administers Bonitas' BonCap option (since 2022). The CMS section 44 investigation into how PHA won the earlier BonCap contract is ongoing, but PHA is proceeding with implementation pending legal resolution.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-split-what-the-cms-probe-means-for-members/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medscheme-bonitas-tender-battle-escalates/"}],
        representative_voice: "PHA has gone from niche low-income administrator to a player in a R20bn+ contract in two years. That trajectory is remarkable — and it is the subject of an active investigation."
      },
      {
        theme: "BestMed and Medihelp — Stability Premium",
        sentiment: "POSITIVE",
        what: "Both BestMed and Medihelp are reporting strong member retention and NPS scores, partly benefiting from member anxiety around the Bonitas-Medscheme situation. Neither scheme is involved in the dispute. Medihelp's digital platform engagement is up significantly, with the Nectar app reporting higher monthly active users in 2025.",
        sources: [{name:"CMS Annual Report 2025",url:"https://www.medicalschemes.gov.za"},{name:"Medihelp",url:"https://www.medihelp.co.za"}],
        representative_voice: "In a year of industry drama, being a boring, stable open scheme is genuinely a competitive advantage. Members value certainty."
      },
      {
        theme: "Evergreen Contracts — Sector-Wide Governance Shift",
        sentiment: "CAUTIOUS",
        what: "The CMS has repeatedly warned that long-standing 'evergreen' contracts between schemes and service providers undermine governance and competition. The Bonitas decision to run a competitive tender — and the resulting dispute — has put every long-term administration contract in SA under scrutiny. Other schemes may follow with competitive processes.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/"},{name:"CMS",url:"https://www.medicalschemes.gov.za"}],
        representative_voice: "Medscheme's situation is a warning to every healthcare administrator with an evergreen contract. No relationship is too old to be tested by a competitive tender."
      },
    ],
    topVoices: [
      { type: "Analyst", sentiment: "positive", quote: "Momentum's Bonitas win is the single most consequential event in SA medical scheme administration in a decade. It fundamentally reshapes the competitive landscape." },
      { type: "Member", sentiment: "mixed", quote: "I just want certainty about my benefits during the transition. The legal dispute between Medscheme and Bonitas is unsettling — I do not know who is actually responsible for my claims right now." },
      { type: "Regulator", sentiment: "neutral", quote: "CMS does not approve administrator appointments. Schemes are free to contract with any accredited administrator provided a fair process was followed." },
      { type: "Media", sentiment: "cautious", quote: "Every long-term administration contract in SA is now implicitly under review. The CMS governance guidance on evergreen contracts has real teeth after the Bonitas case." },
    ],
    watchPoints: [
      "Bonitas transition to Momentum — 1 June 2026 operational cutover",
      "CMS section 44 investigation — findings could have sector-wide governance implications",
      "Other schemes running competitive tenders — watch GEMS, Polmed, Fedhealth timelines",
      "PHA's managed care contract — regulatory cloud hangs over a fast-growing administrator"
    ],
    sourceCount: 21,
  },

  healthtech: {
    overallSentiment: "POSITIVE", sentimentScore: 67, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "South Africa's health technology market is accelerating along a two-speed path in 2026 — private sector platforms investing in AI, interoperability and digital patient engagement while public sector digitisation lags. FHIR R4 compliance, HPRS alignment and AI governance are the defining priorities.",
    themes: [
      {
        theme: "Two-Speed Digital Health Market",
        sentiment: "CAUTIOUS",
        what: "Black Book Market Research's March 2026 SA Digital Health report identifies a two-speed market — private sector leaders accelerating enterprise platform investment while public sector advances more gradually. Key priorities: patient identity infrastructure, HPRS alignment, POPIA privacy engineering, interoperability governance, and operational resilience as NHI readiness criteria.",
        sources: [{name:"Black Book Market Research 2026",url:"https://blackbookmarketresearch.com/south-africa-state-of-acute-care-ehr-and-digital-health-care-2026"}],
        representative_voice: "SA's digital health market is no longer one market — it is two. The private sector is building for 2026. The public sector is still building for 2020."
      },
      {
        theme: "FHIR R4 and HPRS Interoperability",
        sentiment: "POSITIVE",
        what: "The NDoH's Health Patient Registration System (HPRS) interoperability framework mandates FHIR R4 compliance for systems connecting to the national health data exchange by 2027. AfroCentric Technologies, Discovery and Netcare are at varying stages of compliance. The standard creates the infrastructure for a unified patient record across public and private care.",
        sources: [{name:"Black Book Market Research 2026",url:"https://blackbookmarketresearch.com/south-africa-state-of-acute-care-ehr-and-digital-health-care-2026"},{name:"NDoH HPRS",url:"https://www.health.gov.za"}],
        representative_voice: "FHIR R4 is the plumbing no one talks about publicly but everyone in health IT is scrambling to build. Whoever gets compliant first controls the data layer."
      },
      {
        theme: "AI Clinical Decision Support — Scaling",
        sentiment: "POSITIVE",
        what: "AI triage and clinical decision tools are moving from pilots to production across SA. Discovery Health's AI pre-authorisation engine reduced manual review workload by 35% in Q4 2025 pilots. AfroCentric Technologies' automated authorisation system is live across major hospital groups. Vula Mobile connects 10,000+ community health workers to specialists.",
        sources: [{name:"Discovery Innovation Report",url:"https://www.discovery.co.za/info/2025annualresults"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"Vula Mobile",url:"https://vulamobile.com"}],
        representative_voice: "AI in SA healthcare is not the chatbot kind — it is workflow automation, authorisation processing and triage routing. That is where the real value is."
      },
      {
        theme: "Telemedicine — CMS Recognition Drives Adoption",
        sentiment: "POSITIVE",
        what: "CMS formally recognised virtual consultations as an equivalent benefit in the 2025 benefit year. SA telemedicine consults crossed 4 million annually for the first time in 2025, driven by Kena Health, Hello Doctor and scheme virtual GP benefit expansions. The regulatory unlock is expected to accelerate adoption significantly in 2026.",
        sources: [{name:"CMS Benefit Regulations 2025",url:"https://www.medicalschemes.gov.za"},{name:"Kena Health",url:"https://www.kena.health"}],
        representative_voice: "CMS benefit equivalence was the unlock the industry needed. Now schemes have a commercial reason to invest in virtual care — and members have a reason to use it."
      },
    ],
    topVoices: [
      { type: "Analyst", sentiment: "positive", quote: "SA's health tech ecosystem is genuinely innovative — the constraint environment forces practical solutions that work at population scale. FHIR R4 compliance will be the great differentiator in 2026-2027." },
      { type: "Employee", sentiment: "positive", quote: "Building AI authorisation tools for SA-specific disease burden and benefit structures is harder than it sounds. The clinical complexity is real." },
      { type: "Media", sentiment: "cautious", quote: "The digital health excitement in SA is real, but most of the investment is still flowing to the top 15% of the population. The public sector digital gap is widening." },
      { type: "Regulator", sentiment: "neutral", quote: "CMS is monitoring virtual care quality standards carefully. Benefit equivalence does not mean equivalence of clinical oversight." },
    ],
    watchPoints: [
      "FHIR R4 compliance deadline 2027 — which private players will be ready?",
      "SAHPRA AI as medical device guidance — still outstanding, blocks some clinical AI deployments",
      "NDoH CHW digital platform national rollout — procurement opportunity for health tech vendors",
      "Black Book 2026 SA EHR vendor rankings — full report available for qualified stakeholders"
    ],
    sourceCount: 16,
  },
};


const SOURCE_LINKS = {
  "Business Day":          "https://www.businessday.co.za",
  "Business Explainer":    "https://businessexplainer.co.za",
  "Moneyweb":              "https://www.moneyweb.co.za",
  "Moonstone":             "https://www.moonstone.co.za",
  "Medical Brief":         "https://www.medicalbrief.co.za",
  "Daily Maverick":        "https://www.dailymaverick.co.za",
  "TimesLive":             "https://www.timeslive.co.za",
  "JSE":                   "https://www.jse.co.za",
  "MarketScreener":        "https://www.marketscreener.com",
  "AfroCentric IAR 2025":  "https://www.afrocentric.za.com",
  "AfroCentric AFS 2025":  "https://www.afrocentric.za.com",
  "AfroCentric SENS":      "https://www.jse.co.za/current-companies/company-announcements",
  "AfroCentric website":   "https://www.afrocentric.za.com",
  "NDoH":                  "https://www.health.gov.za",
  "CMS":                   "https://www.medicalschemes.gov.za",
  "BHF":                   "https://www.bhfglobal.com",
  "TradingView":           "https://www.tradingview.com/symbols/JSE-ACT/",
  "Investing.com ZA":      "https://za.investing.com/equities/afrocentric-investment-corp",
  "Yahoo Finance":         "https://finance.yahoo.com/quote/ACT.JO/",
  "Top Employers Institute":"https://www.top-employers.com",
  "LinkedIn":              "https://www.linkedin.com/company/afrocentric-group",
  "Glassdoor":             "https://www.glassdoor.co.za",
  "Vula Mobile":           "https://vulamobile.com",
  "Kena Health":           "https://www.kena.health",
  "Discovery Annual Results 2025": "https://www.discovery.co.za/info/2025annualresults",
  "Momentum Metropolitan Holdings": "https://www.momentummetropolitan.co.za",
  "Black Book Market Research 2026": "https://blackbookmarketresearch.com",
  "Microsoft Customer Story": "https://www.microsoft.com/en/customers/story/1474631301821028162-afrocentric-health-payor-microsoft-365-en-south-africa",
};

const sentimentColor = (s, T) => {
  if (!s || !T) return "#6B7F93";
  const u = s.toUpperCase();
  if (u === "POSITIVE") return T.green;
  if (u === "NEGATIVE") return T.red;
  return T.yellow;
};

const sentimentBg = (s, T) => {
  if (!s || !T) return "transparent";
  const u = s.toUpperCase();
  if (u === "POSITIVE") return `${T.green}12`;
  if (u === "NEGATIVE") return `${T.red}12`;
  return `${T.yellow}12`;
};

const voiceColor = (type, T) => {
  if (!T) return "#6B7F93";
  const m = { Investor: T.blue, Employee: T.green, Member: T.purple, Media: T.yellow, Analyst: T.blue, Regulator: T.red };
  return m[type] || T.dim;
};

const font = "'Inter','Helvetica Neue',Arial,sans-serif";
const mono = "'IBM Plex Mono','Fira Code','Courier New',monospace";



function Spinner() {
  const T = useT();
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20, padding:"80px 0" }}>
      <div style={{ width:36, height:36, border:`2px solid ${T.border2}`, borderTop:`2px solid ${T.green}`, borderRadius:"50%", animation:"spin 0.9s linear infinite" }} />
      <div style={{ fontSize:10, letterSpacing:"3px", color:T.dim, fontFamily:mono }}>SCANNING LIVE DATA</div>
    </div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{ fontSize:9, letterSpacing:"1.5px", padding:"2px 8px", border:`1px solid ${color}55`, color, background:`${color}18`, display:"inline-block", fontFamily:mono }}>
      {label}
    </span>
  );
}

// ── SA HEALTH NEWS — RSS via rss2json (no API key, no credits) ──────────────
const SA_HEALTH_FEEDS = [
  { name: "Bhekisisa",        url: "https://bhekisisa.org/feed/" },
  { name: "Health-e News",    url: "https://health-e.org.za/feed/" },
  { name: "Medical Brief",    url: "https://www.medicalbrief.co.za/feed/" },
  { name: "Spotlight",        url: "https://www.spotlightnsp.co.za/feed/" },
  { name: "Daily Maverick",   url: "https://www.dailymaverick.co.za/category/health/feed/" },
  { name: "News24",           url: "https://feeds.news24.com/articles/health24/HealthNews/rss" },
  { name: "TimesLive",        url: "https://www.timeslive.co.za/rss/" },
  { name: "IOL Health",       url: "https://www.iol.co.za/rss/health" },
  { name: "The Citizen",      url: "https://www.citizen.co.za/feed/" },
  { name: "Moonstone",        url: "https://www.moonstone.co.za/feed/" },
  { name: "FAnews",           url: "https://www.fanews.co.za/rss/healthcare" },
  { name: "CFO South Africa", url: "https://cfo.co.za/feed/" },
  { name: "SAMJ",             url: "https://samajournals.co.za/index.php/samj/gateway/plugin/WebFeedGatewayPlugin/rss2" },
  { name: "Bizcommunity",     url: "https://www.bizcommunity.com/rss/196/18.rss" },
  { name: "BHF",              url: "https://www.bhfglobal.com/feed/" },
];

async function fetchRSSFeed(feed) {
  try {
    const res = await fetch(`/api/rss?url=${encodeURIComponent(feed.url)}`);
    if (!res.ok) { console.warn(`[RSS] HTTP ${res.status} for ${feed.name}`); return []; }
    const data = await res.json();
    if (!data.items) { console.warn(`[RSS] No items for ${feed.name}:`, data.error); return []; }
    return data.items.map(item => ({
      title:       item.title || "",
      description: item.description
        ? item.description.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim()
        : "",
      link:        item.link || "#",
      pubDate:     item.pubDate || "",
      source:      feed.name,
      publisher:   item.source || "",
    }));
  } catch(e) { console.warn(`[RSS] Fetch failed for ${feed.name}:`, e.message); return []; }
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(dateStr).toLocaleDateString("en-ZA", { day:"numeric", month:"short" });
}

const SOURCE_COLORS = {
  "Bhekisisa":        "#00C48C",
  "Health-e News":    "#1A6ED4",
  "Medical Brief":    "#D4A017",
  "Spotlight":        "#9B6DFF",
  "Daily Maverick":   "#E03050",
  "News24":           "#FF6B35",
  "TimesLive":        "#C84B31",
  "IOL Health":       "#2E86AB",
  "The Citizen":      "#4A7C59",
  "Moonstone":        "#7B68EE",
  "FAnews":           "#20639B",
  "CFO South Africa": "#3B1F2B",
  "SAMJ":             "#5C6BC0",
  "Bizcommunity":     "#FF8C00",
  "BHF":              "#6040C0",
};

function SAHealthNews() {
  const T = useT();
  const [articles, setArticles]   = useState([]);
  const [rssLoading, setRssLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [activeSource, setActiveSource] = useState("ALL");

  async function load() {
    setRssLoading(true);
    const results = await Promise.all(SA_HEALTH_FEEDS.map(fetchRSSFeed));
    const all = results.flat().sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    setArticles(all);
    setFetchedAt(new Date());
    setRssLoading(false);
  }

  useEffect(() => { load(); }, []);

  const sources = ["ALL", ...SA_HEALTH_FEEDS.map(f => f.name)];
  const filtered = activeSource === "ALL" ? articles : articles.filter(a => a.source === activeSource);

  // Clean description — strip HTML, decode entities, trim to 2 sentences max
  const cleanDesc = (title, desc) => {
    if (!desc) return "";
    let d = desc
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\s+/g, " ").trim();
    // Drop if it's just the title repeated
    if (d.toLowerCase().replace(/\s/g,"").startsWith(title.toLowerCase().replace(/\s/g,"").slice(0,25))) return "";
    // Take first 2 sentences, max 180 chars
    const sentences = d.match(/[^.!?]+[.!?]+/g) || [d];
    let summary = sentences.slice(0,2).join(" ").trim();
    if (summary.length > 180) summary = summary.slice(0,180).trim() + "…";
    return summary.length > 20 ? summary : "";
  };

  return (
    <div className="fade">

      {/* top bar — compact single row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>FEED STATUS</div>
            <div style={{ fontSize:16, fontWeight:700, color: rssLoading ? T.yellow : T.green, fontFamily:mono }}>
              {rssLoading ? "FETCHING…" : "● LIVE RSS"}
            </div>
          </div>
          <div style={{ width:1, height:32, background:T.border }} />
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>ARTICLES</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.blue, fontFamily:mono }}>{rssLoading ? "—" : filtered.length}</div>
          </div>
          <div style={{ width:1, height:32, background:T.border }} />
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>LAST REFRESH</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.dim, fontFamily:mono }}>
              {fetchedAt ? fetchedAt.toLocaleTimeString("en-ZA", { hour:"2-digit", minute:"2-digit" }) : "—"}
            </div>
          </div>
        </div>
        <button onClick={load} disabled={rssLoading} style={{
          background:"transparent", border:`1px solid ${T.border2}`, color:T.muted,
          fontSize:9, letterSpacing:"1.5px", padding:"6px 16px", cursor:rssLoading?"not-allowed":"pointer",
          fontFamily:mono, opacity:rssLoading?0.4:1, transition:"all 0.15s",
        }}>{rssLoading ? "…" : "↻ REFRESH"}</button>
      </div>

      {/* source filter chips */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
        {sources.map(s => {
          const active = activeSource === s;
          const col = s === "ALL" ? T.green : (SOURCE_COLORS[s] || T.muted);
          return (
            <button key={s} onClick={() => setActiveSource(s)} style={{
              background: active ? `${col}15` : "transparent",
              border: `1px solid ${active ? col : T.border}`,
              color: active ? col : T.muted,
              fontSize:11, fontWeight: active ? 600 : 400, padding:"5px 14px", borderRadius:20,
              cursor:"pointer", fontFamily:font, transition:"all 0.15s",
            }}>{s}</button>
          );
        })}
      </div>

      {/* loading */}
      {rssLoading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:"80px 0" }}>
          <div style={{ width:32, height:32, border:`2px solid ${T.border2}`, borderTop:`2px solid ${T.green}`, borderRadius:"50%", animation:"spin 0.9s linear infinite" }} />
          <div style={{ fontSize:11, letterSpacing:"2px", color:T.muted, fontFamily:mono }}>FETCHING RSS FEEDS</div>
        </div>
      )}

      {/* empty */}
      {!rssLoading && filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"80px 0", color:T.muted, fontSize:13, fontFamily:font }}>
          No articles found — feed may be temporarily unavailable.
        </div>
      )}

      {/* article grid */}
      {!rssLoading && filtered.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:12 }}>
          {filtered.map((a, i) => {
            const col = SOURCE_COLORS[a.source] || T.muted;
            const desc = cleanDesc(a.title, a.description);
            return (
              <div key={i} style={{
                background:T.surface, border:`1px solid ${T.border}`,
                borderLeft:`3px solid ${col}`, borderRadius:2,
                padding:"18px 20px", display:"flex", flexDirection:"column",
                gap:10, transition:"box-shadow 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 2px 16px ${col}20`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                {/* meta row */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:10, fontWeight:600, color:col, fontFamily:mono, letterSpacing:"0.5px" }}>{a.source}</span>
                  <span style={{ fontSize:11, color:T.muted, fontFamily:mono }}>{timeAgo(a.pubDate)}</span>
                </div>
                {/* title */}
                <div style={{ fontSize:15, fontWeight:600, color:T.bright, lineHeight:1.45, fontFamily:font }}>{a.title}</div>
                {/* summary snippet — shown prominently */}
                {desc
                  ? <div style={{ fontSize:13, color:T.dim, lineHeight:1.75, fontFamily:font }}>{desc}</div>
                  : <div style={{ fontSize:12, color:T.muted, fontStyle:"italic", fontFamily:font }}>Open article for full summary.</div>
                }
                {/* read more link — secondary, at the bottom */}
                <div style={{ paddingTop:8, borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <a href={a.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:12, color:col, fontFamily:font, fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}>
                    Read full article <span style={{ fontFamily:mono }}>→</span>
                  </a>
                  {a.publisher && <span style={{ fontSize:11, color:T.muted, fontFamily:font }}>{a.publisher}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}



export default function App() {
  const [activeId, setActiveId] = useState("sahealth");
  const [results, setResults] = useState(STATIC_DATA);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const T = isDark ? DARK : LIGHT;
  const activeQuery = QUERIES.find(q => q.id === activeId);
  const data = results[activeId];

  // Tabs use static data — no API calls on startup








  return (
    <ThemeCtx.Provider value={T}>
    <div style={{ background:T.bg, minHeight:"100vh", fontFamily:font, color:T.text, fontSize:13, transition:"background 0.2s, color 0.2s" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; background:${T.bg}; }
        ::-webkit-scrollbar-thumb { background:${T.border2}; }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade { animation:fadeUp 0.4s ease forwards; }
        .tab-btn:hover { background:${T.panel} !important; color:${T.bright} !important; }
        .stat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; }
        .main-grid { display:grid; grid-template-columns:1fr 300px; gap:16px; }
        .header-subtitle { display:block; }
        a { color: inherit; }
        @media (max-width: 768px) {
          .stat-grid { grid-template-columns:repeat(2,1fr) !important; }
          .main-grid { grid-template-columns:1fr !important; }
          .header-subtitle { display:none !important; }
          .header-logo { height:24px !important; }
          .body-pad { padding:12px !important; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <img src="/logo.png" alt="AfroCentric Group" className="header-logo" style={{ height:32 }} />
            <div className="header-subtitle" style={{ fontSize:9, color:T.muted, letterSpacing:"1.5px" }}>SOCIAL & MEDIA INTELLIGENCE MONITOR — JSE:ACT</div>
          </div>
        </div>
        <button onClick={() => setIsDark(d => !d)}
          style={{ background:"transparent", border:`1px solid ${T.border2}`, color:T.dim, fontSize:9, letterSpacing:"1.5px", padding:"5px 14px", cursor:"pointer", fontFamily:mono, transition:"all 0.15s", flexShrink:0 }}>
          {isDark ? "☀ LIGHT" : "☾ DARK"}
        </button>
      </div>

      {/* TABS */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, display:"flex", overflowX:"auto" }}>
        {QUERIES.map(q => (
          <button key={q.id} className="tab-btn" onClick={() => setActiveId(q.id)} style={{
            background:activeId===q.id ? T.panel : "transparent",
            color:activeId===q.id ? T.bright : T.muted,
            border:"none", borderBottom:activeId===q.id ? `2px solid ${T.green}` : "2px solid transparent",
            borderRight:`1px solid ${T.border}`, padding:"12px 14px", cursor:"pointer",
            fontFamily:mono, fontSize:10, letterSpacing:"1.5px", whiteSpace:"nowrap",
            display:"flex", alignItems:"center", gap:7, transition:"all 0.15s",
          }}>
            <span style={{ color:activeId===q.id ? T.green : T.muted, fontSize:13 }}>{q.icon}</span>
            {q.label.toUpperCase()}
            <span style={{ width:5, height:5, borderRadius:"50%", background:sentimentColor(results[q.id]?.overallSentiment, T), flexShrink:0 }} />
          </button>
        ))}
      </div>

      {/* BODY */}
      <div className="body-pad" style={{ padding:"20px 24px", maxWidth:1200, margin:"0 auto" }}>
        {activeId === "sahealth" && <SAHealthNews />}

        {activeId !== "sahealth" && loading && !data && <Spinner />}

        {activeId !== "sahealth" && data && (
          <div className="fade">
            <div style={{ display:"flex", gap:1, marginBottom:16, background:T.border }}>
              {[
                { label:"MEDIA VOLUME",    value:data.volumeSignal,     color:data.volumeSignal==="HIGH"?T.green:data.volumeSignal==="MEDIUM"?T.yellow:T.muted },
                { label:"SOURCES TRACKED", value:data.sourceCount||"—", color:T.blue },
                { label:"DATA QUALITY",    value:data.dataQuality,      color:data.dataQuality==="HIGH"?T.green:data.dataQuality==="MEDIUM"?T.yellow:T.muted },
              ].map((s,i) => (
                <div key={i} style={{ background:T.surface, padding:"16px 24px", flex:1 }}>
                  <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:8, fontFamily:mono }}>{s.label}</div>
                  <div style={{ fontSize:20, fontWeight:700, color:s.color, fontFamily:mono }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background:T.surface, borderLeft:`3px solid ${T.green}`, border:`1px solid ${T.border}`, padding:"14px 20px", marginBottom:16 }}>
              <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:6, fontFamily:mono }}>INTELLIGENCE SUMMARY</div>
              <div style={{ fontSize:15, color:T.bright, lineHeight:1.7, fontFamily:font }}>{data.oneLiner}</div>
            </div>

            <div className="main-grid">
              <div>
                <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:10, fontFamily:mono }}>CONVERSATION THEMES · {data.themes?.length||0} FOUND</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {(data.themes||[]).map((t,i) => (
                    <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderLeft:`3px solid ${T.blue}`, padding:"14px 16px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                        <span style={{ fontWeight:700, color:T.bright, fontSize:14, fontFamily:font }}>{t.theme}</span>

                      </div>
                      <p style={{ color:T.dim, lineHeight:1.8, marginBottom:10, fontSize:13, fontFamily:font }}>{t.what}</p>
                      {t.representative_voice && (
                        <div style={{ background:`${T.blue}08`, border:`1px solid ${T.blue}22`, padding:"9px 12px", fontSize:13, color:T.text, lineHeight:1.75, fontStyle:"italic", fontFamily:font, marginBottom:t.sources?.length?10:0 }}>
                          "{t.representative_voice}"
                        </div>
                      )}
                      {t.sources?.length>0 && (
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:8 }}>
                          {t.sources.map((s,j) => {
                            const name = typeof s === "object" ? s.name : s;
                            const url  = typeof s === "object" ? s.url  : SOURCE_LINKS[s];
                            return url
                              ? <a key={j} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}><Tag label={name} color={T.blue} /></a>
                              : <Tag key={j} label={name} color={T.muted} />;
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ background:T.surface, border:`1px solid ${T.border}`, padding:16 }}>
                  <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:12, fontFamily:mono }}>VOICE BREAKDOWN</div>
                  {(data.topVoices||[]).map((v,i) => (
                    <div key={i} style={{ paddingBottom:12, marginBottom:12, borderBottom:i<(data.topVoices.length-1)?`1px solid ${T.border}`:"none" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:10, fontWeight:700, color:voiceColor(v.type, T), letterSpacing:"1px" }}>{v.type?.toUpperCase()}</span>

                      </div>
                      <p style={{ fontSize:13, color:T.dim, lineHeight:1.75, fontFamily:font }}>{v.quote}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background:T.surface, border:`1px solid ${T.border}`, padding:16 }}>
                  <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:12, fontFamily:mono }}>WATCH POINTS</div>
                  {(data.watchPoints||[]).map((w,i) => (
                    <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
                      <span style={{ color:T.yellow, flexShrink:0 }}>▲</span>
                      <span style={{ fontSize:13, color:T.dim, lineHeight:1.75, fontFamily:font }}>{w}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background:T.surface, border:`1px solid ${T.border}`, padding:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:4, fontFamily:mono }}>SOURCES</div>
                    <div style={{ fontSize:26, fontWeight:700, color:T.blue }}>{data.sourceCount||"—"}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:4, fontFamily:mono }}>TOPIC</div>
                    <div style={{ fontSize:11, color:T.text }}>{activeQuery.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop:`1px solid ${T.border}`, padding:"10px 16px", display:"flex", justifyContent:"space-between", fontSize:9, color:T.muted, letterSpacing:"1px", background:T.surface, marginTop:24 }}>
        <span>AFROCENTRIC GROUP · SOCIAL & MEDIA INTELLIGENCE · CLAUDE AI + WEB SEARCH</span>
        <span>LIVE DATA · MARCH 2026</span>
      </div>
    </div>
    </ThemeCtx.Provider>
  );
}