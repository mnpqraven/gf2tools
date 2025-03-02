import * as O from "optics-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useTeamPreset } from "./TeamPresetProvider";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { range } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { teamListSplittedAtom, teamPresetDollOptic } from "./store";
import { ComponentPropsWithRef, useState } from "react";
import { useIsDesktop } from "@/lib/hooks/useIsDesktop";
import { DollSlugEnum } from "@/repository/enums";
import { cva } from "class-variance-authority";
import { DollGridSelect } from "../calc/_components/dollSelector/DollGridSelect";
import { ownMapDollAtom } from "../refitting-room/stores/doll";

export function TeamPreset() {
  const { atom } = useTeamPreset();
  const [value, setValue] = useAtom(atom);
  const listDispatch = useSetAtom(teamListSplittedAtom);

  function onNameChange(name: string) {
    setValue((e) => ({ ...e, name }));
  }

  return (
    <div className="flex flex-col gap-2">
      {/* can be own component for meta, not included in ss */}
      <div className="flex gap-2">
        <Input
          onChange={(e) => onNameChange(e.target.value)}
          value={value.name}
        />
        <Button
          onClick={() => listDispatch({ type: "remove", atom })}
          size="icon"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>
      <div className="flex gap-2">
        {Array.from(range(0, 3)).map((slot) => (
          <DollSelectDrawerSheet key={slot} slotIndex={slot} />
        ))}
      </div>
    </div>
  );
}

function DollSelectDrawerSheet({
  slotIndex,
  className,
  ...props
}: ComponentPropsWithRef<"button"> & { slotIndex: number }) {
  const { atom } = useTeamPreset();
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const [value, setValue] = useAtom(atom);
  const dollMap = useAtomValue(ownMapDollAtom);

  const currentDollSlug = value.slots.at(slotIndex);
  const buttonStyle = cva("h-24 w-24", {
    variants: {
      chosen: {
        true: null,
        false: "justify-center items-center",
      },
    },
  });

  function onDollChange({ name, id }: { name: string; id?: DollSlugEnum }) {
    console.log("onSelect", name, id);
    if (!id) {
      // early return
      setOpen(false);
      return;
    }
    // do shit
    const someOwnedDoll = dollMap[id];
    if (!someOwnedDoll.owned) {
      // early return
      setOpen(false);
      return;
    }

    const scope = teamPresetDollOptic(slotIndex);
    setValue((prev) => O.set(scope)(id)(prev));

    setOpen(false);
  }

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button
            {...props}
            className={buttonStyle({
              chosen: currentDollSlug !== undefined,
              className,
            })}
            variant="outline"
          >
            {currentDollSlug ?? <Plus />}
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select a doll</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <DollGridSelect
            // TODO: disallow custom selection (extend props)
            // @ts-expect-error id is inface enum here EXPECT for custom option
            onDollSelect={onDollChange}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button {...props} variant="outline">
          {currentDollSlug ? "img" : <Plus />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Select a doll</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
