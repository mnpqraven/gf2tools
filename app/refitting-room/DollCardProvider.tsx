"use client";

import { createContext, ReactNode, use } from "react";
import { MaybeOwnedArmoryDoll } from "./types";
import { PrimitiveAtom } from "jotai";

type ContextProps = {
  atom: PrimitiveAtom<MaybeOwnedArmoryDoll>;
};
const DollCardContext = createContext<ContextProps | undefined>(undefined);

export function DollCardProvider({
  atom,
  children,
}: ContextProps & {
  children: ReactNode;
}) {
  return (
    <DollCardContext.Provider value={{ atom }}>
      {children}
    </DollCardContext.Provider>
  );
}

export function useDollCard() {
  const ctx = use(DollCardContext);
  if (!ctx)
    throw new Error("this hook can only be used inside <DollCardProvider />");
  return ctx;
}
