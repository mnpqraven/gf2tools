import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddCalcObjectButton } from "./_components/calcbox/AddButton";
import { CalcSummaryContainer } from "./_components/summary/CalcSummaryContainer";
import { CalcBoxList } from "./_components/calcbox/CalcBoxList";

export default function Page() {
  return (
    <div className="flex gap-3">
      <Card className="flex-[3_1_0]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Trackers</CardTitle>
            <AddCalcObjectButton />
          </div>
        </CardHeader>
        <CardContent>
          <CalcBoxList />
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <CalcSummaryContainer />
        </CardContent>
      </Card>
    </div>
  );
}
