"use client";

import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { cardRefAtom } from "./store";

export function useCardRef() {
  const cardRef = useRef<HTMLDivElement>(null);
  const setEnkaRef = useSetAtom(cardRefAtom);
  // biome-ignore lint/correctness/useExhaustiveDependencies: safe
  useEffect(() => {
    setEnkaRef(cardRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { cardRef };
}
