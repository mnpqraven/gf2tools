"use client";

import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { calcListSplitAtom } from "../../store";
import { Plus } from "lucide-react";

export function AddCalcObjectButton() {
  const dispatch = useSetAtom(calcListSplitAtom);

  const onNew = () =>
    dispatch({
      type: "insert",
      value: {
        calcType: "CHAR",
        name: "",
        from: 1,
        to: 60,
      },
    });

  return (
    <Button onClick={onNew} variant="outline" size="sm">
      <Plus /> New
    </Button>
  );
}
