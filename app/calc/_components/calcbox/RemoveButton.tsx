import { Button } from "@/components/ui/button";
import { ComponentPropsWithRef } from "react";
import { useRemoveCalcObject } from "../../_hooks/useRemoveCalcObject";
import { Trash } from "lucide-react";
import { CalcAtom } from "./SingularCalcBox";

type Props = Omit<ComponentPropsWithRef<typeof Button>, "onClick"> & CalcAtom;
export function RemoveButton({ atom, ...props }: Props) {
  const { remove } = useRemoveCalcObject();
  return (
    <Button
      {...props}
      variant="destructive"
      onClick={() => {
        remove(atom);
      }}
    >
      <Trash />
    </Button>
  );
}
