"use client";

import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { calcListAtom, calcListSplitAtom, CalcObject } from "./store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DollWrapper() {
  const [atoms, dispatch] = useAtom(calcListSplitAtom);
  const list = useAtomValue(calcListAtom);

  function onNew() {
    dispatch({
      type: "insert",
      value: {
        calcType: "char",
        name: "",
        from: 1,
        to: 60,
      },
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onNew}>New</Button>
      <div className="flex gap-2">
        {atoms.map((atom, i) => (
          <CalcForm key={i} atom={atom} />
        ))}
      </div>
      debug:
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
}

function CalcForm({ atom }: { atom: PrimitiveAtom<CalcObject> }) {
  const [value, setValue] = useAtom(atom);

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
        defaultValue={value.from}
        onChange={(e) => {
          setValue((value) => ({ ...value, from: e.target.valueAsNumber }));
        }}
      />
      to
      <Input
        min={1}
        type="number"
        max={60}
        defaultValue={value.to}
        onChange={(e) => {
          setValue((value) => ({ ...value, to: e.target.valueAsNumber }));
        }}
      />
    </div>
  );
}
