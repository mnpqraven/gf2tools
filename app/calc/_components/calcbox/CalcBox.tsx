"use client";

import { useAtom, useSetAtom } from "jotai";
import { ComponentPropsWithRef, useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RemoveButton } from "./RemoveButton";
import { NameInput } from "./NameInput";
import { SortableDragHandle } from "@/components/ui/sortable";
import { LevelInputRow } from "./LevelInputRow";
import { cn } from "@/lib/utils";
import { DragHandle } from "./DragHandle";
import { useCalcBox } from "./CalcBoxProvider";

export function CalcBox({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <Card {...props} className={cn("flex flex-col", className)}>
      <CardContent className="flex flex-1 flex-col gap-2 p-2">
        <div className="flex gap-1">
          <CalcTypeSelector />
          <RemoveButton />
        </div>

        <NameInput />

        <LevelInputRow />

        <SortableDragHandle
          asChild
          className="flex min-h-16 flex-1 cursor-move select-none items-center justify-between gap-1"
          variant="outline"
        >
          <DragHandle />
        </SortableDragHandle>
      </CardContent>
    </Card>
  );
}

function CalcTypeSelector() {
  const { atom } = useCalcBox();
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
