import { atom, PrimitiveAtom } from "jotai";
import { v4 } from "uuid";
import { atomFamily, atomWithStorage, splitAtom } from "jotai/utils";
import { CALC_TYPE_ENUM } from "@/repository/enums";
import {
  calcCharExp,
  calcCharUncap,
  calcWepExp,
  sumColumn2DArray,
} from "@/lib/calc";
import { add } from "@/lib/utils";
import { z } from "zod";

export type CalcObject = {
  /** internal id used to handle sorting */
  _id: string;
  /** public slug of either the doll or weapon is available */
  id: string | undefined;
  calcType: z.TypeOf<typeof CALC_TYPE_ENUM> | undefined;
  name: string;
  from: number;
  to: number;
};

export type CalcAtomProps = {
  atom: PrimitiveAtom<CalcObject>;
};

export const calcListAtom = atomWithStorage<CalcObject[]>("calcList", []);
export const calcListSplitAtom = splitAtom(calcListAtom, (e) => e._id);
export const calcListSplitSetAtom = atom(
  null,
  (get, set, next: { atom: PrimitiveAtom<CalcObject>; id: string }[]) => {
    set(
      calcListAtom,
      next.map(({ atom }) => get(atom)),
    );
  },
);

function createCalcObject(defaultValue?: Partial<CalcObject>): CalcObject {
  return {
    _id: v4(),
    id: undefined,
    calcType: "CHAR",
    name: "",
    from: 1,
    to: 60,
    ...defaultValue,
  } satisfies CalcObject;
}

export const newCalcObjectAtom = atom(
  null,
  (get, set, defaultValue?: Partial<CalcObject>) => {
    const currentList = get(calcListAtom);
    set(calcListAtom, [...currentList, createCalcObject(defaultValue)]);
  },
);

export const inCalcAtom = atomFamily(
  (slug: string) =>
    atom((get) => get(calcListAtom).find((e) => e.id === slug) !== undefined),
  (a, b) => a === b,
);

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
  get(calcListAtom).filter((e) => e.calcType === "CHAR"),
);

const wepCalcObjects = atom((get) =>
  get(calcListAtom).filter((e) => e.calcType === "WEP"),
);

export const calcSummaryAtom = atom<CalcSummary>((get) => {
  const totalCharExp = get(charCalcObjects).map(calcCharExp).reduce(add, 0);
  const totalWepExp = get(wepCalcObjects).map(calcWepExp).reduce(add, 0);
  const uncaps = get(calcListAtom).map(calcCharUncap);
  const totalUncapMoney = uncaps.map((e) => e.money).reduce(add, 0);
  const totalUncapStock = sumColumn2DArray(
    uncaps.map((e) => e.totalStock),
    6,
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
