import { Button, ButtonProps } from "@/components/ui/button";
import { DollSlugEnum, WeaponSlugEnum } from "@/repository/enums";
import { useAtomValue, useSetAtom } from "jotai";
import { calcListAtom, newCalcObjectAtom } from "../calc/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";

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
          }}
        >
          {children}
        </Button>
      </PopoverAnchor>
      <PopoverContent className="flex flex-col gap-2 w-fit">
        Already in planner. <br />
        Add anyway?
        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="destructive"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onCreate(slug);
            }}
          >
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
