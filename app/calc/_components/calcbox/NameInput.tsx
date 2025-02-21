import { useAtomValue, useSetAtom } from "jotai";
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
import { SquareUserRound } from "lucide-react";
import { useCalcBox } from "./CalcBoxProvider";

export function NameInput() {
  const { atom } = useCalcBox();
  const [open, setOpen] = useState(false);

  const setName = useSetAtom(
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

  const label = `Select ${calcType === "WEP" ? "Weapon" : "Doll"} `;

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
        <Button
          className="text-primary inline-flex items-center gap-1"
          variant="outline"
        >
          <SquareUserRound />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Select {calcType === "WEP" ? "Weapon" : "Doll"}
          </DialogTitle>
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
