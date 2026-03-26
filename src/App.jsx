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
  { id: "sahealth",    label: "SA Health News",            icon: "⊞", query: "South Africa healthcare news public health system hospitals 2025 2026" },
  { id: "competitors", label: "Competitor Intel",          icon: "⊕", query: "Discovery Health Momentum Health BestMed Bonitas Medihelp South Africa medical scheme 2025 2026 news strategy" },
  { id: "general",     label: "AfroCentric Buzz",          icon: "◈", query: "AfroCentric Group South Africa 2026 news public discussion opinions" },
  { id: "financial",   label: "AfroCentric Financial Buzz", icon: "◎", query: "AfroCentric Group JSE ACT share price results investor reaction 2025 2026" },
  { id: "nhi",         label: "NHI & Policy",              icon: "⬡", query: "AfroCentric NHI National Health Insurance South Africa 2025 2026 public opinion" },
  { id: "medscheme",   label: "Medscheme Chatter",         icon: "◇", query: "Medscheme AfroCentric complaints reviews member opinions 2025 2026" },
  { id: "employer",    label: "Employer Reputation",       icon: "◉", query: "AfroCentric Group employer culture employee reviews 2025 South Africa" },
];

const STATIC_DATA = {
  general: {
    overallSentiment: "NEGATIVE", sentimentScore: 32, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "AfroCentric dominates SA healthcare headlines in March 2026 with a R1.27bn basic loss, the confirmed loss of Bonitas after 44 years, and a stalled High Court case — the group is navigating its most turbulent period since listing.",
    themes: [
      {
        theme: "FY2025 Results — R1.27bn Basic Loss Despite Revenue Surge",
        sentiment: "NEGATIVE",
        what: "AfroCentric reported a 93.9% revenue surge to R7.3bn but swung to a R1.27bn basic loss driven by R1.59bn in asset impairments covering Activo, Pharmacy Direct and TendaHealth. Headline earnings recovered to R117.1m (13.92c/share). No dividend declared. The results were published on SENS on 3 March 2026 with a webcast presentation the following day.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/"},{name:"Business Explainer",url:"https://businessexplainer.co.za/companies/2026/03/04/afrocentric-swings-to-r1-27bn-loss-following-aggressive-asset-impairments/"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The revenue growth is real but the impairments wiped it out. The market is asking whether this restructuring is nearly over or still ongoing."
      },
      {
        theme: "Bonitas Contract Lost — Momentum Takes Over 1 June 2026",
        sentiment: "NEGATIVE",
        what: "Bonitas appointed Momentum Health as its new administrator and PHA for managed care from 1 June 2026, ending Medscheme's 44-year relationship. Medscheme's urgent application was removed from the roll on 3 March after its replying affidavit was filed late. AfroCentric confirmed it will continue litigation. Bonitas contributes ~40% of Medscheme's administration income.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medschemes-case-against-bonitas-off-urgent-roll/"},{name:"Business Day",url:"https://www.businessday.co.za/news/health/2026-03-04-medschemes-tenders-case-against-bonitas-removed-from-roll/"}],
        representative_voice: "Losing Bonitas after 44 years is not just a financial blow — it signals that Medscheme's dominant position is no longer untouchable."
      },
      {
        theme: "Portfolio Restructuring — Activo Disposal Terms Published",
        sentiment: "NEUTRAL",
        what: "AfroCentric published detailed disposal terms for Activo and subsidiaries. ADS Group and Wellworx already absorbed by Sanlam Health. The group is simplifying to core health administration and managed care. Sanlam holds 59% and is the strategic anchor of the restructured group.",
        sources: [{name:"AfroCentric SENS",url:"https://www.jse.co.za/current-companies/company-announcements"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The simplified structure makes strategic sense long-term but the transition costs have been severe and the market is still digesting them."
      },
      {
        theme: "Sanlam — Fedhealth as Exclusive Open Scheme Partner",
        sentiment: "CAUTIOUS",
        what: "Sanlam announced Fedhealth as its exclusive open medical scheme partner, effectively ending its longstanding association with Bonitas. Fedhealth grew its membership base by onboarding ~7,800 Sanlam employees, contributing to a contribution increase described as 'just 9.6%' — one of the higher increases in the market at above 9.5%.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"}],
        representative_voice: "Sanlam choosing Fedhealth over Bonitas is a significant strategic realignment — it redraws the lines in the SA medical scheme market."
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "ACT hit an all-time low of 90 ZAC in February. Even at 124 ZAC it is down 38% year-on-year. The market has not forgiven the impairments or the Bonitas loss." },
      { type: "Media", sentiment: "negative", quote: "The Bonitas split ends 44 years and hands Momentum Health over 750,000 new beneficiaries — a direct competitor gain at AfroCentric's expense." },
      { type: "Analyst", sentiment: "cautious", quote: "Headline earnings of R117m on R7.3bn revenue shows the core is intact. The real test is the FY2026 income statement after Bonitas rolls off in June." },
    ],
    watchPoints: [
      "Bonitas transition to Momentum — 1 June 2026, Medscheme loses ~680,000 beneficiaries",
      "High Court litigation re-enrolment — matter to be re-enrolled once interlocutory issues resolved",
      "ACT.JO recovery — 52-week range 90–188 ZAC, currently near lower end",
      "Activo disposal finalisation and remaining impairment exposure",
      "Sanlam-Fedhealth partnership impact on AfroCentric's scheme client base"
    ],
    sourceCount: 18,
  },

  financial: {
    overallSentiment: "NEGATIVE", sentimentScore: 24, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "JSE:ACT hit an all-time low of 90 ZAC in February 2026 and remains down 38% year-on-year as markets price in the Bonitas revenue cliff, no dividend, and a R1.27bn basic loss from FY2025.",
    themes: [
      {
        theme: "Share Price at Historic Lows — 52-Week Range 90–188 ZAC",
        sentiment: "NEGATIVE",
        what: "ACT.JO hit its all-time low of 90 ZAC on 19 February 2026, against an all-time high of 695 ZAC in 2017. As of early March the stock was at 124 ZAC. Market cap approximately R914m. Down 38% over the past year. The stock is 15.32% volatile with a beta of 0.70.",
        sources: [{name:"TradingView",url:"https://www.tradingview.com/symbols/JSE-ACT/"},{name:"Investing.com ZA",url:"https://za.investing.com/equities/afrocentric-investment-corp"}],
        representative_voice: "The all-time low of 90c tells the full story. The market is pricing in the Bonitas loss, the impairments, and deep uncertainty about the path forward."
      },
      {
        theme: "FY2025 Results — Loss Before Tax R532m",
        sentiment: "NEGATIVE",
        what: "Loss before tax R532m vs prior profit of R225m. Basic loss R1.27bn (151.55c/share). Headline earnings R117.1m (13.92c/share). Revenue R7.3bn up 93.9%. No dividend vs 6c prior period. Impairments ~R1.59bn. Results published 3 March 2026 on SENS.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/"},{name:"AfroCentric SENS",url:"https://www.afrocentric.za.com/investor-centre/"}],
        representative_voice: "The loss of 151c/share is largely non-cash due to impairments — but try explaining that to a retail investor watching the share hit 90c."
      },
      {
        theme: "Bonitas Revenue Cliff — 40% of Medscheme Income at Risk",
        sentiment: "NEGATIVE",
        what: "Bonitas contributes approximately 40% of Medscheme's administration income. The administration agreement ends 31 May 2026. Momentum Health gains 750,000+ beneficiaries. The financial impact on FY2026 earnings will be material and the market has begun but not fully priced in the revenue reduction.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/"},{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"}],
        representative_voice: "A 40% income concentration on a single client that you are now losing is the kind of risk that should have been disclosed more prominently years ago."
      },
      {
        theme: "2026 Medical Aid Contribution Increases — Sector Context",
        sentiment: "MIXED",
        what: "Across the sector, 2026 contribution increases averaged well above CPI: Discovery 7.2% (deferred to April), Bonitas 8.8%, Medihelp 8.46%, BestMed 6.8% (lowest), Momentum and Fedhealth both above 9.5%. Medical inflation exceeds CPI by 3-4%. The CMS recommended increases be capped at 3.3% plus utilisation — only BestMed came close. Rising costs are the context for AfroCentric's administered schemes.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"},{name:"Moonstone",url:"https://www.moonstone.co.za/discovery-delays-2026-contribution-increase-to-april/"}],
        representative_voice: "Medical inflation at 7-9% on top of 33% unemployment is a structural affordability crisis. The schemes know it — which is why innovation on low-cost products is accelerating."
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "No dividend, R1.59bn in impairments, and the Bonitas contract ending in June. FY2026 is going to look very different from FY2025." },
      { type: "Analyst", sentiment: "cautious", quote: "Headline earnings of R117m on a R7.3bn base is thin but survivable. The real test is what the income statement looks like after Bonitas rolls off." },
      { type: "Media", sentiment: "negative", quote: "ACT.JO is down 38% year-on-year. The market has spoken clearly about what it thinks of this restructuring." },
    ],
    watchPoints: [
      "FY2026 interim results — first numbers showing Bonitas revenue impact post June 2026",
      "ACT.JO share price — watch 110 ZAC as key support level",
      "Dividend reinstatement — management has not guided on timeline",
      "Discovery DHMS contribution increase kicks in April 2026 — watch member attrition data",
      "CMS section 44 investigation outcome — could affect litigation position"
    ],
    sourceCount: 14,
  },

  nhi: {
    overallSentiment: "CAUTIOUS", sentimentScore: 42, volumeSignal: "MEDIUM", dataQuality: "HIGH",
    oneLiner: "Discovery CEO Adrian Gore says NHI cannot work in its current form and needs a decade to mature — the most prominent private sector voice yet to directly challenge NHI's near-term viability. AfroCentric maintains a dual public-private positioning as the most credible NHI hedge in the sector.",
    themes: [
      {
        theme: "Adrian Gore — NHI Cannot Work As Written, Needs a Decade",
        sentiment: "NEGATIVE",
        what: "Discovery Group CEO Adrian Gore said at the company's half-year results in March 2026 that NHI in its current form 'requires a decade or more to reach any meaningful state of maturity' and that the premise underpinning near-term implementation 'is simply not grounded in reality'. Gore said SA does not have the healthcare resources, infrastructure or doctors to implement NHI as written. Discovery is pushing for amendments to Section 33 to allow medical schemes to operate alongside NHI.",
        sources: [{name:"Billionaires Africa",url:"https://www.billionaires.africa/2026/03/12/adrian-gore-says-south-africas-nhi-needs-a-decade-to-mature-and-cannot-work-in-its-current-form/"},{name:"Discovery",url:"https://www.discovery.co.za/corporate/health-nhi-the-role-of-medical-schemes"}],
        representative_voice: "Gore's remarks are the clearest signal yet that the private sector has moved from polite engagement to direct challenge on NHI's near-term viability."
      },
      {
        theme: "Section 33 — The Private Sector's Central Battleground",
        sentiment: "NEGATIVE",
        what: "Section 33 of the NHI Act — which proposes restricting medical schemes once NHI is fully implemented — remains the central point of constitutional challenge. Discovery, BASA and the DA have all mounted legal challenges. The Constitutional Court hearings are expected mid-2026. AfroCentric supports amendments to Section 33 to preserve the role of private health financing.",
        sources: [{name:"Discovery",url:"https://www.discovery.co.za/corporate/health-nhi-the-role-of-medical-schemes"},{name:"Health Policy Watch",url:"https://healthpolicy-watch.news/feed/"}],
        representative_voice: "Section 33 is the sword of Damocles over every medical scheme and gap cover product in SA. Until the Constitutional Court rules, no one can plan with certainty."
      },
      {
        theme: "AfroCentric's NHI Positioning — Public Sector Footprint",
        sentiment: "POSITIVE",
        what: "Pharmacy Direct administers CCMDD scripts for the NDoH — one of the largest public-private drug delivery partnerships in SA. Medscheme administers GEMS and Polmed. These contracts position AfroCentric as already embedded in public health delivery regardless of NHI sequencing. The group's 2030 strategic intent explicitly references NHI preparation.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"BHF",url:"https://www.bhfglobal.com/bhf-conferences/afrocentric-health/"}],
        representative_voice: "AfroCentric already does NHI-style delivery at scale through CCMDD and GEMS. That is a genuine moat if the policy ever matures."
      },
      {
        theme: "Medical Aid Contribution Increases vs NHI Affordability Narrative",
        sentiment: "CAUTIOUS",
        what: "2026 contribution increases averaging 7-9% across major schemes — far above CPI of 3.3% — are feeding the NHI affordability narrative. The CMS has explicitly stated contribution increases outpaced inflation by 7.1 percentage points in 2025. This political pressure strengthens the NHI case even as implementation remains years away.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"},{name:"Moonstone",url:"https://www.moonstone.co.za/discovery-delays-2026-contribution-increase-to-april/"}],
        representative_voice: "Every 9% contribution increase is a political gift to NHI proponents. The schemes know this — which is why Discovery deferred to April and BestMed came in at 6.8%."
      },
    ],
    topVoices: [
      { type: "Analyst", sentiment: "positive", quote: "AfroCentric's dual public-private positioning is the most credible NHI hedge in the SA healthcare sector right now." },
      { type: "Regulator", sentiment: "neutral", quote: "CMS section 44 investigation into Bonitas governance is ongoing — regulatory capacity to police schemes at NHI scale remains a key implementation question." },
      { type: "Media", sentiment: "cautious", quote: "Adrian Gore's remarks signal a shift from polite private sector engagement to direct challenge. The NHI debate is entering a new, more confrontational phase." },
    ],
    watchPoints: [
      "Constitutional Court Section 33 hearing — mid-2026, could reshape the entire private health market",
      "NHI benefit package release — still outstanding, critical for private sector planning",
      "Discovery's formal Section 33 amendment campaign — watch for further public statements",
      "CCMDD contract renewal — core to AfroCentric's public sector revenue base",
      "2026 contribution increases April implementation — watch for member attrition signals"
    ],
    sourceCount: 11,
  },

  medscheme: {
    overallSentiment: "NEGATIVE", sentimentScore: 28, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "Medscheme faces its most significant crisis in decades — the confirmed loss of Bonitas after 44 years, a stalled High Court case removed from the urgent roll, and the 1 June 2026 transition deadline bearing down.",
    themes: [
      {
        theme: "Bonitas Contract Confirmed Lost — 1 June 2026 Transition",
        sentiment: "NEGATIVE",
        what: "Bonitas appointed Momentum Health as administrator and PHA for managed care from 1 June 2026, confirmed on 29 January 2026. Medscheme administers 680,000 Bonitas beneficiaries. Momentum CEO Hannes Viljoen confirmed the deal adds 750,000+ beneficiaries bringing its Africa total to 3.3 million. The Bonitas-Medscheme relationship dates to 1982 — 44 years.",
        sources: [{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"},{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/"},{name:"Business Day",url:"https://www.businessday.co.za/news/health/2026-03-04-medschemes-tenders-case-against-bonitas-removed-from-roll/"}],
        representative_voice: "Losing Bonitas after 44 years is not just about the numbers — it is a fundamental disruption to a relationship that defined the SA medical scheme administration industry."
      },
      {
        theme: "High Court Case — Removed from Urgent Roll, Being Re-enrolled",
        sentiment: "NEGATIVE",
        what: "Medscheme's urgent application was removed from the roll on 3 March 2026 because its replying affidavit was filed late (obligated 12 February, filed 14 February). The case papers exceed 1,200 pages. Acting Judge President directed outstanding interlocutory matters must be resolved before a hearing date can be allocated. AfroCentric confirmed it will not withdraw the case.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medschemes-case-against-bonitas-off-urgent-roll/"}],
        representative_voice: "Missing the filing deadline in the biggest medical scheme case in SA history was a procedural embarrassment. The litigation continues but the urgency argument is weakened."
      },
      {
        theme: "Whistleblower Evidence and Project StepAhead",
        sentiment: "NEGATIVE",
        what: "Medscheme director Gerald van Wyk confirmed in court papers that the company holds whistleblower documents alleging former AfroCentric executives and Bonitas insiders shaped RFP documents under 'Project StepAhead' to advantage PHA. Former AfroCentric executive Tobie du Preez features centrally. Medscheme engaged cyber forensics firm FACTS Consulting to analyse the file.",
        sources: [{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medscheme-bonitas-tender-battle-escalates/"},{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"}],
        representative_voice: "The whistleblower evidence is Medscheme's strongest card — if it holds up, this is not just a procurement dispute but a governance scandal."
      },
      {
        theme: "Scale Intact — 4.08 Million Lives Across 14 Schemes",
        sentiment: "POSITIVE",
        what: "Despite the Bonitas loss, Medscheme still administers 4.08 million lives across 14 medical scheme clients including GEMS, Polmed and Fedhealth. Automated hospital pre-authorisation is live across major hospital groups. The data depth across 12 million monthly claims remains a structural asset no competitor can quickly replicate.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"BHF",url:"https://www.bhfglobal.com/bhf-conferences/afrocentric-health/"}],
        representative_voice: "Medscheme's scale and data are irreplaceable in the short term. Losing Bonitas hurts badly but the business is not broken — the question is what they win next."
      },
    ],
    topVoices: [
      { type: "Member", sentiment: "mixed", quote: "I just want certainty about my benefits through the transition. The legal fight between Medscheme and Bonitas is confusing and unsettling for ordinary members." },
      { type: "Media", sentiment: "negative", quote: "Missing the filing deadline was a procedural embarrassment — the biggest administrator scandal in SA medical scheme history and Medscheme filed late." },
      { type: "Analyst", sentiment: "cautious", quote: "The 40% income concentration on Bonitas was always a risk. Now it has materialised. The remaining book is still formidable but FY2026 numbers will be ugly." },
    ],
    watchPoints: [
      "Bonitas transition date — 1 June 2026, 680,000 beneficiaries move to Momentum",
      "High Court re-enrolment — interlocutory matters must be resolved first",
      "CMS section 44 investigation outcome — findings could support or undermine Medscheme's case",
      "GEMS and Polmed contract renewals — next most important administration relationships after Bonitas",
      "Medscheme headcount — watch for workforce reduction announcements post-June"
    ],
    sourceCount: 19,
  },

  employer: {
    overallSentiment: "MIXED", sentimentScore: 51, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "AfroCentric retains its Top Employer 2025 certification and runs an active 2026 internship programme, but the Bonitas crisis and Sanlam integration are creating visible uncertainty — particularly for staff in Medscheme's Bonitas-facing administration teams.",
    themes: [
      {
        theme: "Top Employer 2025 Certification Retained",
        sentiment: "POSITIVE",
        what: "AfroCentric retained its Top Employer South Africa 2025 certification. LinkedIn employee engagement reflects pride in development programmes and healthcare mission. The certification is cited in recruitment materials and is a differentiator in attracting clinical and technology talent in a competitive market.",
        sources: [{name:"Top Employers Institute",url:"https://www.top-employers.com"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "Top Employer status matters in healthcare talent acquisition. It helps attract clinical and technology staff who have options in a competitive market."
      },
      {
        theme: "2026 Internship Programme — Active Recruitment",
        sentiment: "POSITIVE",
        what: "AfroCentric launched its 12-month 2026 Internship Programme focused on pre-authorisation, managed care operations and clinical decision-making. The programme reflects a commitment to graduate pipeline development with preference for underrepresented equity candidates. Applications closed November 2025.",
        sources: [{name:"EduStudent",url:"https://edustudent.co.za/afrocentric-group-internship-programme-2026/"},{name:"AfroCentric careers",url:"https://www.afrocentric.za.com"}],
        representative_voice: "The AfroCentric internship is one of the most structured healthcare entry points in SA — managed care graduates are genuinely in demand."
      },
      {
        theme: "Bonitas Transition — Workforce Uncertainty in Admin Teams",
        sentiment: "NEGATIVE",
        what: "The loss of 680,000 Bonitas beneficiaries from June 2026 creates direct headcount risk in Medscheme's Bonitas-dedicated administration teams. The transition will require staff redeployment or reduction. No formal announcement has been made but industry observers expect restructuring in H2 2026.",
        sources: [{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medschemes-case-against-bonitas-off-urgent-roll/"},{name:"AfroCentric AFS 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "The Bonitas situation has created real uncertainty — some people in the Medscheme admin teams are quietly updating their CVs ahead of June."
      },
      {
        theme: "Technology Talent — High Demand, Retention Risk",
        sentiment: "CAUTIOUS",
        what: "AfroCentric Technologies is building AI diagnostics, automated authorisation systems and FHIR interoperability. Market competition for health technology talent is intensifying as private equity-backed health tech startups scale. The financial pressures on the group limit the equity and remuneration flexibility needed to compete for top technical talent.",
        sources: [{name:"Pnet job listings",url:"https://www.pnet.co.za/cmp/en/afrocentric-group-60732/jobs"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "The digital work at AfroCentric Technologies is genuinely exciting but health tech startups offer equity that a subsidiary of a JSE-listed company cannot easily match."
      },
    ],
    topVoices: [
      { type: "Employee", sentiment: "positive", quote: "The clinical technology work — automated authorisations, AI diagnostics — is the most impactful work in SA healthcare IT right now." },
      { type: "Employee", sentiment: "mixed", quote: "The Bonitas situation has created real uncertainty about what the workforce looks like in the second half of 2026. People are watching closely." },
      { type: "Media", sentiment: "positive", quote: "AfroCentric's Top Employer retention is notable given the scale of restructuring and the Bonitas crisis unfolding simultaneously." },
    ],
    watchPoints: [
      "Workforce impact post June 2026 — headcount reduction risk in Medscheme Bonitas admin teams",
      "Technology talent retention — health tech competition intensifying in SA",
      "Sanlam cultural integration — ADS and Wellworx staff moved into Sanlam Health",
      "2026 internship cohort quality — leading indicator of graduate pipeline health"
    ],
    sourceCount: 10,
  },

  competitors: {
    overallSentiment: "MIXED", sentimentScore: 58, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "Momentum Health is the biggest winner of 2026 — gaining 750,000 Bonitas beneficiaries. Discovery maintains platform dominance with its Active Smart plan the fastest-growing in history. BestMed leads on affordability with the lowest 2026 contribution increase at 6.8%. The competitive landscape has shifted materially against AfroCentric.",
    themes: [
      {
        theme: "Momentum Health — Transformative Bonitas Win",
        sentiment: "POSITIVE",
        what: "Momentum Health CEO Hannes Viljoen confirmed the Bonitas administration award adds 750,000+ beneficiaries, bringing its Africa total to 3.3 million and worldwide to 25 million. This is the largest single administrator transition in SA medical scheme history. Momentum's 2026 contribution increase exceeds 9.5% — above the sector average. Fedhealth also above 9.5%.",
        sources: [{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"}],
        representative_voice: "Momentum's Bonitas win is transformative. In one transaction they closed the gap with Medscheme dramatically and gained a platform to compete for more contracts."
      },
      {
        theme: "Discovery Health — Active Smart Fastest-Growing Plan Ever",
        sentiment: "POSITIVE",
        what: "Discovery Health Medical Scheme deferred 2026 contribution increases to 1 April, saving members R1.5bn. DHMS weighted average increase 7.2%. The new Active Smart plan (R1,350/month, 0% increase) grew to 22,000 lives — the fastest-growing new plan in DHMS history with 80%+ of members under 40. Two new Smart Saver plans launched for young families. Discovery also pushing for NHI Section 33 amendments.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"},{name:"Moonstone",url:"https://www.moonstone.co.za/discovery-delays-2026-contribution-increase-to-april/"}],
        representative_voice: "Active Smart at R1,350 with zero increase is Discovery's most direct move yet into the affordability space — it is the sub-R2,000 bracket AfroCentric has not yet cracked."
      },
      {
        theme: "BestMed — Lowest Contribution Increase at 6.8%",
        sentiment: "POSITIVE",
        what: "BestMed implemented a 6.8% weighted average increase — the lowest among the seven largest schemes and the only one close to the CMS recommended cap. Some BestMed options increase by as little as 5.1%. Principal membership has grown 28% over five years. BestMed is positioning on affordability as larger schemes price above inflation.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"},{name:"Moonstone",url:"https://www.moonstone.co.za/discovery-delays-2026-contribution-increase-to-april/"}],
        representative_voice: "In a year where most schemes are 7-9%, BestMed at 6.8% is a genuine differentiator. Affordability is the battleground and BestMed is winning it."
      },
      {
        theme: "Evergreen Contracts — Sector-Wide Governance Shift",
        sentiment: "CAUTIOUS",
        what: "The CMS has repeatedly warned against 'evergreen' contracts between schemes and service providers. The Bonitas decision to run a competitive tender — and the resulting dispute — has put every long-term administration contract in SA under scrutiny. Other schemes may follow with competitive processes. Medscheme's remaining relationships with GEMS, Polmed and Fedhealth need to be actively managed.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medscheme-bonitas-tender-battle-escalates/"}],
        representative_voice: "Every long-term administration contract in SA is now implicitly under review. No relationship is too old or too large to be put out to tender."
      },
    ],
    topVoices: [
      { type: "Analyst", sentiment: "positive", quote: "Momentum's Bonitas win is the most consequential event in SA medical scheme administration in a decade. It fundamentally reshapes the competitive landscape." },
      { type: "Analyst", sentiment: "cautious", quote: "Discovery's Active Smart at R1,350 with zero increase is the most serious challenge yet to the sub-R2,000 bracket that AfroCentric has not yet moved into." },
      { type: "Regulator", sentiment: "neutral", quote: "CMS does not approve administrator appointments. Schemes are free to contract with any accredited administrator provided a fair process was followed." },
      { type: "Media", sentiment: "cautious", quote: "Every long-term administration contract in SA is now implicitly under review. The Bonitas case has changed the governance landscape permanently." },
    ],
    watchPoints: [
      "Bonitas transition to Momentum — 1 June 2026 operational cutover",
      "Discovery Active Smart growth — watch if it breaks 50,000 lives by year-end",
      "CMS section 44 investigation — sector-wide governance implications",
      "GEMS and Polmed contract renewals — will they run competitive tenders?",
      "BestMed affordability positioning — watch if 6.8% drives meaningful membership growth"
    ],
    sourceCount: 22,
  },

  healthtech: {
    overallSentiment: "POSITIVE", sentimentScore: 66, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "South Africa's health technology market is accelerating in 2026 — FHIR R4 compliance, AI clinical decision support and value-based care infrastructure are the defining priorities, against a backdrop of NHI digital readiness pressure.",
    themes: [
      {
        theme: "SA Digital Health — Two-Speed Market in 2026",
        sentiment: "CAUTIOUS",
        what: "Black Book Market Research's March 2026 SA Digital Health report identifies a two-speed market — private sector accelerating enterprise platform investment while public sector advances more gradually. Six defining imperatives: patient identity, HPRS alignment, POPIA compliance, interoperability governance, AI governance, and operational resilience as NHI readiness criteria.",
        sources: [{name:"Black Book 2026",url:"https://blackbookmarketresearch.com/south-africa-state-of-acute-care-ehr-and-digital-health-care-2026"}],
        representative_voice: "SA's digital health market is no longer one market — it is two. Private sector is building for 2026. Public sector is still catching up to 2020."
      },
      {
        theme: "AfroCentric Technologies — Automated Authorisation Live",
        sentiment: "POSITIVE",
        what: "AfroCentric Technologies deployed an automated hospital pre-authorisation system across major hospital groups, reducing turnaround from hours to minutes. Microsoft Azure cloud migration is substantially complete, enabling data sovereignty and improved analytics. R67m invested in actuarial and clinical capability in FY2025. 2030 strategic intent targets AI diagnostics and value-based care.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"Microsoft Customer Story",url:"https://www.microsoft.com/en/customers/story/1474631301821028162-afrocentric-health-payor-microsoft-365-en-south-africa"}],
        representative_voice: "This is the kind of AI that matters in SA healthcare — not a demo, a live production system processing real authorisations at scale across major hospital groups."
      },
      {
        theme: "FHIR R4 Compliance — 2027 Deadline Approaching",
        sentiment: "NEUTRAL",
        what: "NDoH HPRS interoperability framework mandates FHIR R4 compliance for systems connecting to the national health data exchange by 2027. AfroCentric Technologies, Discovery and Netcare are at varying stages of readiness. The standard creates the infrastructure for a unified patient record across public and private care — whoever builds the compliant infrastructure first controls the data layer.",
        sources: [{name:"Black Book 2026",url:"https://blackbookmarketresearch.com/south-africa-state-of-acute-care-ehr-and-digital-health-care-2026"},{name:"NDoH HPRS",url:"https://www.health.gov.za"}],
        representative_voice: "FHIR R4 is the plumbing no one talks about publicly but everyone in health IT is scrambling to build. The 2027 deadline is closer than most organisations realise."
      },
      {
        theme: "Telemedicine — CMS Benefit Equivalence Drives Adoption",
        sentiment: "POSITIVE",
        what: "CMS formally recognised virtual consultations as an equivalent benefit in the 2025 benefit year. SA telemedicine consults crossed 4 million annually for the first time in 2025, driven by Kena Health, Hello Doctor and scheme virtual GP benefit expansions. 2026 adoption expected to accelerate following the regulatory unlock.",
        sources: [{name:"Kena Health",url:"https://www.kena.health"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "CMS benefit equivalence was the unlock the industry needed. Schemes now have a commercial reason to invest in virtual care and members have a reason to use it."
      },
    ],
    topVoices: [
      { type: "Analyst", sentiment: "positive", quote: "SA's health tech ecosystem is genuinely innovative. FHIR R4 compliance will be the great differentiator in 2026-2027 — whoever gets there first controls the data layer." },
      { type: "Employee", sentiment: "positive", quote: "Building AI authorisation tools for SA-specific disease burden and benefit structures is harder than it sounds. The clinical complexity is real and rewarding." },
      { type: "Media", sentiment: "cautious", quote: "The digital health excitement in SA is real but most investment still flows to the top 15% of the population. The public sector digital gap is widening." },
    ],
    watchPoints: [
      "FHIR R4 compliance deadline 2027 — AfroCentric Technologies readiness vs competitors",
      "SAHPRA AI as medical device guidance — still outstanding, blocks some clinical AI deployments",
      "Value-based care contract models — watch for AfroCentric and Discovery announcements",
      "Telemedicine quality standards — CMS developing framework post benefit equivalence ruling"
    ],
    sourceCount: 15,
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
  // Google News — topic-specific searches (health-only by definition)
  { name: "Medical Schemes",   url: "https://news.google.com/rss/search?q=medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Medical Aid SA",    url: "https://news.google.com/rss/search?q=medical+aid+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Scheme Innovation", url: "https://news.google.com/rss/search?q=medical+scheme+innovation+benefit+launch+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Scheme Innovation",  url: "https://news.google.com/rss/search?q=%22medical+scheme%22+OR+%22medical+aid%22+innovation+OR+launch+OR+benefit+OR+programme+OR+app+OR+digital+OR+wellness+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "NHI & Policy",      url: "https://news.google.com/rss/search?q=NHI+national+health+insurance+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                      group: "NHI & Policy" },
  { name: "Public Hospitals",  url: "https://news.google.com/rss/search?q=south+africa+public+hospital+clinic+health+department&hl=en-ZA&gl=ZA&ceid=ZA:en",           group: "Public Health" },
  { name: "HIV & TB",          url: "https://news.google.com/rss/search?q=HIV+tuberculosis+TB+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                group: "HIV & TB" },
  { name: "Value-Based Care",  url: "https://news.google.com/rss/search?q=%22value+based+care%22+OR+%22value-based+care%22+south+africa+health&hl=en-ZA&gl=ZA&ceid=ZA:en",  group: "Value-Based Care" },
  // Dedicated health journalism — health-only by definition
  { name: "Bhekisisa",         url: "https://bhekisisa.org/feed/",                                                  group: "Other" },
  { name: "Health-e News",     url: "https://health-e.org.za/feed/",                                                group: "Other" },
  { name: "Medical Brief",     url: "https://www.medicalbrief.co.za/feed/",                                         group: "Other" },
  { name: "Spotlight",         url: "https://www.spotlightnsp.co.za/feed/",                                         group: "Other" },
  { name: "Health Policy Watch",url: "https://healthpolicy-watch.news/feed/",                                       group: "Other" },
  { name: "SAHPRA",            url: "https://www.sahpra.org.za/feed/",                                              group: "Other" },
  { name: "Life Healthcare",   url: "https://www.lifehealthcare.co.za/news-and-media/feed/",                        group: "Other" },
  // Health-specific category feeds from general publishers
  { name: "News24 Health",     url: "https://feeds.news24.com/articles/health24/HealthNews/rss",                   group: "Other" },
  { name: "IOL Health",        url: "https://www.iol.co.za/rss/health",                                             group: "Other" },
  { name: "DM Health",         url: "https://www.dailymaverick.co.za/category/health/feed/",                        group: "Other" },
  { name: "M&G Health",        url: "https://mg.co.za/section/health/feed",                                         group: "Other" },
  { name: "Sowetan Health",    url: "https://www.sowetanlive.co.za/health/rss/",                                    group: "Other" },
  { name: "SABC Health",       url: "https://www.sabcnews.com/sabcnews/category/health/feed/",                      group: "Other" },
  { name: "Bizcommunity",      url: "https://www.bizcommunity.com/rss/196/365.rss",                                 group: "Other" },
  { name: "Moonstone",         url: "https://www.moonstone.co.za/feed/",                                            group: "Other" },
  { name: "BHF",               url: "https://www.bhfglobal.com/feed/",                                              group: "Other" },
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

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const datePart = date.toLocaleDateString("en-ZA", { day:"numeric", month:"short", year:"numeric" });
  const timePart = date.toLocaleTimeString("en-ZA", { hour:"2-digit", minute:"2-digit" });
  return `${datePart} · ${timePart}`;
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const diff = Date.now() - date.getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return date.toLocaleDateString("en-ZA", { day:"numeric", month:"short", year:"numeric" });
}

const GOOGLE_NEWS_FEEDS = new Set([
  "General Health", "Medical Schemes", "Medical Aid SA", "Scheme Innovation",
  "NHI & Policy", "Public Hospitals", "HIV & TB", "Health Tech",
  "Health Technology", "Health Insurance", "Value-Based Care",
]);

const SOURCE_COLORS = {
  "General Health":   "#00C48C",
  "Medical Schemes":  "#1A6ED4",
  "Medical Aid SA":   "#1A6ED4",
  "Scheme Innovation":"#2E86AB",
  "Health Insurance": "#0077B6",
  "Value-Based Care": "#2D6A4F",
  "NHI & Policy":     "#D4A017",
  "Public Hospitals": "#E03050",
  "HIV & TB":         "#9B6DFF",
  "Health Tech":      "#20639B",
  "Bhekisisa":        "#00C48C",
  "Health-e News":    "#1A6ED4",
  "Medical Brief":    "#D4A017",
  "Spotlight":        "#7B68EE",
  "Moonstone":        "#5C6BC0",
  "Bizcommunity":     "#FF8C00",
  "News24 Health":    "#FF6B35",
  "IOL Health":       "#2E86AB",
  "BHF":              "#6040C0",
  "Briefly":            "#FF6B6B",
  "MSN Health SA":      "#0078D4",
  "Mail & Guardian":    "#6B2D8B",
  "GroundUp":           "#2D6A4F",
  "SABC News Health":   "#1D3461",
  "Life Healthcare":    "#0096C7",
  "SAHPRA":             "#C9184A",
  "Sowetan Health":     "#F77F00",
  "DM Health":          "#023E8A",
  "Health Policy Watch":"#7B2D8B",
  "Health Insurance":  "#0077B6",
  "Value-Based Care":  "#2D6A4F",
};

function SAHealthNews() {
  const T = useT();
  const [articles, setArticles]   = useState([]);
  const [rssLoading, setRssLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState(null);


  async function load() {
    setRssLoading(true);
    const results = await Promise.all(SA_HEALTH_FEEDS.map(fetchRSSFeed));
    const all = results.flat().sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    setArticles(all);
    setFetchedAt(new Date());
    setRssLoading(false);
  }

  useEffect(() => { load(); }, []);

  const groups = ["ALL", "Medical Schemes", "NHI & Policy", "Public Health", "HIV & TB", "Health Technology", "Health Insurance", "Value-Based Care", "Other"];
  const [activeGroup, setActiveGroup] = useState("ALL");
  const HEALTH_KEYWORDS = [
    "health","hospital","clinic","patient","doctor","medical","medicine","nurse","gap cover","income protection","health insurance","underinsurance","disability cover","value-based care","value based care","primary care","chronic care","care outcomes",
    "disease","treatment","nhi","vaccine","hiv","aids","tb","tuberculosis",
    "cancer","diabetes","mental","pharmacy","drug","medication","scheme","medscheme",
    "bonitas","discovery health","momentum health","healthcare","pandemic","epidemic",
    "surgery","clinical","wellbeing","wellness","nutrition","diagnosis","care",
    "nhif","cms","sahpra","pharmacist","chronic","acute","ward","icu","emergency",
  ];
  const isHealthRelated = (a) => {
    const text = (a.title + " " + a.description).toLowerCase();
    return HEALTH_KEYWORDS.some(k => text.includes(k));
  };
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const filtered = (activeGroup === "ALL"
    ? articles
    : articles.filter(a => {
        const feed = SA_HEALTH_FEEDS.find(f => f.name === a.source);
        return feed?.group === activeGroup;
      })
  )
  .filter(isHealthRelated)
  .filter(a => {
    if (!a.pubDate) return true; // keep if no date
    const age = Date.now() - new Date(a.pubDate).getTime();
    return age < THIRTY_DAYS; // only last 30 days
  })
  .sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da; // newest first always
  });


  // Clean description — strip HTML, keep real summaries
  const cleanDesc = (title, desc) => {
    if (!desc) return "";
    let d = desc
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\s+/g, " ").trim();
    if (d.length < 15) return "";
    // Only strip if description is essentially identical to title (very strict match)
    const titleClean = title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 50);
    const descClean  = d.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 50);
    if (titleClean.length > 20 && descClean.startsWith(titleClean.slice(0, 40))) return "";
    // Take up to 3 sentences, max 220 chars
    const sentences = d.match(/[^.!?]+[.!?]+/g) || [d];
    let summary = sentences.slice(0, 3).join(" ").trim();
    if (summary.length > 220) summary = summary.slice(0, 220).trim() + "…";
    return summary.length > 20 ? summary : d.slice(0, 180).trim() + "…";
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

      {/* group filter chips */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
        {groups.map(g => {
          const active = activeGroup === g;
          const col = g === "ALL" ? T.green : g === "Medical Schemes" ? T.blue : g === "NHI & Policy" ? T.yellow : g === "Public Health" ? T.red : g === "HIV & TB" ? T.purple : g === "Health Technology" ? T.blue : g === "Health Insurance" ? "#0077B6" : g === "Value-Based Care" ? "#2D6A4F" : T.muted;
          return (
            <button key={g} onClick={() => setActiveGroup(g)} style={{
              background: active ? `${col}15` : "transparent",
              border: `1px solid ${active ? col : T.border}`,
              color: active ? col : T.muted,
              fontSize:11, fontWeight: active ? 600 : 400, padding:"5px 14px", borderRadius:20,
              cursor:"pointer", fontFamily:font, transition:"all 0.15s",
            }}>{g}</button>
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
                  <span style={{ fontSize:11, color:T.muted, fontFamily:mono }}>{formatDate(a.pubDate)}</span>
                </div>
                {/* title */}
                <div style={{ fontSize:15, fontWeight:600, color:T.bright, lineHeight:1.45, fontFamily:font }}>{a.title}</div>
                {/* summary snippet — shown prominently */}
                {desc && (
                  <div style={{ fontSize:13, color:T.dim, lineHeight:1.75, fontFamily:font }}>{desc}</div>
                )}
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
                { label:"OVERALL SENTIMENT", value:data.overallSentiment, color:sentimentColor(data.overallSentiment, T) },
                { label:"SOURCES TRACKED",   value:data.sourceCount||"—", color:T.blue },
              ].map((s,i) => (
                <div key={i} style={{ background:T.surface, padding:"14px 24px", flex:1 }}>
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
        <span>AFROCENTRIC GROUP · SOCIAL & MEDIA INTELLIGENCE · </span>
        <span>LIVE DATA · MARCH 2026</span>
      </div>
    </div>
    </ThemeCtx.Provider>
  );
}