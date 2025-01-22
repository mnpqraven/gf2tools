import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import { CALC_TYPE_ENUM } from "@/repository/enums";
import { calcWepExpNeeded } from "@/lib/calc";
import { add } from "@/lib/utils";

export type CalcObject = {
  calcType: keyof typeof CALC_TYPE_ENUM | undefined;
  name: string;
  from: number;
  to: number;
};

export const calcListAtom = atom<CalcObject[]>([]);
export const calcListSplitAtom = splitAtom(calcListAtom);

type StockBarSummary = {
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
  tier5: number;
};
type DollConductorSummary = {
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
  tier5: number;
};
export type CalcSummary = {
  totalCharExp: number;
  totalWepExp: number;
  conductor: DollConductorSummary;
  stockBar: StockBarSummary;
};

const charCalcObjects = atom((get) =>
  get(calcListAtom).filter((e) => e.calcType === "CHAR"),
);

const wepCalcObjects = atom((get) =>
  get(calcListAtom).filter((e) => e.calcType === "WEP"),
);

export const calcSummaryAtom = atom<CalcSummary>((get) => {
  const totalCharExp = get(charCalcObjects)
    .map(calcWepExpNeeded)
    .reduce(add, 0);
  const totalWepExp = get(wepCalcObjects).map(calcWepExpNeeded).reduce(add, 0);

  return {
    totalWepExp,
    totalCharExp,
    // TODO:
    conductor: {
      tier1: 0,
      tier2: 0,
      tier3: 0,
      tier4: 0,
      tier5: 0,
    },
    stockBar: {
      tier1: 0,
      tier2: 0,
      tier3: 0,
      tier4: 0,
      tier5: 0,
    },
  };
});
