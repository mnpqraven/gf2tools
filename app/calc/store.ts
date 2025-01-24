import { atom } from "jotai";
import { v4 } from "uuid";
import { splitAtom } from "jotai/utils";
import { CALC_TYPE_ENUM } from "@/repository/enums";
import {
  calcCharExp,
  calcCharUncap,
  calcWepExp,
  sumColumn2DArray,
} from "@/lib/calc";
import { add } from "@/lib/utils";

export type CalcObject = {
  calcType: keyof typeof CALC_TYPE_ENUM | undefined;
  name: string;
  from: number;
  to: number;
};

export const calcListAtom = atom<CalcObject[]>([]);
export const calcListSplitAtom = splitAtom(calcListAtom, () => v4());

type StockBarSummary = {
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
  tier5: number;
  tier6: number;
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
  money: number;
  conductor: DollConductorSummary;
  stockBar: StockBarSummary;
};

const charCalcObjects = atom((get) =>
  get(calcListAtom).filter((e) => e.calcType === "CHAR")
);

const wepCalcObjects = atom((get) =>
  get(calcListAtom).filter((e) => e.calcType === "WEP")
);

export const calcSummaryAtom = atom<CalcSummary>((get) => {
  const totalCharExp = get(charCalcObjects).map(calcCharExp).reduce(add, 0);
  const totalWepExp = get(wepCalcObjects).map(calcWepExp).reduce(add, 0);
  const uncaps = get(calcListAtom).map(calcCharUncap);
  const totalUncapMoney = uncaps.map((e) => e.money).reduce(add, 0);
  const totalUncapStock = sumColumn2DArray(
    uncaps.map((e) => e.totalStock),
    6
  );

  return {
    totalWepExp,
    totalCharExp,
    money: totalUncapMoney,
    // TODO:
    conductor: {
      tier1: 0,
      tier2: 0,
      tier3: 0,
      tier4: 0,
      tier5: 0,
    },
    stockBar: {
      tier1: totalUncapStock[0],
      tier2: totalUncapStock[1],
      tier3: totalUncapStock[2],
      tier4: totalUncapStock[3],
      tier5: totalUncapStock[4],
      tier6: totalUncapStock[5],
    },
  } satisfies CalcSummary;
});
