import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DOLL_META } from "@/repository/dolls";
import { PrimitiveAtom, useAtom } from "jotai";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { MaybeOwnedArmoryDoll, OwnedArmoryDoll } from "./types";
import { ExpandedDollContainer } from "./ExpandedDollContainer";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function DollCard({
  atom,
}: {
  atom: PrimitiveAtom<MaybeOwnedArmoryDoll>;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [settings, setSettings] = useAtom(atom);
  const doll = DOLL_META.find((e) => e.id === settings.slug);

  if (!doll) {
    console.error(
      "undefined doll in find fn, this should not happen, debug dollcard.tsx"
    );
    return null;
  }

  return (
    <motion.div
      // no layout disables animations but works with moving child
      className={cn(
        "flex flex-col border rounded-md gap-1 p-2",
        detailOpen ? "row-span-2" : ""
      )}
      key={doll.id}
      style={{ borderRadius: 6 }}
    >
      <motion.div className="flex gap-1 items-center" layout="position">
        <div className="w-16 h-16">
          <Image
            alt="head"
            height={128}
            src={doll.img.artFace ?? ""}
            width={128}
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span>{doll.name}</span>

          <div className="flex flex-1 justify-between items-center">
            <Label htmlFor={`owned-${doll.id}`}>Owned</Label>
            <Switch
              checked={settings.owned}
              id={`owned-${doll.id}`}
              onCheckedChange={(owned) => {
                if (owned)
                  setSettings((prev) => ({
                    ...prev,
                    owned,
                    data: { level: 1, vert: 0 },
                  }));
                else {
                  setSettings((prev) => ({ ...prev, owned }));
                  setDetailOpen(false);
                }
              }}
            />
          </div>

          <Button
            className="py-2 h-auto"
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
          <ExpandedDollContainer
            // safe cast
            atom={atom as PrimitiveAtom<OwnedArmoryDoll>}
          />
        </motion.div>
      ) : null}
    </motion.div>
  );
}
