import * as O from "optics-ts";
import { Input } from "@/components/ui/input";
import { useTeamPreset } from "./TeamPresetProvider";
import { useAtom, useSetAtom } from "jotai";
import { range } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { teamListSplittedAtom, teamPresetDollOptic } from "../../store";
import { TeamSizeRadio } from "./TeamSizeRadio";
import { DollSelectDrawerSheet } from "./DollSelectDrawerSheet";
import { useId } from "react";
import { Label } from "@/components/ui/label";

export function TeamPresetForm() {
  const inputId = useId();
  const { atom } = useTeamPreset();
  const [value, setValue] = useAtom(atom);
  const listDispatch = useSetAtom(teamListSplittedAtom);

  function onNameChange(name: string) {
    setValue((e) => ({ ...e, name }));
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border p-2">
      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={inputId}>Name</Label>
          <Input
            className="w-fit"
            id={inputId}
            onChange={(e) => onNameChange(e.target.value)}
            value={value.name}
          />
        </div>

        <TeamSizeRadio />

        <Button
          onClick={() => listDispatch({ type: "remove", atom })}
          size="icon"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>

      <div className="flex gap-2">
        {Array.from(range(0, value.teamSize - 1)).map((slot) => (
          <DollSelectDrawerSheet
            doll={value.slots.at(slot)}
            key={slot}
            onDollChange={(id) => {
              const scope = teamPresetDollOptic(slot);
              setValue(O.set(scope)(id));
            }}
            shouldDisable={(slug) => value.slots.includes(slug)}
          />
        ))}
      </div>
    </div>
  );
}
