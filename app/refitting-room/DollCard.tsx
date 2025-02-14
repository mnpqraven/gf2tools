"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DOLL_META } from "@/repository/dolls";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DollSlugEnum } from "@/repository/enums";
import { dollAtomLookup, toggleDollOwnershipAtom } from "./store";
import { ExpandedDollContainer } from "./ExpandedDollContainer";

export function DollCard({ slug }: { slug: DollSlugEnum }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const settings = useAtomValue(dollAtomLookup(slug));
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
        <div className="h-16 w-16">
          <Image
            alt="head"
            height={128}
            src={doll.img.artFace ?? ""}
            width={128}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span>{doll.name}</span>

          <div className="flex flex-1 items-center justify-between">
            <Label htmlFor={`owned-${doll.id}`}>Owned</Label>
            <Switch
              checked={settings.owned}
              id={`owned-${doll.id}`}
              onCheckedChange={toggleOwnership}
            />
          </div>

          <Button
            className="h-auto py-2"
            disabled={!settings.owned}
            onClick={() => setDetailOpen((e) => !e)}
            variant="outline"
          >
            <ChevronsUpDown />
          </Button>
        </div>
      </motion.div>

      {detailOpen ? (
        <motion.div
          // better off to not deal with AnimatePresence's hassle here
          // using layout here fucks up the grid shifts
          animate={{ opacity: 1 }}
          className="flex"
          initial={{ opacity: 0 }}
          layout="preserve-aspect"
        >
          <ExpandedDollContainer slug={slug} />
        </motion.div>
      ) : null}
    </motion.div>
  );
}
