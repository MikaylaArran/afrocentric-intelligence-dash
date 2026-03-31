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
    overallSentiment: "NEGATIVE", sentimentScore: 28, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "AfroCentric's dominant story in March/April 2026 is the confirmed Bonitas exit, 5,000 jobs at risk, a stalled High Court case, and a R1.27bn basic loss — the group is in the most turbulent period in its listed history.",
    themes: [
      {
        theme: "Bonitas Transition Proceeds — Momentum Hiring 744 Staff, Spending R100m",
        sentiment: "NEGATIVE",
        what: "Moonstone (30 March 2026) confirmed the Bonitas transition is proceeding despite ongoing litigation. Momentum Health CEO Jeanette Marais confirmed R100m+ spend, 744 new hires and 22 walk-in centres being established ahead of the 1 June 2026 handover. Momentum said it would be irresponsible not to prepare while courts decide. The transition is described as the largest medical scheme administrator change in SA history.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/"}],
        representative_voice: "Momentum is spending R100m and hiring 744 people. That is not a company that thinks the court will stop them. The transition is effectively done."
      },
      {
        theme: "5,000 Jobs at Risk — Sanlam CEO Paul Hanratty",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty told News24 (12 March 2026) that the Bonitas dispute puts approximately 5,000 jobs at risk across AfroCentric and Medscheme. Sanlam attempted to invoke Section 197 of the Labour Relations Act to transfer employment contracts to Momentum — Momentum rejected this. Sanlam said it would identify redeployment opportunities and prioritise Medscheme staff applications. Hanratty described it as a 'human tragedy' despite calling it a minor financial irritation for Sanlam.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/bonitas-medscheme-row-threatens-jobs-sanlam-ceo/"},{name:"News24",url:"https://www.news24.com/business/companies/bonitas-medscheme-drama-puts-5-000-jobs-at-risk-says-sanlam-ceo-20260312-1095"}],
        representative_voice: "In financial terms, it is not that big a deal. But it is a human tragedy because there are 5,000 people inside that business who could face massive job losses. — Paul Hanratty, Sanlam CEO"
      },
      {
        theme: "FY2025 Results — R1.27bn Basic Loss, No Dividend",
        sentiment: "NEGATIVE",
        what: "AfroCentric reported FY2025 results on 3-4 March 2026. Revenue surged 93.9% to R7.3bn but a R1.59bn impairment charge pushed the group to a R1.27bn basic loss (151.55c/share). Headline earnings recovered to R117.1m (13.92c/share). No dividend declared. Activo, ADS Group and Wellworx disposals drove the impairments. Sanlam holds 59% and is the strategic anchor.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/"},{name:"Business Explainer",url:"https://businessexplainer.co.za/companies/2026/03/04/afrocentric-swings-to-r1-27bn-loss-following-aggressive-asset-impairments/"}],
        representative_voice: "The revenue growth is real but the impairments wiped it out. The market is asking whether this restructuring is nearly over or still ongoing."
      },
      {
        theme: "High Court Litigation — Off Urgent Roll, Being Re-enrolled",
        sentiment: "NEGATIVE",
        what: "Medscheme's urgent application was removed from the roll on 3 March 2026 — its replying affidavit was filed two days late. The Acting Judge President directed all interlocutory matters must be resolved before a hearing date can be set. Papers exceed 1,200 pages. AfroCentric confirmed the litigation continues. Whistleblower evidence (Project StepAhead documents) and cyber forensics firm FACTS Consulting findings remain central to Medscheme's case.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medschemes-case-against-bonitas-off-urgent-roll/"}],
        representative_voice: "Missing the filing deadline in the biggest medical scheme case in SA history was a costly procedural embarrassment. The litigation continues but urgency is weakened."
      },
    ],
    topVoices: [
      { type: "Sanlam CEO", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — there are 5,000 people inside that business who could face massive job losses." },
      { type: "Momentum CEO", sentiment: "positive", quote: "It would be irresponsible not to proceed with the transition while the courts make their determination. We are ready." },
      { type: "Analyst", sentiment: "cautious", quote: "Headline earnings of R117m on R7.3bn revenue shows the core is intact. The real test is FY2026 after Bonitas rolls off in June." },
    ],
    watchPoints: [
      "1 June 2026 — Bonitas handover to Momentum, Medscheme loses 680,000 beneficiaries",
      "High Court re-enrolment — interlocutory matters must be resolved first",
      "Section 197 LRA — Momentum rejected automatic staff transfer, Sanlam pursuing alternatives",
      "ACT.JO share price — 52-week range 90–188 ZAC, currently near lower end",
      "Activo disposal finalisation and remaining impairment exposure",
    ],
    sourceCount: 20,
  },

  financial: {
    overallSentiment: "NEGATIVE", sentimentScore: 22, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "JSE:ACT hit an all-time low of 90 ZAC in February 2026, down 38% year-on-year. FY2025 delivered a R1.27bn basic loss and no dividend. The Bonitas revenue cliff lands in June 2026 — markets are pricing it in.",
    themes: [
      {
        theme: "Share Price at Historic Lows — 90 ZAC All-Time Low",
        sentiment: "NEGATIVE",
        what: "ACT.JO hit its all-time low of 90 ZAC on 19 February 2026 against an all-time high of 695 ZAC in 2017. As of late March 2026 trading around 120-124 ZAC. Down 38% year-on-year. Market cap approximately R914m. The stock is pricing in the Bonitas revenue loss, the impairments, and ongoing litigation risk.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The all-time low of 90c tells the full story. The market has priced in the Bonitas loss, the impairments, and deep uncertainty about FY2026."
      },
      {
        theme: "FY2025 — Revenue R7.3bn Up 93.9%, Basic Loss R1.27bn",
        sentiment: "NEGATIVE",
        what: "Loss before tax R532m vs prior profit R225m. Basic loss R1.27bn (151.55c/share). Headline earnings R117.1m (13.92c/share). Revenue R7.3bn (+93.9%). No dividend (vs 6c prior). Impairments R1.59bn covering Activo, Pharmacy Direct, TendaHealth. Results published SENS 3 March 2026.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The R1.59bn impairment is largely non-cash but try explaining that to a retail investor who bought at 300c and is watching it trade at 120c."
      },
      {
        theme: "Sanlam FY2025 — Headline Earnings Down 18% to R20.08bn",
        sentiment: "NEGATIVE",
        what: "Sanlam reported FY2025 headline earnings down 18% to R20.08bn (12 March 2026). Sanlam CEO Hanratty specifically called out the Bonitas situation as a 'human tragedy' for AfroCentric's 5,000 staff while describing the financial impact on Sanlam as manageable. Sanlam holds ~59% of AfroCentric.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/sanlams-business-engines-a-look-at-the-groups-2025-performance/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/bonitas-medscheme-row-threatens-jobs-sanlam-ceo/"}],
        representative_voice: "Sanlam calling it a financial irritation while describing 5,000 job losses as a human tragedy is a clear signal of where AfroCentric sits in Sanlam's priority stack."
      },
      {
        theme: "Bonitas Revenue Cliff — 40% of Medscheme Income Ends June 2026",
        sentiment: "NEGATIVE",
        what: "Bonitas contributes approximately 40% of Medscheme's administration income. The contract ends 31 May 2026. Momentum gains 750,000+ beneficiaries. No guidance has been given on FY2026 earnings impact. The revenue loss will be visible in H1 2026 interim results.",
        sources: [{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"},{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"}],
        representative_voice: "A 40% income concentration on a single client that you are now losing is the kind of risk that should have been disclosed more prominently for years."
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "No dividend, R1.59bn impairments, Bonitas contract ending in June. FY2026 is going to be an extremely difficult year on paper." },
      { type: "Sanlam CEO", sentiment: "cautious", quote: "In financial terms the Bonitas situation is not that big a deal for Sanlam. But for the 5,000 people in that business it is a human tragedy." },
      { type: "Analyst", sentiment: "cautious", quote: "Headline earnings of R117m on R7.3bn revenue shows the underlying business is intact. But the Bonitas cliff lands in H1 2026." },
    ],
    watchPoints: [
      "H1 2026 interim results — first numbers showing Bonitas revenue impact",
      "ACT.JO recovery — 110 ZAC is key support, 90 ZAC was the all-time low",
      "Dividend reinstatement — no guidance given",
      "Activo disposal final terms — remaining impairment risk",
      "Momentum 744 hires and R100m spend — confirms transition is irreversible",
    ],
    sourceCount: 14,
  },

  nhi: {
    overallSentiment: "CAUTIOUS", sentimentScore: 40, volumeSignal: "MEDIUM", dataQuality: "HIGH",
    oneLiner: "Discovery CEO Adrian Gore declared NHI cannot work as written and needs a decade — the strongest private sector challenge yet to NHI's viability. AfroCentric's public-sector contracts (GEMS, CCMDD) remain its most credible NHI hedge.",
    themes: [
      {
        theme: "Adrian Gore — NHI Cannot Work As Written, Needs a Decade",
        sentiment: "NEGATIVE",
        what: "Discovery Group CEO Adrian Gore said at the company's half-year results (March 2026) that NHI in its current form requires a decade or more to reach any meaningful maturity and that near-term implementation is not grounded in reality. He said SA does not have the healthcare resources, infrastructure or doctors required. Discovery is pushing for Section 33 amendments to allow schemes to operate alongside NHI. Momentum CEO Jeanette Marais echoed this, saying the government has realised it lacks the private sector's administrative capacity.",
        sources: [{name:"Billionaires Africa",url:"https://www.billionaires.africa/2026/03/12/adrian-gore-says-south-africas-nhi-needs-a-decade-to-mature-and-cannot-work-in-its-current-form/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/"}],
        representative_voice: "The idea that NHI is functional and people can walk into any private hospital is not realistic. We do not have the healthcare, the resources, the doctors. It cannot be done. — Adrian Gore, Discovery CEO"
      },
      {
        theme: "Section 33 — Constitutional Challenge Ongoing",
        sentiment: "NEGATIVE",
        what: "Section 33 of the NHI Act — which restricts medical schemes once NHI is fully implemented — remains the central constitutional battleground. Discovery, BASA and the DA have all mounted legal challenges. Constitutional Court hearings expected mid-2026. AfroCentric supports Section 33 amendments to preserve the role of private health financing.",
        sources: [{name:"Health Policy Watch",url:"https://healthpolicy-watch.news/feed/"},{name:"Discovery",url:"https://www.discovery.co.za/corporate/health-nhi-the-role-of-medical-schemes"}],
        representative_voice: "Section 33 is the sword of Damocles over every medical scheme and gap cover product in SA. Until the Constitutional Court rules, no one can plan with certainty."
      },
      {
        theme: "AfroCentric's NHI Positioning — Already Delivering at Scale",
        sentiment: "POSITIVE",
        what: "Pharmacy Direct administers CCMDD scripts for the NDoH — one of SA's largest public-private drug delivery partnerships. Medscheme administers GEMS and Polmed. These contracts position AfroCentric as already embedded in public health delivery. Despite the Bonitas crisis, the public-sector book is intact and strategically valuable in any NHI scenario.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"BHF",url:"https://www.bhfglobal.com/feed/"}],
        representative_voice: "AfroCentric already does NHI-style delivery at scale through CCMDD and GEMS. That is a genuine moat regardless of how the policy evolves."
      },
      {
        theme: "Contribution Increases vs NHI Affordability Narrative",
        sentiment: "CAUTIOUS",
        what: "2026 contribution increases averaged 7-9% across major schemes — far above CPI of 3.3%. The CMS noted increases outpaced inflation by 7.1 percentage points in 2025. This political pressure strengthens the NHI case even as implementation remains years away. Discovery deferred April increases saving members R1.5bn; BestMed came in lowest at 6.8%.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"},{name:"Moonstone",url:"https://www.moonstone.co.za/discovery-delays-2026-contribution-increase-to-april/"}],
        representative_voice: "Every 9% contribution increase is a political gift to NHI proponents. The schemes know this — affordability is the single biggest vulnerability of the private healthcare system."
      },
    ],
    topVoices: [
      { type: "Discovery CEO", sentiment: "negative", quote: "The idea that NHI is functional and people can walk into any private hospital is not realistic. We do not have the resources or the doctors." },
      { type: "Momentum CEO", sentiment: "cautious", quote: "The government has realised it does not have the administrative capacity of the private sector. That changes the NHI conversation." },
      { type: "Analyst", sentiment: "positive", quote: "AfroCentric's dual public-private positioning is the most credible NHI hedge in the SA healthcare sector. CCMDD and GEMS are real contracts, not aspirations." },
    ],
    watchPoints: [
      "Constitutional Court Section 33 hearing — mid-2026",
      "NHI benefit package release — still outstanding",
      "Discovery formal Section 33 amendment campaign — watch for further statements",
      "CCMDD and GEMS contract renewals — core to AfroCentric's public sector revenue",
      "April 2026 contribution increases — watch for member attrition signals",
    ],
    sourceCount: 12,
  },

  medscheme: {
    overallSentiment: "NEGATIVE", sentimentScore: 20, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "Medscheme is 62 days from losing 680,000 Bonitas beneficiaries. The court case is stalled. Momentum is hiring 744 staff. Section 197 was rejected. This is the most significant crisis in Medscheme's 44-year Bonitas relationship.",
    themes: [
      {
        theme: "Bonitas Transition Proceeding — 1 June 2026 Is Real",
        sentiment: "NEGATIVE",
        what: "Moonstone (30 March 2026) confirmed both Sanlam/Medscheme and Momentum have publicly outlined transition plans, confirming 1 June 2026 is the operational date. Momentum is spending R100m+, hiring 744 staff, establishing 22 walk-in centres. Momentum said: 'It would be irresponsible not to proceed with the transition while the courts make their determination.' Medscheme's contract over 680,000 beneficiaries ends 31 May 2026.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/"}],
        representative_voice: "Momentum is building 22 walk-in centres and hiring 744 people. The transition is happening whether the court eventually rules or not."
      },
      {
        theme: "Section 197 LRA Rejected by Momentum",
        sentiment: "NEGATIVE",
        what: "Sanlam confirmed it approached Momentum under Section 197 of the Labour Relations Act — which would have transferred Medscheme staff employment contracts automatically to Momentum as a going concern. Momentum rejected the application. Sanlam said it would identify internal redeployment opportunities, prioritise staff applications, and provide more detail in coming weeks. This is the critical workforce protection mechanism that has failed.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"}],
        representative_voice: "Momentum rejecting Section 197 means Medscheme staff have no automatic protection. They face retrenchment or voluntary redeployment — with 5,000 jobs potentially at risk."
      },
      {
        theme: "High Court Case — Stalled, Papers Exceed 1,200 Pages",
        sentiment: "NEGATIVE",
        what: "The urgent application was removed from the roll 3 March after Medscheme filed its replying affidavit two days late. The Acting Judge President directed all interlocutory matters must be resolved before a hearing date can be allocated. Papers exceed 1,200 pages. The case centres on Project StepAhead whistleblower documents, FACTS Consulting forensic evidence, and alleged Bonitas governance failures. AfroCentric confirmed the litigation continues.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medschemes-case-against-bonitas-off-urgent-roll/"}],
        representative_voice: "The litigation is still live but the procedural delay and the transition proceeding simultaneously means the practical outcome is already determined."
      },
      {
        theme: "Scale Intact — 4 Million+ Lives Across 14 Schemes",
        sentiment: "POSITIVE",
        what: "Despite the Bonitas loss, Medscheme still administers 4.08 million lives including GEMS, Polmed and Fedhealth. Automated pre-authorisation is live across major hospital groups. The data depth across 12 million monthly claims is a structural asset. The business is damaged but not broken.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "Losing Bonitas is a severe blow but Medscheme still has the largest administration book in SA. The question is whether the remaining relationships hold."
      },
    ],
    topVoices: [
      { type: "Momentum CEO", sentiment: "positive", quote: "We are spending R100m, hiring 744 people and building 22 walk-in centres. We respect the legal process but it would be irresponsible not to prepare." },
      { type: "Sanlam CEO", sentiment: "negative", quote: "There are 5,000 people inside that business. It is a human tragedy. Momentum rejected our Section 197 application." },
      { type: "Media", sentiment: "negative", quote: "The transition is proceeding. Whatever the court eventually decides, the operational reality of a post-Bonitas Medscheme is already being built." },
    ],
    watchPoints: [
      "1 June 2026 — Bonitas operational handover to Momentum Health",
      "Section 197 LRA — Momentum rejected, Sanlam seeking alternatives for 5,000 staff",
      "High Court re-enrolment — interlocutory matters must be resolved first",
      "CMS Section 44 investigation outcome — findings could support Medscheme's case",
      "GEMS and Polmed renewals — next most important contracts after Bonitas",
    ],
    sourceCount: 21,
  },

  employer: {
    overallSentiment: "NEGATIVE", sentimentScore: 35, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "5,000 jobs at risk, Section 197 rejected by Momentum, and no certainty on redeployment — AfroCentric's employer reputation is under severe pressure as the Bonitas transition deadline approaches.",
    themes: [
      {
        theme: "5,000 Jobs at Risk — Section 197 Rejected",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty confirmed approximately 5,000 jobs are at risk across AfroCentric and Medscheme. Sanlam's attempt to invoke Section 197 LRA — which would have automatically transferred staff to Momentum — was rejected. Sanlam said it will identify internal redeployment opportunities and prioritise Medscheme staff job applications. No timeline or headcount commitment has been given. Staff uncertainty is at its highest since the group's listing.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"},{name:"News24",url:"https://www.news24.com/business/companies/bonitas-medscheme-drama-puts-5-000-jobs-at-risk-says-sanlam-ceo-20260312-1095"}],
        representative_voice: "5,000 people inside that business could face massive job losses. Momentum rejected Section 197 — automatic protection is gone. — Paul Hanratty, Sanlam CEO"
      },
      {
        theme: "Momentum Hiring 744 — From Medscheme's Pool?",
        sentiment: "CAUTIOUS",
        what: "Momentum is hiring 744 staff specifically for the Bonitas transition. Sanlam said it will prioritise Medscheme staff applications at Momentum. This creates a complex situation — Medscheme staff may end up applying for jobs at the company that replaced them. Momentum is assessing its workforce requirements as part of operational readiness planning.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/"}],
        representative_voice: "There is a bitter irony in Medscheme staff having to apply to Momentum for jobs that exist because Momentum won the contract Medscheme lost."
      },
      {
        theme: "Top Employer Certification Retained",
        sentiment: "POSITIVE",
        what: "Despite the crisis, AfroCentric retained its Top Employer South Africa 2025 certification. LinkedIn engagement reflects ongoing pride in clinical and technology programmes. The 2026 internship programme was active. These markers of employer quality remain intact even as the workforce faces its most difficult period.",
        sources: [{name:"Top Employers Institute",url:"https://www.top-employers.com"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "Top Employer status in the middle of a 5,000-job crisis is both admirable and deeply ironic. The culture may be strong but the structural challenge is real."
      },
    ],
    topVoices: [
      { type: "Sanlam CEO", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
      { type: "Employee", sentiment: "mixed", quote: "Some people are quietly updating their CVs. Others are waiting to see what redeployment looks like. The uncertainty is the hardest part." },
      { type: "Analyst", sentiment: "cautious", quote: "Momentum rejecting Section 197 is the most significant workforce development. Without automatic transfer, Medscheme staff have no legal protection." },
    ],
    watchPoints: [
      "Sanlam redeployment plan details — expected in coming weeks",
      "Momentum 744 hiring process — will Medscheme staff be prioritised?",
      "Headcount reduction announcements post June 2026",
      "Section 197 LRA legal challenge — can Sanlam compel Momentum?",
      "AfroCentric Technologies talent retention — watch for departures",
    ],
    sourceCount: 11,
  },

  competitors: {
    overallSentiment: "MIXED", sentimentScore: 55, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "Momentum Health is the defining winner of 2026 — R100m spend, 744 new hires, 22 walk-in centres being built for the Bonitas takeover. Discovery maintains platform dominance. BestMed wins on affordability. The competitive landscape has shifted materially and permanently against AfroCentric.",
    themes: [
      {
        theme: "Momentum Health — Transformative Bonitas Win, R100m Investment",
        sentiment: "POSITIVE",
        what: "Momentum Health CEO Jeanette Marais confirmed a R100m+ spend, 744 new hires and 22 walk-in centres to prepare for the Bonitas handover from 1 June 2026. The deal adds 750,000+ beneficiaries bringing Momentum's Africa total to 3.3 million. This is the largest single administrator transition in SA medical scheme history. Momentum's 2026 contribution increase exceeds 9.5%.",
        sources: [{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/"},{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"}],
        representative_voice: "Momentum is spending R100m and building 22 walk-in centres. This is not a company that is worried about a court challenge. They are acting like the contract is theirs."
      },
      {
        theme: "Discovery Health — Active Smart 22,000 Lives, April Increases",
        sentiment: "POSITIVE",
        what: "Discovery Health deferred 2026 contribution increases to 1 April, saving members R1.5bn. DHMS weighted average increase 7.2%. Active Smart (R1,350/month, 0% increase) reached 22,000 lives — the fastest-growing new plan in DHMS history with 80%+ of members under 40. Two new Smart Saver plans launched for young families. Discovery publicly challenging NHI Section 33.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"},{name:"Moonstone",url:"https://www.moonstone.co.za/discovery-delays-2026-contribution-increase-to-april/"}],
        representative_voice: "Active Smart at R1,350 with zero increase is Discovery's most serious move into the affordability space. It directly challenges the segment AfroCentric has not yet cracked."
      },
      {
        theme: "BestMed — Lowest Increase at 6.8%, 28% Membership Growth in 5 Years",
        sentiment: "POSITIVE",
        what: "BestMed implemented the lowest 2026 contribution increase at 6.8% — the only major scheme close to the CMS recommended cap. Some options increase by as little as 5.1%. BestMed's principal membership has grown 28% over five years, driven by its affordability positioning. Medihelp came in at 8.46%, Bonitas 8.8%, Momentum and Fedhealth both above 9.5%.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/"}],
        representative_voice: "In a year where most schemes are 7-9%, BestMed at 6.8% is the standout. Affordability is the battleground and BestMed is winning it."
      },
      {
        theme: "Evergreen Contracts — Sector-Wide Governance Shift",
        sentiment: "CAUTIOUS",
        what: "The Bonitas decision to run a competitive tender has put every long-term administration contract in SA under scrutiny. The CMS has repeatedly warned against evergreen contracts. Other schemes may follow. Medscheme's remaining relationships with GEMS, Polmed and Fedhealth — all long-term — need to be actively and visibly managed.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medscheme-bonitas-tender-battle-escalates/"}],
        representative_voice: "Every long-term administration contract in SA is now implicitly under review. The Bonitas case has changed the governance landscape permanently."
      },
    ],
    topVoices: [
      { type: "Momentum CEO", sentiment: "positive", quote: "We are spending R100m, hiring 744 people and building 22 walk-in centres. We respect the legal process but it would be irresponsible not to prepare." },
      { type: "Discovery CEO", sentiment: "positive", quote: "Active Smart at zero increase is the fastest-growing new plan in DHMS history. More than 80% of new members are under 40." },
      { type: "Analyst", sentiment: "cautious", quote: "Every long-term administration contract in SA is now implicitly under review. The Bonitas case changed the governance landscape permanently." },
    ],
    watchPoints: [
      "1 June 2026 — Bonitas operational handover to Momentum confirmed",
      "Discovery April contribution increases — watch for member attrition",
      "GEMS and Polmed contract renewals — will they run competitive tenders?",
      "BestMed affordability positioning — watch if 6.8% drives meaningful membership growth",
      "CMS Section 44 investigation — sector-wide governance implications",
    ],
    sourceCount: 18,
  },

  healthtech: {
    overallSentiment: "POSITIVE", sentimentScore: 64, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "SA health technology is accelerating in 2026 — FHIR R4 compliance, AI clinical decision support and telemedicine adoption are the defining priorities, against a backdrop of NHI digital readiness pressure.",
    themes: [
      {
        theme: "AfroCentric Technologies — Automated Authorisation Live at Scale",
        sentiment: "POSITIVE",
        what: "AfroCentric Technologies deployed automated hospital pre-authorisation across major hospital groups, reducing turnaround from hours to minutes. Microsoft Azure cloud migration substantially complete. R67m invested in actuarial and clinical capability in FY2025. 2030 strategic intent targets AI diagnostics and value-based care. Despite the Bonitas crisis, the technology investment programme continues.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"Microsoft",url:"https://www.microsoft.com/en/customers/story/1474631301821028162-afrocentric-health-payor-microsoft-365-en-south-africa"}],
        representative_voice: "The automated authorisation system is live in production across major hospital groups. This is not a pilot. It is the kind of AI that actually matters in SA healthcare."
      },
      {
        theme: "FHIR R4 Compliance — 2027 Deadline Approaching",
        sentiment: "NEUTRAL",
        what: "NDoH HPRS interoperability framework mandates FHIR R4 compliance for systems connecting to the national health data exchange by 2027. AfroCentric Technologies, Discovery and Netcare are at varying readiness stages. The standard creates infrastructure for a unified patient record across public and private care.",
        sources: [{name:"Black Book 2026",url:"https://blackbookmarketresearch.com/south-africa-state-of-acute-care-ehr-and-digital-health-care-2026"}],
        representative_voice: "FHIR R4 is the plumbing no one talks about publicly but everyone in health IT is scrambling to build. The 2027 deadline is closer than most organisations realise."
      },
      {
        theme: "Telemedicine — 4 Million Annual Consults, CMS Benefit Equivalence",
        sentiment: "POSITIVE",
        what: "SA telemedicine consults crossed 4 million annually for the first time in 2025 following CMS recognition of virtual consultations as an equivalent benefit. Kena Health, Hello Doctor and scheme virtual GP benefit expansions are driving adoption. 2026 adoption expected to accelerate following the regulatory unlock.",
        sources: [{name:"Kena Health",url:"https://www.kena.health"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "CMS benefit equivalence was the regulatory unlock the industry needed. Schemes now have a commercial reason to invest in virtual care."
      },
    ],
    topVoices: [
      { type: "Analyst", sentiment: "positive", quote: "FHIR R4 compliance will be the great differentiator in 2026-2027. Whoever gets there first controls the data layer." },
      { type: "Employee", sentiment: "positive", quote: "The automated authorisation work is the most impactful health IT being built in SA right now. The clinical complexity is real." },
      { type: "Media", sentiment: "cautious", quote: "The digital health excitement is real but most investment still flows to the top 15% of the population. The public sector digital gap is widening." },
    ],
    watchPoints: [
      "FHIR R4 compliance deadline 2027 — AfroCentric Technologies readiness vs competitors",
      "SAHPRA AI as medical device guidance — still outstanding",
      "Value-based care contract models — watch for AfroCentric and Discovery announcements",
      "Telemedicine quality standards — CMS developing framework",
    ],
    sourceCount: 12,
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

// Sources that are free and provide full summaries in RSS
const FREE_WITH_SUMMARY = new Set([
  "Bhekisisa", "Health-e News", "Spotlight", "GroundUp",
  "Health Policy Watch", "SAHPRA", "BHF", "Moonstone", "Medical Brief",
]);

// Sources that are paywalled or do not include summaries in RSS
const PAYWALL_OR_NO_SUMMARY = new Set([
  "Business Day", "Financial Mail", "Sunday Times",
  "News24 Health", "IOL Health", "TimesLive", "Briefly",
  "MSN Health SA", "SABC Health", "Sowetan Health",
  "DM Health", "M&G Health", "Bizcommunity", "Life Healthcare", "SAMJ",
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


  // Clean description — keep as much as possible, only strip obvious junk
  const cleanDesc = (title, desc) => {
    if (!desc) return "";
    let d = desc
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\s+/g, " ").trim();
    if (d.length < 10) return "";
    // Only strip if description is near-identical to title (80%+ overlap)
    const titleNorm = title.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    const descNorm  = d.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    const overlap   = titleNorm.length > 15 && descNorm.startsWith(titleNorm.slice(0, Math.floor(titleNorm.length * 0.8)));
    if (overlap) return "";
    // Return up to 250 chars
    return d.length > 250 ? d.slice(0, 250).trim() + "…" : d;
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
                {/* summary snippet — shown if available */}
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

      <div style={{ borderTop:`1px solid ${T.border}`, padding:"16px 20px", background:T.surface, marginTop:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:10 }}>
          <span style={{ fontSize:9, color:T.muted, letterSpacing:"1px", fontFamily:mono }}>AFROCENTRIC GROUP · SOCIAL & MEDIA INTELLIGENCE ·</span>
          <span style={{ fontSize:9, color:T.muted, letterSpacing:"1px", fontFamily:mono }}>UPDATED MARCH 2026</span>
        </div>
        <div style={{ fontSize:10, color:T.muted, fontFamily:font, lineHeight:1.7, borderTop:`1px solid ${T.border}`, paddingTop:10 }}>
          <strong style={{ color:T.dim }}>Disclaimer:</strong> This dashboard is an internal media monitoring tool for AfroCentric Group. Intelligence summaries on the analysis tabs are researched and curated with AI assistance (Claude by Anthropic) and reviewed by a human analyst. They represent a synthesis of publicly available media coverage and do not constitute financial, legal or investment advice. News articles are sourced from third-party RSS feeds — AfroCentric Group does not own or control the content of linked publications. Some sources are subscriber-only; headlines are shown but full summaries may not be available without a subscription. Article content is the intellectual property of the respective publishers.
        </div>
      </div>
    </div>
    </ThemeCtx.Provider>
  );
}