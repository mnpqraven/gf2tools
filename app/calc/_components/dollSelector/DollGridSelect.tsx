import { AssetIcon } from "@/components/AssetIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DOLL_META,
  type DollMeta,
  dollClassAssetEnum,
} from "@/repository/dolls";
import {
  DOLL_CLASS_ENUM,
  type DollClassEnum,
  type DollSlugEnum,
} from "@/repository/enums";
import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import Image from "next/image";
import { type ComponentPropsWithRef, useMemo } from "react";
import { DollFilter } from "./DollFilter";
import { dollFilterAtom } from "./dollSelectorStore";
import { useFilteredDolls } from "./useFilteredDolls";

interface Props extends ComponentPropsWithRef<"div"> {
  onDollSelect: (t: { name: string; id?: string }, custom?: boolean) => void;
  /**
   * whether a doll entry is disabled during selection
   */
  shouldDisable?: (slug: DollSlugEnum) => boolean;
}
export function DollGridSelect({
  onDollSelect,
  shouldDisable,
  className,
  ...props
}: Props) {
  const search = useAtomValue(
    useMemo(() => focusAtom(dollFilterAtom, (t) => t.prop("search")), []),
  );
  const { data: filteredDolls = DOLL_META } = useFilteredDolls(search);

  const allowCustomDoll =
    filteredDolls.length < DOLL_META.length && Boolean(search.length);

  return (
    <div
      {...props}
      className={cn(
        "relative flex max-h-[80vh] flex-col gap-3 overflow-y-scroll",
        className,
      )}>
      <DollFilter className="sticky top-0" />

      {DOLL_CLASS_ENUM.options.map((dollClass) => (
        <DisplayClassContainer
          dollClass={dollClass}
          dolls={filteredDolls}
          key={dollClass}
          onDollSelect={onDollSelect}
          shouldDisable={shouldDisable}
        />
      ))}

      {allowCustomDoll ? (
        <Button
          className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
          onClick={() => onDollSelect({ name: search }, true)}
          variant="outline">
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
  shouldDisable,
  ...props
}: ComponentPropsWithRef<"div"> & {
  dolls: DollMeta[];
  dollClass: DollClassEnum;
  onDollSelect: (t: { name: string; id?: string }) => void;
  shouldDisable?: (slug: DollSlugEnum) => boolean;
}) {
  const filteredDolls = dolls.filter((doll) => doll.dollClass === dollClass);
  if (!filteredDolls.length) return null;
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center gap-2 font-semibold text-xl capitalize">
        <AssetIcon
          asset={dollClassAssetEnum(dollClass)}
          className="h-6 w-6 rounded-full bg-primary dark:bg-transparent"
        />
        {dollClass}
      </div>

      <div className="grid grid-cols-5 gap-1">
        {filteredDolls.map(({ name, img, rarity, id }) => (
          <Button
            className="flex h-auto items-center justify-between gap-1"
            disabled={shouldDisable?.(id)}
            key={`${id}-${rarity}`}
            onClick={() => onDollSelect({ name, id })}
            variant="ghost">
            {
              // TODO: placeholderimg
              img.head ? (
                <Image
                  alt={name}
                  className={cn(
                    "shrink-0 rounded-md border",
                    rarity === "ELITE"
                      ? "border-rarity-orange"
                      : "border-rarity-purple",
                  )}
                  height={64}
                  src={img.head}
                  width={64}
                />
              ) : null
            }
            <span className="flex-1 whitespace-pre-wrap">{name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
