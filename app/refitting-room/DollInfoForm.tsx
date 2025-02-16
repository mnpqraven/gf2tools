import { useAtom, useAtomValue } from "jotai";
import { ComponentPropsWithRef, useId, useMemo, useRef } from "react";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/shared/NumberInput";
import { DollSlugEnum } from "@/repository/enums";
import {
  dollHelixAtom,
  dollKeyAtom,
  dollLevelAtom,
  vertAtom,
} from "./stores/doll";
import { motion } from "motion/react";
import { byLevelCapKey, DOLL_META } from "@/repository/dolls";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, range } from "@/lib/utils";

export function DollInfoForm({ slug }: { slug: DollSlugEnum }) {
  const [level, setLevel] = useAtom(dollLevelAtom(slug));
  // const [vert, setVert] = useVert(slug);
  const [vert, setVert] = useAtom(vertAtom(slug));
  const [helix, setHelix] = useAtom(useMemo(() => dollHelixAtom(slug), [slug]));
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
      className="relative grid flex-1 grid-cols-2"
      initial={{ opacity: 0 }}
      layout="preserve-aspect"
    >
      <div
        className="absolute top-0 -z-10 h-full w-full opacity-20 shadow-[inset_0_0_16px_16px_hsl(var(--background))]"
        style={{
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
          onRightFocus={() => helixRef.current?.focus()}
          onValueChange={setLevel}
          ref={levelRef}
          value={level}
        />

        <Slider
          className="col-span-2 mt-2 data-[orientation=vertical]:h-32"
          max={60}
          onValueChange={([num]) => setLevel(num)}
          orientation="vertical"
          step={1}
          value={[level]}
        />
      </div>
      {/* TODO: jotai effect */}
      <div className="flex flex-col items-center">
        <Label htmlFor={`${htmlId}-helix`}>Helix</Label>
        <NumberInput
          className="bg-background/80"
          id={`${htmlId}-helix`}
          max={6}
          min={0}
          onLeftFocus={() => levelRef.current?.focus()}
          onRightFocus={() => vertRef.current?.focus()}
          onValueChange={setHelix}
          ref={helixRef}
          step={1}
          value={helix}
        />
        <Slider
          className="col-span-2 mt-2 data-[orientation=vertical]:h-32"
          max={6}
          onValueChange={([num]) => setHelix(num)}
          orientation="vertical"
          step={1}
          value={[helix]}
        />
      </div>
      <div className="col-span-2 flex flex-col items-center">
        <Label htmlFor={`${htmlId}-vert`}>Fortification</Label>
        <NumberInput
          className="w-full bg-background/80"
          id={`${htmlId}-vert`}
          max={6}
          min={0}
          onLeftFocus={() => helixRef.current?.focus()}
          onValueChange={setVert}
          ref={vertRef}
          value={vert}
        />
      </div>
      <KeyInput slug={slug} />
    </motion.div>
  );
}

function KeyInput({
  slug,
  className,
  ...props
}: ComponentPropsWithRef<"div"> & { slug: DollSlugEnum }) {
  const [keys, toggleKey] = useAtom(dollKeyAtom(slug));
  const level = useAtomValue(dollLevelAtom(slug));

  return (
    <div
      className={cn("col-span-2 grid grid-flow-col grid-rows-2", className)}
      {...props}
    >
      {Array.from(range(0, 5)).map((i) => (
        <Checkbox
          checked={keys[i]}
          disabled={byLevelCapKey(level) < i}
          key={i}
          onCheckedChange={(to) => {
            if (typeof to === "boolean")
              toggleKey({
                index: i,
                value: to,
              });
          }}
        />
      ))}
    </div>
  );
}
