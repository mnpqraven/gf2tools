"use client";

import { useAtomValue } from "jotai";
import { teamListSplittedAtom } from "./store";
import { TeamPresetProvider } from "./TeamPresetProvider";
import { TeamPreset } from "./TeamPreset";
import { useCardRef } from "./useCardRef";

export function TeamList() {
  const atoms = useAtomValue(teamListSplittedAtom);
  const { cardRef } = useCardRef();

  return (
    <div className="flex flex-col gap-2" ref={cardRef}>
      {atoms.map((atom) => (
        <TeamPresetProvider atom={atom} key={`${atom}`}>
          <TeamPreset />
        </TeamPresetProvider>
      ))}
    </div>
  );
}
