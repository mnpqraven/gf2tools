"use client";

import { useCardRef } from "../useCardRef";

export function PresetCard() {
  const { cardRef } = useCardRef();
  return (
    <div className="flex flex-col gap-2" ref={cardRef}>
      card
    </div>
  );
}
