"use client";

import { useAtomValue } from "jotai";
import { calcListSplitAtom } from "../../store";
import { SingularCalcBox } from "../../SingularCalcBox";

export function CalcBoxList() {
  const atoms = useAtomValue(calcListSplitAtom);
  return (
    <div className="flex gap-2 flex-wrap">
      {atoms.map((atom, i) => (
        <SingularCalcBox key={i} atom={atom} index={i} />
      ))}
    </div>
  );
}
