export type Timing = "end" | "begin";

export interface PVScheduleRow {
  year: number;
  nominal: number;
  discounted: number;
  cumulativePV: number;
}

export interface PVParams {
  payment: number;
  years: number;
  discountRate: number; // percent, e.g. 3 = 3%
  growthRate?: number;  // percent, default 0
  timing?: Timing;      // default "end"
}

const toRate = (pct: number): number => pct / 100;

export function pvSchedule(params: PVParams): PVScheduleRow[] {
  const { payment, years, discountRate, growthRate = 0, timing = "end" } = params;
  const r = toRate(discountRate);
  const g = toRate(growthRate);
  const rows: PVScheduleRow[] = [];
  let cumulative = 0;
  const n = Math.max(0, Math.round(years));
  for (let i = 1; i <= n; i++) {
    const nominal = payment * Math.pow(1 + g, i - 1);
    const exponent = timing === "begin" ? i - 1 : i;
    const discounted = nominal / Math.pow(1 + r, exponent);
    cumulative += discounted;
    rows.push({ year: i, nominal, discounted, cumulativePV: cumulative });
  }
  return rows;
}

export function presentValue(params: PVParams): number {
  const rows = pvSchedule(params);
  return rows.length ? rows[rows.length - 1].cumulativePV : 0;
}

export interface CalcResult {
  totalPV: number;
  schedule: PVScheduleRow[];
}

export interface LostEarningsParams {
  annualEarnings: number;
  currentAge: number;
  retirementAge: number;
  wageGrowth: number;
  discountRate: number;
  fringePct?: number;
}

export function lostEarningsPV(p: LostEarningsParams): CalcResult {
  const years = Math.max(0, Math.round(p.retirementAge - p.currentAge));
  const basePayment = p.annualEarnings * (1 + toRate(p.fringePct ?? 0));
  const schedule = pvSchedule({
    payment: basePayment,
    years,
    discountRate: p.discountRate,
    growthRate: p.wageGrowth,
    timing: "end",
  });
  return { totalPV: schedule.length ? schedule[schedule.length - 1].cumulativePV : 0, schedule };
}

export interface LifeCareParams {
  annualCost: number;
  medicalInflation: number;
  years: number;
  discountRate: number;
}

export function lifeCarePV(p: LifeCareParams): CalcResult {
  const schedule = pvSchedule({
    payment: p.annualCost,
    years: p.years,
    discountRate: p.discountRate,
    growthRate: p.medicalInflation,
    timing: "end",
  });
  return { totalPV: schedule.length ? schedule[schedule.length - 1].cumulativePV : 0, schedule };
}

export interface HouseholdServicesParams {
  hoursPerWeek: number;
  hourlyWage: number;
  years: number;
  growthRate: number;
  discountRate: number;
}

export function householdServicesPV(p: HouseholdServicesParams): CalcResult {
  const annual = p.hoursPerWeek * p.hourlyWage * 52;
  const schedule = pvSchedule({
    payment: annual,
    years: p.years,
    discountRate: p.discountRate,
    growthRate: p.growthRate,
    timing: "end",
  });
  return { totalPV: schedule.length ? schedule[schedule.length - 1].cumulativePV : 0, schedule };
}
