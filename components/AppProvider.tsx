"use client";

import { Provider } from "jotai";
import { ReactNode } from "react";
import { DevTools } from "jotai-devtools";
import { ThemeProvider } from "next-themes";
import "jotai-devtools/styles.css";

export function AppProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider attribute="class">
      <Provider>
        {children}
        <DevTools />
      </Provider>
    </ThemeProvider>
  );
}
