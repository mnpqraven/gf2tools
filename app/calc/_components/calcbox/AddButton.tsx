"use client";

import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { newCalcObjectAtom } from "../../store";
import { Plus } from "lucide-react";

export function AddCalcObjectButton() {
  const onNew = useSetAtom(newCalcObjectAtom);

  return (
    <Button onClick={onNew} variant="outline" size="sm">
      <Plus /> New
    </Button>
  );
}
