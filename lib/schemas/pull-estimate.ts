import { z } from "zod";

export const bannerTypeEnum = z.enum(["SSR", "SR", "LC"]);
export const pullEstimateSchema = z
  .object({
    banner: bannerTypeEnum,
    currentEidolon: z.number(),
    nextGuaranteed: z.boolean(),
    pity: z.number(),
    pulls: z.number(),
  })
  .default({
    banner: "SR",
    currentEidolon: 0,
    nextGuaranteed: true,
    pity: 1,
    pulls: 180,
  });
