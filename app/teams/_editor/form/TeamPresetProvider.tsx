import type { PrimitiveAtom } from "jotai";
import { type ReactNode, createContext, use } from "react";
import type { TeamPreset } from "../../types";

interface ContextReturn {
  atom: PrimitiveAtom<TeamPreset>;
}

const teamPresetContext = createContext<ContextReturn | undefined>(undefined);

export function TeamPresetProvider({
  atom,
  children,
}: {
  atom: PrimitiveAtom<TeamPreset>;
  children: ReactNode;
}) {
  return (
    <teamPresetContext.Provider value={{ atom }}>
      {children}
    </teamPresetContext.Provider>
  );
}

export function useTeamPreset() {
  const ctx = use(teamPresetContext);
  if (!ctx) throw new Error("useTeamPreset used outside provider");
  return ctx;
}
