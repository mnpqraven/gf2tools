"use client";

import { useAtomValue } from "jotai";
import { teamListSplittedAtom } from "./store";
import { TeamPresetProvider } from "./TeamPresetProvider";
import { TeamPreset } from "./TeamPreset";

export function TeamList() {
  const atoms = useAtomValue(teamListSplittedAtom);

  return (
    <div className="flex flex-col gap-2">
      {atoms.map((atom) => (
        <TeamPresetProvider atom={atom} key={`${atom}`}>
          <TeamPreset />
        </TeamPresetProvider>
      ))}
    </div>
  );
}
