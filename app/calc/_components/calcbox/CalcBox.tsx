// TODO:
"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ComponentPropsWithRef, useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RemoveButton } from "./RemoveButton";
import { NameInput } from "./NameInput";
import { DOLL_META, DollMeta } from "@/repository/dolls";
import Image from "next/image";
import { CalcAtomProps } from "../../store";
import { GripVertical } from "lucide-react";
import { SortableDragHandle } from "@/components/ui/sortable";
import { Button, ButtonProps } from "@/components/ui/button";
import { WeaponMeta, WEP_META } from "@/repository/wep";
import { LevelInputRow } from "./LevelInputRow";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export function CalcBox({
  atom,
  className,
  ...props
}: CalcAtomProps & ComponentPropsWithRef<"div">) {
  return (
    <Card {...props} className={cn("flex flex-col", className)}>
      <CardContent className="flex flex-1 flex-col gap-2 p-2">
        <div className="flex gap-1">
          <CalcTypeSelector atom={atom} />
          <RemoveButton atom={atom} />
        </div>

        <NameInput atom={atom} />

        <LevelInputRow atom={atom} />

        <SortableDragHandle
          asChild
          className="flex min-h-16 flex-1 cursor-move select-none items-center justify-around gap-1"
          variant="outline"
        >
          <DragHandle atom={atom} />
        </SortableDragHandle>
      </CardContent>
    </Card>
  );
}

function DragHandle({ atom, ...props }: CalcAtomProps & ButtonProps) {
  const dollOrWepSlug = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("id")), [atom]),
  );
  const calcType = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("calcType")), [atom]),
  );
  const _find = (calcType === "CHAR" ? DOLL_META : WEP_META).find(
    (e) => e.id === dollOrWepSlug,
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
      <GripVertical className="text-muted-foreground" />
    </Button>
  );
}

function CalcTypeSelector({ atom }: CalcAtomProps) {
  const typeAtom = useMemo(
    () => focusAtom(atom, (optic) => optic.prop("calcType")),
    [atom],
  );
  const setName = useSetAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("name")), [atom]),
  );
  const setId = useSetAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("id")), [atom]),
  );
  const [calcType, setCalcType] = useAtom(typeAtom);

  return (
    <Tabs
      onValueChange={(e) => {
        setCalcType(e as unknown as "CHAR" | "WEP");
        setName("");
        setId(undefined);
      }}
      value={calcType}
    >
      <TabsList>
        <TabsTrigger value="CHAR">Character</TabsTrigger>
        <TabsTrigger value="WEP">Weapon</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
