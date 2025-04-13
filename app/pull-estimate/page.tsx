import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { PullForm } from "./PullForm";
import { PullGraph } from "./PullGraph";

export const metadata: Metadata = {
  title: "Gacha Estimation",
  description: "Gacha Estimation",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-2">
      <PullForm />
      <Card>
        <CardHeader>
          <CardTitle>Note</CardTitle>
        </CardHeader>
        <CardContent>
          Select/Deselect <code className="rounded-sm bg-muted px-1">-1</code>{" "}
          if you do not yet own the doll/weapon <br />
          Select the{" "}
          <code className="rounded-sm bg-muted px-1">Guaranteed</code> option if
          you already lost a pity and the next elite is guaranteed to be what
          you want
        </CardContent>
      </Card>

      <PullGraph />
    </div>
  );
}
