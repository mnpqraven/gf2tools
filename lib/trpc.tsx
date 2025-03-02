"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { ReactNode, useState } from "react";
import type { AppRouter } from "@/server/router";
import { createTRPCContext } from "@trpc/tanstack-react-query";

const { TRPCProvider: _TRPCProvider_INTERNAL, useTRPC } =
  createTRPCContext<AppRouter>();

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

function getBaseUrl() {
  // browser should use relative path
  if (typeof window !== "undefined") return "";
  // reference for vercel.com
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function TRPCProvider({ children }: { children: ReactNode }) {
  const url = getBaseUrl();
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${url}/api/trpc`,
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <_TRPCProvider_INTERNAL queryClient={queryClient} trpcClient={trpcClient}>
        {children}
      </_TRPCProvider_INTERNAL>
    </QueryClientProvider>
  );
}

export { useTRPC };
