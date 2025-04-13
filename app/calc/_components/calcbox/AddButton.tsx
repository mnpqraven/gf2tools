"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import { newCalcObjectAtom } from "../../store";

export function AddCalcObjectButton({
  ...props
}: Omit<ButtonProps, "onClick">) {
  const onNew = useSetAtom(newCalcObjectAtom);

  return (
    <Button size="sm" variant="outline" {...props} onClick={() => onNew()}>
      <Plus /> New
    </Button>
  );
}
