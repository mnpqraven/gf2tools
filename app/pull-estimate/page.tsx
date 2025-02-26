"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PullForm } from "./PullForm";
import { PullGraph } from "./PullGraph";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <PullForm />
      <Card>
        <CardHeader>
          <CardTitle>Note</CardTitle>
        </CardHeader>
        <CardContent>
          For Fortification, select{" "}
          <code className="bg-muted rounded-sm px-1">-1</code> if you do not yet
          own the doll/weapon <br />
          Select the{" "}
          <code className="bg-muted rounded-sm px-1">Guaranteed</code> option if
          you already lost a pity and the next elite is guaranteed to be what
          you want
        </CardContent>
      </Card>

      <PullGraph />
    </div>
  );
}
