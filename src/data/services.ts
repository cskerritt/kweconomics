import { 
  Scale, 
  TrendingDown, 
  Building2, 
  Users, 
  FileText, 
  PieChart,
  Briefcase,
  LucideIcon,
  BarChart3,
  LineChart,
  Landmark,
  Stethoscope,
  GraduationCap,
  Globe2,
  Database,
  Activity,
  Calculator,
  ClipboardList,
  DollarSign
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  caseTypes: string[];
  metaDescription: string;
  methods?: string[];
  standards?: string[];
  references?: string[];
}

export const services: Service[] = [
  {
    id: "economic-loss-assessment",
    title: "Economic Loss Assessment",
    slug: "economic-loss-assessment",
    icon: Scale,
    description: "Comprehensive economic analysis for personal injury, wrongful death, and disability cases.",
    features: ["Lost earnings calculations", "Economic damages assessment", "Expert testimony", "Life care cost analysis"],
    caseTypes: ["Personal Injury", "Wrongful Death", "Medical Malpractice", "Disability Claims"],
    metaDescription: "Expert economic loss assessment and forensic economic analysis for personal injury, wrongful death, and disability cases."
  },
  {
    id: "vocational-evaluation",
    title: "Vocational Evaluation",
    slug: "vocational-evaluation",
    icon: Users,
    description: "Professional assessment of work capacity, transferable skills, and employability.",
    features: ["Transferable skills analysis", "Labor market surveys", "Vocational testing", "Return-to-work planning"],
    caseTypes: ["Workers' Compensation", "SSDI Evaluations", "Rehabilitation Planning", "Job Placement"],
    metaDescription: "Professional vocational evaluation services including transferable skills analysis, labor market surveys, and employability assessments."
  },
  {
    id: "life-care-planning",
    title: "Life Care Planning",
    slug: "life-care-planning",
    icon: FileText,
    description: "Detailed planning for future medical and care needs in catastrophic injury cases.",
    features: ["Medical cost projections", "Equipment and supply needs", "Home modifications", "Attendant care planning"],
    caseTypes: ["Catastrophic Injury", "Brain Injury", "Spinal Cord Injury", "Birth Trauma"],
    metaDescription: "Comprehensive life care planning services for catastrophic injury cases including medical cost projections and future care needs."
  },
  {
    id: "business-valuation",
    title: "Business Valuation",
    slug: "business-valuation",
    icon: PieChart,
    description: "Expert valuation services for closely held businesses in litigation and advisory transactions.",
    features: [
      "Fair market value determination",
      "DCF / guideline companies / guideline transactions",
      "Quality of earnings flags",
      "Fairness / solvency notes (as applicable)"
    ],
    caseTypes: ["Personal Injury Impact", "Wrongful Death", "Divorce Proceedings", "Partnership Disputes"],
    metaDescription: "Business valuation for litigation and advisory transactions using DCF, guideline companies/transactions, with QoE flags and fairness/solvency notes."
  },
  {
    id: "disability-evaluation",
    title: "Disability Evaluation",
    slug: "disability-evaluation",
    icon: Building2,
    description: "Social Security and workers' compensation disability assessments.",
    features: ["OWCP evaluations", "SSA testimony", "Functional capacity assessment", "Medical record analysis"],
    caseTypes: ["Social Security", "Workers' Compensation", "Disability Insurance", "Veterans Affairs"],
    metaDescription: "Professional disability evaluation services for Social Security, workers' compensation, and disability insurance claims."
  },
  {
    id: "expert-testimony",
    title: "Expert Testimony",
    slug: "expert-testimony",
    icon: TrendingDown,
    description: "Qualified expert witness services for depositions and trial testimony.",
    features: ["Daubert-compliant reports", "Deposition testimony", "Trial presentation", "Cross-examination defense"],
    caseTypes: ["Federal Court", "State Court", "Administrative Hearings", "Arbitration"],
    metaDescription: "Qualified expert witness services including Daubert-compliant reports and professional testimony in legal proceedings."
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    slug: "business-consulting",
    icon: Briefcase,
    description: "Strategic business consulting for economic analysis and financial planning.",
    features: ["Financial analysis", "Market research", "Strategic planning", "Risk assessment"],
    caseTypes: ["Business Planning", "Financial Analysis", "Market Studies", "Risk Management"],
    metaDescription: "Professional business consulting services including financial analysis, strategic planning, and market research."
  },
  // Advisory Services - Business & Industry
  {
    id: "market-analysis-forecasting",
    title: "Market Analysis & Forecasting",
    slug: "market-analysis-forecasting",
    icon: BarChart3,
    description: "Market sizing, demand projections, competitor landscape, and interactive scenario dashboards for planning and risk management.",
    features: [
      "Market sizing & competitor landscape",
      "Demand projections (ARIMA/VAR)",
      "Scenario design vs Fed SEP / CBO / IMF / SPF",
      "Ten-year demand range & sensitivity tables"
    ],
    caseTypes: ["Market Studies", "Business Planning", "Financial Analysis", "Risk Management"],
    metaDescription: "Time-series (ARIMA/VAR) and structural driver forecasts with scenarios benchmarked to Fed SEP, CBO, IMF and the Philadelphia Fed SPF. Outputs include 10-year demand ranges, sensitivity to price/income, and a methodological appendix.",
    methods: ["ARIMA/VAR", "Structural drivers", "Scenario benchmarking"],
    standards: ["Transparent assumptions", "Reproducible code"],
    references: ["Federal Reserve (2025)", "CBO (2025)", "IMF (2025)", "FRB-Philadelphia SPF (2025)"]
  },
  {
    id: "pricing-strategy",
    title: "Pricing Strategy (Elasticity-Grounded)",
    slug: "pricing-strategy",
    icon: LineChart,
    description: "Willingness-to-pay analysis, SSNIP/critical-loss tests, and elasticity estimation for defensible pricing decisions.",
    features: [
      "Willingness-to-pay analysis",
      "Elasticity estimation",
      "SSNIP / critical-loss tests",
      "Hypothetical monopolist tests"
    ],
    caseTypes: ["Market Studies", "Financial Analysis", "Risk Management", "Antitrust"],
    metaDescription: "Elasticity-grounded pricing strategy: WTP measurement, hypothetical monopolist SSNIP and critical-loss tests from modern antitrust toolkits (DOJ/FTC 2023; OECD).",
    methods: ["Elasticity estimation", "WTP analysis", "Hypothetical monopolist"],
    standards: ["DOJ/FTC Merger Guidelines (2023)"],
    references: ["DOJ & FTC (2023)", "OECD (2019)", "DOJ (2023)"]
  },
  {
    id: "cost-benefit-roi-analysis",
    title: "Cost-Benefit & ROI Analysis",
    slug: "cost-benefit-roi-analysis",
    icon: Calculator,
    description: "ROI and NPV models with Monte Carlo risk tables and a full assumptions log aligned to OMB A‑94.",
    features: [
      "ROI & NPV models",
      "Monte Carlo risk analysis",
      "Assumptions log",
      "OMB Circular A-94 alignment"
    ],
    caseTypes: ["Financial Analysis", "Business Planning", "Risk Management", "Capital Projects"],
    metaDescription: "Benefit‑cost and ROI/NPV modeling with uncertainty analysis and OMB A‑94‑aligned discounting and documentation. Appropriate for capital projects and strategic decisions.",
    methods: ["Discounted cashflow", "Monte Carlo"],
    standards: ["OMB Circular A‑94", "USDOT BCA (as applicable)"],
    references: ["OMB (2023/2024)", "USDOT (2024/2025)"]
  },
  {
    id: "labor-economics-consulting",
    title: "Labor Economics Consulting",
    slug: "labor-economics-consulting",
    icon: Users,
    description: "Wage structures and geographic differentials using OEWS/ECI/ECEC benchmarks, with job architecture and leveling design.",
    features: [
      "Wage structure & pay bands",
      "ECEC / ECI benchmarks",
      "Geographic differentials",
      "Job architecture & leveling"
    ],
    caseTypes: ["Labor Market Studies", "Compensation", "HR Strategy", "Market Studies"],
    metaDescription: "Compensation analytics with BLS OEWS/ECI/ECEC benchmarks and regional differentials, plus job architecture and leveling.",
    methods: ["Wage benchmarking", "Geo differentials"],
    standards: ["BLS series usage and documentation"],
    references: ["BLS (2025a)", "BLS (2025b)", "BLS (2025c)", "BLS (2024)"]
  },
  // Government & Public Policy
  {
    id: "economic-impact-studies",
    title: "Economic Impact Studies",
    slug: "economic-impact-studies",
    icon: Landmark,
    description: "Input–output multipliers, distributional tables, fiscal impacts, and uncertainty analysis for projects and policies.",
    features: [
      "Input–output multipliers",
      "Distributional analysis",
      "Fiscal impact modeling",
      "Uncertainty & sensitivity analysis"
    ],
    caseTypes: ["Public Policy", "Economic Impact", "Government Projects", "Infrastructure"],
    metaDescription: "Economic impact assessments using IO multipliers with distributional and fiscal impacts, plus uncertainty analysis.",
    methods: ["Input–output modeling"],
    standards: ["OMB A‑94 (discounting)", "USDOT BCA (transport)"]
  },
  {
    id: "public-policy-analysis",
    title: "Public Policy Analysis",
    slug: "public-policy-analysis",
    icon: FileText,
    description: "Problem framing, options analysis, costs/benefits, equity impacts, and implementation risks for policy choices.",
    features: [
      "Problem framing & baselining",
      "Options & costs/benefits",
      "Equity & distributional impacts",
      "Implementation risks"
    ],
    caseTypes: ["Public Policy", "Program Design", "Government Projects", "Evaluation"],
    metaDescription: "Structured policy analysis with options, costs/benefits, equity impacts, and implementation risk assessment.",
    standards: ["GAO Designing Evaluations"],
    references: ["GAO (2012/2021)"]
  },
  {
    id: "regulatory-impact-assessments",
    title: "Regulatory Impact Assessments (RIA)",
    slug: "regulatory-impact-assessments",
    icon: Scale,
    description: "Baselines, alternatives, benefit–costs per A‑94, and sensitivity & distributional analysis consistent with the current A‑4 framework.",
    features: [
      "Baseline & alternatives definition",
      "Benefit–costs per A-94",
      "Sensitivity & distributional analysis",
      "Current A-4 (2003) framework compliance"
    ],
    caseTypes: ["Regulatory Analysis", "Public Policy", "Government Projects", "Evaluation"],
    metaDescription: "Regulatory impact assessments (RIA) consistent with A‑94 and the current A‑4 framework, including sensitivity and distributional analysis.",
    standards: ["OMB A‑4 (2003 framework)", "OMB A‑94"],
    references: ["The White House (2025)", "OMB (n.d.)"]
  },
  {
    id: "labor-market-employment-studies",
    title: "Labor Market & Employment Studies",
    slug: "labor-market-employment-studies",
    icon: Activity,
    description: "Unemployment diagnostics, job training ROI, and workforce development targeting using BLS micro and series data.",
    features: [
      "Unemployment diagnostics",
      "Job training ROI",
      "Workforce targeting",
      "BLS CPS/LAUS, ECI/ECEC integration"
    ],
    caseTypes: ["Labor Market Studies", "Program Evaluation", "Public Policy", "Workforce Development"],
    metaDescription: "Employment analytics and workforce development studies leveraging CPS/LAUS and compensation data (ECI/ECEC).",
    methods: ["Program ROI", "CPS/LAUS diagnostics"],
    standards: ["BLS documentation"],
    references: ["BLS (2025a–d)"]
  },
  // Healthcare & Education
  {
    id: "health-economics",
    title: "Health Economics",
    slug: "health-economics",
    icon: Stethoscope,
    description: "CEA/CUA (ICERs), budget impact analyses, impact inventories, and payer/provider briefs with CHEERS 2022 reporting.",
    features: [
      "CEA/CUA (ICERs)",
      "Budget impact analysis",
      "Impact inventories",
      "Payer/provider briefing"
    ],
    caseTypes: ["Health Policy", "Program Evaluation", "Budgeting", "Payer Strategy"],
    metaDescription: "Health economic evaluations with CEA/CUA, budget impact, and CHEERS‑compliant reporting.",
    standards: ["CHEERS 2022", "Second Panel on Cost‑Effectiveness (2016)"],
    references: ["Sanders et al. (2016)", "Husereau et al. (2022)"]
  },
  {
    id: "education-economics",
    title: "Education Economics",
    slug: "education-economics",
    icon: GraduationCap,
    description: "Program ROI, funding allocation models, and longitudinal outcome projections for education systems.",
    features: [
      "Program ROI & cost-effectiveness",
      "Funding allocation models",
      "Longitudinal outcome projections",
      "Evidence standards (WWC)"
    ],
    caseTypes: ["Education Policy", "Program Evaluation", "Budgeting", "Public Policy"],
    metaDescription: "Education program ROI and funding models with WWC‑aligned evidence standards.",
    standards: ["WWC procedures"],
    references: ["WWC (2022)", "BLS (2025e)", "OECD (2024)"]
  },
  {
    id: "program-evaluation",
    title: "Program Evaluation (Health/Education/Welfare)",
    slug: "program-evaluation",
    icon: ClipboardList,
    description: "GAO‑aligned evaluation design; AAPOR standards when primary data are collected.",
    features: [
      "Evaluation design (GAO Designing Evaluations)",
      "Causal identification options",
      "Survey design & analysis (AAPOR)",
      "Implementation & fidelity checks"
    ],
    caseTypes: ["Program Evaluation", "Public Policy", "Health Policy", "Education Policy"],
    metaDescription: "Rigorous program evaluation with GAO guidance and AAPOR survey standards when applicable.",
    standards: ["GAO Designing Evaluations", "AAPOR"],
    references: ["GAO (2012/2021)", "AAPOR (2023)"]
  },
  // Finance & Investment
  {
    id: "finance-investment-economics",
    title: "Finance & Investment Economics",
    slug: "finance-investment-economics",
    icon: DollarSign,
    description: "Macro/interest‑rate outlooks, risk scenario matrices, stress testing narratives, and capital project appraisals.",
    features: [
      "Macro & rate outlook briefings",
      "Risk scenario matrices",
      "Stress testing narratives",
      "Capital project appraisal (A-94/USDOT)"
    ],
    caseTypes: ["Financial Analysis", "Risk Management", "Capital Projects", "Investment Strategy"],
    metaDescription: "Finance‑focused economics: macro outlooks, stress testing, and capital appraisals aligned with A‑94/USDOT guidance.",
    standards: ["OMB A‑94", "USDOT (as applicable)"],
    references: ["Federal Reserve (2025)", "IMF (2025)", "USDOT (2024/2025)"]
  },
  // International & Development
  {
    id: "international-development-economics",
    title: "International & Development Economics",
    slug: "international-development-economics",
    icon: Globe2,
    description: "Trade policy memos, market‑entry risk assessments, and development program economic evaluation using WTO/UNCTAD/WDI datasets.",
    features: [
      "Trade policy & tariff analysis",
      "Market‑entry risk assessments",
      "Development program evaluation",
      "WTO/UNCTAD/WDI data integration"
    ],
    caseTypes: ["International Trade", "Market Entry", "Development", "Program Evaluation"],
    metaDescription: "International economics for trade and development with WTO/UNCTAD/WDI data sources.",
    references: ["WTO (n.d.)", "UNCTAD (2025)", "World Bank/IMF (2025)"]
  },
  // Data Science & Quantitative Services
  {
    id: "econometrics-data-science",
    title: "Econometrics & Data Science",
    slug: "econometrics-data-science",
    icon: Database,
    description: "Forecasting, causal inference (DiD/RD/synthetic control), survey design/analysis, and data pipelines for decision support.",
    features: [
      "Econometric forecasting",
      "Causal inference (DiD, RD, synthetic control)",
      "Survey design & analysis",
      "Data engineering pipelines"
    ],
    caseTypes: ["Data Science", "Causal Inference", "Forecasting", "Program Evaluation"],
    metaDescription: "Applied econometrics and data science including forecasting, DiD/RD/synthetic control, and survey analytics.",
    references: [
      "Angrist & Pischke (2008)",
      "Bertrand-Duflo-Mullainathan (2004/2002)",
      "Abadie et al. (2003/2010)",
      "Varian (2014)",
      "Mullainathan & Spiess (2017)",
      "Athey (2018)"
    ]
  }
];

export const getServiceBySlug = (slug: string) => 
  services.find(service => service.slug === slug);

export const getAllServices = () => services;
