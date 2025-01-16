"use client";

import { Provider } from "jotai";
import { ReactNode } from "react";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

export function AppProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Provider>
      {children}
      <DevTools />
    </Provider>
  );
}
