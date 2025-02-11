"use client";

import { useAtom, useAtomValue } from "jotai";
import { HTMLAttributes, Ref, useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LevelInput } from "./LevelInput";
import { RemoveButton } from "./RemoveButton";
import { NameInput } from "./NameInput";
import { DOLL_META } from "@/repository/dolls";
import Image from "next/image";
import { CalcAtomProps } from "../../store";
import { GripVertical } from "lucide-react";
import { SortableDragHandle } from "@/components/ui/sortable";
import { buttonVariants } from "@/components/ui/button";

interface Prop extends CalcAtomProps, HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
export function CalcBox({ atom, ref, ...props }: Prop) {
  const name = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("name")), [atom]),
  );
  // TODO: impl doll_id lookup
  const find = DOLL_META.find((e) => e.name === name);

  return (
    <Card {...props} ref={ref}>
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
          className={buttonVariants({
            className:
              "min-h-16 flex flex-1 cursor-move select-none items-center justify-evenly gap-1",
            variant: "outline",
          })}
        >
          {find?.img.chibi ? (
            <Image height={64} width={64} alt="pic" src={find.img.chibi} />
          ) : null}

          <GripVertical className="text-muted-foreground" />
        </SortableDragHandle>
      </CardContent>
    </Card>
  );
}

function CalcTypeSelector({ atom }: CalcAtomProps) {
  const typeAtom = useMemo(
    () => focusAtom(atom, (optic) => optic.prop("calcType")),
    [atom],
  );
  const [calcType, setCalcType] = useAtom(typeAtom);

  return (
    <Tabs
      value={calcType}
      onValueChange={(e) => setCalcType(e as unknown as "CHAR" | "WEP")}
    >
      <TabsList>
        <TabsTrigger value="CHAR">Character</TabsTrigger>
        <TabsTrigger value="WEP">Weapon</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
