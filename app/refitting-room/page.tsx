import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGroup } from "motion/react";
import { DollCard } from "./DollCard";
import { DOLL_SLUG_ENUM } from "@/repository/enums";

export const metadata: Metadata = {
  title: "Refitting Room",
};

export default async function Page() {
  // TODO: filter, group by

  return (
    <Tabs defaultValue="DOLL">
      <TabsList>
        <TabsTrigger value="DOLL">Doll</TabsTrigger>
        <TabsTrigger value="WEP">Wep</TabsTrigger>
      </TabsList>
      <TabsContent value="DOLL">
        <LayoutGroup>
          <div className="grid grid-cols-6 gap-2">
            {DOLL_SLUG_ENUM.options.map((slug) => (
              <DollCard key={slug} slug={slug} />
            ))}
          </div>
        </LayoutGroup>
      </TabsContent>
    </Tabs>
  );
}
