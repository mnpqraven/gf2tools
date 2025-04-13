import { arrayMove } from "@dnd-kit/sortable";
import { type PrimitiveAtom, useSetAtom } from "jotai";

export function useMoveAtom<T>(arrayAtom: PrimitiveAtom<T[]>) {
  // do NOT use useAtom or useAtomValue, avoid re-render
  const set = useSetAtom(arrayAtom);
  function move(oldIndex: number, newIndex: number) {
    if (oldIndex === newIndex) return;
    if (oldIndex < 0 || newIndex < 0) return;

    set((prev) => arrayMove(prev, oldIndex, newIndex));
  }
  return move;
}
