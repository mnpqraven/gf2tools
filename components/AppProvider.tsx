"use client";

import "jotai-devtools/styles.css";

import { TRPCProvider } from "@/lib/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { TooltipProvider } from "./ui/tooltip";

export function AppProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider attribute="class">
      <TooltipProvider>
        <TRPCProvider>
          <NuqsAdapter>
            <Provider>
              {children}
              <DevTools isInitialOpen={false} theme="dark" />
              <ReactQueryDevtools initialIsOpen={false} />
            </Provider>
          </NuqsAdapter>
        </TRPCProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
