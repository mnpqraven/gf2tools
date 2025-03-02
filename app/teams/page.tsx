import { Metadata } from "next";
import { NewButton } from "./NewButton";
import { TeamList } from "./TeamList";

export const metadata: Metadata = {
  title: "Team Presets",
  description: "Team Presets",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <NewButton>New Team</NewButton>

      <TeamList />
    </div>
  );
}
