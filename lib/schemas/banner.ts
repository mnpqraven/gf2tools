import { z } from "zod";

export const bannerSchema = z.object({
  banner: z.number(),
  bannerName: z.string(),
  baseRate: z.number(),
  constPrefix: z.string(),
  constShorthand: z.string(),
  enpitomizedPity: z.number().optional(),
  guaranteed: z.number(),
  maxConst: z.number(),
  maxPity: z.number(),
  minConst: z.number(),
  pitySoftThreshold: z.number(),
  rarity: z.number(),
});

export const bannerTypes = z.enum(["SSRDoll", "Weapon"]);
export type BannerType = z.TypeOf<typeof bannerTypes>
export const bannerDict: Record<BannerType, Banner> = {
  SSRDoll: {
    banner: 0.5,
    bannerName: "Limited SSR Doll",
    baseRate: 0.6,
    constPrefix: "Fortification",
    constShorthand: "V",
    enpitomizedPity: undefined,
    guaranteed: 1,
    maxConst: 6,
    maxPity: 80,
    minConst: -1,
    pitySoftThreshold: 58,
    rarity: 5,
  },
  Weapon: {
    banner: 0.5,
    bannerName: "Limited SSR Weapon",
    baseRate: 0.7,
    constPrefix: "Rank",
    constShorthand: "R",
    enpitomizedPity: undefined,
    guaranteed: 1,
    maxConst: 6,
    maxPity: 70,
    minConst: 0,
    pitySoftThreshold: 50,
    rarity: 5,
  },
};

export type Banner = z.TypeOf<typeof bannerSchema>;
