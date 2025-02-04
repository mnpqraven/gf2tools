"use client";

import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { calcListSplitAtom } from "../../store";
import { Plus } from "lucide-react";
import { v4 } from "uuid";

export function AddCalcObjectButton() {
  const dispatch = useSetAtom(calcListSplitAtom);

  const onNew = () =>
    dispatch({
      type: "insert",
      value: {
        _id: v4(),
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
