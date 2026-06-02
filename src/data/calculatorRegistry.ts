import {
  pvSchedule,
  presentValue,
  lostEarningsPV,
  lifeCarePV,
  householdServicesPV,
  type PVScheduleRow,
} from "@/lib/finance";

export interface CalcFieldOption {
  label: string;
  value: number;
}

export interface CalcField {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: "$" | "%" | "yrs" | "age" | "hrs/wk" | "$/hr" | "";
  options?: CalcFieldOption[];
}

export interface CalcOutput {
  totalPV: number;
  schedule: PVScheduleRow[];
  extras?: { label: string; value: string }[];
}

export interface CalcConfig {
  slug: string;
  title: string;
  description: string;
  fields: CalcField[];
  compute: (v: Record<string, number>) => CalcOutput;
}

export const DISCLAIMER =
  "These calculators provide simplified, illustrative estimates for educational purposes only. They are not a substitute for a formal forensic economic analysis and should not be relied upon for litigation. Contact Kincaid Wolstein Economics for a case-specific evaluation.";

export const calculators: CalcConfig[] = [
  {
    slug: "present-value",
    title: "Present Value Calculator",
    description:
      "Estimate the present value of a stream of future payments, adjusting for growth and a discount rate.",
    fields: [
      { key: "payment", label: "Annual payment", min: 0, max: 500000, step: 1000, default: 50000, unit: "$" },
      { key: "years", label: "Number of years", min: 1, max: 60, step: 1, default: 20, unit: "yrs" },
      { key: "discountRate", label: "Discount rate", min: 0, max: 15, step: 0.1, default: 3, unit: "%" },
      { key: "growthRate", label: "Growth rate", min: 0, max: 15, step: 0.1, default: 2, unit: "%" },
      {
        key: "timing",
        label: "Payment timing",
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { label: "End of year", value: 0 },
          { label: "Beginning of year", value: 1 },
        ],
      },
    ],
    compute: (v) => {
      const timing = v.timing === 1 ? "begin" : "end";
      const schedule = pvSchedule({
        payment: v.payment,
        years: v.years,
        discountRate: v.discountRate,
        growthRate: v.growthRate,
        timing,
      });
      return {
        totalPV: presentValue({
          payment: v.payment,
          years: v.years,
          discountRate: v.discountRate,
          growthRate: v.growthRate,
          timing,
        }),
        schedule,
      };
    },
  },
  {
    slug: "lost-earnings",
    title: "Lost Earnings Estimator",
    description:
      "Estimate the present value of lost future earnings from the current age to expected retirement.",
    fields: [
      { key: "annualEarnings", label: "Current annual earnings", min: 0, max: 500000, step: 1000, default: 60000, unit: "$" },
      { key: "currentAge", label: "Current age", min: 16, max: 75, step: 1, default: 40, unit: "age" },
      { key: "retirementAge", label: "Retirement age", min: 40, max: 80, step: 1, default: 67, unit: "age" },
      { key: "wageGrowth", label: "Annual wage growth", min: 0, max: 10, step: 0.1, default: 2.5, unit: "%" },
      { key: "discountRate", label: "Discount rate", min: 0, max: 15, step: 0.1, default: 3, unit: "%" },
      { key: "fringePct", label: "Fringe benefits", min: 0, max: 50, step: 1, default: 20, unit: "%" },
    ],
    compute: (v) => {
      const { totalPV, schedule } = lostEarningsPV({
        annualEarnings: v.annualEarnings,
        currentAge: v.currentAge,
        retirementAge: v.retirementAge,
        wageGrowth: v.wageGrowth,
        discountRate: v.discountRate,
        fringePct: v.fringePct,
      });
      return {
        totalPV,
        schedule,
        extras: [{ label: "Work-life years", value: String(Math.max(0, Math.round(v.retirementAge - v.currentAge))) }],
      };
    },
  },
  {
    slug: "life-care",
    title: "Life Care Plan Cost Projector",
    description:
      "Estimate the present value of recurring future care costs, adjusting for medical inflation.",
    fields: [
      { key: "annualCost", label: "Annual care cost", min: 0, max: 500000, step: 1000, default: 40000, unit: "$" },
      { key: "medicalInflation", label: "Medical inflation", min: 0, max: 12, step: 0.1, default: 3.5, unit: "%" },
      { key: "years", label: "Years of care", min: 1, max: 60, step: 1, default: 30, unit: "yrs" },
      { key: "discountRate", label: "Discount rate", min: 0, max: 15, step: 0.1, default: 3, unit: "%" },
    ],
    compute: (v) => {
      const { totalPV, schedule } = lifeCarePV({
        annualCost: v.annualCost,
        medicalInflation: v.medicalInflation,
        years: v.years,
        discountRate: v.discountRate,
      });
      return { totalPV, schedule };
    },
  },
  {
    slug: "household-services",
    title: "Household Services Loss Calculator",
    description:
      "Estimate the present value of lost household services based on replacement cost.",
    fields: [
      { key: "hoursPerWeek", label: "Hours per week", min: 0, max: 80, step: 1, default: 20, unit: "hrs/wk" },
      { key: "hourlyWage", label: "Replacement wage", min: 0, max: 100, step: 1, default: 18, unit: "$/hr" },
      { key: "years", label: "Number of years", min: 1, max: 60, step: 1, default: 25, unit: "yrs" },
      { key: "growthRate", label: "Wage growth", min: 0, max: 10, step: 0.1, default: 2, unit: "%" },
      { key: "discountRate", label: "Discount rate", min: 0, max: 15, step: 0.1, default: 3, unit: "%" },
    ],
    compute: (v) => {
      const { totalPV, schedule } = householdServicesPV({
        hoursPerWeek: v.hoursPerWeek,
        hourlyWage: v.hourlyWage,
        years: v.years,
        growthRate: v.growthRate,
        discountRate: v.discountRate,
      });
      return {
        totalPV,
        schedule,
        extras: [{ label: "Annualized value", value: `$${Math.round(v.hoursPerWeek * v.hourlyWage * 52).toLocaleString()}` }],
      };
    },
  },
];

export function getCalculator(slug: string): CalcConfig | undefined {
  return calculators.find((c) => c.slug === slug);
}
