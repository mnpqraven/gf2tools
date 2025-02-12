import { ComponentPropsWithRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IFuseOptions } from "fuse.js";
import {
  WeaponClass,
  weaponClassEnum,
  WeaponMeta,
  WEP_META,
} from "@/repository/wep";

interface Props extends ComponentPropsWithRef<"div"> {
  onWeaponSelect: (dollSlog: string) => void;
}
export function WepGridSelect({ onWeaponSelect, className, ...props }: Props) {
  const [search, setSearch] = useState("");
  const { data: filteredWeapons = WEP_META } = useFilteredWeapons(search);

  const allowCustomDoll = filteredWeapons.length < WEP_META.length;

  return (
    <div {...props} className={cn("flex flex-col gap-3", className)}>
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

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
          {`Custom: "${search}"`}
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
            className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
            onClick={() => onWeaponSelect(name)}
            variant="outline"
          >
            {
              // TODO: placeholderimg
              img ? <Image src={img} alt={name} width={64} height={64} /> : null
            }
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}

function useFilteredWeapons(
  search: string,
  fuseOpt?: IFuseOptions<WeaponMeta> & {
    defaultPool: WeaponMeta[];
  },
) {
  async function searchWeapons(query: string): Promise<WeaponMeta[]> {
    const pool = fuseOpt?.defaultPool ?? WEP_META;
    // early empty
    if (!query.length) return pool;

    const Fuse = (await import("fuse.js")).default;
    const engine = new Fuse(pool, {
      keys: ["name", "id", "slug"],
      threshold: 0.5,
      ...fuseOpt,
    });
    const searchResult = engine.search(query);
    return searchResult.map((e) => e.item);
  }

  return useQuery({
    queryKey: ["wep_filter", search, fuseOpt],
    queryFn: () => searchWeapons(search),
    placeholderData: keepPreviousData,
  });
}
