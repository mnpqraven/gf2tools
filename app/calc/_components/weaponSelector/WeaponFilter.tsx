import { useAtom } from "jotai";
import {
  filterWeaponClassAtom,
  filterWeaponRarityAtom,
  weaponFilterAtom,
} from "./wepSelectorStore";
import { weaponClassEnum } from "@/repository/wep";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { focusAtom } from "jotai-optics";
import { ComponentPropsWithRef, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />

      <div className="flex gap-2">
        {weaponClassEnum.options.map((weaponClass) => (
          <Toggle
            key={weaponClass}
            onPressedChange={() => {
              toggleWeaponClass(weaponClass);
            }}
            pressed={weaponClasses.includes(weaponClass)}
          >
            {weaponClass}
          </Toggle>
        ))}

        <Separator orientation="vertical" />

        {[3, 4, 5].map((weaponRarity) => (
          <Toggle
            key={weaponRarity}
            onPressedChange={() => {
              toggleWeaponRarity(weaponRarity);
            }}
            pressed={weaponRarities.includes(weaponRarity)}
          >
            {weaponRarity}
          </Toggle>
        ))}
      </div>
    </div>
  );
}
