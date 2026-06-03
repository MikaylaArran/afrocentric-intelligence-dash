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
    oneLiner: "🟢 27 MAY — Bonitas claims switched to Momentum (final Medscheme claims run 26 May). 🟢 1 JUNE — Bonitas handover to Momentum COMPLETED. 🟢 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, revenue R13.3bn, dividend 44c (+22.2%); AI wearable wards pilot described as world's biggest rollout. 🔴 FY2025: R1.27bn basic loss, 5,000 jobs at risk, no dividend. 🟢 ACT.JO range 124–140 ZAC; 52-wk 110–223 ZAC; +71% from 61 ZAC all-time low (20 Mar 2026). ⚡ 30 June 2026 — Activo disposal Long Stop Date; buyer FHC Group (Portugal). ⚠️ FASR deadline 29 May — PASSED. 🟢 Sisonke Health mandate live 1 May — competitive tender win. ⚡ Lenacapavir HIV injection — 5 June 2026 launch TOMORROW; Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00; President Ramaphosa. 🔴 18 MAY — ConCourt struck down NHI Certificate of Need (Sections 36–40); NHI main judgment still reserved. 🟢 CMS Indaba CONCLUDED — Circular 10 directives fully operational.",
    themes: [
      {
        theme: "✅ CMS Industry Indaba CONCLUDED (13-14 May) — Circular 10 Directives Fully Operational",
        sentiment: "CAUTIOUS",
        what: "The CMS Industry Indaba 2026 concluded at the Sandton Convention Centre on 14 May. Day 1 (13 May): Minister Motsoaledi keynoted on Section 59 Reform; Retired CJ Ngcobo keynoted on Regulation, Fairness and Sustainability; Gala Dinner. Day 2 (14 May): sustainability, value-based care, strategic purchasing. Circular 10 of 2026 — immediate directives on fraud, waste and abuse — is now in full effect for all administrators including Medscheme. This marks the formal shift from regulatory findings to implementation framework. FASR submission deadline: 1 June 2026 — TODAY — DEADLINE.",
        sources: [
          { name: "CMS", url: "https://www.medicalschemes.co.za/minister-of-health-to-deliver-keynote-at-cms-industry-indaba-2026/", date: "14 May 2026" },
          { name: "CMS Circular 10", url: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", date: "17 Mar 2026" },
        ],
        representative_voice: "The 2026 Indaba marks the culmination of the Section 59 recommendations — signalling a renewed focus on accountability, strengthened oversight and sustainable healthcare funding. — CMS",
      },
      {
        theme: "🟢 1 June — Bonitas Handover COMPLETED. Momentum Administration NOW ACTIVE",
        sentiment: "NEGATIVE",
        what: "6 days until Bonitas formally transfers to Momentum Health on 1 June. Momentum has committed R100m+, hired 744 staff, established 22 walk-in centres and refurbished its Sandton offices. Fraudulent documents allegation (FACTS Consulting cyber-forensic evidence of altered PHA documents) remains unresolved. Bonitas members concerned about Momentum's monthly payment runs vs Medscheme's weekly. Medscheme's court application remains in limbo (removed from urgent roll 3 March). The handover represents the loss of approximately 40% of Medscheme's administration income.",
        sources: [
          { name: "Medical Brief", url: "https://www.medicalbrief.co.za/momentum-to-spend-millions-hire-hundreds-for-bonitas-takeover/", date: "25 Mar 2026" },
          { name: "Moonstone", url: "https://www.moonstone.co.za/bonitas-transition-proceeds-as-administrators-outline-plans-amid-legal-uncertainty/", date: "30 Mar 2026" },
        ],
        representative_voice: "I doubt there is any chance this is going to be stopped by the court before we move 750,000 members to our back office on 1 June. — Jeanette Marais, Momentum CEO",
      },
      {
        theme: "🟢 Medscheme Wins Sisonke Health Mandate — Competitive Tender, Live from 1 May 2026",
        sentiment: "POSITIVE",
        what: "Medscheme secured the administration and managed care mandate for Sisonke Health Medical Scheme from 1 May 2026, selected across all categories in a competitive tender. Sisonke Health (formed from the Sisonke/Lonmin Medical Scheme amalgamation) covers employees of Sibanye-Stillwater, Gold Fields, and DRD Gold. A meaningful counterpoint to the Bonitas crisis — it demonstrates that Medscheme can still win new business through proper procurement at its most difficult period.",
        sources: [
          { name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" },
        ],
        representative_voice: "The Sisonke mandate provides Medscheme with an important foothold as it works to stabilise its position in a consolidating market. — Moonstone",
      },
      {
        theme: "🟢 Lenacapavir HIV Prevention — Launch CONFIRMED 5 June 2026, Secunda Mpumalanga (3 days)",
        sentiment: "POSITIVE",
        what: "Launch TOMORROW: 5 June 2026, Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00. President Ramaphosa officiates alongside Minister Motsoaledi, Mpumalanga Premier Ndlovu, SANAC civil society and Global Fund. 37,920 doses in country, deploying to 360 high-burden facilities. Near-100% efficacy. Directly relevant: Aid for AIDS, Pharmacy Direct CCMDD, Scriptpharm.",
        sources: [
          { name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" },
          { name: "EWN", url: "https://www.ewn.co.za/2026/05/14/motsoaledi-confirms-hiv-prevention-medicine-lenacapavir-will-be-rolled-out-from-5-june", date: "14 May 2026" },
        ],
        representative_voice: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "⚖️ NHI ConCourt — Judgment Reserved 7 May; Motsoaledi Apologised for Judges Impartiality Remarks",
        sentiment: "CAUTIOUS",
        what: "Constitutional Court concluded NHI challenge hearings 5–7 May 2026 — judgment reserved, no date set. In a significant climbdown, the Department of Health issued a statement on 16 May apologising for Health Minister Motsoaledi's remarks questioning whether ConCourt judges could be impartial on NHI given their Parmed Medical Scheme membership. Departmental spokesperson Foster Mohale: 'If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise.' All other major NHI court challenges (SAMA, Solidarity, HASA, HFA, SAPPF, Sakeliga) are temporarily halted pending the ConCourt's ruling. BHF argued Parliament conducted a 'tick-box' public participation exercise.",
        sources: [
          { name: "EWN", url: "https://www.ewn.co.za/2026/05/07/concourt-reserves-judgment-in-nhi-challenge", date: "7 May 2026" },
          { name: "IOL", url: "https://iol.co.za/news/politics/2026-05-16-motsoaledi-apologises-after-saying-concourt-judges-benefit-from-private-healthcare-system/", date: "16 May 2026" },
        ],
        representative_voice: "Parliament had no intention of listening to the public — it was a tick-box exercise. Common-sense questions about cost and implementation were raised over and over and not properly addressed. — Advocate Leech, BHF",
      },
      {
        theme: "🟢 ACT.JO — Range 124–140 ZAC (3 Jun); 52-Wk 110–223 ZAC (+71% from 61 ZAC All-Time Low)",
        sentiment: "CAUTIOUS",
        what: "ACT.JO trading in the 124–140 ZAC range on 1 June 2026 — a recovery of +71% from the all-time low of 61 ZAC on 20 March 2026. 52-week range: 110–223 ZAC. Market cap approximately R736m–R981m. Key SENS events since March 2026: (1) 23 Apr — Revised Activo disposal terms; Long Stop Date extended to 30 June 2026; buyer FHC Group (Laboratórios Basi, Portugal); carrying value ~R1.1bn; proceeds earmarked to deleverage balance sheet. (2) 08 Apr — IAR + AGM notice. (3) 09 Mar — Board change. (4) 04 Mar — FY2025 summarised results. (5) 02 Mar — Trading statement. AGM held 11 May. H1 2026 results SENS: 1 Sep 2026.",
        sources: [
          { name: "Investing.com NG", url: "https://ng.investing.com/equities/afrocentric-investment-corp-chart", date: "3 June 2026" },
          { name: "TradingView JSE:ACT", url: "https://www.tradingview.com/symbols/JSE-ACT/", date: "3 June 2026" },
          { name: "Moneyweb ACT SENS", url: "https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/", date: "3 June 2026" },
          { name: "AfroCentric investor centre", url: "https://www.afrocentric.za.com/investor-centre/", date: "May 2026" },
        ],
        representative_voice: "ACT range 124–140 ZAC (3 Jun); 52-week range 110–223 ZAC. The Activo Long Stop Date 30 June is the key pending corporate event — completion unlocks balance sheet deleveraging. (TradingView/Investing.com, 1 June 2026)",
      },
      {
        theme: "🟢 Social Media Signals — Schwulst Op-Eds (55 Years + Public-Private), GEMS Golf, CMS Registrar Meeting",
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
        theme: "🔴 FY2025 Results — R1.27bn Basic Loss, No Dividend, Revenue Cliff — 1 JUNE 2026",
        sentiment: "NEGATIVE",
        what: "AfroCentric Group FY2025: revenue R7.3bn (+93.9%), R1.59bn impairment charge (Activo, ADS Group, Wellworx disposals), R1.27bn basic loss (151.55c/share). Headline earnings R117.1m (13.92c/share). No dividend. Bonitas contributes approximately 40% of Medscheme admin income — that revenue exits permanently on 1 June 2026 — TODAY. AGM held 11 May. H1 2026 interim results SENS: 1 Sep 2026.",
        sources: [
          { name: "Business Day", url: "https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/", date: "4 Mar 2026" },
        ],
        representative_voice: "The all-time low of 61 ZAC on 20 March tells the full story. The market priced in the Bonitas loss, impairments, and deep uncertainty about FY2026.",
      },
      {
        theme: "🟢 Scale Intact — 4 Million+ Lives, GEMS and Polmed the Priority Contracts",
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
      { type: "Momentum CEO Marais", sentiment: "positive", quote: "I doubt there is any chance this is going to be stopped by the court before we move 750,000 members to our back office on 1 June. This results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa." },
      { type: "DoH Spokesperson Mohale (16 May)", sentiment: "cautious", quote: "If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise and withdraw whatever statements may have been offensive. The Minister has full confidence and trust in the fairness and integrity of the judiciary." },
      { type: "Sanlam CEO Hanratty", sentiment: "negative", quote: "In financial terms it is not that big a deal. But it is a human tragedy — 5,000 people could face massive job losses." },
      { type: "Schwulst (Medscheme CEO)", sentiment: "cautious", quote: "55 years of delivering sustainable, member-centric care through value-based approaches. Healthcare as a pillar — public-private collaboration can transform healthcare in South Africa." },
      { type: "Analyst", sentiment: "negative", quote: "A 40% income concentration on a single client that you are now losing was always a risk that should have been managed more proactively." },
    ],
    watchPoints: [
      "🟢 27 MAY — Bonitas claims switched to Momentum (final Medscheme claims run was 26 May)",
      "🟢 1 June 2026 — Bonitas handover COMPLETED — 40% Medscheme revenue now gone permanently",
      "🆕 9–10 June 2026 — Medscheme High Court dates PROVISIONALLY SECURED; challenge heard post-handover",
      "⚡ Lenacapavir — 5 June 2026 launch TOMORROW; Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00; President Ramaphosa officiates",
      "⚠️ 1 June 2026 — ✅ FASR regulatory submission deadline — 29 May — PASSED",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 governance directives fully in effect for all administrators",
      "🟢 Motsoaledi apologised for ConCourt judges impartiality remarks (16 May) — full confidence in judiciary affirmed",
      "🔴 18 MAY — ConCourt struck down Certificate of Need (Sections 36–40 of National Health Act) — unconstitutional; DoH says no direct NHI impact",
      "NHI ConCourt — judgment reserved 7 May, no date set; all other NHI challenges (12+) halted pending ruling",
      "🟢 Sisonke mandate live 1 May — watch for further new business wins",
      "🟢 ACT.JO — range 124–140 ZAC (1 Jun); 52-wk range 110–223 ZAC; +71% from 61 ZAC all-time low",
      "⚡ 30 June 2026 — Activo disposal Long Stop Date — completion deleverages balance sheet; buyer FHC Group (Portugal)",
      "🔴 SENS 23 Apr: Activo disposal REVISED TERMS — Long Stop Date 30 June 2026; shareholder circular pending",
      "🟢 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, revenue +4.8%, dividend 44c (+22.2%); Da Costa CEO Designate from 1 June",
      "🟢 GEMS golf event (~15 May): 'Golfing with Purpose' — key relationship signal with most critical remaining client",
      "🟢 Schwulst LinkedIn op-eds — 55 years + public-private collaboration; deliberate reputational positioning",
      "Fraudulent documents — criminal referral to SAPS or NPA still possible; NPA AFU has new leadership (Mtengwane, 14 May)",
      "GEMS and Polmed renewals — most strategically critical contracts remaining; Circular 10 implies benchmarking scrutiny",
      "H1 2026 interim results — SENS 1 Sep 2026, presentation 2 Sep — first full period showing Bonitas revenue impact",
    ],
    sourceCount: 40,
  },

  // ─── MEDSCHEME CHATTER ────────────────────────────────────────────────────
  medscheme: {
    overallSentiment: "NEGATIVE", sentimentScore: 24, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "🟢 1 JUNE — Bonitas handover to Momentum COMPLETED. 43-year Medscheme relationship ended permanently on 31 May 2026. 🟢 Sisonke Health mandate won via competitive tender from 1 May — proof Medscheme can still win new business. 🔴 Fraudulent documents allegation (FACTS Consulting cyber-forensic evidence) — unresolved; criminal referral to NPA still possible. 🔴 Court application in limbo — removed from urgent roll 3 March; no date set. 🟢 Momentum: R100m+ invested, 744 hires, 22 walk-in centres — operationally ready for 1 June. ⚠️ Member concern: Momentum's monthly payment runs vs Medscheme's weekly — provider cash flow risk. 🟢 Scale intact — 4m+ lives; GEMS and Polmed now most critical contracts. ✅ CMS Indaba CONCLUDED — Circular 10 fully operational.",
    themes: [
      {
        theme: "🟢 Sisonke Health Mandate Won — Competitive Tender, Live from 1 May 2026",
        sentiment: "POSITIVE",
        what: "Medscheme secured the administration and managed care mandate for Sisonke Health Medical Scheme from 1 May 2026, selected across all categories in a competitive tender. Sisonke Health (formed from the Sisonke/Lonmin Medical Scheme amalgamation, 1 April 2025) covers employees of Sibanye-Stillwater, Gold Fields, and DRD Gold. This is a meaningful counterpoint to the Bonitas narrative — it shows Medscheme can still win new business through proper procurement in its most difficult period.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/medscheme-secures-sisonke-administration-mandate/", date: "Apr 2026" }],
        representative_voice: "The Sisonke mandate does not replace Bonitas in scale, but it provides Medscheme with an important foothold as it works to stabilise its position. — Moonstone",
      },
      {
        theme: "🟢 1 JUNE — Bonitas Handover to Momentum COMPLETED; 43-Year Medscheme Relationship Ended",
        sentiment: "NEGATIVE",
        what: "OPERATIONAL MILESTONE (27 May): Medscheme's final claims run was 26 May — Bonitas claims switched to Momentum from 27 May; handover completed 1 June. Historic queries remain with Medscheme; Momentum will resolve new queries directly even for pre-31 May services. Tax certificates and May commission payments remain Medscheme's responsibility. Court: parties provisionally secured 9–10 June as High Court dates — legal challenge heard AFTER handover. Momentum Business Hub decommissioned 26 May; new broker zone launches 1 June. PHA final processes conclude 29 May; PHA managed care live 1 June. Key member concern: Momentum's monthly payment runs vs Medscheme's weekly. Momentum: 22 walk-in centres, 744 new hires, R100m+ budgeted.",
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
      { type: "Moonstone (Sisonke)", sentiment: "positive", quote: "The Sisonke mandate provides Medscheme with an important foothold as it works to stabilise its position in a consolidating market." },
      { type: "Healthcare provider", sentiment: "negative", quote: "Medscheme ensures weekly payment runs. Momentum has one run a month. Medscheme ensures quick turnaround on claims. Momentum takes time. This is an administration nightmare." },
      { type: "AfroCentric Group", sentiment: "negative", quote: "Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent." },
    ],
    watchPoints: [
      "🟢 27 MAY — Bonitas claims switched to Momentum (final Medscheme claims run was 26 May)",
      "🟢 1 June 2026 — Bonitas handover COMPLETED",
      "⚡ 9–10 June 2026 — Medscheme High Court dates PROVISIONALLY SECURED (next week); post-handover legal challenge; 2 full days of argument expected",
      "⚡ 1 June 2026 — TODAY — DEADLINE: Medscheme final operational processes hand to PHA; FASR deadline same day",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 governance directives now fully in effect",
      "🟢 Sisonke live 1 May — watch for further new client pipeline",
      "Fraudulent documents — criminal referral to SAPS or NPA possible; NPA now has AFU leadership (Mtengwane appointed 14 May)",
      "Section 197 LRA — Sanlam separate court challenge possible",
      "GEMS and Polmed renewals — most strategic contracts remaining on the book",
      "Member experience post-1 June — watch for claims backlogs or payment delays at Momentum",
    ],
    sourceCount: 27,
  },

  // ─── FINANCIAL ────────────────────────────────────────────────────────────
  financial: {
    overallSentiment: "NEGATIVE", sentimentScore: 21, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "🟢 ACT.JO range 124–140 ZAC (1 Jun); 52-wk 110–223 ZAC; +71% recovery from 61 ZAC all-time low (20 Mar 2026). 🟢 1 JUNE 2026 — Bonitas 40% revenue cliff HIT. Revenue exits Medscheme permanently. 750,000 members under Momentum. 🔴 FY2025: R1.27bn basic loss, R1.59bn impairments, no dividend. ⚡ 30 June 2026 — Activo disposal Long Stop Date; buyer FHC Group (Portugal); proceeds to deleverage balance sheet. 🟢 SENS 23 Apr: Activo revised terms confirmed — Long Stop Date 30 June 2026. 🟢 H1 2026 interim results — SENS 1 Sep 2026; first full period showing Bonitas revenue impact. 🔴 Sanlam FY2025 headline earnings -18% to R20.08bn. 🟢 Momentum NHE +8% to R3.7bn, dividend +29%; market share 22%→30% from 1 June.",
    themes: [
      {
        theme: "ACT.JO — Range 124–140 ZAC (3 Jun); 52-Wk 110–223 ZAC | Full SENS Log",
        sentiment: "CAUTIOUS",
        what: "ACT.JO trading in the 124–140 ZAC range on 3 June 2026, +71% from the all-time low of 61 ZAC on 20 March 2026. All-time high: 695 ZAC (Feb 2017). 52-week range: 110–223 ZAC. Market cap ~R736m–R981m at current range. Full SENS log since March 2026: (1) 23 Apr — Revised Activo disposal terms; Long Stop Date 30 June 2026; buyer FHC Group (Laboratórios Basi, Portugal); carrying value ~R1.1bn; proceeds to deleverage. (2) 08 Apr — IAR + AGM notice. (3) 09 Mar — Board change. (4) 04 Mar — FY2025 results (R1.27bn basic loss). (5) 02 Mar — Trading statement. (6) 25 Feb — Board committee changes. (7) 20 Feb — Activo circular JSE extension. (8) Director dealings in securities (two announcements). Next: H1 2026 SENS 1 Sep; presentation 2 Sep.",
        sources: [
          { name: "Investing.com NG", url: "https://ng.investing.com/equities/afrocentric-investment-corp-chart", date: "3 June 2026" },
          { name: "TradingView JSE:ACT", url: "https://www.tradingview.com/symbols/JSE-ACT/", date: "3 June 2026" },
          { name: "Morningstar ACT", url: "https://www.morningstar.com/stocks/xjse/act/quote", date: "3 June 2026" },
          { name: "Moneyweb ACT SENS", url: "https://www.moneyweb.co.za/tools-and-data/click-a-company/ACT/", date: "3 June 2026" },
          { name: "AfroCentric investor centre", url: "https://www.afrocentric.za.com/investor-centre/", date: "May 2026" },
        ],
        representative_voice: "ACT range 124–140 ZAC (3 Jun). 52-week range now 110–223 ZAC. The Activo Long Stop Date 30 June is the next key corporate event — completion deleverages the balance sheet and frees management focus. (TradingView/Investing.com, 1 June 2026)",
      },
      {
        theme: "FY2025 — Revenue R7.3bn (+93.9%), Basic Loss R1.27bn, No Dividend",
        sentiment: "NEGATIVE",
        what: "Loss before tax R532m vs prior profit R225m. Basic loss R1.27bn (151.55c/share). Headline earnings R117.1m (13.92c/share). Revenue R7.3bn (+93.9%). No dividend (vs 6c prior). Impairments R1.59bn from Activo, ADS Group and Wellworx disposals. Results SENS 3 March 2026. AGM held 11 May 2026. Activo disposal revised terms announced — final completion still pending.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/companies/2026-03-04-strong-sales-lift-afrocentric-revenue-but-impairments-push-it-into-loss/", date: "4 Mar 2026" }],
        representative_voice: "The R1.59bn impairment is largely non-cash but try explaining that to a retail investor who bought at 300c and is watching it trade at 130c.",
      },
      {
        theme: "🔴 Bonitas Revenue Cliff — 40% of Medscheme Income EXITED (1 June 2026)",
        sentiment: "NEGATIVE",
        what: "Bonitas contributes approximately 40% of Medscheme's administration income. That revenue exits permanently on 1 June 2026 — TODAY. No FY2026 earnings guidance provided. H1 2026 interim results will be the most painful numbers in AfroCentric Group's listed history. The Sisonke mandate partially offsets at far lesser scale.",
        sources: [{ name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-02-19-the-numbers-behind-the-medschemebonitas-bombshell-litigation/" }],
        representative_voice: "A 40% income concentration on a single client that you are now losing was always a risk that should have been managed more proactively.",
      },
      {
        theme: "Momentum — Market Share 22%→30% in 7 Days, Interim NHE +8%, Dividend +29%",
        sentiment: "POSITIVE",
        what: "Momentum is the defining competitive winner of 2026. R100m+ budget, 744 new hires, 22 walk-in centres. Market share shifted 22%→30% from 1 June — SA's second-largest administrator after Discovery. H1 FY2026: headline earnings +8% to R3.56bn, NHE +8% to R3.695bn, HEPS +13% to 274.4c, interim dividend 110c (+29%). F2027 targets — R7bn NHE, 20% ROE — intact. ROE already at 24%, above the 20% target.",
        sources: [{ name: "EWN", url: "https://www.ewn.co.za/momentum-health-taking-over-administration-of-bonitas-it-gives-us-incredible-scale/", date: "Mar 2026" }],
        representative_voice: "It results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. — Jeanette Marais, Momentum CEO",
      },
      {
        theme: "🟢 Netcare H1 2026 — Adj. HEPS +21.9%, Revenue R13.3bn; Contrast With AfroCentric's Position",
        sentiment: "POSITIVE",
        competitor: "Netcare",
        what: "Netcare H1 FY2026 (25 May) illustrates the divergence between private hospital groups and scheme administrators. Revenue +4.8% to R13.3bn; adjusted HEPS +21.9% to 71.7c; dividend 44c (+22.2%); profit +11.9% to R924m. Digital savings R705m since 2022. Critically: Netcare is also piloting AI-driven wearable monitoring (Corsano Health, Swiss MedTech) in general wards — the biggest such rollout in the world — with ambient AI listening for clinical note-taking launching this year. Contrast with AfroCentric: R1.27bn basic loss, no dividend, 40% revenue cliff — HIT 1 June 2026. Private healthcare demand is resilient; AfroCentric's crisis is structural, not sector-wide. The Netcare AI story also signals where competitive moats in SA healthcare will be built over the next decade.",
        sources: [
          { name: "Moneyweb", url: "https://www.moneyweb.co.za/news/companies-and-deals/netcare-boosts-earnings-as-digital-strategy-delivers-meaningful-dividend/", date: "25 May 2026" },
          { name: "Business Day", url: "https://www.businessday.co.za/companies/earnings/2026-05-25-netcare-first-half-profit-rises-as-demand-remains-resilient/", date: "25 May 2026" },
        ],
        representative_voice: "Netcare adj. HEPS +21.9% vs AfroCentric R1.27bn basic loss — the divergence is stark. Private healthcare demand is resilient; AfroCentric's crisis is entirely self-inflicted by the Bonitas concentration.",
      },
      {
        theme: "Sanlam FY2025 — Headline Earnings Down 18% to R20.08bn",
        sentiment: "NEGATIVE",
        what: "Sanlam reported FY2025 results on 12 March 2026 with headline earnings down 18% to R20.08bn. CEO Hanratty called the Bonitas situation a 'human tragedy' for AfroCentric staff while describing the financial impact on Sanlam as manageable. NRFFS was R15.9bn, up 3% actual. Sanlam holds ~59% of AfroCentric Group.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/sanlams-business-engines-a-look-at-the-groups-2025-performance/" }],
        representative_voice: "Sanlam calling it a financial irritation while describing 5,000 job losses as a human tragedy is a clear signal of where AfroCentric Group sits in Sanlam's priority stack.",
      },
    ],
    topVoices: [
      { type: "Investor", sentiment: "negative", quote: "No dividend, R1.59bn impairments, Bonitas revenue exited 1 June 2026. H1 2026 interim results will be the ugliest numbers AfroCentric Group has ever reported." },
      { type: "Momentum CEO", sentiment: "positive", quote: "The Bonitas appointment results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. Our F2027 targets remain intact." },
      { type: "Sanlam CEO", sentiment: "cautious", quote: "The Bonitas situation is not that big a deal for Sanlam financially. But for 5,000 people in that business it is a human tragedy." },
    ],
    watchPoints: [
      "⚡ 1 June 2026 — Bonitas revenue exits Medscheme's books TODAY",
      "⚡ 30 June 2026 — Activo disposal Long Stop Date — completion deleverages balance sheet; buyer FHC Group (Portugal)",
      "🟢 ACT.JO range 124–140 ZAC (1 Jun); 52-wk range 110–223 ZAC; +71% from 61 ZAC all-time low (20 Mar)",
      "SENS 23 Apr: Activo revised terms — Long Stop Date 30 June; carrying value ~R1.1bn",
      "SENS 09 Mar: Board change — new director appointed",
      "SENS 08 Apr: IAR + AGM notice posted; AGM held 11 May",
      "H1 2026 interim results — SENS 1 Sep 2026, presentation 2 Sep — first full period showing Bonitas revenue impact",
      "Director dealings — two SENS announcements of director securities dealings in major subsidiary",
      "Dividend reinstatement — no guidance given",
      "Activo disposal — revised terms 23 Apr; Long Stop Date 30 June 2026; FHC Group buyer",
      "Sanlam stake — no change signalled but strategic review watch point",
    ],
    sourceCount: 23,
  },

  // ─── NHI & POLICY ─────────────────────────────────────────────────────────
  nhi: {
    overallSentiment: "CAUTIOUS", sentimentScore: 35, volumeSignal: "HIGH", dataQuality: "HIGH",
    oneLiner: "⚖️ NHI ConCourt — public participation judgment RESERVED (7 May); no date set. 🔴 18 MAY — ConCourt struck down Certificate of Need (Sections 36–40 National Health Act) — unconstitutional; DoH says no direct NHI impact. 🟢 Motsoaledi APOLOGISED (16 May) for ConCourt judges impartiality remarks — full confidence in judiciary affirmed. 🟢 Lenacapavir HIV injection — 5 June 2026 launch CONFIRMED (Secunda, Mpumalanga, 09h00) (logistics delays reported; 5 June event not confirmed); stocks deployed to 360 facilities. ✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 fully operational; all administrators under governance expectations. ⚠️ FASR deadline 29 May — PASSED. 🟢 AfroCentric CCMDD, GEMS and HIV portfolio — strongest NHI hedge in the group.",
    themes: [
      {
        theme: "🟢 NEW — Motsoaledi Apologises for ConCourt Judges' Impartiality Remarks (16 May)",
        sentiment: "CAUTIOUS",
        what: "In a significant climbdown, the Department of Health issued a statement on Friday 16 May clarifying and apologising for Motsoaledi's 13 May remarks. Departmental spokesperson Foster Mohale: 'If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise and withdraw whatever statements may have been offensive.' The Department confirmed Motsoaledi has 'full confidence and trust in the fairness and integrity of the judiciary.' Judges Matter had described the original remarks as a 'gratuitous attack' on judicial independence. The ConCourt NHI judgment remains reserved (7 May) — no date announced. Note: all other major NHI court challenges (SAMA, Solidarity, HASA, HFA, SAPPF, Sakeliga) are temporarily halted pending the ConCourt's ruling.",
        sources: [{ name: "IOL", url: "https://iol.co.za/news/politics/2026-05-16-motsoaledi-apologises-after-saying-concourt-judges-benefit-from-private-healthcare-system/", date: "16 May 2026" }],
        representative_voice: "If by talking about disparities the Minister is understood to have been attacking the judges, the Minister would like to unreservedly apologise and withdraw whatever statements may have been offensive. — DoH spokesperson Foster Mohale, 16 May 2026",
      },
      {
        theme: "🔴 18 MAY — ConCourt Strikes Down Certificate of Need (Sections 36–40 National Health Act) — Unconstitutional",
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
        theme: "⚖️ NHI ConCourt — Judgment Reserved 7 May, No Date Announced; All Other Challenges Halted",
        sentiment: "CAUTIOUS",
        what: "Constitutional Court concluded NHI challenge hearings 5-7 May 2026. BHF and Western Cape argued Parliament conducted a 'tick-box' public participation exercise. Parliament's advocate: 350,000+ written submissions. Government: NHI implementation is 'decades away'. Judgment reserved — no date set. In an agreement between Ramaphosa, Motsoaledi and all other NHI challengers (SAMA, Solidarity, HASA, HFA, SAPPF, Sakeliga), all other major NHI court challenges are temporarily halted until the ConCourt rules. If the ConCourt rules against Parliament, the Act could be sent back for fresh consultation. R74m budgeted for NHI litigation in 2026/27.",
        sources: [{ name: "EWN", url: "https://www.ewn.co.za/2026/05/07/concourt-reserves-judgment-in-nhi-challenge", date: "7 May 2026" }, { name: "Bhekisisa", url: "https://bhekisisa.org/special-reports/national-health-insurance/2026-03-06-can-south-africa-fix-its-health-system-before-the-courts-decide-its-fate/", date: "7 Mar 2026" }],
        representative_voice: "Parliament had no intention of listening to the public — it was a tick-box exercise. Common-sense questions about cost and implementation were raised over and over and not properly addressed. — Advocate Leech, BHF",
      },
      {
        theme: "🟢 Lenacapavir HIV Prevention — Launch CONFIRMED 5 June 2026, Secunda Mpumalanga (3 days)",
        sentiment: "POSITIVE",
        competitor: "Sector-Wide",
        what: "Launch CONFIRMED: 5 June 2026, Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00. President Ramaphosa officiates. Media accreditation closed 2 June 2026. 37,920 doses in country, deploying to 360 high-burden facilities. Note: earlier logistics delays (Health-e, April 2026) were superseded by the Presidency's confirmation on 1 June 2026. Near-100% efficacy. Direct impact: Aid for AIDS, Pharmacy Direct CCMDD, Scriptpharm. SA also engaging Gilead for local production (expression of interest published 5 Mar 2026).",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" }],
        representative_voice: "We are in a position where we dare say we can eliminate HIV/Aids as a public health threat by 2030. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "✅ CMS Industry Indaba CONCLUDED (13-14 May) — Section 59 Implementation Operational",
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
      "⚡ Lenacapavir — 5 June 2026 launch TOMORROW; Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00; President Ramaphosa officiates",
      "🔴 18 MAY — ConCourt struck down Certificate of Need (Sections 36–40 National Health Act) — Solidarity victory; DoH says no direct NHI impact",
      "⚠️ 1 June 2026 — ✅ FASR regulatory submission deadline — 29 May — PASSED",
      "🟢 Motsoaledi apologised (16 May) for ConCourt judges impartiality remarks — relationship with judiciary partially repaired",
      "🆕 Circular 14 of 2026 — PMB Definition Guideline; CMS inviting Clinical Advisory Committee nominations",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 implementation framework fully operational",
      "NHI ConCourt ruling — reserved 7 May, no date; could invalidate the Act or send back for fresh consultation",
      "All other NHI court challenges (12+) halted pending ConCourt ruling",
      "CCMDD, GEMS and HIV management portfolio renewals — core to AfroCentric's public sector positioning",
    ],
    sourceCount: 30,
  },

  // ─── EMPLOYER REPUTATION ──────────────────────────────────────────────────
  employer: {
    overallSentiment: "NEGATIVE", sentimentScore: 32, volumeSignal: "MEDIUM", dataQuality: "MEDIUM",
    oneLiner: "🔴 1 JUNE — Bonitas handover completed; Bonitas-dedicated staff face redeployment or retrenchment. 🔴 5,000 jobs at risk; Section 197 rejected by Momentum; no automatic transfer protection. 🟢 Momentum hiring 744 — Medscheme staff being prioritised, but 744 of 5,000 is a 15% absorption rate. 🟢 Sisonke Health win (1 May) — proof the business can still compete and win; important internal morale signal. 🟢 Top Employer SA 2025 certification retained — culture holding under extreme pressure.",
    themes: [
      {
        theme: "5,000 Jobs at Risk — No Automatic Protection — Handover Completed 1 June",
        sentiment: "NEGATIVE",
        what: "Sanlam CEO Paul Hanratty confirmed ~5,000 jobs at risk across AfroCentric Group and Medscheme. Momentum rejected the Section 197 LRA application 'in spite of legal precedent.' Sanlam's three commitments: identify internal redeployment, prioritise Medscheme staff at Momentum's 744 new roles, provide further details. No headcount guarantee given. With the handover completed on 1 June, staff in Bonitas-dedicated administration teams face the most immediate and imminent uncertainty.",
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
        theme: "🟢 Sisonke Win — A Signal the Business Can Still Operate and Compete",
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
      "⚡ 1 June 2026 — Bonitas handover — highest-risk moment for affected staff — TODAY",
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
    oneLiner: "🟢 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, revenue R13.3bn, dividend 44c (+22.2%); AI wearable wards pilot described as world's biggest rollout. 🟢 Melanie Da Costa — Netcare CEO Designate from 1 June 2026. 🔴 18 MAY — NFO ruled against Discovery Life on cancer SIB claim; sector-wide policy wording review likely. 🔴 18 MAY — ConCourt struck down Certificate of Need (Sections 36–40 National Health Act) — major threat to private healthcare expansion removed. 🟢 Discovery H1 FY2026: NHE +27% to R5.75bn — record results; Vitality AI + Google Cloud globally launched. 🟢 20 MAY — Discovery rebrands Africa employer business to Global Health Solutions; continental ASO expansion. 🔴 Discovery Vitality Sleep Rewards live (7 May) — world's first sleep pillar; Oura Ring 4 fundable. 🟢 1 June 2026 — Bonitas handover COMPLETED; Momentum market share 22%→30%; PHA managed care live; fraudulent documents allegation unresolved. 🔴 Sizwe Hosmed: curator Ian Fleming, solvency 30%, amalgamation being explored. 🟢 Fedhealth+Sanlam 'Built Different' live Jan 2026; BestMed 6.8% lowest open scheme increase. ✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 directives fully operational.",
    themes: [
      {
        theme: "🟢 25 MAY — Netcare H1 2026: HEPS +21.9%, Revenue R13.3bn, Dividend 44c (+22.2%) — AND AI/Wearable Wards Pilot (World's Biggest Rollout)",
        sentiment: "POSITIVE",
        competitor: "Netcare",
        what: "THREE major Netcare developments. (1) CEO SUCCESSION: Melanie Da Costa becomes CEO Designate on 1 June 2026; formally takes over 1 January 2027. Friedland retires 31 December 2026 after 18 years as CEO. (2) H1 FY2026 RESULTS (25 May): revenue +4.8% to R13.3bn; EBITDA +6.6% to R2.5bn (margin 18.8%); adjusted HEPS +21.9% to 71.7c; profit +11.9% to R924m; interim dividend 44c (+22.2%). Digital strategy generated R705m in cumulative savings since 2022. Share rose ~5% on results day. Primary care revenue -10.1% (non-renewal of large occupational health contract). FY2026 guidance revised: revenue growth 4.0–4.8%. (3) AI & WEARABLES — THE BIGGEST SA HOSPITAL TECH STORY OF 2026: Netcare is piloting clinical-grade wearable monitoring technology (Corsano Health, Swiss MedTech) in general wards — described as the biggest rollout of its kind in the world. All ~6,000 patients in general wards will eventually wear the device, continuously tracking blood pressure, heart rate, oxygen saturation, respiratory rate, temperature, cardiac arrhythmias and atrial fibrillation. This extends ICU-grade predictive analytics into standard wards. Separately: AI predictive models already detecting sepsis and clinical deterioration 8–10 hours before onset in ICUs. New tools in development for kidney failure, heart attack, heart failure, and 30-day readmission risk. Ambient listening technology launching this year — AI automatically generates structured clinical notes from doctor-patient conversations, freeing clinicians to focus entirely on patients. Friedland: 'You are getting an ICU experience in a general ward and it is effortless — all you have to do is wear a watch.' Relevance to AfroCentric: Netcare's AI-driven efficiency gains (R705m savings) contrast sharply with Medscheme's structural revenue crisis — and signal where competitive advantage in SA healthcare will be built over the next decade.",
        sources: [
          { name: "Moneyweb — H1 2026 results", url: "https://www.moneyweb.co.za/news/companies-and-deals/netcare-boosts-earnings-as-digital-strategy-delivers-meaningful-dividend/", date: "25 May 2026" },
          { name: "Business Day — H1 2026 results", url: "https://www.businessday.co.za/companies/earnings/2026-05-25-netcare-first-half-profit-rises-as-demand-remains-resilient/", date: "25 May 2026" },
          { name: "BusinessTech — H1 2026", url: "https://businesstech.co.za/news/trending/861368/south-african-hospital-giant-sees-huge-profit-increase/", date: "25 May 2026" },
          { name: "TechCentral — wearables rollout", url: "https://techcentral.co.za/netcare-turns-to-wearables-for-24-7-hospital-patient-monitoring/274774/", date: "Nov 2025" },
          { name: "ITWeb — wearable wristbands", url: "https://www.itweb.co.za/article/wearable-wristbands-to-monitor-patients-in-netcare-wards/dgp45MaBWO8qX9l8", date: "Nov 2025" },
          { name: "TechFinancials — AI pilot H1 2026", url: "https://techfinancials.co.za/2026/05/25/netcare-pilots-wearable-tech-ai-in-wards/", date: "25 May 2026" },
          { name: "Corsano Health — partnership announcement", url: "https://corsano.com/corsano-health-and-netcare-limited-announce-strategic-partnership-to-roll-out-continuous-wearable-monitoring-across-general-wards-in-south-africa/", date: "Nov 2025" },
          { name: "Business Day — Da Costa CEO", url: "https://www.businessday.co.za/companies/2026-05-19-netcare-names-melanie-da-costa-as-next-ceo/", date: "19 May 2026" },
        ],
        representative_voice: "You are getting an ICU experience in a general ward and it is effortless — all you have to do is wear a watch. Our digital and AI capabilities are creating a widening competitive gap versus peers. — Dr Richard Friedland, Netcare CEO, 25 May 2026",
      },
      {
        theme: "🔴 NEW (18 May) — National Financial Ombud Rules AGAINST Discovery Life in Cancer SIB Claim",
        sentiment: "NEGATIVE",
        competitor: "Discovery",
        what: "The National Financial Ombud Scheme (NFO) ruled on 18 May 2026 in favour of a cancer patient in a Severe Illness Benefit (SIB) dispute with Discovery Life. Discovery had used a 'technical defence', arguing the life-changing event occurred on the date of histological confirmation of the cancer diagnosis — which happened to fall on a day when premiums had lapsed. Lead Ombud Denise Gabriels rejected this: 'In the absence of a deeming provision, the date of the life-changing event is the actual date of occurrence.' The ruling is precedent-setting: the illness itself, not the paperwork confirming it, is decisive for SIB claims. Broader sector implications — all life insurers' SIB policy wording now under scrutiny.",
        sources: [{ name: "IOL", url: "https://iol.co.za/news/south-africa/2026-05-18-cancer-claim-dispute-how-discovery-lifes-technical-defence-failed/", date: "18 May 2026" }],
        representative_voice: "Discovery Life has yet to point to the provision in the policy which stipulates that a life-changing event is deemed to have occurred on the date medical confirmation of a covered condition has been received. — Lead Ombud Denise Gabriels, NFO, 18 May 2026",
      },
      {
        theme: "🔴 LIVE — Discovery Vitality Sleep Rewards (7 May) — World's First Sleep Pillar; Dr Matt Walker in SA",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery launched the Vitality Sleep Score and Sleep Rewards on 7 May 2026 — the first new core Vitality pillar in almost 20 years. Backed by 'The Sleep Factor' research across 47 million sleep records. Vitality CEO Dinesh Govender: improving sleep linked to up to 24% lower mortality risk and 36% lower motor vehicle accident risk. Oura Ring 4 fully fundable over 24 months with qualifying Discovery Bank account. Dr Matt Walker (author of 'Why We Sleep') is visiting SA this month. Sleep metrics also integrating into Discovery Insure Vitality Drive. Members can earn Discovery Miles or boost Personal Health Fund by up to R3,000/year.",
        sources: [{ name: "Discovery", url: "https://www.mynewsdesk.com/za/discovery-holdings-ltd/pressreleases/getting-paid-to-sleep-well-vitality-launches-world-first-sleep-rewards-3446938", date: "7 May 2026" }, { name: "BusinessTech", url: "https://businesstech.co.za/news/lifestyle/859716/big-changes-for-discovery-vitality-in-south-africa/", date: "7 May 2026" }],
        representative_voice: "We have long known that exercise, nutrition and screening are modifiable lifestyle behaviours, but the data is now unequivocal: sleep deserves to stand alongside them. — Dinesh Govender, Discovery Vitality CEO",
      },
      {
        theme: "🟢 Discovery Holdings H1 FY2026 — Record Results: NHE +27% to R5.75bn, Dividend 111c",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery Holdings (JSE:DSY) reported record interim results for H1 FY2026 (six months to December 2025) on 4 March 2026. Normalised headline earnings +27% to R5.75bn. Profit before tax +29%. HEPS +29%. Interim dividend 111c/share (+27%). Discovery Bank swung to profitability (monthly profit in December 2025 ahead of plan). New business +12%. Five-year target: 15–20% annual normalised profit growth — Group is tracking ahead. Adrian Gore: 'We have emerged from our cycle of significant investment.'",
        sources: [{ name: "FX Leaders", url: "https://www.fxleaders.com/news/2026/03/04/discovery-delivers-record-earnings-posts-29-profit-surge-as-share-price-jse-trades-at-record-levels/", date: "4 Mar 2026" }],
        representative_voice: "We have emerged from our cycle of significant investment — years of building platforms are now translating into tangible financial returns. — Adrian Gore, Discovery CEO, 4 March 2026",
      },
      {
        theme: "🟢 Vitality AI + Google Cloud — Global Launch (Nov 2025); Potential to Extend Life Expectancy 8 Years",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery launched Vitality AI globally in November 2025 in partnership with Google Cloud. Built on Personal Health Pathways (PHP) — a South African innovation — and Google Cloud's AI and analytics capabilities. Aims to help millions manage their health through precision-driven insights and personalisation. Potential to extend healthy life expectancy by up to 8 years. Discovery: 'It's a South African innovation now being exported to the world.' PHP saw nearly 4× improvement in completion rates and 5× increase in total health actions completed from 2024 to 2025.",
        sources: [{ name: "iAfrica", url: "https://iafrica.com/discovery-and-google-launch-vitality-ai-exporting-south-african-born-health-innovation-to-the-world/", date: "Nov 2025" }],
        representative_voice: "It's a South African innovation now being exported to the world, with the potential to reshape the global health and insurance landscape. — Discovery, November 2025",
      },
      {
        theme: "🟢 20 MAY — Discovery Health Rebrands Africa Employer Business to 'Global Health Solutions' — Continental Expansion Signal",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "Discovery Health announced on 20 May 2026 that Vitality Health International (Africa) — its employer health insurance business — has rebranded to Discovery Health – Global Health Solutions, effective 1 January 2026. The rebrand covers operations in Nigeria (Leadway Health HMO partner), Kenya (APA Insurance partner), Ghana (Acacia Health Insurance partner) and wider Africa. CEO of the new entity: Emma Knox (previously CEO of Vitality Health International). Two strategic pillars: (1) continue partnering with in-market insurers across Africa to deliver employer solutions; (2) expand into Administration Services Only (ASO) — a fully managed healthcare administration solution for employers. Eight plan options from hospital-only to comprehensive; $25,000–$3m annual limits; 6,000+ providers across 52 countries. Relevance to AfroCentric: Discovery is now directly competing in the employer health administration space across Africa — the same continent-wide territory where AfroCentric's Healthcare Africa segment (Botswana, Mauritius, Namibia) operates.",
        sources: [
          { name: "Discovery — press release", url: "https://www.mynewsdesk.com/za/discovery-holdings-ltd/pressreleases/vitality-health-international-africa-changes-its-name-to-discovery-health-global-health-solutions-3433849", date: "24 Feb 2026" },
          { name: "Bizcommunity", url: "https://www.bizcommunity.com/article/discovery-rebrands-vitality-health-international-to-meet-africa-evolving-health-needs-951764a", date: "25 Feb 2026" },
          { name: "Tuko.co.ke — Kenya expansion", url: "https://www.tuko.co.ke/business-economy/627019-south-africas-discovery-eyes-kenyan-employees-employers-rebranding-insurance-business/", date: "21 May 2026" },
        ],
        representative_voice: "While our name has changed, our commitment to our clients and to our core purpose — to make people healthier and to enhance and protect their lives — remains the same. Global Health Solutions enables the future-focused growth of the business in two ways: continuing the proven in-market insurer model and expanding into ASO. — Emma Knox, CEO Discovery Health Global Health Solutions, May 2026",
      },
      {
        theme: "🔴 Discovery Health — CMS Intervenes in Pharmacy Overpayment Recovery Saga (January 2026)",
        sentiment: "NEGATIVE",
        competitor: "Discovery",
        what: "In early January 2026, Discovery Health (DHMS administrator) began recovering funds from members who had been overpaid on pharmacy claims — an internal processing error that led to members receiving money they were not entitled to. The CMS intervened after Medicheck escalated concerns to the regulator, raising three issues: (1) systemic claims processing errors and recovery mechanisms; (2) compliance with Regulation 6 of the Medical Schemes Act; (3) governance and administration oversight under Section 57 and Regulation 17. Discovery Health defended the recoveries as lawful under Section 59(3)(a) of the Act and DHMS Rules 15.5 and 16.4, and apologised for the error. The CMS acknowledged the Act allows recoveries but emphasised schemes must clearly govern how they are implemented. Relevance to AfroCentric: (1) The incident highlights that even the largest administrator is susceptible to processing errors under volume pressure; (2) Medscheme will face heightened operational scrutiny under Circular 10 governance expectations, making any analogous errors extremely high-risk; (3) The CMS's willingness to intervene on member-facing operational issues is a signal of the regulatory environment Medscheme now operates in.",
        sources: [
          { name: "Moonstone — CMS intervenes", url: "https://www.moonstone.co.za/cms-steps-in-as-discovery-health-begins-recovering-pharmacy-overpayments/", date: "Jan 2026" },
        ],
        representative_voice: "We deeply regret the error and inconvenience. In keeping with fairness to all members, the affected members are not legally entitled to retain funds paid in error. — Discovery Health, January 2026",
      },
      {
        theme: "Discovery Health Medical Scheme — 7.2% Increase (Effective 5.4%), Active Smart 22,000 Lives",
        sentiment: "POSITIVE",
        competitor: "Discovery",
        what: "DHMS weighted average 7.2% for 2026, deferred to 1 April (effective annual rate 5.4% — the lowest among big-five). Members saved R1.5bn from the deferral. Active Smart plan: R1,350/month, 0% increase, 22,000 lives, 80%+ under 40 — fastest-growing new DHMS plan ever. Smart Saver Series launched. Two new 2026 benefits: Nurture at Home (NICU support for premature babies) and Perinatal Bereavement Counselling. KeyCare series expanded to 24 locations. Flexicare: new employer groups joining with Emergency Cover can lock in 2025 premiums until end 2026. DHMS manages ~39% of total SA medical scheme membership.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "By deferring the 2026 contribution increase to 1 April, the scheme provides significant financial relief while continuing to deliver industry-leading healthcare benefits. — Dr Ron Whelan, Discovery Health CEO",
      },
      {
        theme: "Momentum Health — Market Share 22%→30% in 7 Days; NHE +8% to R3.7bn; Health4Me 200,000 Members",
        sentiment: "POSITIVE",
        competitor: "Momentum",
        what: "🟢 1 JUNE: Bonitas handover to Momentum WENT LIVE — 750,000+ members under Momentum administration from 1 June. Claims switched from 27 May; final Medscheme claims run was 26 May. 1 June was the formal go-live date. Momentum Health is the defining competitive winner of 2026. R100m+ budget for the Bonitas transition, 744 new hires, 22 walk-in centres, Sandton offices refurbished. Market share shifted 22%→30% from 1 June — SA's second-largest administrator after Discovery. H1 FY2026 (Momentum Group): NHE +8% to R3.695bn, HEPS +13% to 274.4c, interim dividend 110c (+29%), ROE 24% vs 20% target. F2027 targets (NHE R7bn, 20% ROE) intact. Health4Me (open-market health insurance): grew 20% to 200,000+ members; 2026 upgrades include AI-driven triage via Hello Doctor and 90-second AI symptom checker. Momentum Medical Scheme 2026 increase: 9.9% (highest big-five). Multiply wellness: 7 new ways to earn Active Dayz.",
        sources: [{ name: "BusinessTech", url: "https://businesstech.co.za/news/business/854369/end-of-an-era-for-one-of-the-biggest-medical-aids-in-south-africa-after-43-years/", date: "19 Mar 2026" }, { name: "Fanews", url: "https://www.fanews.co.za/article/healthcare/6/medical-schemes/1078/momentum-health-empowers-south-africans-to-take-charge-of-their-wellbeing-with-2026-product-enhancements/42590", date: "Oct 2025" }],
        representative_voice: "This deal adds more than 750,000 beneficiaries under our administration, bringing the Group's health beneficiaries in Africa to over 3.3 million and worldwide to more than 25 million. — Hannes Viljoen, Momentum Health CEO",
      },
      {
        theme: "🔴 PHA (Private Health Administrators) — Bonitas Managed Care from 1 June; Fraudulent Documents Allegation Unresolved",
        sentiment: "NEGATIVE",
        competitor: "PHA",
        what: "From 1 June 2026, Private Health Administrators (PHA) takes over ALL managed care functions for Bonitas — replacing Medscheme. Managed care includes hospital and medicine authorisations, clinical case management, disease and utilisation management, provider network management, pharmacy benefit management, care co-ordination and healthcare funding decisions. PHA already has a Bonitas relationship through BonCap (appointed 2020). Operationally: PHA has confirmed its final handover processes commence 29 May, with operations live 1 June. The critical unresolved issue: AfroCentric confirmed cyber-forensic analysis (FACTS Consulting) shows 'documents relied upon by PHA and provided to the court were altered and fraudulent.' No response from PHA published. Submitting fraudulent documents to a High Court is a criminal offence. Court challenge (9–10 June provisionally) will test this directly. PHA CEO is Tobie du Preez — a former AfroCentric Group executive — which is the core of AfroCentric's conflict-of-interest allegation. The CMS Section 44 investigation into the 2022 BonCap appointment of PHA (while du Preez was linked to AfroCentric) remains active.",
        sources: [
          { name: "Moonstone — PHA handover", url: "https://www.moonstone.co.za/pha-lays-out-its-case-as-bonitas-managed-care-handover-nears/", date: "May 2026" },
          { name: "AfroCentric — fraudulent documents", url: "https://www.afrocentric.za.com/medscheme-provides-evidence-bonitas-tender-process-was-compromised/", date: "Feb 2026" },
          { name: "Moonstone — CMS probe", url: "https://www.moonstone.co.za/bonitas-medscheme-split-what-the-cms-probe-means-for-members/", date: "Feb 2026" },
        ],
        representative_voice: "Cyber-forensic analysis confirms that documents relied upon by PHA and provided to the court were altered and fraudulent. — AfroCentric Group, February 2026",
      },
      {
        theme: "BestMed — 6.8% Lowest Open Scheme Increase; New Cancer Screening, Cochlear, Adenoidectomy Benefits",
        sentiment: "POSITIVE",
        competitor: "BestMed",
        what: "BestMed implemented the sector's lowest 2026 open scheme contribution increase at 6.8%, with some options as low as 5.1% and a maximum of 7.8%. Principal membership has grown 28% over five years. CEO Leo Dlamini: 'Healthcare inflation remains one of the biggest challenges facing households.' 2026 benefit enhancements: average benefit increase of 4.6% across all plans; faecal occult colon cancer screening added every 24 months for members over 40; adenoidectomy added to Rhythm 1; cochlear implant and BAHA limits raised to R350,000 on Pace 4. BestMed is the only big-five scheme whose 2026 increase is lower than its 2025 increase.",
        sources: [{ name: "IOL", url: "https://iol.co.za/personal-finance/financial-planning/2025-10-29-2026-medical-scheme-contribution-increases-relief-for-members-after-a-year-of-sharp-hikes/", date: "Oct 2025" }],
        representative_voice: "Healthcare inflation remains one of the biggest challenges facing households. Our responsibility is to safeguard the depth of benefits while ensuring contributions remain competitive. — Leo Dlamini, BestMed CEO",
      },
      {
        theme: "Medihelp — 8.46% Increase; Most Members at 7.5% or Less; New Out-of-Pocket Co-Payment Rule",
        sentiment: "CAUTIOUS",
        competitor: "Medihelp",
        what: "Medihelp's 2026 weighted average increase is 8.46%, with 'most members seeing increases of 7.5% or less' (principal officer Varsha Vala). New 2026 rule: only the highest procedure-specific co-payment per admission will apply — reducing out-of-pocket costs during hospitalisation. Moneyweb noted that for the second consecutive year, Medihelp failed to maintain the required 25% statutory solvency ratio as of mid-2025.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "This elevates Medihelp from simply allocating savings to actively empowering members to manage and grow their benefits. — Varsha Vala, Medihelp Principal Officer",
      },
      {
        theme: "Fedhealth + Sanlam 'Built Different' Scheme — Live Jan 2026; 9.6% Increase; 32 On-Site Clinics",
        sentiment: "POSITIVE",
        competitor: "Fedhealth",
        what: "Fedhealth launched its bold partnership scheme with Sanlam under the 'Built Different' brand from 1 January 2026. Five core values: affordability, customisation, inclusivity, simplicity and trust. 9.6% 2026 contribution increase. Fedhealth gained 7,800 Sanlam employees as part of the partnership. On-site clinics: 32 nationwide staffed by occupational and primary health nurses. 2026 benefit enhancements: FlexiFED 1 expanded maternity, mental health depression cover on entry-level plans, emergency contraception across all options, pneumococcal vaccine for members 65+.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "Together we're turning the concept of medical aid on its head — building something transparent, trustworthy, affordable and straightforward. — Jeremy Yatt, Fedhealth Principal Officer",
      },
      {
        theme: "🔴 Sizwe Hosmed — Curator Ian Fleming (Feb 2026); Solvency Improved to 30% from 5%; Still Under CMS Watch",
        sentiment: "NEGATIVE",
        competitor: "Sizwe Hosmed",
        what: "🆕 NEW IMPACT (29 May): Life Healthcare H1 2026 results (28 May) confirm that the Sizwe Hosmed curatorship disrupted elective admissions at Life Healthcare — lost patient days cannot be recovered in the current financial year. Revenue growth came in at +2.4% vs the expected ~5%. This is the first concrete financial data showing the sector-wide impact of a scheme under curatorship on hospital operator performance. Sizwe Hosmed remains under curatorship following placement under CMS oversight in September 2025. First curator Lebogang Mpakati was removed by High Court order on 10 February 2026 — replaced by Ian Fleming. Solvency improved from 5% (September 2025) to 30% (Ian Fleming's April 2026 update) — now ABOVE the 25% statutory minimum. 19.15% contribution increase (effective 1 November 2025) stabilised finances. SALGA municipal workers given green light to leave the scheme early. Membership continues declining. CMS confirmed scheme remains stable and compliant.",
        sources: [{ name: "Moonstone", url: "https://www.moonstone.co.za/sizwe-hosmed-high-court-blocks-board-comeback-new-curator-installed/", date: "Feb 2026" }, { name: "Sizwe Hosmed", url: "https://sizwehosmed.co.za/curator-update/", date: "Apr 2026" }],
        representative_voice: "The scheme's financial position continues to strengthen. As at the date of this update, the scheme complies with the regulatory requirements. — Curator Ian Fleming, April 2026",
      },
      {
        theme: "GEMS 9.8% (Below 21% Market Estimate); Polmed — Both Medscheme's Most Strategic Remaining Contracts",
        sentiment: "CAUTIOUS",
        competitor: "GEMS & Polmed",
        what: "GEMS (Government Employees Medical Scheme), administered by Medscheme, implemented a 9.8% increase for 2026 — significantly below the 21% market estimate and reflecting deliberate cost discipline. With Bonitas now exited (1 June), GEMS and Polmed (Police Medical Scheme, also Medscheme-administered) become the most strategically critical contracts on Medscheme's book. Any competitive tender from either scheme would be existential. The post-Bonitas governance environment (CMS Circular 10 in full effect, Circular 14 PMB review underway) means both GEMS and Polmed may face CMS pressure to benchmark their contracts.",
        sources: [{ name: "Moneyweb", url: "https://www.moneyweb.co.za/news/south-africa/2026-medical-aid-contribution-increases-dhms-vs-the-rest/", date: "28 Mar 2026" }],
        representative_voice: "GEMS at 9.8% vs 21% market estimate is extraordinary cost discipline at scale. It's the kind of efficiency that makes Medscheme's contract look irreplaceable — until it doesn't.",
      },
      {
        theme: "🟢 Lenacapavir HIV Prevention Launch (5 June) — Sector-Wide Managed Care Protocol Changes Required",
        sentiment: "POSITIVE",
        what: "Launch TOMORROW: 5 June 2026, Lilian Ngoyi Stadium, Secunda, Mpumalanga, 09h00. 37,920 doses in country, deploying to 360 high-burden facilities. All scheme administrators and MCOs will need to adapt HIV management protocols. Discovery Health, Momentum Health and Vitality programmes will need to integrate lenacapavir into HIV prevention benefits. AfroCentric Group is directly in the implementation path: Aid for AIDS, Pharmacy Direct CCMDD, Scriptpharm.",
        sources: [{ name: "Business Day", url: "https://www.businessday.co.za/news/health/2026-05-14-launch-date-set-for-long-awaited-hiv-prevention-shot/", date: "14 May 2026" }],
        representative_voice: "We dare say we can eliminate HIV/Aids as a public health threat by 2030. — Motsoaledi, Budget Vote 14 May 2026",
      },
      {
        theme: "🔴 18 MAY — ConCourt Strikes Down NHI Certificate of Need (Sections 36–40) — Sector-Wide Implications",
        sentiment: "NEGATIVE",
        competitor: "Sector-Wide",
        what: "The Constitutional Court unanimously struck down Sections 36–40 of the National Health Act on 18 May 2026, confirming the Pretoria High Court's declaration of unconstitutionality. These provisions would have required all healthcare professionals to obtain a government Certificate of Need before opening, relocating or expanding practices. Justice Kate Savage authored the judgment. Solidarity declared it the collapse of 'one of the NHI's central pillars.' The Department of Health pushed back, saying the sections were never operational and the ruling has no direct impact on the NHI Act itself. For private hospital groups (Netcare, Life Healthcare), medical scheme administrators and specialist networks, the ruling removes a major threat to private healthcare expansion. Watch for downstream implications on specialist contracting and network development strategies.",
        sources: [
          { name: "The Citizen", url: "https://www.citizen.co.za/news/concourt-strikes-down-law-giving-health-minister-power-over-where-doctors-can-work/", date: "18 May 2026" },
          { name: "SABC News", url: "https://www.sabcnews.com/sabcnews/concourt-strikes-down-key-nhi-provision/", date: "18 May 2026" },
          { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/article/2026-05-24-its-back-to-the-drawing-board-after-concourts-nhi-judgment/", date: "24 May 2026" },
        ],
        representative_voice: "One of the NHI's central pillars has collapsed today. The government wanted to move health practitioners around like its own pawns on a chessboard. Today the court said professionals are not pawns of the government. — Solidarity, 18 May 2026",
      },
      {
        theme: "🟢 28 MAY — Life Healthcare H1 2026: HEPS +19% to 55.1c, Revenue R12.4bn (+2.4%), Dividend 23c (+9.5%) — Sizwe Hosmed Cost LHC Patient Days",
        sentiment: "CAUTIOUS",
        competitor: "Life Healthcare",
        what: "Life Healthcare (JSE:LHC) — SA's second-largest hospital group — released H1 FY2026 interim results on 28 May 2026. Life operates 63 facilities across South Africa, Botswana and Europe (Alliance Medical sold). The group is strategically pivoting from traditional acute hospitals to day-clinics, non-acute services and out-of-pocket payers (MyLife Clinic: R300 consultations). Current price ~R12.40; 52-week range R10.14–R15.60. CEO Peter Wharton-Hood leads the group. Key metrics to watch: paid patient days, EBITDA margin, southern Africa revenue growth. Context: Netcare's H1 2026 showed +4.8% revenue — Life's results will confirm whether private hospital demand is sector-wide or Netcare-specific. Directly relevant to Medscheme/AfroCentric as a major provider network counterpart.",
        sources: [
          { name: "TradingView JSE:LHC", url: "https://www.tradingview.com/symbols/JSE-LHC/", date: "3 June 2026" },
          { name: "Moneyweb LHC SENS", url: "https://www.moneyweb.co.za/tools-and-data/click-a-company/LHC/", date: "3 June 2026" },
          { name: "Life Healthcare", url: "https://www.lifehealthcare.co.za/", date: "3 June 2026" },
        ],
        representative_voice: "Life Healthcare H1 FY2026 results released today (28 May) — the second data point on whether private hospital demand recovery is sector-wide or Netcare-specific.",
      },
      {
        theme: "Mediclinic — Third Major Hospital Group; Remgro-Owned; NHI CoN Ruling Removes Key Threat",
        sentiment: "POSITIVE",
        competitor: "Mediclinic",
        what: "Mediclinic is SA's third major private hospital group, acquired by Remgro in 2022. Operates across South Africa, Switzerland (Hirslanden) and the UAE (Mediclinic Middle East). The ConCourt's 18 May ruling striking down the Certificate of Need provisions (Sections 36–40 of the National Health Act) directly benefits Mediclinic — the provisions would have required government approval before opening or expanding facilities. Remgro's backing provides financial stability that smaller hospital groups lack. Mediclinic is relevant to AfroCentric as a major provider network partner for Medscheme, GEMS and Polmed members.",
        sources: [
          { name: "The Citizen — CoN ruling", url: "https://www.citizen.co.za/news/concourt-strikes-down-law-giving-health-minister-power-over-where-doctors-can-work/", date: "18 May 2026" },
        ],
        representative_voice: "The ConCourt CoN ruling removes a significant regulatory threat to all three major private hospital groups — Netcare, Life Healthcare and Mediclinic can expand without government approval.",
      },
      {
        theme: "Medshield — 7.5% Increase, AA Credit Rating, 250,000+ Lives; CGM & Virtual GP Innovations for 2026",
        sentiment: "POSITIVE",
        competitor: "Medshield",
        what: "Medshield is a mid-market open medical scheme with 250,000+ members and an AA Global Credit Rating (stable outlook, upgraded 2026). 2026 weighted average increase: 7.5% — 71.6% of members on 7%, well below the industry average. Key 2026 benefit innovations: Continuous Glucose Monitoring (CGM) for diabetics; unlimited virtual GP consultations on select options; reduced chronic medicine co-payments; procedural co-payment removal on PremiumPlus. Medshield is not administered by Medscheme (it self-administers). Competitive positioning: priced between budget network plans and premium comprehensive options. With Bonitas departing Medscheme, Medshield represents a mid-market open scheme competitor that may attract members seeking alternatives.",
        sources: [
          { name: "Medshield", url: "https://medshield.co.za/2026-products/2026-benefit-options/", date: "2026" },
          { name: "Zawya — Medshield 2026 themes", url: "https://www.zawya.com/en/economy/africa/south-africa-healthcare-buzz-themes-of-2025-into-2026-u9227r3v", date: "Jan 2026" },
        ],
        representative_voice: "For Medshield, 2026 is a defining period. We must decide whether we accept a shrinking role or reimagine our place in a system that prioritises prediction, prevention, equity and long-term health. — Medshield, January 2026",
      },
      {
        theme: "Bonitas Medical Fund — 750,000 Members; 8.8% Increase; Post-Medscheme Era Begins 1 June",
        sentiment: "CAUTIOUS",
        competitor: "Bonitas",
        what: "Bonitas Medical Fund (750,000+ lives) is at the centre of the biggest administrator transition in SA medical scheme history. From 1 June: Momentum Health administers; PHA provides managed care. 2026 contribution increase: 8.8% weighted average. Bonitas's Section 44 CMS investigation (into the 2022/2024 tender irregularities) remains active. The fund itself — separate from its administration controversy — continues to cover 750,000 members and remains one of SA's largest open schemes. Lee Callakoppen (principal officer) has consistently maintained the procurement process was fair and independent. The post-Medscheme operational risk is real: Bonitas members face a switch from weekly to monthly payment runs from their new administrator. Court challenge (9–10 June) could yet create operational uncertainty.",
        sources: [
          { name: "Bonitas", url: "https://www.bonitas.co.za/news-article/appointment-of-administration-and-managed-care-providers/", date: "Jan 2026" },
          { name: "Moonstone — PHA handover", url: "https://www.moonstone.co.za/pha-lays-out-its-case-as-bonitas-managed-care-handover-nears/", date: "May 2026" },
        ],
        representative_voice: "The board could not delay appointing a new administrator simply because an investigation is under way. Allowing the deadline to approach without a replacement in place would risk members' access to benefits. — Bonitas, February 2026",
      },
      {
        theme: "✅ Evergreen Contracts & Governance — Sector Changed Permanently (CMS Indaba Concluded 13-14 May)",
        sentiment: "CAUTIOUS",
        competitor: "Sector-Wide",
        what: "The Bonitas-Medscheme dispute has permanently changed how the sector views long-term administration contracts. CMS Circular 10 of 2026 — immediate directives on fraud, waste, abuse, transitional measures and sector-wide corrections — is now fully in effect for all administrators. Two solvency failures in 2025 (Medihelp below 25%, Sizwe Hosmed at 5%) and Sizwe Hosmed's curatorship show the CMS is willing to act decisively. Medscheme's remaining contracts (GEMS, Polmed) are now under implicit scrutiny.",
        sources: [{ name: "CMS", url: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", date: "17 Mar 2026" }],
        representative_voice: "Every long-term administration contract in SA is now under implicit review. The Bonitas case has permanently changed the governance landscape.",
      },
    ],
    topVoices: [
      { type: "NFO Lead Ombud Gabriels (18 May)", sentiment: "negative", quote: "Discovery Life has yet to point to the provision in the policy which stipulates that a life-changing event is deemed to have occurred on the date medical confirmation of a covered condition has been received." },
      { type: "Netcare H1 2026 Results (25 May)", sentiment: "positive", quote: "Adjusted HEPS +21.9% to 71.7c; interim dividend 44c (+22.2%); digitisation generating a meaningful dividend — R705m in savings since 2022. The fluid medical scheme environment has led us to revise guidance." },
      { type: "Netcare CEO Friedland (19 May)", sentiment: "positive", quote: "Melanie is an exceptional leader and a person of deep integrity. I will hand over the leadership of that community with pride and with absolute confidence in Melanie's ability to take it forward." },
      { type: "Discovery Vitality CEO Govender", sentiment: "positive", quote: "Sleep deserves to stand alongside exercise, nutrition and screening as a core modifiable lifestyle behaviour. The data across 47 million sleep records is unequivocal." },
      { type: "Momentum Health CEO Viljoen", sentiment: "positive", quote: "This deal results in the biggest transfer of a medical scheme from one provider to another in the history of South Africa. Our F2027 targets of R7bn NHE remain intact." },
      { type: "Sizwe Hosmed Curator Fleming (Apr 2026)", sentiment: "cautious", quote: "The scheme's financial position continues to strengthen. As at the date of this update, the scheme complies with the regulatory requirements." },
    ],
    watchPoints: [
      "🟢 25 MAY — Netcare H1 2026: adj. HEPS +21.9% to 71.7c, revenue R13.3bn, dividend 44c (+22.2%)",
      "🟢 28 MAY — Life Healthcare H1 2026: normalised HEPS +19% to 55.1c, revenue R12.4bn (+2.4%), dividend 23c (+9.5%); below plan — Sizwe Hosmed curatorship disrupted elective admissions in Q1",
      "⚡ 9–10 June 2026 — Medscheme High Court dates provisionally secured (next week); 2 full days of argument; papers exceed 1,200 pages",
      "🔴 PHA (Private Health Administrators) — managed care live 1 June; fraudulent documents allegation unresolved; CMS Section 44 probe into BonCap appointment still active",
      "⚡ 29 May — PHA final handover processes commence; Medscheme managed care operations conclude",
      "🟢 1 June 2026 — Melanie Da Costa NOW Netcare CEO Designate; Bonitas handover to Momentum COMPLETED",
      "🔴 18 MAY — ConCourt struck down Certificate of Need (Sections 36–40 National Health Act) — major threat to private healthcare expansion removed; DoH says no direct NHI impact",
      "🔴 18 MAY — NFO rules against Discovery Life — illness date, not confirmation paperwork, is decisive for SIB claims; sector-wide policy wording review likely",
      "⚡ Discovery Vitality Sleep Rewards LIVE (7 May) — Oura Ring 4 fully fundable; Dr Matt Walker visiting SA this month",
      "⚡ Lenacapavir — 5 June 2026 launch TOMORROW; all MCOs and administrators need protocol updates NOW",
      "🟢 1 June 2026 — Bonitas handover COMPLETED; Day 2 post-handover — no member experience issues publicly reported yet",
      "🟢 Discovery H1 FY2026 record: NHE +27% to R5.75bn, interim dividend 111c, Discovery Bank profitable",
      "🟢 20 MAY — Discovery Health Global Health Solutions (rebrand of Vitality Health International Africa) — ASO expansion into Nigeria, Kenya, Ghana; direct competition with AfroCentric Healthcare Africa",
      "🟢 Vitality AI + Google Cloud — global platform, potential to extend life expectancy 8 years",
      "🟢 Discovery Flexicare — new employer groups can lock 2025 premiums to end 2026 (no increase until Jan 2027)",
      "Netcare: 87-bed Akeso Polokwane commissioned 16 Mar; 88-bed Montana facility Oct 2026",
      "Netcare FY2026 guidance: 4–5% revenue growth, CapEx up to R1.9bn; share buyback R292m since Oct 2025",
      "Momentum Health4Me AI triage (Hello Doctor) — 90-second symptom checker live 2026",
      "BestMed 6.8% — lowest open scheme; new cancer screening, cochlear, adenoidectomy benefits",
      "Medihelp — solvency watch; new single-highest co-payment rule reduces member costs",
      "Fedhealth+Sanlam 'Built Different' — live Jan 2026; 32 on-site clinics; 7,800 Sanlam employees added",
      "🔴 Sizwe Hosmed — curator Ian Fleming; solvency 30% (above 25% minimum); membership declining; amalgamation being explored",
      "GEMS and Polmed renewals — most strategic contracts remaining on Medscheme's book; Circular 10 governance implies benchmarking scrutiny",
      "✅ CMS Indaba CONCLUDED (13-14 May) — Circular 10 in full effect; all administrators under governance expectations",
      "NHI ConCourt ruling — no date, H2 2026 likely; all other NHI challenges halted pending ruling",
      "🟢 Motsoaledi ConCourt apology (16 May) — NHI judicial process partially de-escalated",
    ],
    sourceCount: 65,
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
      // For short single words (≤8 chars), require word boundary to avoid partial matches
      // For phrases (contains space) or longer terms, simple includes is fine
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

  // Word-level Jaccard overlap — used for both groupArticles dedup and buildSummary dedup
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
      // Deduplicate within group using word-overlap on titles
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
      // Skip desc if it just repeats the title
      const descIsTitle = tNorm.length > 20 && dNorm.startsWith(tNorm.slice(0, Math.floor(tNorm.length * 0.6)));
      const body = (desc.length > 80 && !descIsTitle) ? desc : "";
      return { title, body, src };
    });

    const facts = [];
    pieces.forEach(({ title, body, src }) => {
      // Prefer a rich description; fall back to title
      const candidate = (body && body.length > 80) ? body : title;
      const norm = candidate.toLowerCase();
      // Reject if >45% word overlap with any already-accepted fact
      const isDupe = facts.some(f => wordOverlap(norm, f.norm) > 0.45);
      if (!isDupe && candidate.length > 20) {
        facts.push({ text: candidate.replace(/\.$/, ""), norm, src });
      }
    });

    if (facts.length === 0) return "";
    // Hard cap: 2 sentences. One clear point per topic group is enough.
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
                      : null}
                <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: col, fontFamily: font, fontWeight: 600, textDecoration: "none", marginTop: "auto" }}>Read full article →</a>
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
    { title: "✅ CMS Industry Indaba 2026 — CONCLUDED (13-14 May, Sandton) — Circular 10 Directives Fully Operational", link: "https://www.medicalschemes.co.za/registration-for-the-2026-cms-industry-indaba-is-now-open/", pubDate: "14 May 2026", description: "The CMS Industry Indaba 2026 concluded 13–14 May at the Sandton Convention Centre. Circular 10 of 2026 — immediate directives on fraud, waste and abuse, transitional measures and sector-wide corrections — is now in full effect for all administrators including Medscheme. This marks the formal shift from findings to implementation framework. FASR submission deadline: 1 June 2026 — TODAY — DEADLINE.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Indaba" },
    { title: "✅ FASR 29 MAY 2026 — Deadline PASSED; Financial Annual Statutory Returns Submitted", link: "https://www.medicalschemes.co.za/latest-publication/circular-13-of-2026-financial-annual-statutory-returns-for-the-financial-year-ended-31-december-2025/", pubDate: "16 Apr 2026", description: "The CMS has finalised the 2025 FASR online system. Electronic submission via the statutory return portal must occur by 1 June 2026 — TODAY — DEADLINE. Critical compliance date for all medical scheme administrators including Medscheme.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "🆕 Circular 14 of 2026: PMB Definition Guideline Development — Clinical Advisory Committee Nominations Open", link: "https://www.medicalschemes.co.za/", pubDate: "May 2026", description: "The CMS has published Circular 14 of 2026 on the development of a PMB Definition Guideline. Stakeholders invited to nominate experts for the Clinical Advisory Committee (CAC). Submit nominations with CV to pmbreview@medicalschemes.co.za.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 12 of 2026: Notification of Registration of Medical Schemes", link: "https://www.medicalschemes.co.za/latest-publication/circular-12-of-2026-notification-of-registration-of-medical-schemes/", pubDate: "Mar 2026", description: "CMS confirms the publication of the list of medical schemes registered for 2026, as detailed in Government Gazette Notice No. 54417.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 10 of 2026: Section 59 Final Investigation Report — Immediate Directives (NOW FULLY IN EFFECT)", link: "https://www.medicalschemes.co.za/latest-publication/circular-10-of-2026-implementation-of-the-section-59-final-investigation-report-immediate-directives-transitional-expectations-and-sector-wide-corrections/", pubDate: "17 Mar 2026", description: "CMS communicates immediate regulatory expectations following the Section 59 Investigation Report. Sets directives on fraud, waste and abuse processes and transitional measures pending the Universal Code of Conduct. Now fully in effect for all medical scheme administrators following the Indaba (13-14 May). Affects Medscheme and all administrators on contract benchmarking obligations.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Investigation" },
    { title: "Circular 9 of 2026: Financial Annual Statutory Returns for 2025 — Submission Date 1 June 2026", link: "https://www.medicalschemes.co.za/latest-publication/circular-9-of-2026-financial-annual-statutory-returns-for-2025/", pubDate: "13 Mar 2026", description: "Update on the expected go-live and submission dates for the 2025 FASR. Anticipated submission date: 1 June 2026 — TODAY — DEADLINE.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 7 of 2026: Categorisation of Assets (Regulation 30, Medical Schemes Act)", link: "https://www.medicalschemes.co.za/latest-publication/circular-7-of-2026-categorisation-of-assets-in-terms-of-annexure-b-to-the-regulations-of-the-medical-schemes-act/", pubDate: "2 Mar 2026", description: "CMS publishes guidelines on categorising assets in terms of Regulation 30 of the Medical Schemes Act.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Circular 2 of 2026: Broker Fee Adjustment — R125.86/month plus VAT from 1 January 2026", link: "https://www.medicalschemes.co.za/latest-publication/circular-2-of-2026-adjustment-of-fees-payable-to-brokers-with-effect-from-1-january-2026/", pubDate: "29 Jan 2026", description: "Maximum broker fees adjusted to R125.86 per month plus VAT, effective 1 January 2026.", source: "CMS Website", publisher: "Council for Medical Schemes", category: "CMS Circular" },
    { title: "Section 44 Investigation: Bonitas Medical Fund — CMS Forensic Probe (ONGOING)", link: "https://www.moonstone.co.za/bonitas-medscheme-split-what-the-cms-probe-means-for-members/", pubDate: "Feb 2026", description: "CMS confirmed Section 44 investigation into Bonitas focused on specific historical procurement decisions. Momentum appointment on 1 June 2026 is now LIVE. The probe is separate from Bonitas' operational transition.", source: "CMS / Moonstone", publisher: "Council for Medical Schemes", category: "CMS Investigation" },
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

// ─── Competitor Intel Tab ─────────────────────────────────────────────────────
const COMPETITOR_ENTITIES = [
  { id: "all",          label: "All Competitors",   icon: "⊕", color: "#0A84FF" },
  { id: "Netcare",      label: "Netcare",            icon: "🟢", color: "#1A6ED4" },
  { id: "Discovery",    label: "Discovery",          icon: "🔵", color: "#0071E3" },
  { id: "Momentum",     label: "Momentum Health",    icon: "🟢", color: "#007A5E" },
  { id: "PHA",          label: "PHA",                icon: "🔴", color: "#B02040" },
  { id: "BestMed",      label: "BestMed",            icon: "🔵", color: "#E03050" },
  { id: "Medihelp",     label: "Medihelp",           icon: "🔵", color: "#9B6DFF" },
  { id: "Fedhealth",    label: "Fedhealth",          icon: "🔵", color: "#FF8C00" },
  { id: "Sizwe Hosmed", label: "Sizwe Hosmed",       icon: "🔴", color: "#C00021" },
  { id: "GEMS & Polmed",label: "GEMS & Polmed",      icon: "🔵", color: "#2E86AB" },
  { id: "Sector-Wide",    label: "Sector-Wide",       icon: "⚖️", color: "#D4A017" },
  { id: "Life Healthcare", label: "Life Healthcare",   icon: "⚡", color: "#1A6ED4" },
  { id: "Mediclinic",      label: "Mediclinic",        icon: "🔵", color: "#5C6BC0" },
  { id: "Medshield",       label: "Medshield",         icon: "🔵", color: "#20639B" },
  { id: "Bonitas",         label: "Bonitas",           icon: "⚠️", color: "#D4A017" },
];

const COMPETITOR_CARDS = [
  { id: "Netcare",       label: "Netcare",        metric: "Adj. HEPS +21.9%", sub: "Revenue R13.3bn · Div 44c",       sentiment: "POSITIVE",  note: "H1 2026 results 25 May" },
  { id: "Discovery",     label: "Discovery",      metric: "NHE +27% R5.75bn", sub: "Record H1 · Bank profitable",     sentiment: "POSITIVE",  note: "NFO SIB ruling vs Discovery Life" },
  { id: "Momentum",      label: "Momentum",       metric: "22%→30% share",    sub: "NHE +8% R3.7bn · ROE 24%",       sentiment: "POSITIVE",  note: "🟢 1 June — Bonitas live; watch post-handover member experience" },
  { id: "PHA",           label: "PHA",            metric: "Managed care live", sub: "1 June 2026 · BonCap since 2020", sentiment: "NEGATIVE",  note: "Fraudulent docs allegation" },
  { id: "BestMed",       label: "BestMed",        metric: "6.8% — lowest",    sub: "Principal +28% over 5 years",     sentiment: "POSITIVE",  note: "Lowest open scheme increase 2026" },
  { id: "Medihelp",      label: "Medihelp",       metric: "8.46% increase",   sub: "Solvency below 25% (2025)",       sentiment: "CAUTIOUS",  note: "New single co-payment rule" },
  { id: "Fedhealth",     label: "Fedhealth",      metric: "9.6% increase",    sub: "7,800 Sanlam staff · 32 clinics", sentiment: "POSITIVE",  note: "'Built Different' live Jan 2026" },
  { id: "Sizwe Hosmed",  label: "Sizwe Hosmed",   metric: "Solvency 30%",     sub: "Up from 5% · Curator Fleming",    sentiment: "NEGATIVE",  note: "Still under CMS watch" },
  { id: "GEMS & Polmed",  label: "GEMS & Polmed",   metric: "9.8% GEMS",         sub: "vs 21% market estimate",           sentiment: "CAUTIOUS",  note: "Most critical Medscheme contracts" },
  { id: "Life Healthcare", label: "Life Healthcare", metric: "HEPS +19% to 55.1c", sub: "Revenue R12.4bn · Div 23c (+9.5%)",  sentiment: "POSITIVE",  note: "Below plan — Sizwe Hosmed hurt PPD" },
  { id: "Mediclinic",      label: "Mediclinic",      metric: "Remgro-owned",      sub: "SA + Switzerland + UAE",            sentiment: "POSITIVE",  note: "CoN ruling removes expansion threat" },
  { id: "Medshield",       label: "Medshield",       metric: "7.5% increase",     sub: "AA rating · 250,000 lives",         sentiment: "POSITIVE",  note: "CGM + virtual GP innovations 2026" },
  { id: "Bonitas",         label: "Bonitas",         metric: "HANDOVER DONE",     sub: "Momentum admin · PHA managed care",    sentiment: "CAUTIOUS", note: "🟢 1 June — Medscheme era ended; watch member experience" },
];

function CompetitorIntelTab({ data }) {
  const T = useT();
  const [selected, setSelected] = useState("all");

  const sentColor = (s) => {
    if (!s) return T.muted;
    const u = s.toUpperCase();
    if (u === "POSITIVE") return T.green;
    if (u === "NEGATIVE") return T.red;
    return T.yellow;
  };

  const filteredThemes = selected === "all"
    ? (data.themes || [])
    : (data.themes || []).filter(t => t.competitor === selected);

  const entity = COMPETITOR_ENTITIES.find(e => e.id === selected);

  // Top signals — the most urgent/important items right now, derived from themes
  const TOP_SIGNALS = (data.themes || [])
    .filter(t => t.theme.startsWith("⚡") || t.theme.startsWith("🔴"))
    .slice(0, 4);

  return (
    <div className="fade">

      {/* ── TOP SIGNALS — first thing you see ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 10 }}>TOP SIGNALS — 3 JUNE 2026</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
          {TOP_SIGNALS.map((t, i) => {
            const isRed = t.theme.startsWith("🔴");
            const accentColor = isRed ? T.red : T.yellow;
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
                  <span style={{ fontSize: 9, fontWeight: 700, color: accentColor, fontFamily: mono, letterSpacing: "1.5px" }}>
                    {isRed ? "BREAKING" : "URGENT"}
                  </span>
                  {t.competitor && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: compEntity?.color || T.muted, fontFamily: mono, background: `${compEntity?.color || T.muted}15`, border: `1px solid ${compEntity?.color || T.muted}40`, padding: "1px 7px", borderRadius: 3 }}>
                      {t.competitor}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.bright, lineHeight: 1.5, fontFamily: font, marginBottom: 6 }}>
                  {t.theme.replace(/^[⚡🔴🟢✅⚠️⚖️🆕]\s?/u, "")}
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

      {/* Market overview cards — always visible */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, fontFamily: mono, marginBottom: 10 }}>MARKET LANDSCAPE — 3 JUNE 2026</div>
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

      {/* Dropdown filter */}
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

      {/* Intelligence summary */}
      <div style={{ background: T.surface, borderLeft: `3px solid ${entity?.color || T.green}`, border: `1px solid ${T.border}`, padding: "14px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 10, fontFamily: mono }}>
          {selected === "all" ? "COMPETITOR INTELLIGENCE SUMMARY — 3 JUNE 2026" : `${entity?.label?.toUpperCase()} — INTELLIGENCE SUMMARY`}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {(selected === "all" ? data.oneLiner : filteredThemes.map(t => `${t.theme}`).join(". "))
            .split(/(?<=\.)\s+(?=[⚡🔴🟢✅⚠️⚖️🆕])/)
            .map((line, i) => {
              const isHot = line.startsWith("⚡") || line.startsWith("🔴");
              const isGood = line.startsWith("🟢") || line.startsWith("✅");
              const isWarn = line.startsWith("⚠️") || line.startsWith("⚖️");
              const color = isHot ? T.red : isGood ? T.green : isWarn ? T.yellow : T.dim;
              return (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color, flexShrink: 0, fontSize: 13, lineHeight: "1.6" }}>
                    {line.match(/^[⚡🔴🟢✅⚠️⚖️🆕]/u)?.[0] || "·"}
                  </span>
                  <span style={{ fontSize: 13, color: isHot ? T.bright : T.text, lineHeight: 1.65, fontFamily: font, fontWeight: isHot ? 500 : 400 }}>
                    {line.replace(/^[⚡🔴🟢✅⚠️⚖️🆕]\s?/, "")}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Themes */}
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
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, borderLeft: `3px solid ${entity?.color || T.blue}`, padding: "14px 16px" }}>
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

        {/* Right sidebar — voices + watch points, only when showing all */}
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
                const isHot = w.startsWith("⚡") || w.startsWith("🔴");
                const icon = w.match(/^[⚡🔴🟢✅🆕⚠️]/u)?.[0] || "▲";
                const label = w.replace(/^[⚡🔴🟢✅🆕⚠️]\s?/u, "");
                return (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: isHot ? T.red : w.startsWith("🟢") || w.startsWith("✅") ? T.green : T.yellow, flexShrink: 0 }}>{icon}</span>
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
            <div className="header-subtitle" style={{ fontSize: 9, color: T.muted, letterSpacing: "1.5px" }}>AfroCentric GROUP · NEWS & INTELLIGENCE MONITOR — JSE:ACT · 3 JUNE 2026</div>
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
                  { label: "LAST UPDATED",       value: "3 June 2026",          color: T.muted },
                ].map((s, i) => (
                  <div key={i} style={{ background: T.surface, padding: "14px 24px", flex: 1 }}>
                    <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 8, fontFamily: mono }}>{s.label}</div>
                    <div style={{ fontSize: i === 2 ? 14 : 20, fontWeight: 700, color: s.color, fontFamily: mono }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: T.surface, borderLeft: `3px solid ${T.green}`, border: `1px solid ${T.border}`, padding: "14px 20px", marginBottom: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: "2px", color: T.muted, marginBottom: 10, fontFamily: mono }}>INTELLIGENCE SUMMARY — 3 JUNE 2026</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {(data.oneLiner || "").split(/(?<=\.)\s+(?=[⚡🔴🟢✅⚠️⚖️🆕])/).map((line, i) => {
                    const isHot = line.startsWith("⚡") || line.startsWith("🔴");
                    const isGood = line.startsWith("🟢") || line.startsWith("✅");
                    const isWarn = line.startsWith("⚠️") || line.startsWith("⚖️");
                    const color = isHot ? T.red : isGood ? T.green : isWarn ? T.yellow : T.dim;
                    return (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color, flexShrink: 0, fontSize: 13, lineHeight: "1.6" }}>
                          {line.match(/^[⚡🔴🟢✅⚠️⚖️🆕]/u)?.[0] || "·"}
                        </span>
                        <span style={{ fontSize: 13, color: isHot ? T.bright : T.text, lineHeight: 1.65, fontFamily: font, fontWeight: isHot ? 500 : 400 }}>
                          {line.replace(/^[⚡🔴🟢✅⚠️⚖️🆕]\s?/, "")}
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
                      const isHot = w.startsWith("⚡") || w.startsWith("🔴");
                      const icon = w.startsWith("⚡") ? "⚡" : w.startsWith("🔴") ? "🔴" : w.startsWith("🟢") ? "🟢" : w.startsWith("✅") ? "✅" : w.startsWith("🆕") ? "🆕" : w.startsWith("⚠️") ? "⚠️" : "▲";
                      const label = w.replace(/^[⚡🔴🟢✅🆕⚠️]\s?/, "");
                      return (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                          <span style={{ color: isHot ? T.red : w.startsWith("🟢") || w.startsWith("✅") ? T.green : w.startsWith("⚠️") ? T.yellow : T.yellow, flexShrink: 0 }}>{icon}</span>
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
            <span style={{ fontSize: 9, color: T.muted, letterSpacing: "1px", fontFamily: mono }}>SA HEALTH NEWS: LIVE · INTELLIGENCE TABS: UPDATED 3 JUNE 2026</span>
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