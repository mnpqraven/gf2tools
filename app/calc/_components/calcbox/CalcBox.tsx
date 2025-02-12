"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ComponentPropsWithRef, useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LevelInput } from "./LevelInput";
import { RemoveButton } from "./RemoveButton";
import { NameInput } from "./NameInput";
import { DOLL_META, DollMeta } from "@/repository/dolls";
import Image from "next/image";
import { CalcAtomProps } from "../../store";
import { GripVertical } from "lucide-react";
import { SortableDragHandle } from "@/components/ui/sortable";
import { Button, ButtonProps } from "@/components/ui/button";
import { WeaponMeta, WEP_META } from "@/repository/wep";

export function CalcBox({
  atom,
  ...props
}: CalcAtomProps & ComponentPropsWithRef<"div">) {
  return (
    <Card {...props}>
      <CardHeader className="flex flex-row items-center gap-1 space-y-0 p-2">
        <CalcTypeSelector atom={atom} />
        <RemoveButton atom={atom} />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2 pt-0">
        <NameInput atom={atom} />

        <div className="flex flex-1 gap-1">
          <LevelInput className="flex-1" mode="from" atom={atom} />
          <LevelInput className="flex-1" mode="to" atom={atom} />
        </div>

        <SortableDragHandle
          asChild
          variant="outline"
          className="min-h-16 flex flex-1 cursor-move select-none items-center justify-around gap-1"
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
  const _find =
    calcType === "CHAR"
      ? DOLL_META.find((e) => e.id === dollOrWepSlug)
      : WEP_META.find((e) => e.id === dollOrWepSlug);
  const imgsrc =
    calcType === "CHAR"
      ? (_find as DollMeta | undefined)?.img.chibi
      : (_find as WeaponMeta | undefined)?.img;

  return (
    <Button {...props}>
      {imgsrc ? <Image height={64} width={64} alt="pic" src={imgsrc} /> : null}
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
      value={calcType}
      onValueChange={(e) => {
        setCalcType(e as unknown as "CHAR" | "WEP");
        setName("");
        setId(undefined);
      }}
    >
      <TabsList>
        <TabsTrigger value="CHAR">Character</TabsTrigger>
        <TabsTrigger value="WEP">Weapon</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
