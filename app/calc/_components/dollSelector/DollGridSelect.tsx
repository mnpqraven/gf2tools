import { ComponentPropsWithRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  DOLL_META,
  DollClass,
  dollClassEnum,
  DollMeta,
} from "@/repository/dolls";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { dollFilterAtom } from "./dollSelectorStore";
import { focusAtom } from "jotai-optics";
import { useFilteredDolls } from "./useFilteredDolls";
import { DollFilter } from "./DollFilter";

interface Props extends ComponentPropsWithRef<"div"> {
  onDollSelect: (dollSlog: string) => void;
}
export function DollGridSelect({ onDollSelect, className, ...props }: Props) {
  const search = useAtomValue(
    useMemo(() => focusAtom(dollFilterAtom, (t) => t.prop("search")), []),
  );
  const { data: filteredDolls = DOLL_META } = useFilteredDolls(search);

  const allowCustomDoll = filteredDolls.length < DOLL_META.length;

  return (
    <div {...props} className={cn("flex flex-col gap-3", className)}>
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
