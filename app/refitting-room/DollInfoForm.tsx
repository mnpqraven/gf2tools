import { PrimitiveAtom, useAtom } from "jotai";
import { OwnedArmoryDoll } from "./types";
import { useId, useMemo, useRef } from "react";
import { focusAtom } from "jotai-optics";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/shared/NumberInput";
import { DollSlugEnum } from "@/repository/enums";
import { dollAtomLookup } from "./store";
import { motion } from "motion/react";
import { DOLL_META } from "@/repository/dolls";

export function DollInfoForm({ slug }: { slug: DollSlugEnum }) {
  const [level, setLevel] = useInput(slug, "level");
  const [vert, setVert] = useInput(slug, "vert");
  const [helix, setHelix] = useInput(slug, "helix");
  const htmlId = useId();
  const doll = DOLL_META.find((e) => e.id === slug)!; // safe assertion
  const levelRef = useRef<HTMLInputElement>(null);
  const vertRef = useRef<HTMLInputElement>(null);
  const helixRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      // better off to not deal with AnimatePresence's hassle here
      // using layout here fucks up the grid shifts
      animate={{ opacity: 1 }}
      className="relative flex-1 grid grid-cols-2"
      initial={{ opacity: 0 }}
      layout="preserve-aspect"
    >
      <div
        className="absolute -z-10 top-0 w-full h-full opacity-60 -mx-2"
        style={{
          boxShadow: "inset 0 0 16px 16px black",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${doll.img.artHalf})`,
        }}
      />
      <div className="flex flex-col items-center">
        <Label htmlFor={`${htmlId}-level`}>Level</Label>
        <NumberInput
          className="bg-background/80"
          id={`${htmlId}-level`}
          max={60}
          min={1}
          onRightFocus={() => vertRef.current?.focus()}
          onValueChange={setLevel}
          ref={levelRef}
          value={level}
        />
      </div>

      <div className="flex flex-col items-center">
        <Label htmlFor={`${htmlId}-vert`}>Fortification</Label>
        <NumberInput
          className="bg-background/80"
          id={`${htmlId}-vert`}
          max={6}
          min={0}
          onLeftFocus={() => levelRef.current?.focus()}
          onRightFocus={() => helixRef.current?.focus()}
          onValueChange={setVert}
          ref={vertRef}
          value={vert}
        />
      </div>

      <div className="flex flex-col items-center col-span-2">
        {/* TODO: horizontal slider with level cap */}
        <Label htmlFor={`${htmlId}-helix`}>Helix Node</Label>
        <NumberInput
          className="w-full bg-background/80"
          id={`${htmlId}-helix`}
          max={8}
          min={0}
          onLeftFocus={() => vertRef.current?.focus()}
          onValueChange={setHelix}
          ref={helixRef}
          value={helix}
        />
      </div>
    </motion.div>
  );
}

function useInput(slug: DollSlugEnum, type: "level" | "vert" | "helix") {
  const atom = useMemo(
    () =>
      focusAtom(dollAtomLookup(slug) as PrimitiveAtom<OwnedArmoryDoll>, (t) =>
        t.prop("data").prop(type)
      ),
    [slug, type]
  );
  return useAtom(atom);
}
