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
import { cva } from "class-variance-authority";
import { DOLL_SLUGS_MAP } from "@/repository/dolls";
import { Braces, CircleUserRound } from "lucide-react";
import { DollSlugEnum } from "@/repository/enums";

interface Props extends ComponentPropsWithRef<"div"> {
  onWeaponSelect: (t: { name: string; id?: string }, custom?: boolean) => void;
}
export function WepGridSelect({ onWeaponSelect, className, ...props }: Props) {
  const search = useAtomValue(
    useMemo(() => focusAtom(weaponFilterAtom, (t) => t.prop("search")), []),
  );
  const { data: filteredWeapons = WEP_META } = useFilteredWeapons();

  const allowCustomDoll =
    filteredWeapons.length < WEP_META.length && Boolean(search.length);

  return (
    <div
      {...props}
      className={cn(
        "relative flex max-h-[80vh] flex-col gap-3 overflow-y-scroll",
        className,
      )}
    >
      <WeaponFilter className="sticky top-0" />

      {weaponClassEnum.options.map((weaponClass) => (
        <DisplayClassContainer
          key={weaponClass}
          onWeaponSelect={onWeaponSelect}
          weaponClass={weaponClass}
          weapons={filteredWeapons}
        />
      ))}

      {allowCustomDoll ? (
        <Button
          className="flex h-auto flex-col items-center justify-center gap-1 rounded-md border"
          onClick={() => onWeaponSelect({ name: search }, true)}
          variant="ghost"
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
  onWeaponSelect: (t: { name: string; id?: string }, custom?: boolean) => void;
}) {
  const filteredWeapons = weapons.filter(
    (wep) => wep.weaponClass === weaponClass,
  );

  if (!filteredWeapons.length) return null;
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <p className="text-xl font-semibold">{weaponClass}</p>
      <div className="grid grid-cols-5 gap-1">
        {filteredWeapons
          .sort((a, b) => b.rarity - a.rarity)
          .map(({ name, img, rarity, id, dollSlug }) => (
            <Button
              className="flex h-auto flex-1 flex-col items-stretch justify-start p-2"
              key={`${id}-${rarity}`}
              onClick={() => onWeaponSelect({ name, id })}
              variant="ghost"
            >
              <div className="flex flex-1 items-center gap-1">
                {/* TODO: placeholderimg */}
                {img ? (
                  <Image
                    alt={name}
                    className={weaponVariants({
                      rarity: rarity as 3 | 4 | 5,
                    })}
                    height={64}
                    src={img}
                    width={64}
                  />
                ) : null}
                <Meta dollSlug={dollSlug} id={id} />
              </div>
              <span className="flex-1 whitespace-pre-wrap">{name}</span>
            </Button>
          ))}
      </div>
    </div>
  );
}

function Meta({ id, dollSlug }: { id: string; dollSlug?: DollSlugEnum }) {
  if (!dollSlug) return <div className="flex-1" />;
  return (
    <div className="flex flex-col gap-1 overflow-hidden text-xs">
      <div className="mt-1 flex items-center gap-1 text-muted-foreground">
        <CircleUserRound className="h-4 w-4" />
        {DOLL_SLUGS_MAP[dollSlug].name}
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <Braces className="h-4 w-4" />
        {/* omit rarity */}
        <code className="overflow-hidden overflow-ellipsis">
          {id.slice(0, id.length - 2)}
        </code>
      </div>
    </div>
  );
}

const weaponVariants = cva("shrink-0 rounded-md border", {
  variants: {
    rarity: {
      3: "border-rarity-blue",
      4: "border-rarity-purple",
      5: "border-rarity-orange",
    },
  },
});
