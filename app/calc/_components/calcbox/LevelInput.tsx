import { HTMLAttributes, RefAttributes, useMemo } from "react";
import { CalcAtom } from "../../SingularCalcBox";
import { focusAtom } from "jotai-optics";
import { useAtom } from "jotai";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props
  extends CalcAtom,
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
    [atom, mode]
  );
  inputAtom.debugLabel = `${atom.debugLabel}_${mode}`;
  const [value, setValue] = useAtom(inputAtom);
  return (
    <div className={cn("flex gap-2 flex-col", className)} {...props}>
      <Label className="capitalize" htmlFor={inputAtom.debugLabel}>{mode}</Label>
      <Input
        id={inputAtom.debugLabel}
        min={min}
        type="number"
        max={max}
        value={value}
        onChange={(e) => {
          setValue(e.target.valueAsNumber);
        }}
      />
    </div>
  );
}
