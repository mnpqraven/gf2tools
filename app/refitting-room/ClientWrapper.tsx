"use client";

import { DollCard } from "./DollCard";
import { useAtomValue } from "jotai";
import { armoryDollOwnSplittedAtom } from "./store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGroup } from "motion/react";

export function ClientWrapper() {
  const atoms = useAtomValue(armoryDollOwnSplittedAtom);

  return (
    <Tabs defaultValue="DOLL">
      <TabsList>
        <TabsTrigger value="DOLL">Doll</TabsTrigger>
        <TabsTrigger value="WEP">Wep</TabsTrigger>
      </TabsList>
      <TabsContent value="DOLL">
        <LayoutGroup>
          <div className="grid grid-cols-6 gap-2">
            {atoms.map((atom) => (
              <DollCard atom={atom} key={`${atom}`} />
            ))}
          </div>
        </LayoutGroup>
      </TabsContent>
    </Tabs>
  );
}
