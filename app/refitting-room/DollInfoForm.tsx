import { NumberInput } from "@/components/shared/NumberInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn, range, rarityVariants } from "@/lib/utils";
import { DOLL_META, byLevelCapHelix, byLevelCapKey } from "@/repository/dolls";
import type { DollSlugEnum } from "@/repository/enums";
import { useAtom, useAtomValue } from "jotai";
import { ChevronsLeft, ChevronsRight, CircleCheck } from "lucide-react";
import { motion } from "motion/react";
import { type ComponentPropsWithRef, useId, useMemo, useRef } from "react";
import { inCalcAtom } from "../calc/store";
import { AddToPlannerButton } from "./AddToPlannerButton";
import {
  dollHelixAtom,
  dollKeyAtom,
  dollLevelAtom,
  vertAtom,
} from "./stores/doll";

export function DollInfoForm({ slug }: { slug: DollSlugEnum }) {
  const [level, setLevel] = useAtom(dollLevelAtom(slug));
  // const [vert, setVert] = useVert(slug);
  const [vert, setVert] = useAtom(vertAtom(slug));
  const [helix, setHelix] = useAtom(useMemo(() => dollHelixAtom(slug), [slug]));
  const htmlId = useId();
  const inCalc = useAtomValue(inCalcAtom(slug));

  const levelRef = useRef<HTMLInputElement>(null);
  const vertRef = useRef<HTMLInputElement>(null);
  const helixRef = useRef<HTMLInputElement>(null);

  const doll = DOLL_META.find((e) => e.id === slug); // safe assertion

  if (!doll) return null;

  return (
    <motion.div
      // better off to not deal with AnimatePresence's hassle here
      // using layout here fucks up the grid shifts
      animate={{ opacity: 1 }}
      className="relative flex flex-1 flex-col gap-1"
      initial={{ opacity: 0 }}
      layout="preserve-aspect">
      <div
        className="-z-10 absolute top-0 h-full w-full opacity-20 shadow-[inset_0_0_16px_16px_hsl(var(--background))]"
        style={{
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${doll.img.artHalf})`,
        }}
      />

      <Label htmlFor={`${htmlId}-level`}>Level</Label>
      <div className="flex items-center justify-center gap-2">
        <Button className="px-2" onClick={() => setLevel(1)} variant="outline">
          <ChevronsLeft />
        </Button>
        <NumberInput
          className={rarityVariants({
            className: "bg-background/80",
            text: level === 60 ? 5 : undefined,
          })}
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
      <div className="flex items-center justify-center gap-2">
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
          variant="outline">
          <ChevronsRight />
        </Button>
      </div>

      <Label htmlFor={`${htmlId}-vert`}>Fortification</Label>
      <div className="flex items-center justify-center gap-2">
        <Button className="px-2" onClick={() => setVert(0)} variant="outline">
          <ChevronsLeft />
        </Button>
        <NumberInput
          className={rarityVariants({
            className: "bg-background/80",
            text: vert === 6 ? 5 : undefined,
          })}
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

      <div className="flex flex-1 flex-col gap-1">
        <Label className="col-span-2 flex justify-center">Keys</Label>
        <KeyInput slug={slug} />
      </div>

      <AddToPlannerButton
        className="mt-2"
        currentLevel={level}
        slug={{ type: "CHAR", slug }}
        variant={inCalc ? "success" : "default"}>
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
      {...props}>
      {Array.from(range(0, 5)).map((i) => (
        <div className="flex w-full items-center justify-center" key={i}>
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
