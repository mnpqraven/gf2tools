import { Button } from "@/components/ui/button";
import { ComponentPropsWithRef } from "react";
import { useRemoveCalcObject } from "../../_hooks/useRemoveCalcObject";
import { Trash } from "lucide-react";
import { CalcAtomProps } from "../../store";

interface Props
  extends Omit<ComponentPropsWithRef<typeof Button>, "onClick">,
    CalcAtomProps {}

export function RemoveButton({ atom, ...props }: Props) {
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
