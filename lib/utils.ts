import { DraggableAttributes } from "@dnd-kit/core";
import { cva } from "class-variance-authority";
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

// TODO: merge with variant from WepGredSelect.tsx
export const weaponRarityVariants = cva("", {
  variants: {
    text: {
      3: "text-rarity-blue",
      4: "text-rarity-purple",
      5: "text-rarity-orange",
    },
    border: {
      3: "border-rarity-blue",
      4: "border-rarity-purple",
      5: "border-rarity-orange",
    },
  },
});
