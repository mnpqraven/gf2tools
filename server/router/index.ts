import { ky } from "@/lib/ky";
import type { Banner } from "@/lib/schemas/banner";
import { pullEstimateSchema } from "@/lib/schemas/pull-estimate";
import type { z } from "zod";
import { publicProcedure, router } from "../trpc";

export type PullEstimateResponse = {
  data: {
    eidolon: number;
    rate: number;
  }[][];
  roll_budget: number;
  banner: Banner;
};

export const appRouter = router({
  greet: publicProcedure.query(async () => ({
    response: "world",
  })),
  pullEstimate: publicProcedure
    .input(pullEstimateSchema)
    .query(async ({ input }) => {
      console.log("INPUT", input);
      const r = await ky.post<
        PullEstimateResponse,
        z.TypeOf<typeof pullEstimateSchema>
      >("/gacha/pull_simulation", input);
      return r;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
