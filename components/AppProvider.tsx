"use client";

import "jotai-devtools/styles.css";

import { Provider } from "jotai";
import { ReactNode } from "react";
import { DevTools } from "jotai-devtools";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const client = new QueryClient();

export function AppProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={client}>
        <NuqsAdapter>
          <Provider>
            {children}
            <DevTools isInitialOpen={false} theme="dark" />
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        </NuqsAdapter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
