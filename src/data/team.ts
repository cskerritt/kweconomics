export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  photo: string;          // public path or imported asset URL
  hasPhoto: boolean;      // false → render initials placeholder
  credentials: string[];
  bio: string;
  shortBio: string;
  links?: { label: string; href: string }[];
}

export const teamMembers: TeamMember[] = [
  {
    slug: "christopher-skerritt",
    name: "Christopher Skerritt, M.Ed., MBA",
    title: "Principal Economist",
    photo: "/lovable-uploads/abec9830-380f-469f-9ee8-f9c7278c3372.png",
    hasPhoto: true,
    credentials: [
      "Master of Business Administration – Healthcare Leadership, Bryant University (2024)",
      "Master of Education in Rehabilitation Counseling, Springfield College (2016)",
      "Certified Rehabilitation Counselor (CRC)",
      "Licensed Rehabilitation Counselor (LRC)",
      "Fellow of Vocational Experts (FVE)",
      "Certified Life Care Planner (CLCP)",
      "Fellow of the American Board of Vocational Experts (ABVE/F)",
      "Certified Vocational Evaluator (CVE)",
      "President, American Rehabilitation Economics Association (2025–2026)",
    ],
    bio: "Principal Economist specializing in forensic economic analysis, vocational rehabilitation, and life care planning. With extensive credentials including CRC, LRC, FVE, CVE, CLCP, and ABVE/F, Christopher provides economic loss assessments, business valuation, and disability evaluation, and has provided expert testimony in matters nationwide.",
    shortBio: "Principal Economist specializing in forensic economics, vocational rehabilitation, and life care planning.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/christopherskerritt" },
    ],
  },
  {
    slug: "zachary-sperling",
    name: "Zachary Sperling",
    title: "Economic Associate",
    photo: "/lovable-uploads/zach-sperling.jpg",
    hasPhoto: false,
    credentials: [
      "B.A. Economics, The College of New Jersey",
      "B.A. Criminology, The College of New Jersey",
    ],
    bio: "Zachary Sperling is a financial professional specializing in Public Policy, Social Advocacy, and Forensic Economics. With double majors in Economics and Criminology from The College of New Jersey, Zachary spent 3 years reintegrating formerly incarcerated individuals back into society via court advocacy, community planning, and background-friendly vocational training. Zachary is utilizing his experience with disenfranchised populations, legal proceedings, and economic knowledge to assist Kincaid Wolstein's Economic Department as an Economic Associate.",
    shortBio: "Economic Associate specializing in public policy, social advocacy, and forensic economics.",
  },
];

export function getInitials(name: string): string {
  return name
    .replace(/,.*$/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
