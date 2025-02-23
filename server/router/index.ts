import { ky } from "@/lib/ky";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

const pullSchema = z
  .object({
    currentEidolon: z.number(),
    pity: z.number(),
    pulls: z.number(),
    nextGuaranteed: z.boolean(),
    enpitomizedPity: z.number().optional(),
    banner: z.enum(["SR", "SSR", "LC"]),
  })
  .default({
    banner: "SR",
    currentEidolon: 0,
    nextGuaranteed: true,
    pity: 1,
    pulls: 180,
  });

export const appRouter = router({
  greet: publicProcedure.query(async () => ({
    response: "world",
  })),
  pullEstimate: publicProcedure.input(pullSchema).query(async ({ input }) => {
    console.log("INPUT", input);
    const r = await ky.post<unknown, z.TypeOf<typeof pullSchema>>(
      "/gacha/pull_simulation",
      input,
    );
    return r;
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
