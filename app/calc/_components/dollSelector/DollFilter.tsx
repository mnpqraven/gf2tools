import { useAtom } from "jotai";
import {
  dollFilterAtom,
  filterDollClassAtom,
  filterDollRarityAtom,
} from "./dollSelectorStore";
import { focusAtom } from "jotai-optics";
import { ComponentPropsWithRef, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DOLL_CLASS_ENUM, DOLL_RARITY_ENUM } from "@/repository/enums";
import { AssetIcon } from "@/components/AssetIcon";
import { dollClassAssetEnum } from "@/repository/dolls";

/**
 * TODO: pretty print
 */
export function DollFilter({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  const [search, setSearch] = useAtom(
    useMemo(() => focusAtom(dollFilterAtom, (t) => t.prop("search")), []),
  );

  const [dollClasses, toggleDollClass] = useAtom(filterDollClassAtom);
  const [dollRarities, toggleDollRarity] = useAtom(filterDollRarityAtom);
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search by name or role"
        value={search}
      />
      <div className="flex items-center gap-2 rounded-md border bg-background/70 p-1 backdrop-blur-md">
        {DOLL_CLASS_ENUM.options.map((dollClass) => (
          <Toggle
            className="flex items-center gap-1 capitalize"
            key={dollClass}
            onPressedChange={() => {
              toggleDollClass(dollClass);
            }}
            pressed={dollClasses.includes(dollClass)}
          >
            <AssetIcon
              asset={dollClassAssetEnum(dollClass)}
              className="h-6 w-6 rounded-full bg-primary dark:bg-transparent"
            />
            {dollClass}
          </Toggle>
        ))}
        <Separator orientation="vertical" />
        {DOLL_RARITY_ENUM.options.map((dollRarity) => (
          <Toggle
            className={cn(
              "capitalize",
              dollRarity === "ELITE"
                ? "text-rarity-orange data-[state=on]:text-rarity-orange"
                : "text-rarity-purple data-[state=on]:text-rarity-purple",
            )}
            key={dollRarity}
            onPressedChange={() => {
              toggleDollRarity(dollRarity);
            }}
            pressed={dollRarities.includes(dollRarity)}
          >
            {dollRarity.toLowerCase()}
          </Toggle>
        ))}
      </div>
    </div>
  );
}
