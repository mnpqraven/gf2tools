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
import { byLevelCapHelix, byLevelCapKey, DOLL_META } from "@/repository/dolls";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, range } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight, CircleCheck } from "lucide-react";
import { AddToPlannerButton } from "./AddToPlannerButton";
import { inCalcAtom } from "../calc/store";

export function DollInfoForm({ slug }: { slug: DollSlugEnum }) {
  const [level, setLevel] = useAtom(dollLevelAtom(slug));
  // const [vert, setVert] = useVert(slug);
  const [vert, setVert] = useAtom(vertAtom(slug));
  const [helix, setHelix] = useAtom(useMemo(() => dollHelixAtom(slug), [slug]));
  const htmlId = useId();
  const doll = DOLL_META.find((e) => e.id === slug)!; // safe assertion
  const inCalc = useAtomValue(inCalcAtom(slug));

  const levelRef = useRef<HTMLInputElement>(null);
  const vertRef = useRef<HTMLInputElement>(null);
  const helixRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      // better off to not deal with AnimatePresence's hassle here
      // using layout here fucks up the grid shifts
      animate={{ opacity: 1 }}
      className="relative flex-1 flex flex-col gap-1"
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

      <Label htmlFor={`${htmlId}-level`}>Level</Label>
      <div className="flex gap-2 items-center justify-center">
        <Button className="px-2" onClick={() => setLevel(1)} variant="outline">
          <ChevronsLeft />
        </Button>
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
        <Button className="px-2" onClick={() => setLevel(60)} variant="outline">
          <ChevronsRight />
        </Button>
      </div>

      {/* TODO: jotai effect */}

      <Label htmlFor={`${htmlId}-helix`}>Helix</Label>
      <div className="flex gap-2 items-center justify-center">
        <Button className="px-2" onClick={() => setHelix(0)} variant="outline">
          <ChevronsLeft />
        </Button>
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
        <Button
          className="px-2"
          onClick={() => setHelix(byLevelCapHelix(level))}
          variant="outline"
        >
          <ChevronsRight />
        </Button>
      </div>

      <Label htmlFor={`${htmlId}-vert`}>Fortification</Label>
      <div className="flex gap-2 items-center justify-center">
        <Button className="px-2" onClick={() => setVert(0)} variant="outline">
          <ChevronsLeft />
        </Button>
        <NumberInput
          className="bg-background/80"
          id={`${htmlId}-vert`}
          max={6}
          min={0}
          onLeftFocus={() => helixRef.current?.focus()}
          onValueChange={setVert}
          ref={vertRef}
          value={vert}
        />
        <Button className="px-2" onClick={() => setVert(6)} variant="outline">
          <ChevronsRight />
        </Button>
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <Label className="flex justify-center col-span-2">Keys</Label>
        <KeyInput slug={slug} />
      </div>

      <AddToPlannerButton
        className="mt-2"
        slug={{ type: "CHAR", slug }}
        variant={inCalc ? "success" : "default"}
      >
        {inCalc ? <CircleCheck /> : null}
        {inCalc ? "In planner" : "Add to planner"}
      </AddToPlannerButton>
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
      className={cn(
        "col-span-2 grid grid-flow-col grid-rows-2 gap-y-1",
        className,
      )}
      {...props}
    >
      {Array.from(range(0, 5)).map((i) => (
        <div className="w-full flex items-center justify-center" key={i}>
          <Checkbox
            checked={keys[i]}
            disabled={byLevelCapKey(level) < i}
            onCheckedChange={(to) => {
              if (typeof to === "boolean") toggleKey({ index: i, value: to });
            }}
          />
        </div>
      ))}
    </div>
  );
}
