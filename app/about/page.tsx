import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FEATURES } from "@/repository/features";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>What is this</CardTitle>
        </CardHeader>
        <CardContent>
          Bunch of calculators. For suggestions/bugs encounters please contact
          Othi#6661 on Discord.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>TODOs / Upcoming features</CardTitle>
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
