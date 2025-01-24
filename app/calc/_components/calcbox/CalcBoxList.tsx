"use client";

import { useAtom } from "jotai";
import { calcListSplitAtom } from "../../store";
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
    }),
  );
  const [_atoms, dispatch] = useAtom(calcListSplitAtom);
  // BUG: this doesnt work because id is updated when the list changes
  // we need to persist id, probably another id strip as atom
  const atoms = _atoms.map((atom) => ({ id: `${atom}`, atom }));
  const [activeId, setActiveId] = useState(-1);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as number);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over?.id !== undefined && active.id !== over.id) {
      const firstI = atoms.findIndex((atom) => `${atom}` === over.id);
      const secondI = atoms.findIndex((atom) => `${atom}` === active.id);
      // TODO: undefined indexing
      const lowI = Math.min(firstI, secondI);
      const highI = Math.max(firstI, secondI);
      dispatch({
        type: "move",
        atom: atoms[highI].atom,
        before: atoms[lowI].atom,
      });
    }

    setActiveId(-1);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext items={atoms} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-2">
          {atoms.map(({ atom, id }) => (
            <SortableCalcBox key={`${atom}`} atom={atom} index={id} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId !== -1 && atoms[activeId] !== undefined ? (
          <CalcBox atom={atoms[activeId].atom} index={activeId} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
