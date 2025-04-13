import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DOLL_SLUG_ENUM, WEAPON_SLUG_ENUM } from "@/repository/enums";
import { LayoutGroup } from "motion/react";
import type { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";
import { DollCard } from "./DollCard";
import { WeaponCard } from "./WeaponCard";

export const metadata: Metadata = {
  title: "Refitting Room",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<unknown>;
}) {
  const { tab } = z
    .object({ tab: z.enum(["doll", "wep"]).default("doll") })
    .default({ tab: "doll" })
    .parse(await searchParams);

  return (
    <Tabs defaultValue={tab}>
      <TabsList>
        <TabsTrigger asChild value="doll">
          <Link href="/refitting-room">Doll</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="wep">
          <Link href="/refitting-room?tab=wep">Wep</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="doll">
        <LayoutGroup>
          <div className="grid grid-cols-6 gap-2">
            {DOLL_SLUG_ENUM.options.map((slug) => (
              <DollCard key={slug} slug={slug} />
            ))}
          </div>
        </LayoutGroup>
      </TabsContent>
      <TabsContent value="wep">
        <LayoutGroup>
          <div className="grid grid-cols-6 gap-2">
            {WEAPON_SLUG_ENUM.options.map((slug) => (
              <WeaponCard key={slug} slug={slug} />
            ))}
          </div>
        </LayoutGroup>
      </TabsContent>
    </Tabs>
  );
}
