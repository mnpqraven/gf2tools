import { CHAR_EXP_TABLE } from "./data/char_exp";
import { WEP_EXP_TABLE } from "./data/wep_exp";

/**
 * 1-based calculator
 * TODO: documentation
 * @param from - [TODO:description]
 * @param to - [TODO:description]
 * @returns [TODO:return]
 */
export function calcWepExpNeeded({
  from,
  to,
}: {
  from: number;
  to: number;
}): number {
  if (from > to) throw new Error("from can't be greater than to");
  return WEP_EXP_TABLE.slice(from - 1, to - 1).reduce(
    (partial, next) => partial + next,
    0,
  );
}

/**
 * 1-based calculator
 * TODO: documentation
 * @param from - [TODO:description]
 * @param to - [TODO:description]
 * @returns [TODO:return]
 */
export function calcCharExpNeeded({
  from,
  to,
}: {
  from: number;
  to: number;
}): number {
  if (from > to) throw new Error("from can't be greater than to");
  return CHAR_EXP_TABLE.slice(from - 1, to - 1).reduce(
    (partial, next) => partial + next,
    0,
  );
}
