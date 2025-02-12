import { PrimitiveAtom, useAtom } from "jotai";
import { OwnedArmoryDoll } from "./types";
import { useId, useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/shared/NumberInput";

export function ExpandedDollContainer({
  atom,
}: {
  atom: PrimitiveAtom<OwnedArmoryDoll>;
}) {
  const [level, setLevel] = useAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("data").prop("level")), [atom])
  );
  const [vert, setVert] = useAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("data").prop("vert")), [atom])
  );
  const htmlId = useId();

  return (
    <div className="flex flex-col">
      <Label htmlFor={`${htmlId}-level`}>Level</Label>
      <NumberInput
        id={`${htmlId}-level`}
        max={60}
        min={1}
        onValueChange={setLevel}
        value={level}
      />

      <Label htmlFor={`${htmlId}-vert`}>Fortification</Label>
      <NumberInput
        id={`${htmlId}-vert`}
        max={6}
        min={0}
        onValueChange={setVert}
        value={vert}
      />
    </div>
  );
}
