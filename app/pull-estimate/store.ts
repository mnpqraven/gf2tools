import { pullEstimateSchema } from "@/lib/schemas/pull-estimate";
import { atom } from "jotai";
import { z } from "zod";

export const pullEstimateFormAtom = atom<
  z.TypeOf<typeof pullEstimateSchema> | undefined
>(undefined);
