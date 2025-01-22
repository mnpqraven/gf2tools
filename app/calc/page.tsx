import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddCalcObjectButton } from "./_components/calcbox/AddButton";
import { CalcBoxList } from "./_components/calcbox/CalcBoxList";
import { CalcSummaryContainer } from "./_components/calcbox/CalcSummaryContainer";

export default function Page() {
  return (
    <div className="flex gap-3">
      <Card className="flex-[3_1_0]">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <CardTitle>Items</CardTitle>
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
