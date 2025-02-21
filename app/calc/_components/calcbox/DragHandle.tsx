import { DOLL_META, DollMeta } from "@/repository/dolls";
import Image from "next/image";
import { Button, ButtonProps } from "@/components/ui/button";
import { WeaponMeta, WEP_META } from "@/repository/wep";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";
import { useCalcBox } from "./CalcBoxProvider";

export function DragHandle({ ...props }: ButtonProps) {
  const { atom } = useCalcBox();
  const dollOrWepSlug = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("id")), [atom]),
  );
  const calcType = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("calcType")), [atom]),
  );
  const maybeCustomName = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("name")), [atom]),
  );
  const _find = (calcType === "CHAR" ? DOLL_META : WEP_META).find((e) =>
    "slug" in e ? e.slug === dollOrWepSlug : e.id === dollOrWepSlug,
  );

  if (calcType === "CHAR") {
    const find = _find as DollMeta | undefined;
    const src = find?.img.chibi;
    return (
      <Button {...props}>
        {src ? (
          <Image
            alt="pic"
            className={cn(
              "rounded-md border",
              find.rarity === "ELITE"
                ? "border-rarity-orange"
                : "border-rarity-purple",
            )}
            height={64}
            src={src}
            width={64}
          />
        ) : null}
        <span className="text-primary">{_find?.name ?? maybeCustomName}</span>
        <GripVertical className="text-muted-foreground" />
      </Button>
    );
  }

  const find = _find as WeaponMeta | undefined;
  const src = find?.img;
  const variants = cva("rounded-md border", {
    variants: {
      rarity: {
        3: "border-rarity-blue",
        4: "border-rarity-purple",
        5: "border-rarity-orange",
      },
    },
  });

  return (
    <Button {...props}>
      {src ? (
        <Image
          alt="pic"
          className={variants({ rarity: find.rarity as 3 | 4 | 5 })}
          height={64}
          src={src}
          width={64}
        />
      ) : null}
      <span className="text-primary">{find?.name ?? maybeCustomName}</span>
      <GripVertical className="text-muted-foreground" />
    </Button>
  );
}
