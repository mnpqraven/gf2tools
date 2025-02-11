import { PrimitiveAtom, useSetAtom } from "jotai";
import { calcListSplitAtom, CalcObject } from "../store";

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
