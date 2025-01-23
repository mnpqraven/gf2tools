import { PrimitiveAtom, useAtom } from "jotai";
import { calcListSplitAtom, CalcObject } from "../store";

export function useRemoveCalcObject() {
  const [atoms, dispatch] = useAtom(calcListSplitAtom);

  function remove(indexOrAtom: number | PrimitiveAtom<CalcObject>) {
    const atom =
      typeof indexOrAtom === "number" ? atoms[indexOrAtom] : indexOrAtom;

    dispatch({
      type: "remove",
      atom,
    });
  }

  return { remove };
}
