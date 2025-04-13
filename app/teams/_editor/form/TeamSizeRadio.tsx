import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSetAtom } from "jotai";
import { type ComponentPropsWithRef, useId } from "react";
import { defaultTeamPreset } from "../../store";
import { useTeamPreset } from "./TeamPresetProvider";

export function TeamSizeRadio(props: ComponentPropsWithRef<typeof RadioGroup>) {
  const radioId = useId();
  const { atom } = useTeamPreset();
  const setValue = useSetAtom(atom);

  function onSizeChange(sizeStr: string) {
    setValue((e) => ({ ...e, teamSize: Number(sizeStr) }));
  }

  return (
    <RadioGroup
      defaultValue={defaultTeamPreset.teamSize.toString()}
      onValueChange={onSizeChange}
      {...props}>
      <Label>Team size</Label>
      <div className="flex gap-2">
        <div>
          <RadioGroupItem
            aria-label="4"
            className="peer sr-only"
            id={`${radioId}-option-one`}
            value="4"
          />
          <Label
            className="flex h-10 items-center justify-between rounded-md border-2 border-muted bg-transparent px-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            htmlFor={`${radioId}-option-one`}>
            4
          </Label>
        </div>
        <div>
          <RadioGroupItem
            aria-label="5"
            className="peer sr-only"
            id={`${radioId}-option-two`}
            value="5"
          />
          <Label
            className="flex h-10 items-center justify-between rounded-md border-2 border-muted bg-transparent px-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            htmlFor={`${radioId}-option-two`}>
            5
          </Label>
        </div>
      </div>
    </RadioGroup>
  );
}
