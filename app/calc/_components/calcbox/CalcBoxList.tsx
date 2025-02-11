"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { calcListSplitAtom, calcListSplitSetAtom } from "../../store";
import { closestCorners } from "@dnd-kit/core";
import { Sortable, SortableItem } from "@/components/ui/sortable";
import { CalcBox } from "./CalcBox";
import { useMemo } from "react";

export function CalcBoxList() {
  const _atoms = useAtomValue(calcListSplitAtom);
  const keyedAtoms = useMemo(
    () => _atoms.map((atom) => ({ atom, id: `${atom}` })),
    [_atoms],
  );
  const setAtoms = useSetAtom(calcListSplitSetAtom);

  return (
    <Sortable
      orientation="mixed"
      collisionDetection={closestCorners}
      value={keyedAtoms}
      onValueChange={setAtoms}
      overlay={<div className="size-full rounded-md bg-primary/10" />}
    >
      <div className="flex flex-wrap gap-2">
        {keyedAtoms.map(({ atom, id }) => (
          <SortableItem key={id} value={id} asChild>
            <CalcBox atom={atom} />
          </SortableItem>
        ))}
      </div>
    </Sortable>
  );
}
