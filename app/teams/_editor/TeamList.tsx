"use client";

import { useAtomValue } from "jotai";
import { teamListSplittedAtom } from "../store";
import { TeamPresetForm } from "./form/TeamPresetForm";
import { TeamPresetProvider } from "./form/TeamPresetProvider";

export function TeamList() {
  const atoms = useAtomValue(teamListSplittedAtom);

  return (
    <div className="flex flex-col gap-2">
      {atoms.map((atom) => (
        <TeamPresetProvider atom={atom} key={`${atom}`}>
          <TeamPresetForm />
        </TeamPresetProvider>
      ))}
    </div>
  );
}
