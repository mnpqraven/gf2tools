"use client";

import { useAtomValue } from "jotai";
import { CalcSummary, calcSummaryAtom } from "../../store";
import { AssetIcon, AssetKey } from "@/components/AssetIcon";
import { ReactNode } from "react";

const rows: {
  asset: AssetKey;
  accessor: (item: CalcSummary) => ReactNode;
  enabled?: boolean;
}[] = [
  {
    asset: "CHAR_REPORT",
    accessor: (item) => item.totalCharExp.toLocaleString(),
  },
  {
    asset: "WEP_REPORT",
    accessor: (item) => item.totalWepExp.toLocaleString(),
  },
  {
    asset: "STOCK_BAR_1",
    accessor: (item) => item.stockBar.tier1,
  },
  {
    asset: "STOCK_BAR_2",
    accessor: (item) => item.stockBar.tier2,
  },
  {
    asset: "STOCK_BAR_3",
    accessor: (item) => item.stockBar.tier3,
  },
  {
    asset: "STOCK_BAR_4",
    accessor: (item) => item.stockBar.tier4,
  },
  {
    asset: "STOCK_BAR_5",
    accessor: (item) => item.stockBar.tier5,
  },
  {
    asset: "STOCK_BAR_6",
    accessor: (item) => item.stockBar.tier6,
  },
];

export function CalcSummaryContainer() {
  const summary = useAtomValue(calcSummaryAtom);

  return (
    <div className="flex flex-col gap-1">
      {rows.map(({ accessor, asset, enabled = true }) => (
        <div className="flex items-center" key={asset}>
          <AssetIcon asset={asset} />
          <span>{accessor(summary)}</span>
        </div>
      ))}
    </div>
  );
}
