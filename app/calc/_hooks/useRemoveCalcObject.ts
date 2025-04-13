import { type PrimitiveAtom, useSetAtom } from "jotai";
import { type CalcObject, calcListSplitAtom } from "../store";

export function useRemoveCalcObject() {
  const dispatch = useSetAtom(calcListSplitAtom);

  function remove(atom: PrimitiveAtom<CalcObject>) {
    dispatch({
      type: "remove",
      atom,
    });
  }

  return { remove };
}
