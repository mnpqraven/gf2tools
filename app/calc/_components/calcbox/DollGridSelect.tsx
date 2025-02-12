import { ComponentPropsWithRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  DOLL_META,
  DollClass,
  dollClassEnum,
  DollMeta,
  dollRarityEnum,
} from "@/repository/dolls";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IFuseOptions } from "fuse.js";
import { useAtom, useAtomValue } from "jotai";
import {
  dollFilterAtom,
  filterDollClassAtom,
  filterDollRarityAtom,
} from "./dollSelectorStore";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { focusAtom } from "jotai-optics";

interface Props extends ComponentPropsWithRef<"div"> {
  onDollSelect: (dollSlog: string) => void;
}
export function DollGridSelect({ onDollSelect, className, ...props }: Props) {
  const [search, setSearch] = useAtom(
    useMemo(() => focusAtom(dollFilterAtom, (t) => t.prop("search")), []),
  );
  const { data: filteredDolls = DOLL_META } = useFilteredDolls(search);

  const allowCustomDoll = filteredDolls.length < DOLL_META.length;

  return (
    <div {...props} className={cn("flex flex-col gap-3", className)}>
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <DollFilter />

      {dollClassEnum.options.map((dollClass) => (
        <DisplayClassContainer
          key={dollClass}
          dolls={filteredDolls}
          dollClass={dollClass}
          onDollSelect={onDollSelect}
        />
      ))}

      {allowCustomDoll ? (
        <Button
          className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
          onClick={() => onDollSelect(search)}
          variant="outline"
        >
          {`Add Custom: "${search}"`}
        </Button>
      ) : null}
    </div>
  );
}

function DollFilter() {
  const [dollClasses, toggleDollClass] = useAtom(filterDollClassAtom);
  const [dollRarities, toggleDollRarity] = useAtom(filterDollRarityAtom);
  return (
    <div className="flex gap-1">
      {dollClassEnum.options.map((dollClass) => (
        <Toggle
          key={dollClass}
          pressed={dollClasses.includes(dollClass)}
          onPressedChange={() => {
            toggleDollClass(dollClass);
          }}
        >
          {dollClass}
        </Toggle>
      ))}

      <Separator orientation="vertical" />

      {dollRarityEnum.options.map((dollRarity) => (
        <Toggle
          key={dollRarity}
          pressed={dollRarities.includes(dollRarity)}
          onPressedChange={() => {
            toggleDollRarity(dollRarity);
          }}
        >
          {dollRarity}
        </Toggle>
      ))}
    </div>
  );
}

function DisplayClassContainer({
  dolls,
  dollClass,
  onDollSelect,
  className,
  ...props
}: ComponentPropsWithRef<"div"> & {
  dolls: DollMeta[];
  dollClass: DollClass;
  onDollSelect: (name: string) => void;
}) {
  const filteredDolls = dolls.filter((doll) => doll.dollClass === dollClass);
  if (!filteredDolls.length) return null;
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <p className="text-xl font-semibold">{dollClass}</p>

      <div className="grid grid-cols-7 gap-1">
        {filteredDolls.map(({ name, img, rarity, id }) => (
          <Button
            key={`${id}-${rarity}`}
            className="flex h-auto items-center justify-center gap-1 rounded-md border px-1"
            onClick={() => onDollSelect(name)}
            variant="outline"
          >
            {
              // TODO: placeholderimg
              img.head ? (
                <Image src={img.head} alt={name} width={48} height={48} />
              ) : null
            }
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}

function useFilteredDolls(
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
      keys: ["name"],
      threshold: 0.5,
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
