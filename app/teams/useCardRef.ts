"use client";

import { useEffect, useRef } from "react";
import { cardRefAtom } from "./store";
import { useSetAtom } from "jotai";

export function useCardRef() {
  const cardRef = useRef<HTMLDivElement>(null);
  const setEnkaRef = useSetAtom(cardRefAtom);
  useEffect(() => {
    setEnkaRef(cardRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { cardRef };
}
