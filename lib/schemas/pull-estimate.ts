import { z } from "zod";
import { bannerDict, bannerSchema } from "./banner";

export const pullEstimateSchema = z
  .object({
    currentEidolon: z.number(),
    nextGuaranteed: z.boolean(),
    pityCurrentCount: z.number(),
    pulls: z.number(),
    banner: bannerSchema,
  })
  .default({
    currentEidolon: 0,
    nextGuaranteed: true,
    pityCurrentCount: 1,
    pulls: 180,
    banner: bannerDict.SSRDoll,
  });
