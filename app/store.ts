import { atom } from "jotai";
import { splitAtom } from "jotai/utils";

export type CalcObject = {
  calcType: "char" | "wep" | undefined;
  name: string;
  from: number;
  to: number;
};

const calcObjectAtom = atom({
  calcType: undefined,
  name: "",
  from: 1,
  to: 60,
} satisfies CalcObject);

export const calcListAtom = atom<CalcObject[]>([]);
export const calcListSplitAtom = splitAtom(calcListAtom);
