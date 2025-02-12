"use client";

import { DollCard } from "./DollCard";
import { useAtomValue } from "jotai";
import { armoryDollOwnSplittedAtom } from "./store";

export function ClientWrapper() {
  const atoms = useAtomValue(armoryDollOwnSplittedAtom);

  return (
    <div className="flex flex-wrap gap-2">
      {atoms.map((atom) => (
        <DollCard atom={atom} key={`${atom}`} />
      ))}
    </div>
  );
}
