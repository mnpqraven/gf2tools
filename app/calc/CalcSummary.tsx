"use client";

import { useAtomValue } from "jotai";
import { calcSummaryAtom } from "./store";

export function CalcSummary() {
  const list = useAtomValue(calcSummaryAtom);
  return <pre>{JSON.stringify(list)}</pre>;
}
