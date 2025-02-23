"use client";

import { PullForm } from "./PullForm";
import { PullGraph } from "./PullGraph";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <PullForm />

      <PullGraph />
    </div>
  );
}
