import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
  const setId = useSetAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("id")), [atom]),
  );
  const calcType = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("calcType")), [atom]),
  );

  const resetWeaponFilter = useResetAtom(weaponFilterAtom);
  const resetDollFilter = useResetAtom(dollFilterAtom);

  function onSelect(
    { name, id }: { name: string; id?: string },
    custom?: boolean,
  ) {
    setName(name);
    setId(custom ? undefined : id);
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
      onOpenChange={(to) => {
        if (to) setOpen(true);
        else {
          setOpen(false);
          clearFilter();
        }
      }}
      open={open}
    >
      <PopoverTrigger asChild>
        <Button variant="outline">{name.length ? name : "Open"}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto" side="right">
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
