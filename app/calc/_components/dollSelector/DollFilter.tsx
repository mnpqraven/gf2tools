import { useAtom } from "jotai";
import {
  dollFilterAtom,
  filterDollClassAtom,
  filterDollRarityAtom,
} from "./dollSelectorStore";
import { focusAtom } from "jotai-optics";
import { ComponentPropsWithRef, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { dollClassEnum, dollRarityEnum } from "@/repository/dolls";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
      <div className="flex gap-2">
        {dollClassEnum.options.map((dollClass) => (
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

        {dollRarityEnum.options.map((dollRarity) => (
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
