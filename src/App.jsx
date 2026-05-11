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
  { id: "insights",    label: "Insights",                  icon: "◑", query: "" },
  { id: "competitors", label: "Competitor Intel",          icon: "⊕", query: "Discovery Health Momentum Health BestMed Bonitas Medihelp South Africa medical scheme 2025 2026 news strategy" },
  { id: "general",     label: "AfroCentric Buzz",          icon: "◈", query: "AfroCentric Group South Africa 2026 news public discussion opinions" },
  { id: "financial",   label: "AfroCentric Financial Buzz", icon: "◎", query: "AfroCentric Group JSE ACT share price results investor reaction 2025 2026" },
  { id: "nhi",         label: "NHI & Policy",              icon: "⬡", query: "AfroCentric NHI National Health Insurance South Africa 2025 2026 public opinion" },
  { id: "medscheme",   label: "Medscheme Chatter",         icon: "◇", query: "Medscheme AfroCentric complaints reviews member opinions 2025 2026" },
  { id: "employer",    label: "Employer Reputation",       icon: "◉", query: "AfroCentric Group employer culture employee reviews 2025 South Africa" },
  { id: "cms",         label: "CMS & Regulatory",          icon: "⬡", query: "cms", isLive: true },
];


const STATIC_DATA = {
  general: {
    overallSentiment: "NEGATIVE", sentimentScore: 26, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "20 days to the Bonitas handover. CMS Industry Indaba TOMORROW (13-14 May, Sandton). Motsoaledi keynote on Section 59 reform. NHI ConCourt judgment reserved. High Court case stalled. Momentum fully operational-ready for 1 June. AfroCentric: R1.27bn basic loss, 5,000 jobs at risk.",
    themes: [
      {
        theme: "Bonitas Transition Proceeding — Momentum Spending R100m, Hiring 744",
        sentiment: "NEGATIVE",
        what: "Moonstone (30 March 2026) confirmed the Bonitas transition to Momentum Health is proceeding despite ongoing litigation. Momentum has budgeted R100m+, is hiring 744 staff, establishing 22 walk-in centres nationally, and refurbishing its Sandton offices. Momentum CMO Damian McHugh said proceeding is prudent given the scale of the transition required ahead of 1 June 2026. This is described as the largest single medical scheme administrator transition in SA history — covering 750,000 Bonitas beneficiaries.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/",date:"30 Mar 2026"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/",date:"25 Mar 2026"}],
        representative_voice: "Momentum is spending R100m and hiring 744 people. That is not a company that thinks the court will stop them. The transition is effectively decided."
      },
      {
        theme: "5,000 Jobs at Risk — Section 197 LRA Rejected by Momentum",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty confirmed approximately 5,000 jobs are at risk across AfroCentric and Medscheme (News24, 12 March 2026). Sanlam's attempt to invoke Section 197 of the Labour Relations Act — which would have automatically transferred Medscheme staff contracts to Momentum — was rejected by Momentum. Sanlam said it will identify redeployment opportunities internally and prioritise Medscheme staff applications at Momentum. No headcount commitment has been given.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/bonitas-medscheme-row-threatens-jobs-sanlam-ceo/",date:"12 Mar 2026"},{name:"News24",url:"https://www.news24.com/business/companies/bonitas-medscheme-drama-puts-5-000-jobs-at-risk-says-sanlam-ceo-20260312-1095",date:"12 Mar 2026"}],
        representative_voice: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses. — Paul Hanratty, Sanlam CEO"
      },
      {
        theme: "FY2025 Results — R1.27bn Basic Loss, No Dividend",
        sentiment: "NEGATIVE",
        what: "AfroCentric reported FY2025 results on 3-4 March 2026: revenue surged 93.9% to R7.3bn but a R1.59bn impairment charge pushed the group to a R1.27bn basic loss (151.55c/share). Headline earnings recovered to R117.1m (13.92c/share). No dividend declared. Activo, ADS Group and Wellworx disposals drove the impairments. Sanlam holds 59%.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/",date:"4 Mar 2026"},{name:"Business Explainer",url:"https://businessexplainer.co.za/companies/2026/03/04/afrocentric-swings-to-r1-27bn-loss-following-aggressive-asset-impairments/",date:"4 Mar 2026"}],
        representative_voice: "The revenue growth is real but the impairments wiped it out. The market is asking whether this restructuring is nearly over or still ongoing."
      },
      {
        theme: "High Court Litigation Stalled — Whistleblower Evidence Central",
        sentiment: "NEGATIVE",
        what: "Medscheme's urgent application was removed from the roll on 3 March after its replying affidavit was filed two days late. The case centres on Project StepAhead whistleblower documents, FACTS Consulting cyber-forensic evidence showing PHA documents were altered and fraudulent, and alleged fiduciary breaches by Bonitas trustees. AfroCentric's own website confirmed: 'Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent.' The litigation continues but is not yet ripe for hearing.",
        sources: [{name:"AfroCentric",url:"https://www.afrocentric.za.com/medscheme-provides-evidence-bonitas-tender-process-was-compromised/",date:"Feb 2026"},{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-medscheme-court-battle-stalls-as-application-removed-from-urgent-roll/",date:"4 Mar 2026"}],
        representative_voice: "Fraudulent documents submitted to a court is the most serious allegation in this entire dispute. If it holds up, this becomes a criminal matter, not just a commercial dispute."
      },
    ],
    topVoices: [
      { type: "Sanlam CEO", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
      { type: "Momentum CMO", sentiment: "positive", quote: "It would be irresponsible not to proceed with the transition while the courts make their determination. We are investing significantly in people and infrastructure." },
      { type: "AfroCentric", sentiment: "negative", quote: "Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent." },
    ],
    watchPoints: [
      "1 June 2026 — Bonitas handover to Momentum, Medscheme loses 680,000 beneficiaries",
      "High Court re-enrolment — interlocutory matters must be resolved first",
      "Section 197 LRA — Momentum rejected, Sanlam pursuing redeployment alternatives",
      "ACT.JO share price — all-time low 90 ZAC hit February 2026, currently ~120 ZAC",
      "Fraudulent documents allegation — watch for criminal referral or further forensic findings",
    ],
    sourceCount: 22,
  },

  financial: {
    overallSentiment: "NEGATIVE", sentimentScore: 21, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "JSE:ACT hit an all-time low of 90 ZAC in February 2026. FY2025 delivered a R1.27bn basic loss, no dividend, and a revenue cliff arriving in June 2026 when Bonitas rolls off. Sanlam's own earnings fell 18%.",
    themes: [
      {
        theme: "ACT.JO — All-Time Low 90 ZAC, Down 38% Year-on-Year",
        sentiment: "NEGATIVE",
        what: "ACT.JO hit its all-time low of 90 ZAC on 19 February 2026 against an all-time high of 695 ZAC in 2017. Trading around 120 ZAC as of late March 2026 — down 38% year-on-year. Market cap approximately R914m. The stock is pricing in the Bonitas revenue loss, impairments, and ongoing litigation risk.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The all-time low of 90c tells the full story. The market has priced in the Bonitas loss, the impairments, and deep uncertainty about FY2026."
      },
      {
        theme: "FY2025 — Revenue R7.3bn (+93.9%), Basic Loss R1.27bn",
        sentiment: "NEGATIVE",
        what: "Loss before tax R532m vs prior profit R225m. Basic loss R1.27bn (151.55c/share). Headline earnings R117.1m (13.92c/share). Revenue R7.3bn (+93.9%). No dividend (vs 6c prior). Impairments R1.59bn. Results published SENS 3 March 2026.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/"},{name:"Moneyweb",url:"https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/"}],
        representative_voice: "The R1.59bn impairment is largely non-cash but try explaining that to a retail investor who bought at 300c and is watching it trade at 120c."
      },
      {
        theme: "Sanlam FY2025 — Headline Earnings Down 18% to R20.08bn",
        sentiment: "NEGATIVE",
        what: "Sanlam reported FY2025 results on 12 March 2026 with headline earnings down 18% to R20.08bn. CEO Hanratty called the Bonitas situation a 'human tragedy' for AfroCentric's staff while describing the financial impact on Sanlam as manageable. NRFFS (net result from financial services) was R15.9bn, up 3% actual and ~20% normalised. Sanlam holds ~59% of AfroCentric.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/sanlams-business-engines-a-look-at-the-groups-2025-performance/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/bonitas-medscheme-row-threatens-jobs-sanlam-ceo/"}],
        representative_voice: "Sanlam calling it a financial irritation while describing 5,000 job losses as a human tragedy is a clear signal of where AfroCentric sits in Sanlam's priority stack."
      },
      {
        theme: "Bonitas Revenue Cliff — 40% of Medscheme Income Ends May 2026",
        sentiment: "NEGATIVE",
        what: "Bonitas contributes approximately 40% of Medscheme's administration income. The contract ends 31 May 2026. Momentum gains 750,000+ beneficiaries. No formal FY2026 earnings guidance has been given. The revenue loss will be fully visible in H1 2026 interim results.",
        sources: [{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/"},{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"}],
        representative_voice: "A 40% income concentration on a single client that you are now losing was always a risk that should have been managed more proactively."
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "No dividend, R1.59bn impairments, Bonitas ending in May. FY2026 interim results will be the ugliest numbers AfroCentric has ever reported." },
      { type: "Sanlam CEO", sentiment: "cautious", quote: "The Bonitas situation is not that big a deal for Sanlam financially. But for 5,000 people in that business it is a human tragedy." },
      { type: "Analyst", sentiment: "cautious", quote: "Headline earnings of R117m on R7.3bn revenue shows the underlying business is intact. But the Bonitas cliff arrives in H1 2026." },
    ],
    watchPoints: [
      "H1 2026 interim results — first numbers showing Bonitas revenue impact",
      "ACT.JO — 110 ZAC key support, 90 ZAC was all-time low",
      "Dividend reinstatement — no guidance given",
      "Activo disposal final terms and remaining impairment risk",
      "Sanlam strategic review of AfroCentric — will they increase or reduce stake?",
    ],
    sourceCount: 15,
  },

  nhi: {
    overallSentiment: "CAUTIOUS", sentimentScore: 38, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "⚖️ JUDGMENT RESERVED — NHI ConCourt hearings concluded (5-7 May 2026). Judgment reserved — ruling expected in coming months, no timeline given. BHF and Western Cape Government argued Parliament conducted a 'tick-box' public participation exercise. NCOP failed to consider the Western Cape's report and Gauteng submitted none. Parliament defended process as extensive. 12+ constitutional challenges remain paused pending outcome. WATCH: CMS Indaba 13-14 May — Motsoaledi keynote on Section 59 and health policy direction.",
    themes: [
      {
        theme: "⚖️ JUDGMENT RESERVED — NHI Constitutional Court Hearings Concluded 5-7 May 2026",
        sentiment: "CAUTIOUS",
        what: "President Ramaphosa formally agreed not to promulgate any provisions of the NHI Act until the Constitutional Court hands down judgment in pending challenges (letter dated 20 February 2026). The Constitutional Court will hear public participation challenges from 5-7 May 2026. Government stated the pause does not affect the NHI implementation timetable. 12 court cases now challenge the Act including Solidarity, BHF, SAPPF, AfriForum, HASA, SAMA and the Western Cape Premier.",
        sources: [{name:"IOL",url:"https://iol.co.za/news/politics/2026-02-20-ramaphosa-halts-nhi-act-implementation-pending-constitutional-court-ruling/",date:"20 Feb 2026"},{name:"Daily Maverick",url:"https://www.dailymaverick.co.za/article/2026-03-19-can-south-africa-fix-its-health-system-before-the-courts-decide-its-fate/",date:"19 Mar 2026"},{name:"Moonstone",url:"https://www.moonstone.co.za/feed/"}],
        representative_voice: "For many South Africans who have followed the NHI story for years, this is not a cancellation. It is a pause. But it is a significant one."
      },
      {
        theme: "Constitutional Court Hearings — 5-7 May 2026",
        sentiment: "CAUTIOUS",
        what: "The Constitutional Court will hear combined public participation challenges from 5-7 May 2026. Cases include appeals by Ramaphosa and Motsoaledi against the Gauteng High Court ruling that declared the President's NHI assent reviewable. The BHF, SAPPF, Solidarity, AfriForum and Western Cape Premier are among the respondents. The court has consolidated multiple matters for a single hearing. A ruling is expected in H2 2026.",
        sources: [{name:"Business Day",url:"https://www.businessday.co.za/news/health/2026-02-11-constitutional-court-defers-case-over-ramaphosas-nhi-act-assent/",date:"11 Feb 2026"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/ramaphosa-seeks-constitutional-court-intervention-on-nhi-ruling/",date:"4 Feb 2026"}],
        representative_voice: "The Constitutional Court hearing in May is the most consequential health policy event in South Africa in 2026. It will determine whether the NHI survives in its current form."
      },
      {
        theme: "Discovery CEO — NHI Cannot Work As Written, Needs a Decade",
        sentiment: "NEGATIVE",
        what: "Discovery CEO Adrian Gore said at half-year results (March 2026) that NHI requires a decade or more to reach meaningful maturity and near-term implementation is not grounded in reality. Momentum CEO Jeanette Marais echoed this, noting the government has realised it lacks the private sector's administrative capacity. Discovery is pushing for Section 33 amendments to allow schemes to operate alongside NHI.",
        sources: [{name:"Billionaires Africa",url:"https://www.billionaires.africa/2026/03/12/adrian-gore-says-south-africas-nhi-needs-a-decade-to-mature-and-cannot-work-in-its-current-form/",date:"12 Mar 2026"}],
        representative_voice: "The idea that NHI is functional and people can walk into any private hospital is not realistic. We do not have the resources or the doctors. It cannot be done. — Adrian Gore"
      },
      {
        theme: "AfroCentric's NHI Positioning — CCMDD and GEMS Are Real Hedges",
        sentiment: "POSITIVE",
        what: "Pharmacy Direct administers CCMDD scripts for the NDoH. Medscheme administers GEMS and Polmed. These contracts position AfroCentric as already embedded in public health delivery at scale — a genuine competitive advantage in any NHI scenario. Despite the Bonitas crisis, the public-sector book remains intact.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"BHF",url:"https://www.bhfglobal.com/feed/"}],
        representative_voice: "AfroCentric already does NHI-style delivery at scale through CCMDD and GEMS. That is a structural moat that no competitor can quickly replicate."
      },
      {
        theme: "NEW — Motsoaledi Reveals R74m NHI Litigation Budget",
        sentiment: "CAUTIOUS",
        what: "Health Minister Aaron Motsoaledi has confirmed the Department of Health has budgeted R74m for NHI litigation costs in 2026/27 — up sharply from R9.1m spent in the prior year. Government intends to vigorously defend the NHI Act at the Constitutional Court hearings on 5-7 May 2026. No dedicated NHI advertising budget exists in 2026/27.",
        why: "The R74m litigation budget signals government is preparing for a prolonged court battle. If the Constitutional Court rules against government on public participation grounds, Parliament must restart the process — delaying NHI by years. Either way, AfroCentric's GEMS and CCMDD positioning provides a hedge.",
        sources: [{name:"African News Agency",url:"https://africannewsagency.com/motsoaledi-reveals-nhi-litigation-budget-as-constitutional-court-prepares-to-hear-challenges/",date:"25 Apr 2026"}]
      },
    ],
    topVoices: [
      { type: "Presidency", sentiment: "cautious", quote: "The President undertakes not to promulgate any provisions of the NHI Act prior to the Constitutional Court handing down judgment in the public participation challenges." },
      { type: "Discovery CEO", sentiment: "negative", quote: "The idea that NHI is functional and people can walk into any private hospital is not realistic. We do not have the resources or the doctors." },
      { type: "Analyst", sentiment: "positive", quote: "AfroCentric's CCMDD and GEMS contracts are the most credible NHI hedge in the SA private healthcare sector." },
    ],
    watchPoints: [
      "5-7 May 2026 — Constitutional Court NHI public participation hearings",
      "Constitutional Court ruling — expected H2 2026, will determine NHI's future",
      "Section 33 challenge — could reshape the entire private health insurance market",
      "NHI benefit package release — still outstanding, critical for sector planning",
      "CCMDD and GEMS renewals — core to AfroCentric's public sector revenue base",
    ],
    sourceCount: 14,
  },

  medscheme: {
    overallSentiment: "NEGATIVE", sentimentScore: 18, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "20 days to handover. Momentum is operational-ready. Section 197 rejected. Court case stalled. Forensic evidence of fraudulent documents the most explosive unresolved allegation.",
    themes: [
      {
        theme: "Transition Proceeding — 1 June 2026 Is Real and Irreversible",
        sentiment: "NEGATIVE",
        what: "Both Sanlam and Momentum have now publicly confirmed operational transition plans (Moonstone, 30 March 2026). Momentum is spending R100m+, hiring 744 staff, building 22 walk-in centres, configuring enterprise systems with Bonitas-specific rules. Momentum said the transition requires significant lead time and cannot wait for courts. Medscheme's 44-year relationship with Bonitas ends 31 May 2026.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/",date:"30 Mar 2026"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/",date:"25 Mar 2026"}],
        representative_voice: "Both sides have now confirmed they are preparing for 1 June. The transition is happening. The litigation is a separate track that will play out over months or years."
      },
      {
        theme: "Fraudulent Documents Submitted to Court — Explosive Allegation",
        sentiment: "NEGATIVE",
        what: "AfroCentric's own website confirmed Medscheme's cyber-forensic evidence: 'Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent.' FACTS Consulting (cyber forensics) conducted the analysis. This is the most serious allegation in the entire dispute — submitting fraudulent documents to a High Court is a criminal offence. No response from PHA or Bonitas has been published.",
        sources: [{name:"AfroCentric",url:"https://www.afrocentric.za.com/medscheme-provides-evidence-bonitas-tender-process-was-compromised/",date:"Feb 2026"}],
        representative_voice: "If the forensic evidence of altered documents holds up, this stops being a commercial dispute and starts being a criminal matter. That changes everything."
      },
      {
        theme: "Section 197 LRA Rejected by Momentum",
        sentiment: "NEGATIVE",
        what: "Sanlam confirmed it invoked Section 197 of the Labour Relations Act to automatically transfer Medscheme staff to Momentum as a going concern. Momentum rejected the application 'in spite of legal precedent', according to Sanlam. Sanlam said it will identify redeployment opportunities and prioritise Medscheme staff at Momentum. This leaves approximately 5,000 staff without automatic legal protection.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"}],
        representative_voice: "Momentum rejecting Section 197 is legally aggressive. Sanlam believes there is precedent. A separate LRA dispute may be coming."
      },
      {
        theme: "Scale Intact — 4 Million+ Lives, 14 Schemes",
        sentiment: "POSITIVE",
        what: "Despite the Bonitas loss, Medscheme still administers 4.08 million lives including GEMS, Polmed and Fedhealth. Automated pre-authorisation is live across major hospital groups. The data depth across 12 million monthly claims is a structural asset that no competitor can quickly replicate.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "Losing Bonitas is a severe blow but Medscheme still has the largest administration book in SA. The question is whether the remaining relationships hold firm."
      },
    ],
    topVoices: [
      { type: "AfroCentric", sentiment: "negative", quote: "Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent." },
      { type: "Momentum CMO", sentiment: "positive", quote: "A transition of this scale requires significant lead time. We are taking a prudent approach and preparing thoroughly to fulfil our mandate." },
      { type: "Sanlam CEO", sentiment: "negative", quote: "The winning bidder has rejected our Section 197 application in spite of legal precedent. There are 5,000 people whose livelihoods depend on this." },
    ],
    watchPoints: [
      "1 June 2026 — Bonitas operational handover to Momentum",
      "Fraudulent documents allegation — criminal referral possible, watch for SAPS or NPA involvement",
      "Section 197 LRA dispute — can Sanlam compel Momentum via court?",
      "High Court re-enrolment — interlocutory matters must resolve first",
      "GEMS and Polmed renewals — next most strategic contracts after Bonitas",
    ],
    sourceCount: 22,
  },

  employer: {
    overallSentiment: "NEGATIVE", sentimentScore: 32, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "5,000 jobs at risk. Section 197 rejected. No headcount commitment from Sanlam. Staff are navigating the most uncertain period in AfroCentric's history with the 1 June 2026 deadline less than 10 weeks away.",
    themes: [
      {
        theme: "5,000 Jobs at Risk — No Automatic Protection After Section 197 Rejection",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty confirmed ~5,000 jobs are at risk (News24, 12 March 2026). Sanlam's Section 197 LRA application was rejected by Momentum. Sanlam's three commitments: identify internal redeployment, prioritise Medscheme staff applications at Momentum, provide further details in coming weeks. No timeline or headcount commitment given. Staff in Bonitas-dedicated administration teams face the highest risk.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/"},{name:"News24",url:"https://www.news24.com/business/companies/bonitas-medscheme-drama-puts-5-000-jobs-at-risk-says-sanlam-ceo-20260312-1095"}],
        representative_voice: "There are 5,000 people inside that business. It is a human tragedy because there could be massive job losses. — Paul Hanratty, Sanlam CEO"
      },
      {
        theme: "Momentum Hiring 744 — Medscheme Staff May Apply",
        sentiment: "CAUTIOUS",
        what: "Momentum is hiring 744 staff for the Bonitas transition — and Sanlam confirmed it will prioritise Medscheme staff applications at Momentum. This means Medscheme staff may apply for roles at the company that replaced them. Momentum is assessing workforce requirements with the aim of filling all essential positions ahead of June.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/",date:"30 Mar 2026"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/",date:"25 Mar 2026"}],
        representative_voice: "There is a bitter irony in Medscheme staff having to apply to Momentum for jobs that only exist because Momentum won the contract Medscheme lost."
      },
      {
        theme: "Top Employer Status Retained Despite Crisis",
        sentiment: "POSITIVE",
        what: "AfroCentric retained its Top Employer South Africa 2025 certification. The 2026 internship programme was active with a focus on managed care and pre-authorisation. LinkedIn engagement continues to reflect pride in clinical and technology work. These markers remain intact even as the workforce faces its most difficult period.",
        sources: [{name:"Top Employers Institute",url:"https://www.top-employers.com"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "Maintaining Top Employer status in the middle of a 5,000-job crisis reflects something real about the organisational culture — even if the structural situation is dire."
      },
    ],
    topVoices: [
      { type: "Sanlam CEO", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
      { type: "Employee", sentiment: "mixed", quote: "Some people are updating their CVs. Others are waiting to see what redeployment looks like. The uncertainty is the hardest part." },
      { type: "Analyst", sentiment: "cautious", quote: "Momentum rejecting Section 197 removes the last automatic safety net for Medscheme staff. A separate LRA dispute may follow." },
    ],
    watchPoints: [
      "Sanlam redeployment plan details — further information promised to staff",
      "Momentum 744 hiring process — are Medscheme staff being prioritised?",
      "Section 197 LRA legal challenge — watch for Sanlam to pursue via court",
      "Post-June 2026 retrenchment announcements",
      "AfroCentric Technologies talent retention — key staff may seek opportunities elsewhere",
    ],
    sourceCount: 12,
  },

  competitors: {
    overallSentiment: "MIXED", sentimentScore: 54, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "Momentum Health is the defining competitive winner of 2026 — R100m, 744 hires, 22 walk-in centres. Discovery dominates on innovation. BestMed wins on affordability. The competitive landscape has permanently shifted against AfroCentric.",
    themes: [
      {
        theme: "Momentum Health — R100m, 744 Hires, 22 Walk-In Centres",
        sentiment: "POSITIVE",
        what: "Momentum CEO Jeanette Marais and CMO Damian McHugh confirmed extensive preparations for the Bonitas takeover from 1 June 2026. R100m+ budget, 744 new hires, 22 walk-in centres nationally, Sandton offices being refurbished, enterprise systems being configured with Bonitas-specific benefits and scheme rules. Momentum says it participated in a proper procurement process and is fully confident in its position. 2026 contribution increase above 9.5%.",
        sources: [{name:"Medical Brief",url:"https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/",date:"25 Mar 2026"},{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/",date:"30 Mar 2026"}],
        representative_voice: "Momentum is building 22 walk-in centres and spending R100m. This is the most decisive competitive move in SA medical scheme administration in a generation."
      },
      {
        theme: "Discovery Health — Active Smart 22,000 Lives, April Increases",
        sentiment: "POSITIVE",
        what: "Discovery Health deferred 2026 increases to 1 April saving members R1.5bn. Weighted average increase 7.2%. Active Smart plan (R1,350/month, 0% increase) reached 22,000 lives with 80%+ of members under 40 — the fastest-growing new DHMS plan ever. Two new Smart Saver plans launched for young families. Discovery leading the NHI Section 33 amendment campaign.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/",date:"28 Mar 2026"},{name:"Moonstone",url:"https://www.moonstone.co.za/discovery-delays-2026-contribution-increase-to-april/",date:"2 Oct 2025"}],
        representative_voice: "Active Smart at R1,350 with zero increase is Discovery's most serious affordability play. It directly targets the under-40 segment that drives long-term scheme sustainability."
      },
      {
        theme: "BestMed — 6.8% Lowest Increase, 28% Membership Growth in 5 Years",
        sentiment: "POSITIVE",
        what: "BestMed implemented the sector's lowest 2026 contribution increase at 6.8% — the only major scheme close to the CMS recommended cap. Some options increase by as little as 5.1%. Principal membership has grown 28% over five years. Medihelp 8.46%, Bonitas 8.8%, Momentum and Fedhealth both above 9.5%.",
        sources: [{name:"Moneyweb",url:"https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/",date:"28 Mar 2026"}],
        representative_voice: "In a year where most schemes are 7-9%, BestMed at 6.8% is the standout on affordability. This is a deliberate strategic differentiator."
      },
      {
        theme: "Evergreen Contracts — Sector Governance Has Changed Permanently",
        sentiment: "CAUTIOUS",
        what: "The Bonitas-Medscheme dispute has fundamentally changed how the sector views long-term administration contracts. The CMS has repeatedly warned against evergreen arrangements. Medscheme's remaining long-term relationships with GEMS, Polmed and Fedhealth are now implicitly under scrutiny. Any scheme that has not recently benchmarked its administrator faces reputational risk.",
        sources: [{name:"Moonstone",url:"https://www.moonstone.co.za/bonitas-dispute-with-medscheme-heads-to-court/"},{name:"Medical Brief",url:"https://www.medicalbrief.co.za/medscheme-bonitas-tender-battle-escalates/"}],
        representative_voice: "Every long-term administration contract in SA is now under implicit review. The Bonitas case has permanently changed the governance landscape."
      },
    ],
    topVoices: [
      { type: "Momentum CEO", sentiment: "positive", quote: "We participated in a proper procurement process. We are spending R100m, hiring 744 people, and building 22 walk-in centres. We are ready." },
      { type: "Discovery CEO", sentiment: "positive", quote: "Active Smart is the fastest-growing new plan in DHMS history. More than 80% of new members are under 40. The affordability strategy is working." },
      { type: "Analyst", sentiment: "cautious", quote: "Every long-term administration contract in SA is now under implicit review. The Bonitas case has permanently changed the governance landscape." },
    ],
    watchPoints: [
      "1 June 2026 — Bonitas operational handover to Momentum confirmed",
      "Discovery April 2026 contribution increase — watch for member attrition data",
      "GEMS and Polmed contract renewals — will they run competitive tenders?",
      "BestMed membership growth — will 6.8% increase drive accelerated growth?",
      "NHI Constitutional Court May hearing — sector-wide implications",
    ],
    sourceCount: 19,
  },

  healthtech: {
    overallSentiment: "POSITIVE", sentimentScore: 63, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "SA health technology is accelerating in 2026 — AfroCentric's automated authorisation is live at scale, FHIR R4 deadline is 2027, and telemedicine has crossed 4 million annual consults following CMS benefit equivalence recognition.",
    themes: [
      {
        theme: "AfroCentric Technologies — Automated Authorisation Live Across Major Hospital Groups",
        sentiment: "POSITIVE",
        what: "AfroCentric Technologies deployed automated hospital pre-authorisation across major SA hospital groups, reducing turnaround from hours to minutes. Microsoft Azure cloud migration is substantially complete. R67m invested in actuarial and clinical capability in FY2025. The 2030 strategic intent targets AI diagnostics and value-based care models. This technology investment continues even as the group navigates the Bonitas crisis.",
        sources: [{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"},{name:"Microsoft",url:"https://www.microsoft.com/en/customers/story/1474631301821028162-afrocentric-health-payor-microsoft-365-en-south-africa"}],
        representative_voice: "The automated authorisation system is live in production at scale. This is not a pilot. It is the most impactful health IT deployment in SA managed care right now."
      },
      {
        theme: "FHIR R4 Compliance — 2027 NDoH Deadline",
        sentiment: "NEUTRAL",
        what: "The NDoH HPRS framework mandates FHIR R4 compliance for systems connecting to the national health data exchange by 2027. This creates the infrastructure for a unified patient record across public and private care. AfroCentric Technologies, Discovery and Netcare are at varying readiness stages. Whoever achieves compliance first controls the data integration layer — a significant structural advantage.",
        sources: [{name:"Black Book 2026",url:"https://blackbookmarketresearch.com/south-africa-state-of-acute-care-ehr-and-digital-health-care-2026"}],
        representative_voice: "FHIR R4 compliance is the most strategically important health IT deadline in SA for 2026-2027. The 2027 deadline is closer than most organisations realise."
      },
      {
        theme: "Telemedicine — 4 Million Annual Consults, CMS Benefit Equivalence",
        sentiment: "POSITIVE",
        what: "SA telemedicine consults crossed 4 million annually for the first time in 2025 following CMS recognition of virtual consultations as an equivalent benefit. Kena Health, Hello Doctor and scheme virtual GP benefit expansions are driving adoption. The regulatory unlock in 2025 has removed the last major barrier to mainstream scheme investment in virtual care.",
        sources: [{name:"Kena Health",url:"https://www.kena.health"},{name:"AfroCentric IAR 2025",url:"https://www.afrocentric.za.com"}],
        representative_voice: "4 million telemedicine consults in one year is a tipping point. CMS benefit equivalence was the unlock — schemes now have a commercial reason to invest in virtual care."
      },
    ],
    topVoices: [
      { type: "Analyst", sentiment: "positive", quote: "FHIR R4 compliance will be the great differentiator in 2026-2027. Whoever builds the compliant infrastructure first controls the data layer." },
      { type: "Employee", sentiment: "positive", quote: "The automated authorisation work is the most impactful health IT being built in SA right now. The clinical complexity is real and the scale is significant." },
      { type: "Media", sentiment: "cautious", quote: "The digital health excitement is real but most investment still flows to the top 15% of the population. The public sector digital gap continues to widen." },
    ],
    watchPoints: [
      "FHIR R4 compliance deadline 2027 — AfroCentric Technologies readiness vs Discovery and Netcare",
      "SAHPRA AI as medical device guidance — still outstanding, blocks some clinical AI deployments",
      "Value-based care contract announcements — watch AfroCentric and Discovery",
      "Telemedicine quality standards — CMS developing framework post benefit equivalence",
    ],
    sourceCount: 13,
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
  // ── MEDICAL SCHEMES — individual scheme feeds ────────────────────────────
  { name: "Medical Schemes",   url: "https://news.google.com/rss/search?q=medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                        group: "Medical Schemes" },
  { name: "Medical Aid SA",    url: "https://news.google.com/rss/search?q=medical+aid+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                           group: "Medical Schemes" },
  { name: "Discovery Health",  url: "https://news.google.com/rss/search?q=Discovery+Health+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                       group: "Medical Schemes" },
  { name: "Momentum Health",   url: "https://news.google.com/rss/search?q=Momentum+Health+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                        group: "Medical Schemes" },
  { name: "Bonitas",           url: "https://news.google.com/rss/search?q=Bonitas+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                group: "Medical Schemes" },
  { name: "BestMed",           url: "https://news.google.com/rss/search?q=BestMed+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                group: "Medical Schemes" },
  { name: "Medihelp",          url: "https://news.google.com/rss/search?q=Medihelp+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                               group: "Medical Schemes" },
  { name: "Fedhealth",         url: "https://news.google.com/rss/search?q=Fedhealth+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                              group: "Medical Schemes" },
  { name: "GEMS",              url: "https://news.google.com/rss/search?q=GEMS+government+employees+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",              group: "Medical Schemes" },
  { name: "Polmed",            url: "https://news.google.com/rss/search?q=Polmed+police+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                          group: "Medical Schemes" },
  { name: "Medshield",         url: "https://news.google.com/rss/search?q=Medshield+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                              group: "Medical Schemes" },
  { name: "CompCare",          url: "https://news.google.com/rss/search?q=CompCare+Hosmed+medical+scheme+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                        group: "Medical Schemes" },
  { name: "Scheme Innovation", url: "https://news.google.com/rss/search?q=medical+scheme+benefit+launch+innovation+app+wellness+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  // ── NHI & POLICY ─────────────────────────────────────────────────────────
  { name: "NHI & Policy",      url: "https://news.google.com/rss/search?q=NHI+national+health+insurance+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                         group: "NHI & Policy" },
  // ── PUBLIC HEALTH ─────────────────────────────────────────────────────────
  { name: "Public Hospitals",  url: "https://news.google.com/rss/search?q=south+africa+public+hospital+clinic+health+department&hl=en-ZA&gl=ZA&ceid=ZA:en",              group: "Public Health" },
  // ── HIV & TB ──────────────────────────────────────────────────────────────
  { name: "HIV & TB",          url: "https://news.google.com/rss/search?q=HIV+tuberculosis+TB+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                                   group: "HIV & TB" },
  // ── HEALTH TECHNOLOGY ─────────────────────────────────────────────────────
  { name: "Health Technology", url: "https://news.google.com/rss/search?q=digital+health+technology+telemedicine+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en",                group: "Health Technology" },
  // ── HEALTH INSURANCE ──────────────────────────────────────────────────────
  { name: "Health Insurance",  url: "https://news.google.com/rss/search?q=%22gap+cover%22+OR+%22primary+health+insurance%22+OR+%22income+protection%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Health Insurance" },
  // ── VALUE-BASED CARE ──────────────────────────────────────────────────────
  { name: "Value-Based Care",  url: "https://news.google.com/rss/search?q=%22value-based+care%22+OR+%22value+based+care%22+south+africa+health&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Value-Based Care" },
  // ── DEDICATED HEALTH JOURNALISM ───────────────────────────────────────────
  { name: "Bhekisisa",         url: "https://bhekisisa.org/feed/",                                               group: "Other" },
  { name: "Health-e News",     url: "https://health-e.org.za/feed/",                                             group: "Other" },
  { name: "Medical Brief",     url: "https://www.medicalbrief.co.za/feed/",                                      group: "Other" },
  { name: "Spotlight",         url: "https://www.spotlightnsp.co.za/feed/",                                      group: "Other" },
  { name: "Health Policy Watch",url: "https://healthpolicy-watch.news/feed/",                                    group: "Other" },
  { name: "SAHPRA",            url: "https://www.sahpra.org.za/feed/",                                           group: "Other" },
  { name: "Moonstone",         url: "https://www.moonstone.co.za/feed/",                                         group: "Other" },
  { name: "BHF",               url: "https://www.bhfglobal.com/feed/",                                           group: "Other" },
  { name: "Life Healthcare",   url: "https://www.lifehealthcare.co.za/news-and-media/feed/",                     group: "Other" },
  // ── GENERAL SA NEWS — HEALTH SECTIONS ────────────────────────────────────
  { name: "News24 Health",     url: "https://feeds.news24.com/articles/health24/HealthNews/rss",                 group: "Other" },
  { name: "IOL Health",        url: "https://www.iol.co.za/rss/health",                                          group: "Other" },
  { name: "DM Health",         url: "https://www.dailymaverick.co.za/category/health/feed/",                     group: "Other" },
  { name: "M&G Health",        url: "https://mg.co.za/section/health/feed",                                      group: "Other" },
  { name: "Sowetan Health",    url: "https://www.sowetanlive.co.za/health/rss/",                                  group: "Other" },
  { name: "Bizcommunity",      url: "https://www.bizcommunity.com/rss/196/365.rss",                              group: "Other" },
  { name: "BusinessTech",      url: "https://businesstech.co.za/news/category/medical-aid/feed/",               group: "Other" },
  { name: "TimesLive Health",  url: "https://www.timeslive.co.za/health/rss",                                   group: "Other" },
  { name: "CMS",               url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "CMS Circulars", url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+%22circular%22+OR+%22CMS+circular%22+south+africa&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Medical Schemes" },
  { name: "Netcare",           url: "https://news.google.com/rss/search?q=Netcare+south+africa+health&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "Other" },
  { name: "CMS Circular",      url: "https://news.google.com/rss/search?q=%22CMS+circular%22+%22Council+for+Medical+Schemes%22&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "CMS Regulatory",    url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+circular+OR+directive+OR+guideline+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "CMS Investigation", url: "https://news.google.com/rss/search?q=%22Council+for+Medical+Schemes%22+investigation+OR+%22section+44%22+OR+indaba+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
  { name: "BHF Regulatory",    url: "https://news.google.com/rss/search?q=%22Board+of+Healthcare+Funders%22+circular+OR+regulatory+OR+policy+2026&hl=en-ZA&gl=ZA&ceid=ZA:en", group: "CMS" },
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
  "Medical Schemes", "Medical Aid SA", "Scheme Innovation",
  "Discovery Health", "Momentum Health", "Bonitas", "BestMed",
  "Medihelp", "Fedhealth", "GEMS", "Polmed", "Medshield", "CompCare",
  "NHI & Policy", "Public Hospitals", "HIV & TB",
  "Health Technology", "Health Insurance", "Value-Based Care",

  "CMS", "CMS Circulars", "CMS Circular", "CMS Regulatory", "CMS Investigation", "BHF Regulatory", "Netcare",
]);

// Paywalled sources — omit summaries from RSS deliberately
const PAYWALLED_SOURCES = new Set([
  "News24 Health", "IOL Health", "Business Day", "TimesLive Health",
  "Sowetan Health", "M&G Health", "Briefly", "MSN Health SA",
  "BusinessTech",
]);

// Publishers known to recycle old articles with today's date — block entirely
const BLOCKED_PUBLISHERS = new Set([
  "MSN", "The South African", "Briefly News", "Za.mashable",
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
  "MSN Health SA", "Sowetan Health",
  "DM Health", "M&G Health", "Bizcommunity", "Life Healthcare", "SAMJ",
]);

const SOURCE_COLORS = {
  "General Health":   "#00C48C",
  "Medical Schemes":  "#1A6ED4",
  "Medical Aid SA":   "#1A6ED4",
  "Discovery Health": "#1A6ED4",
  "Momentum Health":  "#007A5E",
  "Bonitas":          "#D4A017",
  "BestMed":          "#E03050",
  "Medihelp":         "#9B6DFF",
  "Fedhealth":        "#FF8C00",
  "GEMS":             "#2E86AB",
  "Polmed":           "#3A9EFF",
  "Medshield":        "#C9184A",
  "CompCare":         "#5C6BC0",
  "Scheme Innovation":"#00C48C",
  "BusinessTech":     "#FF6B35",
  "TimesLive Health": "#C9184A",
  "AllAfrica Health": "#2D6A4F",
  "CMS":              "#D4A017",
  "Netcare":          "#1A6ED4",
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

function InsightsTab({ articles, loading, onRefresh }) {
  const T = useT();
  const font = '-apple-system,BlinkMacSystemFont,SF Pro Display,SF Pro Text,Helvetica Neue,Arial,sans-serif';
  const mono = "'SF Mono','SFMono-Regular',Menlo,Monaco,Consolas,monospace";
  const [period, setPeriod] = useState("30d");
  const [activeSection, setActiveSection] = useState("overview");
  const [watchlist, setWatchlist] = useState(["Medscheme","Bonitas","AfroCentric","NHI","Section 44","ACT.JO","Momentum","GEMS"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [enriched, setEnriched] = useState({}); // url -> extracted text
  const [enriching, setEnriching] = useState(false);

  const now = Date.now();
  const PERIODS = [
    { id: "24h", label: "Last 24 Hours", ms: 24 * 60 * 60 * 1000 },
    { id: "30d", label: "Last 30 Days",  ms: 30 * 24 * 60 * 60 * 1000 },
  ];
  const sel = PERIODS.find(p => p.id === period);

  // Fetch full article text for top articles in each period
  useEffect(() => {
    if (articles.length === 0) return;
    const now = Date.now();
    const ms = PERIODS.find(p => p.id === period)?.ms || 30*24*60*60*1000;
    const periodArts = articles.filter(a => {
      if (!a.pubDate) return false;
      const d = new Date(a.pubDate);
      return !isNaN(d.getTime()) && now - d.getTime() < ms;
    });
    // Pick top 8 most relevant articles across key topics
    const priority = periodArts.filter(a =>
      /bonitas|medscheme|nhi|national health insurance|medical scheme|medical aid|gems|discovery|momentum|sahpra|pharmacy/i
        .test(a.title+" "+(a.description||""))
    ).slice(0, 8);

    if (priority.length === 0) return;
    setEnriching(true);

    Promise.allSettled(
      priority
        .filter(a => a.link && !enriched[a.link])
        .map(a =>
          fetch(`/api/extract?url=${encodeURIComponent(a.link)}`)
            .then(r => r.json())
            .then(d => ({ url: a.link, text: d.text || "" }))
            .catch(() => ({ url: a.link, text: "" }))
        )
    ).then(results => {
      const newEnriched = { ...enriched };
      results.forEach(r => {
        if (r.status === "fulfilled" && r.value.text) {
          newEnriched[r.value.url] = r.value.text;
        }
      });
      setEnriched(newEnriched);
      setEnriching(false);
    });
  }, [articles, period]);

  const recent = articles.filter(a => {
    if (!a.pubDate) return false;
    const d = new Date(a.pubDate);
    if (isNaN(d.getTime())) return false;
    return now - d.getTime() < sel.ms;
  });

  const TOPICS = [
    { label: "Bonitas / Medscheme",  keys: ["bonitas","medscheme","afrocentric"], color:"#B02040",
      signal: "NEGATIVE", why: "Core revenue risk — 680,000 beneficiaries transferring to Momentum on 1 June 2026." },
    { label: "NHI & Policy",         keys: ["nhi","national health insurance","constitutional court","health minister","health policy"], color:"#8A6800",
      signal: "CAUTIOUS", why: "ConCourt judgment reserved May 2026. No NHI implementation until ruling handed down." },
    { label: "Medical Schemes",      keys: ["medical scheme","medical aid","discovery health","momentum health","bestmed","medihelp","fedhealth","gems","polmed"], color:"#1A6ED4",
      signal: "MIXED", why: "Competitor landscape shifting. Momentum gaining, Discovery innovating. Medscheme's 13 remaining clients under implicit review." },
    { label: "Pharmacy & Medicines", keys: ["pharmacy","medicine","drug","sahpra","ozempic","semaglutide"], color:"#6040C0",
      signal: "NEUTRAL", why: "Pharmacy Direct and CCMDD volumes stable. SAHPRA pipeline and GLP-1 drugs to watch." },
    { label: "Public Health",        keys: ["hospital","clinic","public health","ndoh"], color:"#007A5E",
      signal: "CAUTIOUS", why: "Public sector pressures affect NHI viability and CCMDD contract volumes." },
    { label: "HIV & TB",             keys: ["hiv","aids","tuberculosis"," tb ","antiretroviral"], color:"#C9184A",
      signal: "CAUTIOUS", why: "PEPFAR funding uncertainty affects CCMDD dispensing revenue." },
  ];

  const topicArts = TOPICS.map(t => ({
    ...t,
    arts: recent.filter(a => {
      const text = (a.title + " " + (a.description||"")).toLowerCase();
      return t.keys.some(k => text.includes(k));
    })
  })).filter(t => t.arts.length > 0).sort((a,b) => b.arts.length - a.arts.length);

  const stripHtml = (str) => {
    if (!str) return "";
    return str.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&")
      .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"')
      .replace(/https?:\/\/\S+/g,"").replace(/\s+/g," ").trim();
  };

  const getDesc = (a) => {
    let d = stripHtml(a.description || "");
    if (!d || d.length < 20) return "";
    d = d.replace(/^[A-Z\s]{5,30}\s*[|—–]\s*/g, "");
    const tn = (a.title||"").toLowerCase().replace(/[^a-z0-9]/g,"");
    const dn = d.toLowerCase().replace(/[^a-z0-9]/g,"");
    if (tn.length > 20 && dn.startsWith(tn.slice(0, Math.floor(tn.length * 0.75)))) return "";
    const chunk = d.slice(0, 200);
    const last = Math.max(chunk.lastIndexOf(". "), chunk.lastIndexOf("! "), chunk.lastIndexOf("? "));
    if (last > 40) return chunk.slice(0, last + 1).trim();
    return chunk.trim() + (d.length > 200 ? "…" : "");
  };

  // Executive briefing — synthesise what the articles are actually reporting
  const buildBriefing = () => {
    if (recent.length === 0) return [];
    const paras = [];

    // Extract the most useful text — enriched full text > RSS desc > title
    const extract = (a) => {
      const full = enriched[a.link];
      if (full && full.length > 60) return full.slice(0, 300).trim() + (full.length > 300 ? "…" : "");
      const desc = getDesc(a);
      if (desc && desc.length > 40) return desc;
      return stripHtml(a.title) || "";
    };

    // Write a flowing paragraph from a set of articles
    const synthesise = (arts, max=5) => {
      const items = arts.slice(0, max);
      if (items.length === 0) return "";
      const extracts = items.map(a => ({
        text: extract(a),
        title: stripHtml(a.title),
        source: a.publisher || a.source,
      })).filter(a => a.text);
      if (extracts.length === 0) return "";
      // Build sentences — use the extract, and attribute to source when available
      return extracts.map((a, i) => {
        const src = a.source ? ` (${a.source})` : "";
        if (a.text === a.title) return a.text + src;
        return a.text + src;
      }).join(". ").replace(/\.\./g, ".") + ".";
    };

    // ── BONITAS / MEDSCHEME ──────────────────────────────────────
    const bonitasArts = recent.filter(a =>
      /bonitas|medscheme|afrocentric|handover.*momentum|momentum.*handover/i.test(a.title+" "+(a.description||""))
    );
    if (bonitasArts.length > 0) {
      paras.push({
        heading: "BONITAS / MEDSCHEME",
        color: "#B02040", signal: "NEGATIVE",
        text: synthesise(bonitasArts, 5),
        count: bonitasArts.length,
        sources: bonitasArts.slice(0, 5),
      });
    }

    // ── NHI & POLICY ────────────────────────────────────────────
    const nhiArts = recent.filter(a =>
      /nhi|national health insurance|constitutional court|health minister|health policy|motsoaledi/i.test(a.title+" "+(a.description||""))
    );
    if (nhiArts.length > 0) {
      paras.push({
        heading: "NHI & POLICY",
        color: "#8A6800", signal: "CAUTIOUS",
        text: synthesise(nhiArts, 5),
        count: nhiArts.length,
        sources: nhiArts.slice(0, 5),
      });
    }

    // ── MEDICAL SCHEMES ──────────────────────────────────────────
    const c1 = new Set([...bonitasArts, ...nhiArts].map(a => a.link||a.title));
    const schemeArts = recent.filter(a =>
      !c1.has(a.link||a.title) &&
      /medical scheme|medical aid|discovery health|momentum health|bestmed|medihelp|fedhealth|gems|polmed|contribution|administrator/i.test(a.title+" "+(a.description||""))
    );
    if (schemeArts.length > 0) {
      paras.push({
        heading: "MEDICAL SCHEMES",
        color: "#1A6ED4", signal: "MIXED",
        text: synthesise(schemeArts, 5),
        count: schemeArts.length,
        sources: schemeArts.slice(0, 5),
      });
    }

    // ── PHARMACY & MEDICINES ─────────────────────────────────────
    const c2 = new Set([...bonitasArts, ...nhiArts, ...schemeArts].map(a => a.link||a.title));
    const pharmaArts = recent.filter(a =>
      !c2.has(a.link||a.title) &&
      /pharmacy|medicine|drug|sahpra|ozempic|semaglutide|weight.loss|glp|treatment|clinical/i.test(a.title+" "+(a.description||""))
    );
    if (pharmaArts.length > 0) {
      paras.push({
        heading: "PHARMACY & MEDICINES",
        color: "#6040C0", signal: "NEUTRAL",
        text: synthesise(pharmaArts, 4),
        count: pharmaArts.length,
        sources: pharmaArts.slice(0, 4),
      });
    }

    // ── PUBLIC HEALTH ────────────────────────────────────────────
    const c3 = new Set([...bonitasArts, ...nhiArts, ...schemeArts, ...pharmaArts].map(a => a.link||a.title));
    const pubArts = recent.filter(a =>
      !c3.has(a.link||a.title) &&
      /hospital|clinic|public health|department of health|hiv|aids|tuberculosis|tb|maternal|mental health|cancer|diabetes|pandemic/i.test(a.title+" "+(a.description||""))
    );
    if (pubArts.length > 0) {
      paras.push({
        heading: "PUBLIC HEALTH",
        color: "#007A5E", signal: "CAUTIOUS",
        text: synthesise(pubArts, 4),
        count: pubArts.length,
        sources: pubArts.slice(0, 4),
      });
    }

    // ── OTHER ────────────────────────────────────────────────────
    const c4 = new Set([...bonitasArts, ...nhiArts, ...schemeArts, ...pharmaArts, ...pubArts].map(a => a.link||a.title));
    const otherArts = recent.filter(a => !c4.has(a.link||a.title)).slice(0, 4);
    if (otherArts.length > 0) {
      const text = synthesise(otherArts, 4);
      if (text) paras.push({
        heading: "OTHER HEALTH NEWS",
        color: "#3D4F60", signal: null,
        text,
        count: otherArts.length,
        sources: otherArts.slice(0, 4),
      });
    }

    return paras;
  };

    const briefing = buildBriefing();
  const uniqueSources = [...new Set(recent.map(a => a.publisher||a.source))].length;
  const topSignal = topicArts[0]?.signal || "NEUTRAL";
  const signalColors = { NEGATIVE:"#B02040", CAUTIOUS:"#8A6800", POSITIVE:"#007A5E", MIXED:"#1A6ED4", NEUTRAL:"#3D4F60" };

  if (loading && articles.length === 0) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:"80px 0" }}>
      <div style={{ width:32, height:32, border:`2px solid ${T.border2}`, borderTop:`2px solid ${T.green}`, borderRadius:"50%", animation:"spin 0.9s linear infinite" }} />
      <div style={{ fontSize:11, letterSpacing:"2px", color:T.muted, fontFamily:mono }}>FETCHING LIVE FEEDS…</div>
    </div>
  );

  return (
    <div className="fade">

      {/* Period toggle */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {PERIODS.map(p => (
          <button key={p.id} onClick={() => setPeriod(p.id)} style={{
            background: period===p.id ? T.blue : "transparent",
            color: period===p.id ? "#fff" : T.muted,
            border:`1px solid ${period===p.id ? T.blue : T.border}`,
            fontSize:11, fontWeight:600, padding:"6px 20px", borderRadius:20,
            cursor:"pointer", fontFamily:mono, letterSpacing:"0.5px", transition:"all 0.15s",
          }}>{p.label}</button>
        ))}
      </div>

      {/* Stat bar */}
      <div style={{ display:"flex", gap:1, marginBottom:24, background:T.border }}>
        <div style={{ flex:1, background:T.surface, padding:"16px 20px" }}>
          <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:6 }}>OVERALL SIGNAL</div>
          <div style={{ fontSize:20, fontWeight:700, color:signalColors[topSignal]||T.muted, fontFamily:mono }}>{topSignal}</div>
        </div>
        <div style={{ flex:1, background:T.surface, padding:"16px 20px" }}>
          <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:6 }}>ARTICLES TRACKED</div>
          <div style={{ fontSize:20, fontWeight:700, color:T.blue, fontFamily:mono }}>{recent.length}</div>
        </div>
        <div style={{ flex:1, background:T.surface, padding:"16px 20px" }}>
          <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:6 }}>SOURCES ACTIVE</div>
          <div style={{ fontSize:20, fontWeight:700, color:T.green, fontFamily:mono }}>{uniqueSources}</div>
        </div>
        

      {/* Sub-tabs */}
      <div style={{ display:"flex", borderBottom:`1px solid ${T.border}`, marginBottom:24 }}>
        {[{id:"overview",label:"NEWS BRIEFING"},{id:"news",label:"SA HEALTH NEWS"}].map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            background:"transparent", border:"none",
            borderBottom: activeSection===s.id ? `2px solid ${T.blue}` : "2px solid transparent",
            color: activeSection===s.id ? T.blue : T.muted,
            fontSize:10, fontWeight:700, padding:"10px 20px", cursor:"pointer",
            fontFamily:mono, letterSpacing:"1.5px", marginBottom:-1, transition:"all 0.15s",
          }}>{s.label}</button>
        ))}
      </div>

      {activeSection === "overview" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:20, alignItems:"start" }}>

          {/* LEFT — Executive Briefing */}
          <div>
            {recent.length === 0
              ? <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12, padding:"48px 32px", textAlign:"center" }}>
                  <div style={{ fontSize:13, color:T.muted, fontFamily:font, fontStyle:"italic" }}>No articles tracked in this period. Switch to Last 30 Days or check back soon.</div>
                </div>
              : briefing.map((b, i) => (
                <div key={i} style={{ marginBottom:20 }}>
                  {/* Section header */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, paddingBottom:10, borderBottom:`1px solid ${T.border}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:3, height:16, background:b.color, borderRadius:2, flexShrink:0 }} />
                      <span style={{ fontSize:10, fontWeight:700, color:b.color, fontFamily:mono, letterSpacing:"1.5px" }}>{b.heading}</span>
                      <span style={{ fontSize:10, color:T.muted, fontFamily:mono }}>{b.count} article{b.count!==1?"s":""}</span>
                    </div>
                    {b.signal && (
                      <span style={{ fontSize:9, fontWeight:700, color:signalColors[b.signal]||T.muted, fontFamily:mono,
                        background:`${signalColors[b.signal]||T.muted}15`, border:`1px solid ${signalColors[b.signal]||T.muted}40`,
                        padding:"2px 8px", borderRadius:2, letterSpacing:"0.5px" }}>{b.signal}</span>
                    )}
                  </div>
                  {/* Paragraph text */}
                  <p style={{ fontSize:14, color:T.dim, lineHeight:1.9, fontFamily:font, margin:"0 0 10px 0" }}>{b.text}</p>
                  {/* Source tags */}
                  {b.sources.length > 0 && (
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {[...new Map(b.sources.map(s => [s.publisher||s.source, s])).values()].slice(0,5).map((s,j) => (
                        <a key={j} href={s.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
                          <span style={{ fontSize:10, fontWeight:600, color:b.color, fontFamily:mono,
                            background:`${b.color}10`, border:`1px solid ${b.color}30`, padding:"2px 8px", borderRadius:3 }}>
                            {s.publisher||s.source}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))
            }
          </div>

          {/* RIGHT — Themes + Latest */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Themes */}
                        {/* Watchlist */}
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono }}>WATCH LIST</div>
                <button onClick={() => setShowWatchlist(!showWatchlist)} style={{
                  background:"transparent", border:`1px solid ${T.border}`, borderRadius:6,
                  fontSize:10, color:T.muted, fontFamily:mono, cursor:"pointer", padding:"2px 8px",
                }}>{showWatchlist ? "DONE" : "EDIT"}</button>
              </div>
              {showWatchlist && (
                <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                  <input value={newKeyword} onChange={e => setNewKeyword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addKeyword()}
                    placeholder="Add keyword..."
                    style={{ flex:1, fontSize:12, padding:"5px 10px", border:`1px solid ${T.border}`,
                      borderRadius:6, background:T.panel, color:T.bright, fontFamily:font, outline:"none" }}
                  />
                  <button onClick={addKeyword} style={{
                    background:T.blue, color:"#fff", border:"none", borderRadius:6,
                    fontSize:11, fontWeight:600, padding:"5px 12px", cursor:"pointer", fontFamily:mono,
                  }}>+</button>
                </div>
              )}
              {watchlist.map((kw, i) => {
                const match = watchMatches.find(w => w.kw === kw);
                const count = match?.arts.length || 0;
                return (
                  <div key={i} style={{ marginBottom:10, paddingBottom:10, borderBottom: i < watchlist.length-1 ? `1px solid ${T.border}` : "none" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: count > 0 ? 5 : 0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        {showWatchlist && (
                          <button onClick={() => setWatchlist(watchlist.filter(w => w !== kw))} style={{
                            background:"transparent", border:"none", color:"#C00021",
                            cursor:"pointer", fontSize:14, padding:"0 2px", lineHeight:1,
                          }}>×</button>
                        )}
                        <span style={{ fontSize:12, fontWeight:600, color: count > 0 ? T.bright : T.muted, fontFamily:font }}>{kw}</span>
                      </div>
                      <span style={{
                        fontSize:10, fontWeight:700, fontFamily:mono,
                        color: count > 0 ? "#fff" : T.muted,
                        background: count > 0 ? T.blue : "transparent",
                        border: `1px solid ${count > 0 ? T.blue : T.border}`,
                        padding:"1px 7px", borderRadius:10,
                      }}>{count}</span>
                    </div>
                    {count > 0 && match.arts.slice(0,2).map((a, j) => (
                      <a key={j} href={a.link} target="_blank" rel="noopener noreferrer"
                        style={{ textDecoration:"none", display:"block", padding:"3px 0" }}
                        onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
                        onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                        <div style={{ fontSize:11, color:T.blue, lineHeight:1.45 }}>
                          {stripHtml(a.title).slice(0, 75)}{stripHtml(a.title).length > 75 ? "…" : ""}
                        </div>
                        <div style={{ fontSize:10, color:T.muted, fontFamily:mono }}>{a.publisher||a.source} · {formatDate(a.pubDate)}</div>
                      </a>
                    ))}
                  </div>
                );
              })}
              {watchlist.length === 0 && <div style={{ fontSize:12, color:T.muted, fontFamily:font, fontStyle:"italic" }}>No keywords. Click EDIT to add.</div>}
            </div>

            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12, padding:"16px 18px" }}>
              <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:14 }}>THEME SIGNALS</div>
              {topicArts.length === 0
                ? <div style={{ color:T.muted, fontSize:12, fontFamily:font, fontStyle:"italic" }}>No themes yet.</div>
                : topicArts.map((t,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"8px 0", borderBottom: i < topicArts.length-1 ? `1px solid ${T.border}` : "none" }}>
                    <div>
                      <div style={{ fontSize:11, fontWeight:700, color:t.color, fontFamily:mono, marginBottom:2 }}>{t.label}</div>
                      <div style={{ fontSize:9, color:T.muted, fontFamily:mono }}>{t.arts.length} article{t.arts.length!==1?"s":""}</div>
                    </div>
                    <span style={{ fontSize:9, fontWeight:700, color:signalColors[t.signal]||T.muted, fontFamily:mono,
                      background:`${signalColors[t.signal]||T.muted}15`, border:`1px solid ${signalColors[t.signal]||T.muted}40`,
                      padding:"2px 7px", borderRadius:2 }}>{t.signal}</span>
                  </div>
                ))
              }
            </div>

            {/* Latest headlines */}
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12, padding:"16px 18px" }}>
              <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:14 }}>LATEST HEADLINES</div>
              <div style={{ display:"flex", flexDirection:"column", gap:1, background:T.border }}>
                {recent.slice(0,8).map((a,i) => (
                  <a key={i} href={a.link} target="_blank" rel="noopener noreferrer"
                    style={{ background:T.surface, padding:"9px 12px", textDecoration:"none", display:"block" }}
                    onMouseEnter={e => e.currentTarget.style.background=T.panel}
                    onMouseLeave={e => e.currentTarget.style.background=T.surface}>
                    <div style={{ fontSize:12, color:T.bright, lineHeight:1.5, fontFamily:font, fontWeight:500, marginBottom:3 }}>{stripHtml(a.title)}</div>
                    <div style={{ fontSize:10, color:T.muted, fontFamily:mono }}>{a.publisher||a.source} · {formatDate(a.pubDate)}</div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {activeSection === "news" && (
        <SAHealthNews key="insights-news" onArticlesLoaded={null} embeddedMode={true} />
      )}

    </div>
  );
}


function SAHealthNews({ onArticlesLoaded, embeddedMode = false }) {
  const T = useT();
  const font = '-apple-system,BlinkMacSystemFont,SF Pro Display,SF Pro Text,Helvetica Neue,Arial,sans-serif';
  const mono = "'SF Mono','SFMono-Regular',Menlo,Monaco,Consolas,monospace";
  const [articles, setArticles] = useState([]);
  const [rssLoading, setRssLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState(null);

  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  const HEALTH_KEYWORDS = [
    "health","hospital","clinic","patient","medical","medicine","nurse","gap cover",
    "health insurance","nhi","vaccine","hiv","aids","tb","tuberculosis","cancer",
    "pharmacy","drug","scheme","medscheme","bonitas","discovery health","momentum health",
    "healthcare","surgery","clinical","wellness","sahpra","pharmacist","chronic","acute",
  ];

  const isHealthRelated = (a) => {
    const text = ((a.title||"") + " " + (a.description||"")).toLowerCase();
    return HEALTH_KEYWORDS.some(k => text.includes(k));
  };

  const getCategory = (a) => {
    const text = ((a.title||"") + " " + (a.description||"")).toLowerCase();
    if (/bonitas|medscheme|afrocentric/.test(text)) return { label:"Bonitas/Medscheme", color:"#B02040" };
    if (/\bnhi\b|national health insurance|constitutional court/.test(text)) return { label:"NHI & Policy", color:"#8A6800" };
    if (/medical scheme|medical aid|discovery health|momentum health|bestmed|medihelp|fedhealth|gems|polmed/.test(text)) return { label:"Medical Schemes", color:"#1A6ED4" };
    if (/gap cover|health insurance|income protection/.test(text)) return { label:"Health Insurance", color:"#0077B6" };
    if (/pharmacy|medicine|\bdrug\b|sahpra|ozempic|semaglutide/.test(text)) return { label:"Pharmacy", color:"#6040C0" };
    if (/hospital|clinic|public health|ndoh/.test(text)) return { label:"Public Health", color:"#007A5E" };
    if (/\bhiv\b|\baids\b|tuberculosis|\btb\b|antiretroviral/.test(text)) return { label:"HIV & TB", color:"#C9184A" };
    return { label:"Health", color:"#3D4F60" };
  };

  const cleanDesc = (title, desc) => {
    if (!desc || desc.length < 10) return "";
    let d = desc.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&")
      .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"')
      .replace(/https?:\/\/\S+/g,"").replace(/\s+/g," ").trim();
    if (d.length < 10) return "";
    const tn = title.toLowerCase().replace(/[^a-z0-9]/g,"");
    const dn = d.toLowerCase().replace(/[^a-z0-9]/g,"");
    if (tn.length > 20 && dn.startsWith(tn.slice(0,Math.floor(tn.length*0.75)))) return "";
    return d.length > 280 ? d.slice(0,280).trim()+"…" : d;
  };

  const load = async () => {
    setRssLoading(true);
    const results = await Promise.allSettled(
      SA_HEALTH_FEEDS.map(f =>
        fetch(`/api/rss?url=${encodeURIComponent(f.url)}`)
          .then(r => r.json())
          .then(d => (d.items||[]).map(a => ({ ...a, source: f.name })))
          .catch(() => [])
      )
    );
    const now = Date.now();
    const seen = new Set();
    const all = results
      .flatMap(r => r.status==="fulfilled" ? r.value : [])
      .filter(a => {
        const key = a.link || a.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        const pub = (a.publisher||"").toLowerCase();
        if (["msn","the south african","briefly news"].includes(pub)) return false;
        if (a.pubDate) {
          const age = now - new Date(a.pubDate).getTime();
          if (!isNaN(age) && age > THIRTY_DAYS) return false;
        }
        return true;
      })
      .filter(isHealthRelated)
      .sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate));
    setArticles(all);
    setFetchedAt(new Date());
    setRssLoading(false);
    if (typeof onArticlesLoaded === "function") onArticlesLoaded(all, false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="fade">
      {/* top bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>FEED STATUS</div>
            <div style={{ fontSize:16, fontWeight:700, color:rssLoading?T.yellow:T.green, fontFamily:mono }}>{rssLoading?"FETCHING…":"● LIVE RSS"}</div>
          </div>
          <div style={{ width:1, height:32, background:T.border }} />
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>ARTICLES</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.blue, fontFamily:mono }}>{rssLoading?"—":articles.length}</div>
          </div>
          <div style={{ width:1, height:32, background:T.border }} />
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>LAST REFRESH</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.dim, fontFamily:mono }}>
              {fetchedAt ? fetchedAt.toLocaleTimeString("en-ZA",{hour:"2-digit",minute:"2-digit"}) : "—"}
            </div>
          </div>
        </div>
        <button onClick={load} disabled={rssLoading} style={{
          background:"transparent", border:`1px solid ${T.border2}`, color:T.muted,
          fontSize:9, letterSpacing:"1.5px", padding:"6px 16px", cursor:rssLoading?"not-allowed":"pointer",
          fontFamily:mono, opacity:rssLoading?0.4:1,
        }}>{rssLoading?"…":"↻ REFRESH"}</button>
      </div>

      {rssLoading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:"80px 0" }}>
          <div style={{ width:32, height:32, border:`2px solid ${T.border2}`, borderTop:`2px solid ${T.green}`, borderRadius:"50%", animation:"spin 0.9s linear infinite" }} />
          <div style={{ fontSize:11, letterSpacing:"2px", color:T.muted, fontFamily:mono }}>FETCHING RSS FEEDS</div>
        </div>
      )}

      {!rssLoading && articles.length === 0 && (
        <div style={{ textAlign:"center", padding:"80px 0", color:T.muted, fontSize:13, fontFamily:font }}>
          No articles found — feeds may be temporarily unavailable.
        </div>
      )}

      {!rssLoading && articles.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:12 }}>
          {articles.map((a,i) => {
            const cat = getCategory(a);
            const col = SOURCE_COLORS[a.source] || T.muted;
            const desc = cleanDesc(a.title||"", a.description||"");
            return (
              <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12, borderLeft:`3px solid ${col}`, padding:"18px 20px", display:"flex", flexDirection:"column", gap:10 }}
                onMouseEnter={e => e.currentTarget.style.boxShadow=`0 2px 16px ${col}20`}
                onMouseLeave={e => e.currentTarget.style.boxShadow="none"}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:10, fontWeight:600, color:col, fontFamily:mono, letterSpacing:"0.5px" }}>{a.publisher||a.source}</span>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:9, fontWeight:700, color:cat.color, fontFamily:mono, background:`${cat.color}15`, border:`1px solid ${cat.color}40`, padding:"2px 7px", borderRadius:3 }}>{cat.label}</span>
                    <span style={{ fontSize:11, color:T.muted, fontFamily:mono }}>{formatDate(a.pubDate)}</span>
                  </div>
                </div>
                {a.image && (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", display:"block", margin:"0 -20px", overflow:"hidden", maxHeight:160 }}>
                    <img src={a.image} alt={a.title} style={{ width:"100%", height:160, objectFit:"cover", display:"block" }}
                      onError={e => { e.target.style.display="none"; }} />
                  </a>
                )}
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
                  <div style={{ fontSize:15, fontWeight:600, color:T.bright, lineHeight:1.5, fontFamily:font }}>{a.title}</div>
                </a>
                {desc
                  ? <div style={{ fontSize:13, color:T.dim, lineHeight:1.75, fontFamily:font }}>{desc}</div>
                  : GOOGLE_NEWS_FEEDS.has(a.source)
                    ? <div style={{ fontSize:11, color:T.muted, fontFamily:font, fontStyle:"italic" }}>Headline only — no summary available.</div>
                    : PAYWALLED_SOURCES.has(a.source)
                      ? <div style={{ fontSize:11, color:T.muted, fontFamily:font, fontStyle:"italic" }}>🔒 Paywalled source — headline only, no summary available. Click to read full article.</div>
                      : null
                }
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:col, fontFamily:font, fontWeight:600, textDecoration:"none", marginTop:"auto" }}>Read full article →</a>
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
  const font = '-apple-system,BlinkMacSystemFont,SF Pro Display,SF Pro Text,Helvetica Neue,Arial,sans-serif';
  const mono = "'SF Mono','SFMono-Regular',Menlo,Monaco,Consolas,monospace";
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState(null);

  // Known CMS circulars — always shown as seed data, supplements live scraping
  const KNOWN_CIRCULARS = [
    { title:"Circular 13 of 2026: Financial Annual Statutory Returns for the financial year ended 31 December 2025", link:"https://www.medicalschemes.co.za/latest-publication/circular-13-of-2026-financial-annual-statutory-returns-for-the-financial-year-ended-31-december-2025/", pubDate:"16 Apr 2026", description:"The CMS has finalised the 2025 Financial Annual Statutory Return online system. Part 1 changes must be finalised by 8 May 2026. Electronic submission via the statutory return portal must occur by 29 May 2026.", source:"CMS Website", publisher:"Council for Medical Schemes", category:"CMS Circular" },
    { title:"Circular 12 of 2026: Notification of registration of medical schemes", link:"https://www.medicalschemes.co.za/latest-publication/circular-12-of-2026-notification-of-registration-of-medical-schemes/", pubDate:"Mar 2026", description:"The CMS confirms the publication of the list of medical schemes registered for 2026, as detailed in Government Gazette Notice No. 54417.", source:"CMS Website", publisher:"Council for Medical Schemes", category:"CMS Circular" },
    { title:"Circular 11 of 2026: CMS Industry Indaba 2026 — 13-14 May, Sandton Convention Centre", link:"https://www.medicalschemes.co.za/registration-for-the-2026-cms-industry-indaba-is-now-open/", pubDate:"12 Mar 2026", description:"The CMS Industry Indaba 2026 takes place on 13-14 May 2026 at the Sandton Convention Centre. The 2026 Indaba marks a significant milestone as the industry moves toward implementation of the Section 59 recommendations.", source:"CMS Website", publisher:"Council for Medical Schemes", category:"CMS Indaba" },
    { title:"Circular 10 of 2026: Implementation of the Section 59 Final Investigation Report — Immediate Directives", link:"https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", pubDate:"17 Mar 2026", description:"This Circular communicates the CMS' immediate regulatory expectations following the Section 59 Investigation Report (July 2025). It sets directives on fraud, waste and abuse processes and transitional measures pending the Universal Code of Conduct.", source:"CMS Website", publisher:"Council for Medical Schemes", category:"CMS Investigation" },
    { title:"Circular 9 of 2026: Financial Annual Statutory Returns for 2025", link:"https://www.medicalschemes.co.za/latest-publication/circular-9-of-2026-financial-annual-statutory-returns-for-2025/", pubDate:"13 Mar 2026", description:"Update on the expected go-live and submission dates for the 2025 FASR. The anticipated submission date is 29 May 2026.", source:"CMS Website", publisher:"Council for Medical Schemes", category:"CMS Circular" },
    { title:"Circular 7 of 2026: Categorisation of assets in terms of Annexure B to the Regulations of the Medical Schemes Act", link:"https://www.medicalschemes.co.za/latest-publication/circular-7-of-2026-categorisation-of-assets-in-terms-of-annexure-b-to-the-regulations-of-the-medical-schemes-act/", pubDate:"2 Mar 2026", description:"The CMS publishes guidelines on categorising assets in terms of Regulation 30 of the Medical Schemes Act, read with Annexure B to the Regulations.", source:"CMS Website", publisher:"Council for Medical Schemes", category:"CMS Circular" },
    { title:"Circular 2 of 2026: Adjustment of fees payable to brokers with effect from 1 January 2026", link:"https://www.medicalschemes.co.za/latest-publication/circular-2-of-2026-adjustment-of-fees-payable-to-brokers-with-effect-from-1-january-2026/", pubDate:"29 Jan 2026", description:"Maximum broker fees adjusted to R125.86 per month plus VAT, effective 1 January 2026 per Government Gazette 54019.", source:"CMS Website", publisher:"Council for Medical Schemes", category:"CMS Circular" },
    { title:"Circular 24 of 2025: Guidance on contribution increases and benefits changes for 2026", link:"https://www.medicalschemes.co.za/latest-publication/circular-24-of-2025-guidance-on-contribution-increases-and-benefits-changes-for-2026/", pubDate:"1 Sep 2025", description:"CMS recommends that contribution increases for 2026 be limited to 3.3% plus reasonable utilisation estimates, to ease financial strain on scheme members.", source:"CMS Website", publisher:"Council for Medical Schemes", category:"CMS Circular" },
  ];

  // Only official CMS sources — no news articles
  const CMS_FEEDS = [];  // CMS website has no RSS — rely entirely on cms-scrape + KNOWN_CIRCULARS

  const load = async () => {
    setLoading(true);
    // Fetch official CMS content only — scrape their website + fallback to known circulars
    const cmsWebResult = await fetch("/api/cms-scrape")
      .then(r => r.json())
      .then(d => d.items || [])
      .catch(() => []);
    const scraped = cmsWebResult.length > 0 ? cmsWebResult : KNOWN_CIRCULARS;
    const results = [{ status: "fulfilled", value: scraped }];
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const seen = new Set();
    const all = results
      .flatMap(r => r.status === "fulfilled" ? r.value : [])
      .filter(a => {
        const key = a.link || a.title;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        // CMS Website articles always pass — they are pre-filtered
        if (a.source === "CMS Website") return true;
        // For RSS feed articles, filter by relevance
        const text = (a.title + " " + (a.description||"") + " " + (a.source||"")).toLowerCase();
        const relevant = /cms|council for medical schemes|circular|directive|section 44|section 43|medical schemes act|bhf|board of healthcare|indaba|regulatory|registrar|compliance|prescribed minimum benefit|pmb|solvency|reserve requirement|contribution increase|scheme rules|board notice/.test(text);
        if (!relevant) return false;
        // Only apply date filter to RSS articles, not CMS website circulars
        if (a.pubDate) {
          const age = now - new Date(a.pubDate).getTime();
          if (!isNaN(age) && age > 90 * 24 * 60 * 60 * 1000) return false; // 90 days for RSS
        }
        return true;
      })
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    setArticles(all);
    setFetchedAt(new Date());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getCategory = (a) => {
    // Use pre-set category from known circulars if available
    if (a.category) {
      const catColors = { "CMS Circular":"#1A6ED4", "CMS Investigation":"#B02040", "CMS Indaba":"#007A5E", "Press Release":"#8A6800", "Government Gazette":"#6040C0", "CMS Publication":"#3D4F60" };
      return { label: a.category, color: catColors[a.category] || "#3D4F60" };
    }
    const text = (a.title + " " + (a.description||"")).toLowerCase();
    if (/circular/.test(text)) return { label:"Circular", color:"#1A6ED4" };
    if (/section 44|section 43|investigation|forensic/.test(text)) return { label:"Investigation", color:"#B02040" };
    if (/indaba|conference/.test(text)) return { label:"Indaba", color:"#007A5E" };
    if (/directive|guideline|board notice/.test(text)) return { label:"Directive", color:"#8A6800" };
    if (/bonitas|medscheme/.test(text)) return { label:"Bonitas/Medscheme", color:"#B02040" };
    if (/nhi/.test(text)) return { label:"NHI", color:"#8A6800" };
    return { label:"Regulatory", color:"#3D4F60" };
  };

  return (
    <div className="fade">
      {/* top bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>FEED STATUS</div>
            <div style={{ fontSize:16, fontWeight:700, color: loading ? T.yellow : T.green, fontFamily:mono }}>
              {loading ? "FETCHING…" : "● LIVE RSS"}
            </div>
          </div>
          <div style={{ width:1, height:32, background:T.border }} />
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>ARTICLES</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.blue, fontFamily:mono }}>{loading ? "—" : articles.length}</div>
          </div>
          <div style={{ width:1, height:32, background:T.border }} />
          <div>
            <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, fontFamily:mono, marginBottom:4 }}>LAST REFRESH</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.dim, fontFamily:mono }}>
              {fetchedAt ? fetchedAt.toLocaleTimeString("en-ZA", { hour:"2-digit", minute:"2-digit" }) : "—"}
            </div>
          </div>
        </div>
        <button onClick={load} disabled={loading} style={{
          background:"transparent", border:`1px solid ${T.border2}`, color:T.muted,
          fontSize:9, letterSpacing:"1.5px", padding:"6px 16px", cursor:loading?"not-allowed":"pointer",
          fontFamily:mono, opacity:loading?0.4:1,
        }}>{loading ? "…" : "↻ REFRESH"}</button>
      </div>

      {/* loading */}
      {loading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:"80px 0" }}>
          <div style={{ width:32, height:32, border:`2px solid ${T.border2}`, borderTop:`2px solid ${T.green}`, borderRadius:"50%", animation:"spin 0.9s linear infinite" }} />
          <div style={{ fontSize:11, letterSpacing:"2px", color:T.muted, fontFamily:mono }}>FETCHING CMS FEEDS</div>
        </div>
      )}

      {/* empty */}
      {!loading && articles.length === 0 && (
        <div style={{ textAlign:"center", padding:"80px 0", color:T.muted, fontSize:13, fontFamily:font }}>
          No CMS regulatory articles found in the last 30 days.
        </div>
      )}

      {/* article grid */}
      {!loading && articles.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:12 }}>
          {articles.map((a, i) => {
            const cat = getCategory(a);
            const col = cat.color;
            const desc = a.description || "";
            const cleanD = desc.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
            const tn = (a.title||"").toLowerCase().replace(/[^a-z0-9]/g,"");
            const dn = cleanD.toLowerCase().replace(/[^a-z0-9]/g,"");
            const showDesc = cleanD.length > 20 && !(tn.length > 20 && dn.startsWith(tn.slice(0, Math.floor(tn.length*0.75))));
            return (
              <div key={i} style={{
                background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12,
                borderLeft:`3px solid ${col}`, padding:"18px 20px",
                display:"flex", flexDirection:"column", gap:10,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:10, fontWeight:600, color:col, fontFamily:mono, letterSpacing:"0.5px" }}>
                    {a.publisher || a.source}
                  </span>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:9, fontWeight:700, color:col, fontFamily:mono, background:`${col}15`, border:`1px solid ${col}40`, padding:"2px 7px", borderRadius:3 }}>{cat.label}</span>
                    <span style={{ fontSize:11, color:T.muted, fontFamily:mono }}>{formatDate(a.pubDate)}</span>
                  </div>
                </div>
                {a.image && (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", display:"block", margin:"0 -20px", overflow:"hidden", maxHeight:160 }}>
                    <img src={a.image} alt={a.title} style={{ width:"100%", height:160, objectFit:"cover", display:"block" }}
                      onError={e => { e.target.style.display="none"; }} />
                  </a>
                )}
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
                  <div style={{ fontSize:15, fontWeight:600, color:T.bright, lineHeight:1.5, fontFamily:font }}>{a.title}</div>
                </a>
                {showDesc
                  ? <div style={{ fontSize:13, color:T.dim, lineHeight:1.75, fontFamily:font }}>{cleanD.length > 280 ? cleanD.slice(0,280)+"…" : cleanD}</div>
                  : GOOGLE_NEWS_FEEDS.has(a.source)
                    ? <div style={{ fontSize:11, color:T.muted, fontFamily:font, fontStyle:"italic" }}>Headline only — no summary available.</div>
                    : null
                }
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:col, fontFamily:font, fontWeight:600, textDecoration:"none", marginTop:"auto" }}>Read full article →</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState("insights");
  const [results, setResults] = useState(STATIC_DATA);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [sharedArticles, setSharedArticles] = useState([]);
  const [sharedLoading, setSharedLoading] = useState(false);

  // Fetch RSS feeds on mount AND auto-refresh every 30 minutes
  const fetchFeeds = () => {
    setSharedLoading(true);
    const feeds = SA_HEALTH_FEEDS;
    Promise.allSettled(
      feeds.map(f =>
        fetch(`/api/rss?url=${encodeURIComponent(f.url)}`)
          .then(r => r.json())
          .then(d => (d.items || []).map(a => ({ ...a, source: f.name, publisher: a.publisher || "" })))
          .catch(() => [])
      )
    ).then(results => {
      const now = Date.now();
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
      const seen = new Set();
      const all = results
        .flatMap(r => r.status === "fulfilled" ? r.value : [])
        .filter(a => {
          const key = a.link || a.title;
          if (!key || seen.has(key)) return false;
          seen.add(key);
          const pub = (a.publisher || "").toLowerCase();
          if (["msn","the south african","briefly news"].includes(pub)) return false;
          if (a.pubDate) {
            const age = now - new Date(a.pubDate).getTime();
            if (!isNaN(age) && age > THIRTY_DAYS) return false;
          }
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
  }, []);

  const T = isDark ? DARK : LIGHT;
  const activeQuery = QUERIES.find(q => q.id === activeId);
  const data = results[activeId];

  // Tabs use static data — no API calls on startup








  return (
    <ThemeCtx.Provider value={T}>
    <div style={{ background:T.bg, minHeight:"100vh", fontFamily:font, color:T.text, fontSize:13, transition:"background 0.2s, color 0.2s" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:6px; background:transparent; }
        ::-webkit-scrollbar-thumb { background:${T.border2}; border-radius:3px; }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .fade { animation:fadeUp 0.35s ease forwards; }
        .tab-btn { border-radius:8px; transition:all 0.2s; }
        .tab-btn:hover { background:${T.panel} !important; color:${T.bright} !important; }
        .stat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; }
        .main-grid { display:grid; grid-template-columns:1fr 300px; gap:20px; }
        .header-subtitle { display:block; }
        a { color: inherit; }
        .card { background:${T.surface}; border:1px solid ${T.border}; border-radius:12px; padding:18px 20px; }
        .card-sm { background:${T.surface}; border:1px solid ${T.border}; border-radius:10px; padding:14px 16px; }
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
            <div className="header-subtitle" style={{ fontSize:9, color:T.muted, letterSpacing:"1.5px" }}>NEWS & INTELLIGENCE MONITOR — JSE:ACT</div>
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
            background:"transparent",
            color:activeId===q.id ? T.blue : T.muted,
            border:"none", borderBottom:activeId===q.id ? `2px solid ${T.blue}` : "2px solid transparent",
            padding:"12px 16px", cursor:"pointer",
            fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif",
            fontSize:12, fontWeight:500, letterSpacing:"-0.1px", whiteSpace:"nowrap",
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
        {activeId === "cms"      && <CMSTab />}
        {activeId === "insights" && <InsightsTab articles={sharedArticles} loading={sharedLoading} onRefresh={fetchFeeds} />}


        {activeId !== "sahealth" && loading && !data && <Spinner />}

        {activeId !== "sahealth" && data && (
          <div className="fade">
            <div style={{ display:"flex", gap:1, marginBottom:16, background:T.border }}>
              {[
                { label:"OVERALL SENTIMENT", value:data.overallSentiment, color:sentimentColor(data.overallSentiment, T) },
                { label:"SOURCES TRACKED",   value:data.sourceCount||"—", color:T.blue },
                { label:"LAST UPDATED",       value:"12 May 2026",          color:T.muted },
              ].map((s,i) => (
                <div key={i} style={{ background:T.surface, padding:"14px 24px", flex:1 }}>
                  <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:8, fontFamily:mono }}>{s.label}</div>
                  <div style={{ fontSize:i===2?14:20, fontWeight:700, color:s.color, fontFamily:mono }}>{s.value}</div>
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
                    <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12, borderLeft:`3px solid ${T.blue}`, padding:"14px 16px" }}>
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
                            const date = typeof s === "object" ? s.date : null;
                            const label = date ? `${name} · ${date}` : name;
                            return url
                              ? <a key={j} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}><Tag label={label} color={T.blue} /></a>
                              : <Tag key={j} label={label} color={T.muted} />;
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12, padding:16 }}>
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

                <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:9, letterSpacing:"2px", color:T.muted, marginBottom:12, fontFamily:mono }}>WATCH POINTS</div>
                  {(data.watchPoints||[]).map((w,i) => (
                    <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
                      <span style={{ color:T.yellow, flexShrink:0 }}>▲</span>
                      <span style={{ fontSize:13, color:T.dim, lineHeight:1.75, fontFamily:font }}>{w}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, borderRadius:12, padding:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
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
          <span style={{ fontSize:9, color:T.muted, letterSpacing:"1px", fontFamily:mono }}>AFROCENTRIC GROUP · NEWS & INTELLIGENCE MONITOR · POWERED BY CLAUDE AI (ANTHROPIC)</span>
          <span style={{ fontSize:9, color:T.muted, letterSpacing:"1px", fontFamily:mono }}>SA HEALTH NEWS: LIVE · INTELLIGENCE TABS: UPDATED 12 MAY 2026</span>
        </div>
        <div style={{ fontSize:11, color:T.muted, fontFamily:font, lineHeight:1.8, borderTop:`1px solid ${T.border}`, paddingTop:12, display:"flex", flexDirection:"column", gap:8 }}>
          <div><strong style={{ color:T.dim }}>AI disclosure:</strong>{" "}Intelligence summaries are researched and drafted with AI assistance (Claude by Anthropic). Content represents a synthesis of publicly available media coverage and does not constitute financial, legal or investment advice.</div>
          <div><strong style={{ color:T.dim }}>Subscription sources:</strong>{" "}Some publications linked in this dashboard (including Business Day, News24 Premium, Financial Mail and others) require a paid subscription to access full articles. These subscriptions are not covered by AfroCentric Group. If you wish to subscribe to access full content, please use your <strong style={{ color:T.dim }}>personal email address</strong> rather than your company email, as company email subscriptions may create data or billing complications.</div>
          <div><strong style={{ color:T.dim }}>Content ownership:</strong>{" "}All article content remains the intellectual property of the respective publishing organisations. AfroCentric Group does not own or control linked third-party content.</div>
        </div>
      </div>
    </div>
    </ThemeCtx.Provider>
  );
}