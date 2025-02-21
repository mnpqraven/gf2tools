import { PrimitiveAtom } from "jotai";
import { createContext, ReactNode, use } from "react";
import { CalcObject } from "../../store";

const CalcBoxContext = createContext<
  { atom: PrimitiveAtom<CalcObject> } | undefined
>(undefined);

export function CalcBoxProvider({
  atom,
  children,
}: {
  atom: PrimitiveAtom<CalcObject>;
  children: ReactNode;
}) {
  return (
    <CalcBoxContext.Provider value={{ atom }}>
      {children}
    </CalcBoxContext.Provider>
  );
}

export function useCalcBox() {
  const ctx = use(CalcBoxContext);
  if (!ctx) throw new Error("useCalcBox used outside CalcBoxContext");
  return ctx;
}
