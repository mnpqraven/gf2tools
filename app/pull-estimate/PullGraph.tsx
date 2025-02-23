import { useAtomValue } from "jotai";
import { pullEstimateFormAtom } from "./store";
import { useTRPC } from "@/lib/trpc";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { transformArrayPair } from "@/lib/utils";

const chartConfig = {
  E0: {
    label: "E0",
    color: "hsl(var(--muted-foreground))",
  },
  E1: {
    label: "E1",
    color: "hsl(var(--chart-1))",
  },
  E2: {
    label: "E2",
    color: "hsl(var(--chart-2))",
  },
  E3: {
    label: "E3",
    color: "hsl(var(--chart-3))",
  },
  E4: {
    label: "E4",
    color: "hsl(var(--chart-4))",
  },
  E5: {
    label: "E5",
    color: "hsl(var(--chart-5))",
  },
  E6: {
    label: "E6",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function PullGraph() {
  const body = useAtomValue(pullEstimateFormAtom);
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.pullEstimate.queryOptions(body, { placeholderData: keepPreviousData }),
  );

  if (!data) return null;

  const chartData = data.data.map((list, i) => ({
    index: i,
    ...transformArrayPair(list, "eidolon", "rate", (e) => `E${e}`),
  }));
  console.log(chartData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pull Estimate</CardTitle>
        <CardDescription>
          Rough estimate of what {body?.pulls} pulls can get you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="min-h-[200px]" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="index"
              tickCount={10}
              tickLine={false}
              tickMargin={8}
              type="number"
            />
            <YAxis
              axisLine={false}
              tickFormatter={(value) => `${value * 100}`}
              tickLine={false}
              tickMargin={8}
              type="number"
              unit="%"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(_value, payload) => {
                    const pullNum = payload.at(0)?.payload.index;
                    return `Pull ${pullNum}`;
                  }}
                  valueFormatter={(e) => (Number(e) * 100).toFixed(1) + " %"}
                />
              }
              cursor={false}
            />
            {Object.keys(chartConfig).map((key) => (
              <Line
                dataKey={key}
                dot={false}
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                key={key}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
