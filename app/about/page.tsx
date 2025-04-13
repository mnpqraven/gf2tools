import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FEATURES } from "@/repository/features";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>What is this</CardTitle>
        </CardHeader>
        <CardContent>
          Bunch of calculators. For suggestions/bugs encounters please contact
          Othi#6661 on Discord. <br />
          Checkout the{" "}
          <Link
            href="https://github.com/mnpqraven/gf2tools/issues"
            target="_blank"
          >
            github page
          </Link>{" "}
          to see up-to-date roapmap and bugs
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Roadmap / Upcoming features</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {FEATURES.map((data) => (
            <ListItem {...data} key={data.label} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function ListItem({ impl: checked, label }: { impl?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <Checkbox checked={checked} id={label} />
      <Label htmlFor={label}>{label}</Label>
    </div>
  );
}
