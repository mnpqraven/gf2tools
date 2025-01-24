"use client";

import { PrimitiveAtom, useAtomValue } from "jotai";
import { calcListAtom, calcListSplitAtom } from "../../store";
import { SortableCalcBox } from "./SortableCalcBox";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { CalcBox } from "./CalcBox";
import { useMoveAtom } from "@/lib/atoms/useMoveAtoms";

export function CalcBoxList() {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  const atoms = useAtomValue(calcListSplitAtom);
  const move = useMoveAtom(calcListAtom);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over?.id !== undefined && active.id !== over.id) {
      move(getAtomIndex(atoms, active.id), getAtomIndex(atoms, over.id));
    }

    setActiveId(undefined);
  }

  const activeAtomIndex = atoms.findIndex((e) => e.toString() === activeId);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={atoms.map((e) => e.toString())}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-wrap gap-2">
          {atoms.map((atom, index) => (
            <SortableCalcBox key={atom.toString()} atom={atom} index={index} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeAtomIndex !== -1 ? (
          <CalcBox atom={atoms[activeAtomIndex]} index={activeAtomIndex} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function getAtomIndex<T, V>(atoms: PrimitiveAtom<T>[], id: V) {
  return atoms.findIndex((atom) => atom.toString() === id);
}
