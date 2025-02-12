import { ComponentPropsWithRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DOLL_META,
  DollClass,
  dollClassEnum,
  DollMeta,
} from "@/repository/dolls";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IFuseOptions } from "fuse.js";

interface Props extends ComponentPropsWithRef<"div"> {
  onDollSelect: (dollSlog: string) => void;
}
export function DollGridSelect({ onDollSelect, className, ...props }: Props) {
  const [search, setSearch] = useState("");
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
      {dollClassEnum.options.map((dollClass) => (
        <DisplayClassContainer
          key={dollClass}
          dolls={filteredDolls}
          dollClass={dollClass}
          onDollSelect={onDollSelect}
        />
      ))}

      <div className="grid grid-cols-7 gap-1">
        {allowCustomDoll ? (
          <Button
            className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
            onClick={() => onDollSelect(search)}
            variant="outline"
          >
            {`Custom: "${search}"`}
          </Button>
        ) : null}
      </div>
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
            className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
            onClick={() => onDollSelect(name)}
            variant="outline"
          >
            {
              // TODO: placeholderimg
              img.head ? (
                <Image src={img.head} alt={name} width={64} height={64} />
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
    queryKey: ["doll_filter", search, fuseOpt],
    queryFn: () => searchDolls(search),
    placeholderData: keepPreviousData,
  });
}
