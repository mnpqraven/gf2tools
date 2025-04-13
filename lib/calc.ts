import {
  DOLL_EXP_TABLE,
  DOLL_UNCAP_TABLE,
  type StockBarConf,
} from "@/repository/dolls";
import { WEP_EXP_TABLE } from "../repository/wep";
import { add } from "./utils";

type FromTo = {
  from: number;
  to: number;
};

/**
 * 1-based calculator
 * TODO: documentation
 */
export function calcWepExp({ from, to }: FromTo): number {
  if (from > to) return 0;
  return WEP_EXP_TABLE.slice(from, to).reduce(
    (partial, next) => partial + next,
    0,
  );
}

/**
 * 1-based calculator
 * TODO: documentation
 */
export function calcCharExp({ from, to }: FromTo): number {
  if (from > to) return 0;
  return DOLL_EXP_TABLE.slice(from, to).reduce(
    (partial, next) => partial + next,
    0,
  );
}

export function calcCharUncap({ from, to }: FromTo) {
  // first uncap starts at 20
  const uncapFromIndex = Math.ceil(Math.max(from - 20, 0) / 10);
  const uncapToIndex = Math.ceil(Math.max(to - 20, 0) / 10);

  const sliced = DOLL_UNCAP_TABLE.slice(uncapFromIndex, uncapToIndex);
  const money = sliced.map((e) => e.money).reduce(add, 0);
  const totalStock = sumColumn2DArray(
    sliced.map((e) => e.stockBar),
    6,
  ) as StockBarConf;

  return { money, totalStock };
}

export function sumColumn2DArray(array: number[][], defaultLength?: number) {
  const newArray: number[] = [];
  // biome-ignore lint/complexity/noForEach: safe
  array.forEach((sub) => {
    sub.forEach((num, index) => {
      if (newArray[index] !== undefined) {
        newArray[index] += num;
      } else {
        newArray[index] = num;
      }
    });
  });

  if (defaultLength !== undefined && !newArray.length)
    return Array(defaultLength).fill(0) as number[];

  return newArray;
}
