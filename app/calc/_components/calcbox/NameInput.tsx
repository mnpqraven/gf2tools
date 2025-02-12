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
import { DollGridSelect } from "../dollSelector/DollGridSelect";
import { WepGridSelect } from "../weaponSelector/WepGridSelect";
import { useResetAtom } from "jotai/utils";
import { weaponFilterAtom } from "../weaponSelector/wepSelectorStore";
import { dollFilterAtom } from "../dollSelector/dollSelectorStore";

type Props = CalcAtomProps;

export function NameInput({ atom }: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("name")), [atom]),
  );
  const calcType = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("calcType")), [atom]),
  );

  const resetWeaponFilter = useResetAtom(weaponFilterAtom);
  const resetDollFilter = useResetAtom(dollFilterAtom);

  function onSelect(name: string) {
    setName(name);
    setOpen(false);
    clearFilter();
  }

  /**
   * TODO: probably a better way to reset state machine
   */
  function clearFilter() {
    setTimeout(() => {
      resetWeaponFilter();
      resetDollFilter();
    }, 150);
  }

  return (
    <Popover
      open={open}
      onOpenChange={(to) => {
        if (to) setOpen(true);
        else {
          setOpen(false);
          clearFilter();
        }
      }}
    >
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
