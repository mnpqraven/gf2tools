"use client";

import { ComponentPropsWithRef, useId, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { NumberInput } from "@/components/shared/NumberInput";
import { Label } from "@/components/ui/label";
import { useCalcBox } from "./CalcBoxProvider";

export function LevelInputRow({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  const { atom } = useCalcBox();
  const [from, _setFrom] = useAtom(
    useMemo(() => focusAtom(atom, (optic) => optic.prop("from")), [atom]),
  );
  const [to, _setTo] = useAtom(
    useMemo(() => focusAtom(atom, (optic) => optic.prop("to")), [atom]),
  );

  function setFrom(amount: number) {
    _setFrom(amount);
    if (amount > to) _setTo(amount);
  }
  function setTo(amount: number) {
    _setTo(amount);
    if (amount < from) _setFrom(amount);
  }

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const fromId = useId();
  const toId = useId();

  return (
    <div {...props} className={cn("flex grow-0 gap-2", className)}>
      <div className="flex-1 gap-1 [&>input]:w-full">
        <Label htmlFor={fromId}>From Lv</Label>
        <NumberInput
          id={fromId}
          max={60}
          min={1}
          onRightFocus={() => toRef.current?.focus()}
          onValueChange={setFrom}
          ref={fromRef}
          value={from}
        />
      </div>
      <div className="flex-1 gap-1 [&>input]:w-full">
        <Label htmlFor={toId}>To Lv</Label>
        <NumberInput
          id={toId}
          max={60}
          min={1}
          onLeftFocus={() => fromRef.current?.focus()}
          onValueChange={setTo}
          ref={toRef}
          value={to}
        />
      </div>
    </div>
  );
}
