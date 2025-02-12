import { ComponentPropsWithRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  WeaponClass,
  weaponClassEnum,
  WeaponMeta,
  WEP_META,
} from "@/repository/wep";
import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { weaponFilterAtom } from "./wepSelectorStore";
import { useFilteredWeapons } from "./useFilteredWeapons";
import { WeaponFilter } from "./WeaponFilter";

interface Props extends ComponentPropsWithRef<"div"> {
  onWeaponSelect: (dollSlog: string) => void;
}
export function WepGridSelect({ onWeaponSelect, className, ...props }: Props) {
  const search = useAtomValue(
    useMemo(() => focusAtom(weaponFilterAtom, (t) => t.prop("search")), []),
  );
  const { data: filteredWeapons = WEP_META } = useFilteredWeapons();

  const allowCustomDoll = filteredWeapons.length < WEP_META.length;

  return (
    <div {...props} className={cn("flex flex-col gap-3", className)}>
      <WeaponFilter />

      {weaponClassEnum.options.map((weaponClass) => (
        <DisplayClassContainer
          key={weaponClass}
          weapons={filteredWeapons}
          weaponClass={weaponClass}
          onWeaponSelect={onWeaponSelect}
        />
      ))}

      {allowCustomDoll ? (
        <Button
          className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
          onClick={() => onWeaponSelect(search)}
          variant="outline"
        >
          {`Add Custom: "${search}"`}
        </Button>
      ) : null}
    </div>
  );
}

function DisplayClassContainer({
  weapons,
  weaponClass,
  onWeaponSelect,
  className,
  ...props
}: ComponentPropsWithRef<"div"> & {
  weapons: WeaponMeta[];
  weaponClass: WeaponClass;
  onWeaponSelect: (name: string) => void;
}) {
  const filteredWeapons = weapons.filter(
    (wep) => wep.weaponClass === weaponClass,
  );

  if (!filteredWeapons.length) return null;
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <p className="text-xl font-semibold">{weaponClass}</p>
      <div className="grid grid-cols-7 gap-1">
        {filteredWeapons.map(({ name, img, rarity, id }) => (
          <Button
            key={`${id}-${rarity}`}
            className="flex h-auto items-center justify-center gap-1 rounded-md border px-1"
            onClick={() => onWeaponSelect(name)}
            variant="outline"
          >
            {
              // TODO: placeholderimg
              img ? <Image src={img} alt={name} width={48} height={48} /> : null
            }
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
