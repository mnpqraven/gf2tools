import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { CalcAtomProps } from "../../store";
import { useMemo, useState } from "react";
import { focusAtom } from "jotai-optics";
import { Button } from "@/components/ui/button";
import { DollGridSelect } from "../dollSelector/DollGridSelect";
import { WepGridSelect } from "../weaponSelector/WepGridSelect";
import { useResetAtom } from "jotai/utils";
import { weaponFilterAtom } from "../weaponSelector/wepSelectorStore";
import { dollFilterAtom } from "../dollSelector/dollSelectorStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = CalcAtomProps;

export function NameInput({ atom }: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("name")), [atom])
  );
  const setId = useSetAtom(
    useMemo(() => focusAtom(atom, (t) => t.prop("id")), [atom])
  );
  const calcType = useAtomValue(
    useMemo(() => focusAtom(atom, (t) => t.prop("calcType")), [atom])
  );

  const resetWeaponFilter = useResetAtom(weaponFilterAtom);
  const resetDollFilter = useResetAtom(dollFilterAtom);

  function onSelect(
    { name, id }: { name: string; id?: string },
    custom?: boolean
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

  const label = name.length
    ? name
    : `Select ${calcType === "WEP" ? "Weapon" : "Doll"} `;

  // TODO: move this dialog to own wrapper, this component should only be
  // label button
  // TODO: dialog/drawer for responsive
  return (
    <Dialog
      onOpenChange={(to) => {
        if (to) setOpen(true);
        else {
          setOpen(false);
          clearFilter();
        }
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select {calcType}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {calcType === "CHAR" ? (
          <DollGridSelect onDollSelect={onSelect} />
        ) : null}
        {calcType === "WEP" ? (
          <WepGridSelect onWeaponSelect={onSelect} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
