import { DollGridSelect } from "@/app/calc/_components/dollSelector/DollGridSelect";
import { Button } from "@/components/ui/button";
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
import { useIsDesktop } from "@/lib/hooks/useIsDesktop";
import { DOLL_META } from "@/repository/dolls";
import type { DollSlugEnum } from "@/repository/enums";
import { cva } from "class-variance-authority";
import { Plus } from "lucide-react";
import Image from "next/image";
import { type ComponentPropsWithRef, useState } from "react";

// TODO: generic component
export function DollSelectDrawerSheet({
  className,
  doll,
  onDollChange,
  shouldDisable,
  ...props
}: ComponentPropsWithRef<"button"> & {
  doll: DollSlugEnum | undefined;
  onDollChange: (id: DollSlugEnum) => void;
  shouldDisable?: (slug: DollSlugEnum) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const buttonStyle = cva("h-24 w-24", {
    variants: {
      chosen: {
        true: null,
        false: "items-center justify-center",
      },
    },
  });

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button
            {...props}
            className={buttonStyle({
              chosen: doll !== undefined,
              className,
            })}
            variant="outline">
            {doll ? (
              <Image
                alt={doll}
                height={64}
                src={DOLL_META.find((e) => e.id === doll)?.img.head ?? ""}
                width={64}
              />
            ) : (
              <Plus />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select a doll</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <DollGridSelect
            onDollSelect={({ id }) => {
              if (id) onDollChange(id as unknown as DollSlugEnum);

              setOpen(false);
            }}
            shouldDisable={shouldDisable}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button {...props} variant="outline">
          {doll ? "img" : <Plus />}
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
