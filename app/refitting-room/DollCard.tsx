"use client";

import { DOLL_META } from "@/repository/dolls";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DollSlugEnum } from "@/repository/enums";
import { dollAtomLookup, toggleDollOwnershipAtom } from "./stores/doll";
import { DollInfoForm } from "./DollInfoForm";
import { Toggle } from "@/components/ui/toggle";

export function DollCard({ slug }: { slug: DollSlugEnum }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const dollAtom = dollAtomLookup(slug);
  dollAtom.debugLabel = `${slug}_ownership`;

  const settings = useAtomValue(dollAtom);
  const doll = DOLL_META.find((e) => e.id === slug)!; // safe assertion
  const toggleOwnership = useSetAtom(toggleDollOwnershipAtom(slug));

  function onOwnedToggle(to: boolean) {
    setDetailOpen(to);
    toggleOwnership();
  }

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
      <motion.div className="flex flex-col gap-1" layout="position">
        <div className="flex items-center gap-1">
          <Image
            alt={doll.name}
            // TODO: rarity border
            className="h-16 w-16 rounded-md border"
            height={128}
            src={doll.img.artFace ?? ""}
            width={128}
          />

          {/* TODO: role icon */}
          <span>{doll.name}</span>
        </div>

        <div className="grld-cols-2 grid grid-flow-col gap-1">
          <Toggle
            onPressedChange={onOwnedToggle}
            pressed={settings.owned}
            variant="outline"
          >
            Owned
          </Toggle>

          <Toggle
            disabled={!settings.owned}
            onPressedChange={setDetailOpen}
            pressed={detailOpen}
            variant="outline"
          >
            <ChevronsUpDown />
          </Toggle>
        </div>
      </motion.div>

      {detailOpen ? <DollInfoForm slug={slug} /> : null}
    </motion.div>
  );
}
