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
import { CalcAtom } from "./SortableCalcBox";
import { DragHandle } from "@/lib/utils";

interface Prop extends CalcAtom, HTMLAttributes<HTMLDivElement>, DragHandle {
  index: number;
  ref?: Ref<HTMLDivElement>;
}
export function CalcBox({ atom, index, dragHandle, ref, ...props }: Prop) {
  atom.debugLabel = `calcObject_${index}`;
  const name = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("name")), [atom])
  );
  const find = DOLL_META.find((e) => e.name === name);

  return (
    <Card {...props} ref={ref}>
      <CardHeader className="flex flex-row items-center gap-1 space-y-0 p-2">
        <CalcTypeSelector atom={atom} />
        <RemoveButton index={index} />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2 pt-0">
        <NameInput atom={atom} index={index} />

        <div className="flex flex-1 gap-1">
          <LevelInput className="flex-1" mode="from" atom={atom} />
          <LevelInput className="flex-1" mode="to" atom={atom} />
        </div>

        <div
          {...dragHandle}
          className="flex flex-1 select-none items-center gap-1 min-h-16"
        >
          {find?.img.chibi ? (
            <Image height={64} width={64} alt="pic" src={find.img.chibi} />
          ) : null}
          <span className="flex-1 text-center text-xs">Drag me!</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CalcTypeSelector({ atom }: CalcAtom) {
  const typeAtom = useMemo(
    () => focusAtom(atom, (optic) => optic.prop("calcType")),
    [atom]
  );
  typeAtom.debugLabel = `${atom.debugLabel}_calcType`;
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
