import { ComponentPropsWithRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { DOLL_META, DollMeta } from "@/repository/dolls";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { dollFilterAtom } from "./dollSelectorStore";
import { focusAtom } from "jotai-optics";
import { useFilteredDolls } from "./useFilteredDolls";
import { DollFilter } from "./DollFilter";
import { DOLL_CLASS_ENUM, DollClassEnum } from "@/repository/enums";

interface Props extends ComponentPropsWithRef<"div"> {
  onDollSelect: (t: { name: string; id?: string }, custom?: boolean) => void;
}
export function DollGridSelect({ onDollSelect, className, ...props }: Props) {
  const search = useAtomValue(
    useMemo(() => focusAtom(dollFilterAtom, (t) => t.prop("search")), []),
  );
  const { data: filteredDolls = DOLL_META } = useFilteredDolls(search);

  const allowCustomDoll = filteredDolls.length < DOLL_META.length;

  return (
    <div {...props} className={cn("flex flex-col gap-3 max-h-[80vh] relative overflow-y-scroll", className)}>
      <DollFilter className="sticky top-0" />

      {DOLL_CLASS_ENUM.options.map((dollClass) => (
        <DisplayClassContainer
          dollClass={dollClass}
          dolls={filteredDolls}
          key={dollClass}
          onDollSelect={onDollSelect}
        />
      ))}

      {allowCustomDoll ? (
        <Button
          className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
          onClick={() => onDollSelect({ name: search }, true)}
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
  dollClass: DollClassEnum;
  onDollSelect: (t: { name: string; id?: string }) => void;
}) {
  const filteredDolls = dolls.filter((doll) => doll.dollClass === dollClass);
  if (!filteredDolls.length) return null;
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <p className="text-xl font-semibold">{dollClass}</p>

      <div className="grid grid-cols-6 gap-1">
        {filteredDolls.map(({ name, img, rarity, id }) => (
          <Button
            className="flex h-auto items-center justify-around gap-1 rounded-md border px-1"
            key={`${id}-${rarity}`}
            onClick={() => onDollSelect({ name, id })}
            variant="outline"
          >
            {
              // TODO: placeholderimg
              img.head ? (
                <Image alt={name} height={48} src={img.head} width={48} />
              ) : null
            }
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
