"use client";

import { useAtom, useAtomValue } from "jotai";
import { calcListAtom, calcListSplitAtom } from "./store";
import { Button } from "@/components/ui/button";
import { SingularCalcBox } from "./SingularCalcBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalcSummary } from "./CalcSummary";

export default function Page() {
  const [atoms, dispatch] = useAtom(calcListSplitAtom);
  const list = useAtomValue(calcListAtom);

  function onNew() {
    dispatch({
      type: "insert",
      value: {
        calcType: "CHAR",
        name: "",
        from: 1,
        to: 60,
      },
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onNew}>New</Button>
      <div className="flex gap-2">
        {atoms.map((atom, i) => (
          <SingularCalcBox key={i} atom={atom} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <CalcSummary />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>debug:</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(list, null, 2)}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
