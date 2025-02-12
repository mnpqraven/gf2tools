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
      collisionDetection={closestCorners}
      onValueChange={setAtoms}
      orientation="mixed"
      overlay={<div className="size-full rounded-md bg-primary/10" />}
      value={keyedAtoms}
    >
      <div className="flex flex-wrap gap-2">
        {keyedAtoms.map(({ atom, id }) => (
          <SortableItem asChild key={id} value={id}>
            <CalcBox
              atom={atom}
              // className="max-w-40"
            />
          </SortableItem>
        ))}
      </div>
    </Sortable>
  );
}
