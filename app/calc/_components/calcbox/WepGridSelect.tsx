import { ComponentPropsWithRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { IFuseOptions } from "fuse.js";
import {
  WeaponClass,
  weaponClassEnum,
  WeaponMeta,
  WEP_META,
} from "@/repository/wep";
import { useAtom, useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import {
  filterWeaponClassAtom,
  filterWeaponRarityAtom,
  weaponFilterAtom,
} from "./wepSelectorStore";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

interface Props extends ComponentPropsWithRef<"div"> {
  onWeaponSelect: (dollSlog: string) => void;
}
export function WepGridSelect({ onWeaponSelect, className, ...props }: Props) {
  const [search, setSearch] = useAtom(
    useMemo(() => focusAtom(weaponFilterAtom, (t) => t.prop("search")), []),
  );
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

function WeaponFilter() {
  const [weaponClasses, toggleWeaponClass] = useAtom(filterWeaponClassAtom);
  const [weaponRarities, toggleWeaponRarity] = useAtom(filterWeaponRarityAtom);
  return (
    <div className="flex gap-1">
      {weaponClassEnum.options.map((weaponClass) => (
        <Toggle
          key={weaponClass}
          pressed={weaponClasses.includes(weaponClass)}
          onPressedChange={() => {
            toggleWeaponClass(weaponClass);
          }}
        >
          {weaponClass}
        </Toggle>
      ))}

      <Separator orientation="vertical" />

      {[3, 4, 5].map((weaponRarity) => (
        <Toggle
          key={weaponRarity}
          pressed={weaponRarities.includes(weaponRarity)}
          onPressedChange={() => {
            toggleWeaponRarity(weaponRarity);
          }}
        >
          {weaponRarity}
        </Toggle>
      ))}
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

function useFilteredWeapons(
  search: string,
  queryOpt?: Partial<UseQueryOptions<WeaponMeta[]>>,
  fuseOpt?: IFuseOptions<WeaponMeta> & {
    defaultPool: WeaponMeta[];
  },
) {
  const filter = useAtomValue(
    useMemo(
      () =>
        focusAtom(weaponFilterAtom, (t) => t.pick(["weaponClass", "rarity"])),
      [],
    ),
  );

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
    placeholderData: keepPreviousData,
    select: (data) =>
      data.filter(
        ({ rarity, weaponClass }) =>
          filter.rarity.includes(rarity) &&
          filter.weaponClass.includes(weaponClass),
      ),
    ...queryOpt,
    queryKey: ["wep_filter", search, fuseOpt],
    queryFn: () => searchWeapons(search),
  });
}
