import { DraggableAttributes } from "@dnd-kit/core";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function* range(start: number, end: number, step = 1) {
  while (start <= end) {
    yield start;
    start += step;
  }
}

export function add(left: number, right: number) {
  return left + right;
}

export interface DragHandleProps extends DraggableAttributes {
  ref: (element: HTMLElement | null) => void;
}
type RequiredDragHandle = {
  dragHandle: DragHandleProps;
};

export type DragHandle = Partial<RequiredDragHandle>;
