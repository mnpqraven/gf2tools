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
    <div className="flex border rounded-md gap-1 p-2 items-center">
      <Image
        alt="head"
        className="w-16 h-16"
        height={128}
        src={doll.img.artFace ?? ""}
        width={128}
      />
      <div className="flex flex-col gap-1">
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
              else setSettings((prev) => ({ ...prev, owned }));
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
        {detailOpen ? (
          <ExpandedDollContainer
            // safe cast
            atom={atom as PrimitiveAtom<OwnedArmoryDoll>}
          />
        ) : null}
      </div>
    </div>
  );
}
