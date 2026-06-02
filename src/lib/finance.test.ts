import { describe, it, expect } from "vitest";
import {
  pvSchedule,
  presentValue,
  lostEarningsPV,
  lifeCarePV,
  householdServicesPV,
} from "./finance";

describe("pvSchedule / presentValue", () => {
  it("equals sum of payments when discount and growth are zero", () => {
    expect(presentValue({ payment: 100, years: 3, discountRate: 0, growthRate: 0 })).toBeCloseTo(300, 6);
  });

  it("matches closed-form ordinary annuity (end-of-year)", () => {
    expect(presentValue({ payment: 100, years: 3, discountRate: 10, growthRate: 0, timing: "end" }))
      .toBeCloseTo(248.6852, 3);
  });

  it("begin-of-year PV is higher than end-of-year", () => {
    const end = presentValue({ payment: 100, years: 3, discountRate: 10, timing: "end" });
    const begin = presentValue({ payment: 100, years: 3, discountRate: 10, timing: "begin" });
    expect(begin).toBeGreaterThan(end);
  });

  it("growth equal to discount yields years * payment/(1+r) end-of-year", () => {
    expect(presentValue({ payment: 100, years: 3, discountRate: 5, growthRate: 5, timing: "end" }))
      .toBeCloseTo(285.7143, 3);
  });

  it("schedule cumulativePV increases monotonically", () => {
    const rows = pvSchedule({ payment: 100, years: 4, discountRate: 3, growthRate: 2 });
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i].cumulativePV).toBeGreaterThan(rows[i - 1].cumulativePV);
    }
  });
});

describe("lostEarningsPV", () => {
  it("returns 0 when retirement age is at or below current age", () => {
    expect(lostEarningsPV({ annualEarnings: 50000, currentAge: 65, retirementAge: 65, wageGrowth: 2, discountRate: 3 }).totalPV)
      .toBe(0);
  });

  it("applies fringe percentage on top of earnings", () => {
    const noFringe = lostEarningsPV({ annualEarnings: 50000, currentAge: 40, retirementAge: 41, wageGrowth: 0, discountRate: 0, fringePct: 0 }).totalPV;
    const withFringe = lostEarningsPV({ annualEarnings: 50000, currentAge: 40, retirementAge: 41, wageGrowth: 0, discountRate: 0, fringePct: 20 }).totalPV;
    expect(withFringe).toBeCloseTo(noFringe * 1.2, 4);
  });
});

describe("lifeCarePV", () => {
  it("sums undiscounted cost when rates are zero", () => {
    expect(lifeCarePV({ annualCost: 1000, medicalInflation: 0, years: 5, discountRate: 0 }).totalPV)
      .toBeCloseTo(5000, 6);
  });
});

describe("householdServicesPV", () => {
  it("annualizes hours x wage x 52 with no growth/discount", () => {
    expect(householdServicesPV({ hoursPerWeek: 10, hourlyWage: 20, years: 2, growthRate: 0, discountRate: 0 }).totalPV)
      .toBeCloseTo(20800, 6);
  });
});
