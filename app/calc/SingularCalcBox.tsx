"use client";

import { PrimitiveAtom, useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { CalcObject } from "./store";
import { useMemo } from "react";
import { focusAtom } from "jotai-optics";

export function SingularCalcBox({ atom }: { atom: PrimitiveAtom<CalcObject> }) {
  const [value, setValue] = useAtom(atom);
  const [fromAtom, toAtom] = useMemo(
    () => [
      focusAtom(atom, (optic) => optic.prop("from")),
      focusAtom(atom, (optic) => optic.prop("to")),
    ],
    [atom],
  );
  const [from, setFrom] = useAtom(fromAtom);
  const [to, setTo] = useAtom(toAtom);

  return (
    <div className="flex flex-col">
      <Input
        defaultValue={value.name}
        onChange={(e) => {
          setValue({ ...value, name: e.target.value });
        }}
      />
      from
      <Input
        min={1}
        type="number"
        max={60}
        value={from}
        onChange={(e) => {
          setFrom(e.target.valueAsNumber);
        }}
      />
      to
      <Input
        min={1}
        type="number"
        max={60}
        value={to}
        onChange={(e) => {
          setTo(e.target.valueAsNumber);
        }}
      />
    </div>
  );
}
