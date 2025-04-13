import { DOLL_SLUGS_MAP } from "@/repository/dolls";
import { WEP_META, type WeaponMeta } from "@/repository/wep";
import {
  type UseQueryOptions,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import type { IFuseOptions } from "fuse.js";
import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";
import { weaponFilterAtom } from "./wepSelectorStore";

export function useFilteredWeapons(
  queryOpt?: Partial<UseQueryOptions<WeaponMeta[]>>,
  fuseOpt?: IFuseOptions<WeaponMeta> & {
    defaultPool: WeaponMeta[];
  },
) {
  const search = useAtomValue(
    useMemo(() => focusAtom(weaponFilterAtom, (t) => t.prop("search")), []),
  );
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
      keys: [
        "name",
        "id",
        {
          name: "dollName",
          getFn: ({ dollSlug }) =>
            dollSlug ? DOLL_SLUGS_MAP[dollSlug].name : "",
        },
      ],
      threshold: 0.3,
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
