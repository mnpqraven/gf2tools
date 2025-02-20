"use client";

import { DOLL_META } from "@/repository/dolls";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { ChevronDown, ChevronUp, CircleCheck } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DollSlugEnum } from "@/repository/enums";
import {
  dollAtomLookup,
  dollExpandedAtom,
  toggleDollOwnershipAtom,
} from "./stores/doll";
import { DollInfoForm } from "./DollInfoForm";
import { Toggle } from "@/components/ui/toggle";

export function DollCard({ slug }: { slug: DollSlugEnum }) {
  const [detailOpen, setDetailOpen] = useAtom(dollExpandedAtom(slug));
  const dollAtom = dollAtomLookup(slug);
  dollAtom.debugLabel = `${slug}_ownership`;

  const settings = useAtomValue(dollAtom);
  const doll = DOLL_META.find((e) => e.id === slug)!; // safe assertion
  const toggleOwnership = useSetAtom(toggleDollOwnershipAtom(slug));

  return (
    <motion.div
      // no layout disables animations but works with moving child
      className={cn(
        "flex flex-col gap-1 rounded-md border p-2",
        detailOpen ? "row-span-2" : "",
      )}
      key={doll.id}
      style={{ borderRadius: 6 }}
    >
      <motion.div className="flex items-center gap-1" layout="position">
        <Image
          alt={doll.name}
          // TODO: rarity border
          className={cn(
            "h-16 w-16 rounded-md border-2",
            doll.rarity === "ELITE"
              ? "border-rarity-orange"
              : "border-rarity-purple",
          )}
          height={128}
          src={doll.img.artFace ?? ""}
          width={128}
        />

        {/* TODO: role icon */}
        <span>{doll.name}</span>
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-1" layout="position">
        <Toggle
          onPressedChange={toggleOwnership}
          pressed={settings.owned}
          variant={settings.owned ? "success" : "outline"}
        >
          {settings.owned ? <CircleCheck /> : null}
          Owned
        </Toggle>

        <Toggle
          disabled={!settings.owned}
          onPressedChange={setDetailOpen}
          pressed={detailOpen}
          variant="outline"
        >
          {detailOpen ? <ChevronUp /> : <ChevronDown />}
        </Toggle>
      </motion.div>

      {detailOpen ? <DollInfoForm slug={slug} /> : null}
    </motion.div>
  );
}
