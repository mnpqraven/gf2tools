import { AssetIcon } from "@/components/AssetIcon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { weaponClassEnum, wepClassAssetEnum } from "@/repository/wep";
import { cva } from "class-variance-authority";
import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { type ComponentPropsWithRef, useMemo } from "react";
import {
  filterWeaponClassAtom,
  filterWeaponRarityAtom,
  weaponFilterAtom,
} from "./wepSelectorStore";

/**
 * TODO: pretty print
 */
export function WeaponFilter({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  const [search, setSearch] = useAtom(
    useMemo(() => focusAtom(weaponFilterAtom, (t) => t.prop("search")), []),
  );
  const [weaponClasses, toggleWeaponClass] = useAtom(filterWeaponClassAtom);
  const [weaponRarities, toggleWeaponRarity] = useAtom(filterWeaponRarityAtom);
  const rarityVariant = cva("", {
    variants: {
      rarity: {
        3: "text-rarity-blue data-[state=on]:text-rarity-blue",
        4: "text-rarity-purple data-[state=on]:text-rarity-purple",
        5: "text-rarity-orange data-[state=on]:text-rarity-orange",
      },
    },
  });
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search by name, signature doll or model"
        value={search}
      />

      <div className="flex items-center gap-2 rounded-md border bg-background/70 p-1 backdrop-blur-md">
        {weaponClassEnum.options.map((weaponClass) => (
          <Toggle
            className="flex items-center gap-1"
            key={weaponClass}
            onPressedChange={() => {
              toggleWeaponClass(weaponClass);
            }}
            pressed={weaponClasses.includes(weaponClass)}
          >
            <AssetIcon
              asset={wepClassAssetEnum(weaponClass)}
              className="h-6 w-6 rounded-full bg-primary dark:bg-transparent"
            />
            {weaponClass}
          </Toggle>
        ))}
        <Separator orientation="vertical" />
        Rarity
        {[5, 4, 3].map((weaponRarity) => (
          <Toggle
            className={rarityVariant({ rarity: weaponRarity as 3 | 4 | 5 })}
            key={weaponRarity}
            onPressedChange={() => {
              toggleWeaponRarity(weaponRarity);
            }}
            pressed={weaponRarities.includes(weaponRarity)}
          >
            {weaponRarity} *
          </Toggle>
        ))}
      </div>
    </div>
  );
}
