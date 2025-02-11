import { HTMLAttributes, RefAttributes, useId, useMemo } from "react";
import { z } from "zod";
import { CalcAtomProps } from "../../store";
import { focusAtom } from "jotai-optics";
import { useAtom } from "jotai";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props
  extends CalcAtomProps,
    HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {
  min?: number;
  max?: number;
  mode: "from" | "to";
}

export function LevelInput({
  atom,
  max = 60,
  min = 1,
  mode,
  className,
  ...props
}: Props) {
  const inputAtom = useMemo(
    () => focusAtom(atom, (optic) => optic.prop(mode)),
    [atom, mode],
  );
  const [value, setValue] = useAtom(inputAtom);
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Label className="capitalize" htmlFor={id}>
        {mode}
      </Label>
      <Input
        id={id}
        min={min}
        type="number"
        max={max}
        value={value}
        onChange={(e) => {
          const parsed = zLevel.parse(e.target.valueAsNumber);
          setValue(parsed);
        }}
      />
    </div>
  );
}

const zLevel = z
  .number()
  .int()
  .or(z.nan())
  .transform((value) => {
    if (isNaN(value)) return 1;

    if (value > 60 && value % 100 > 60) return 60;
    if (value > 60) return value % 100;

    if (value < 1) return 1;
    return value;
  });
