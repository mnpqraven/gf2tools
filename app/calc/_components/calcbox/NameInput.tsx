import { useAtom, useAtomValue } from "jotai";
import { CalcAtomProps } from "../../store";
import { useMemo, useState } from "react";
import { focusAtom } from "jotai-optics";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DollGridSelect } from "./DollGridSelect";
import { WepGridSelect } from "./WepGridSelect";

type Props = CalcAtomProps;

export function NameInput({ atom }: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("name")), [atom])
  );
  const calcType = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("calcType")), [atom])
  );

  function onSelect(name: string) {
    setName(name);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{name.length ? name : "Open"}</Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-auto">
        {calcType === "CHAR" ? (
          <DollGridSelect onDollSelect={onSelect} />
        ) : null}
        {calcType === "WEP" ? (
          <WepGridSelect onWeaponSelect={onSelect} />
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
