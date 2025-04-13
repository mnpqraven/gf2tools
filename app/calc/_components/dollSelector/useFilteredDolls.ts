import { DOLL_META, type DollMeta } from "@/repository/dolls";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { IFuseOptions } from "fuse.js";
import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";
import { dollFilterAtom } from "./dollSelectorStore";

// TODO: migrate to TRPC
export function useFilteredDolls(
  search: string,
  fuseOpt?: IFuseOptions<DollMeta> & {
    defaultPool: DollMeta[];
  },
) {
  const filter = useAtomValue(
    useMemo(
      () => focusAtom(dollFilterAtom, (t) => t.pick(["dollClass", "rarity"])),
      [],
    ),
  );
  async function searchDolls(query: string): Promise<DollMeta[]> {
    const pool = fuseOpt?.defaultPool ?? DOLL_META;
    // early empty
    if (!query.length) return pool;

    const Fuse = (await import("fuse.js")).default;
    const engine = new Fuse(pool, {
      keys: ["name", "dollClass"],
      threshold: 0.3,
      ...fuseOpt,
    });
    const searchResult = engine.search(query);
    return searchResult.map((e) => e.item);
  }

  return useQuery({
    select: (data) =>
      data.filter(
        ({ rarity, dollClass }) =>
          filter.rarity.includes(rarity) &&
          filter.dollClass.includes(dollClass),
      ),
    placeholderData: keepPreviousData,
    queryKey: ["doll_filter", search, fuseOpt],
    queryFn: () => searchDolls(search),
  });
}
