import { Button } from "@/components/ui/button";
import { ComponentPropsWithRef } from "react";
import { useRemoveCalcObject } from "../../_hooks/useRemoveCalcObject";
import { Trash } from "lucide-react";
import { CalcAtom } from "./SortableCalcBox";

interface Props extends Omit<ComponentPropsWithRef<typeof Button>, "onClick"> {
  index: number;
}
export function RemoveButton({ index, ...props }: Props) {
  const { remove } = useRemoveCalcObject();
  return (
    <Button
      {...props}
      variant="destructive"
      onClick={() => {
        remove(index);
      }}
    >
      <Trash />
    </Button>
  );
}
