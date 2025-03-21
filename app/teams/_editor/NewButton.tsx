"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { defaultTeamPreset, teamListSplittedAtom } from "../store";

export function NewButton({
  children,
  ...props
}: Omit<ButtonProps, "onClick">) {
  const dispatch = useSetAtom(teamListSplittedAtom);

  function onNew() {
    dispatch({
      type: "insert",
      value: defaultTeamPreset,
    });
  }

  return (
    <Button {...props} onClick={onNew}>
      {children}
    </Button>
  );
}
