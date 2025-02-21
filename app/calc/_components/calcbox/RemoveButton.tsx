import { Button } from "@/components/ui/button";
import { ComponentPropsWithRef } from "react";
import { useRemoveCalcObject } from "../../_hooks/useRemoveCalcObject";
import { Trash } from "lucide-react";
import { useCalcBox } from "./CalcBoxProvider";

export function RemoveButton({
  ...props
}: Omit<ComponentPropsWithRef<typeof Button>, "onClick">) {
  const { atom } = useCalcBox();
  const { remove } = useRemoveCalcObject();
  return (
    <Button
      {...props}
      onClick={() => {
        remove(atom);
      }}
      variant="destructive"
    >
      <Trash />
    </Button>
  );
}
