import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import type { DollSlugEnum, WeaponSlugEnum } from "@/repository/enums";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { calcListAtom, newCalcObjectAtom } from "../calc/store";

type SlugKind =
  | { type: "CHAR"; slug: DollSlugEnum }
  | { type: "WEP"; slug: WeaponSlugEnum };
interface Props extends Omit<ButtonProps, "onClick"> {
  currentLevel: number;
  slug: SlugKind;
}
export function AddToPlannerButton({
  currentLevel,
  slug,
  children,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const calcList = useAtomValue(calcListAtom);
  const createCalcObject = useSetAtom(newCalcObjectAtom);
  const router = useRouter();

  function onClickDoll(slug: DollSlugEnum) {
    const find = calcList.find((e) => e.id === slug);
    if (!find) onCreate({ type: "CHAR", slug });
    else setOpen(true);
  }

  function onClickWep(slug: WeaponSlugEnum) {
    const find = calcList.find((e) => e.id === slug);
    if (!find) onCreate({ type: "WEP", slug });
    else toast.warning("found duplicate");
  }

  function onCreate(slug: SlugKind) {
    switch (slug.type) {
      case "CHAR": {
        createCalcObject({
          calcType: "CHAR",
          id: slug.slug,
          from: currentLevel,
          to: 60,
        });
        toast.success(`Created planner entry for ${slug.slug}`, {
          action: {
            label: "View",
            onClick: () => router.push("/calc"),
          },
        });
        break;
      }
      case "WEP": {
        createCalcObject({ calcType: "WEP", id: slug.slug });
        toast.success(`Created planner entry for ${slug.slug}`, {
          action: {
            label: "View",
            onClick: () => router.push("/calc"),
          },
        });
        break;
      }
    }
    setOpen(false);
  }

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverAnchor asChild>
        <Button
          {...props}
          onClick={() => {
            switch (slug.type) {
              case "CHAR":
                onClickDoll(slug.slug);
                break;
              case "WEP":
                onClickWep(slug.slug);
                break;
            }
          }}>
          {children}
        </Button>
      </PopoverAnchor>
      <PopoverContent className="flex w-fit flex-col gap-2">
        Already in planner. <br />
        Add anyway?
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="destructive">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onCreate(slug);
            }}>
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
