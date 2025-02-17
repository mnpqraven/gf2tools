"use client";

import { AssetIcon } from "@/components/AssetIcon";
import { NumberInput } from "@/components/shared/NumberInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { WeaponSlugEnum } from "@/repository/enums";

interface Props {
  slug: WeaponSlugEnum;
}
export function WeaponCard({ slug }: Props) {
  return (
    <div className="flex flex-col gap-1 rounded-md border p-2">
      <div className="flex items-center gap-1">
        <span className="h-16 w-16 rounded-md border">image</span>
        <span>{slug}</span>
        <AssetIcon
          asset="WEP_CLASS_AR"
          className="ml-auto h-6 w-6 rounded-full bg-primary dark:bg-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-1">
        <Toggle variant="outline">Owned</Toggle>
        <Toggle variant="outline">+-</Toggle>
      </div>

      <Label>Level</Label>
      <Slider />

      Rank
      <div className="grid grid-cols-2 gap-1">
        <NumberInput
          className="row-span-2 w-full h-full"
          max={6}
          min={1}
          onValueChange={() => {}}
          value={0}
        />
        <Button className="h-auto p-1">max</Button>
        <Button className="h-auto p-1">min</Button>
      </div>
    </div>
  );
}
