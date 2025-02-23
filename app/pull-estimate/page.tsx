"use client";

import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.pullEstimate.queryOptions());

  console.log(data);

  return <div>data</div>;
}
