"use client";

import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { CalcObject } from "../../store";
import { HTMLAttributes, Ref, useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LevelInput } from "./LevelInput";
import { RemoveButton } from "./RemoveButton";
import { NameInput } from "./NameInput";
import { DOLL_META } from "@/repository/dolls";
import Image from "next/image";

export interface CalcAtom {
  atom: PrimitiveAtom<CalcObject>;
}

interface Prop extends CalcAtom, HTMLAttributes<HTMLDivElement> {
  index: number;
}
export function SingularCalcBox({
  atom,
  index,
  className,
  ref,
  ...props
}: Prop & { ref?: Ref<HTMLDivElement> }) {
  atom.debugLabel = `calcObject_${index}`;
  const name = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("name")), [atom]),
  );
  const find = DOLL_META.find((e) => e.name === name);

  return (
    <div className={cn("flex flex-col", className)} ref={ref} {...props}>
      <Card>
        <CardHeader className="flex flex-row items-center gap-1 space-y-0 p-2">
          <CalcTypeSelector atom={atom} />
          <RemoveButton atom={atom} />
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-2 pt-0">
          <NameInput atom={atom} index={index} />

          <div className="flex flex-1 gap-1">
            <LevelInput className="flex-1" mode="from" atom={atom} />
            <LevelInput className="flex-1" mode="to" atom={atom} />
          </div>

          {find?.img.chibi ? (
            <div className="flex flex-1 select-none items-center gap-1">
              <Image height={64} width={64} alt="pic" src={find.img.chibi} />
              <span className="flex-1 text-center">drag anchor</span>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function CalcTypeSelector({ atom }: CalcAtom) {
  const typeAtom = useMemo(
    () => focusAtom(atom, (optic) => optic.prop("calcType")),
    [atom],
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
