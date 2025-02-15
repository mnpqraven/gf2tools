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
        value={search}
      />
      <div className="flex items-center gap-2 rounded-md border bg-background/70 p-1 backdrop-blur-md">
        {DOLL_CLASS_ENUM.options.map((dollClass) => (
          <Toggle
            key={dollClass}
            onPressedChange={() => {
              toggleDollClass(dollClass);
            }}
            pressed={dollClasses.includes(dollClass)}
          >
            {dollClass}
          </Toggle>
        ))}
        <Separator orientation="vertical" />
        Rarity
        {DOLL_RARITY_ENUM.options.map((dollRarity) => (
          <Toggle
            key={dollRarity}
            onPressedChange={() => {
              toggleDollRarity(dollRarity);
            }}
            pressed={dollRarities.includes(dollRarity)}
          >
            {dollRarity}
          </Toggle>
        ))}
      </div>
    </div>
  );
}
