"use client";

import { AssetIcon, type AssetKey } from "@/components/AssetIcon";
import { useAtomValue } from "jotai";
import type { ReactNode } from "react";
import { type CalcSummary, calcSummaryAtom } from "../../store";

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
    enabled: false,
  },
  {
    asset: "STOCK_BAR_6",
    accessor: (item) => item.stockBar.tier6,
    enabled: false,
  },
];

export function CalcSummaryContainer() {
  const summary = useAtomValue(calcSummaryAtom);

  return (
    <div className="flex flex-col gap-1">
      {rows.map(({ accessor, asset, enabled = true }) =>
        enabled ? (
          <div className="flex items-center" key={asset}>
            <AssetIcon asset={asset} />
            <span>{accessor(summary)}</span>
          </div>
        ) : null,
      )}
    </div>
  );
}
