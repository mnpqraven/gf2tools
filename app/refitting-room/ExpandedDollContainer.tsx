import { PrimitiveAtom, useAtom } from "jotai";
import { OwnedArmoryDoll } from "./types";
import { useId, useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/shared/NumberInput";
import { DollSlugEnum } from "@/repository/enums";
import { dollAtomLookup } from "./store";

export function ExpandedDollContainer({ slug }: { slug: DollSlugEnum }) {
  const [level, setLevel] = useInput(slug, "level");
  const [vert, setVert] = useInput(slug, "vert");
  const htmlId = useId();

  return (
    <>
      <div className="flex flex-col">
        <Label htmlFor={`${htmlId}-level`}>Level</Label>
        <NumberInput
          id={`${htmlId}-level`}
          max={60}
          min={1}
          onValueChange={setLevel}
          value={level}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor={`${htmlId}-vert`}>Fortification</Label>
        <NumberInput
          id={`${htmlId}-vert`}
          max={6}
          min={0}
          onValueChange={setVert}
          value={vert}
        />
      </div>
    </>
  );
}

function useInput(slug: DollSlugEnum, type: "level" | "vert") {
  const atom = useMemo(
    () =>
      focusAtom(dollAtomLookup(slug) as PrimitiveAtom<OwnedArmoryDoll>, (t) =>
        t.prop("data").prop(type),
      ),
    [slug, type],
  );
  return useAtom(atom);
}
