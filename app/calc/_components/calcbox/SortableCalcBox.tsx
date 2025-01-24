"use client";

import { PrimitiveAtom } from "jotai";
import { CalcObject } from "../../store";
import { CSSProperties, HTMLAttributes } from "react";
import { DragHandleProps } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalcBox } from "./CalcBox";

export interface CalcAtom {
  atom: PrimitiveAtom<CalcObject>;
}

interface Prop extends CalcAtom, HTMLAttributes<HTMLDivElement> {
  index: number;
}
export function SortableCalcBox({ index, style: propsStyle, ...props }: Prop) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({ id: props.atom.toString() });

  const style = {
    ...propsStyle,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1 : "auto",
  } satisfies CSSProperties;

  const dragHandle = {
    ref: setActivatorNodeRef,
    ...attributes,
    ...listeners,
  } satisfies DragHandleProps;

  return (
    <CalcBox
      index={index}
      ref={setNodeRef}
      {...props}
      style={style}
      dragHandle={dragHandle}
    />
  );
}
