import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExportButton } from "./ExportButton";
import { NewButton } from "./_editor/NewButton";
import { TeamList } from "./_editor/TeamList";
import { PresetCard } from "./_card/PresetCard";

export const metadata: Metadata = {
  title: "Team Presets",
  description: "Team Presets",
};

export default function Page() {
  return (
    <Tabs defaultValue="editor">
      <TabsList>
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="card">Card</TabsTrigger>
      </TabsList>
      <TabsContent className="flex flex-col gap-4" value="editor">
        <NewButton className="w-fit">New Team</NewButton>
        <TeamList />
      </TabsContent>
      <TabsContent className="flex flex-col gap-4" value="card">
        <div className="flex gap-2">
          <ExportButton mode="DOWNLOAD" size="icon" />
          <ExportButton mode="CLIPBOARD" size="icon" />
        </div>
        <PresetCard />
      </TabsContent>
    </Tabs>
  );
}
