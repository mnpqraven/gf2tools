"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { newCalcObjectAtom } from "../../store";
import { Plus } from "lucide-react";

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
