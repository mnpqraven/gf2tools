import { atom } from "jotai";
import { NotOwned, OwnedArmoryDoll } from "./types";
import { DOLL_META } from "@/repository/dolls";
import { atomFamily } from "jotai/utils";
import {
  CALC_TYPE_ENUM,
  DOLL_CLASS_ENUM,
  DOLL_RARITY_ENUM,
  DollClassEnum,
  DollRarityEnum,
  DollSlugEnum,
} from "@/repository/enums";
import { focusAtom } from "jotai-optics";

export type ArmoryDollFilter = {
  rarity: DollRarityEnum[];
  classes: DollClassEnum[];
  // TODO: sortby
};
export const dollFilterAtom = atom<ArmoryDollFilter>({
  rarity: DOLL_RARITY_ENUM.options,
  classes: DOLL_CLASS_ENUM.options,
});

type ArmoryMapDoll = Record<DollSlugEnum, OwnedArmoryDoll | NotOwned>;

export const ownMapDollAtom = atom<ArmoryMapDoll>(
  Object.fromEntries(
    DOLL_META.map((doll) => [
      doll.id satisfies DollSlugEnum,
      {
        owned: false,
        armoryType: "CHAR",
        slug: doll.id,
      } satisfies NotOwned,
    ]),
  ) as ArmoryMapDoll,
);

export const dollAtomLookup = atomFamily(
  (slug: DollSlugEnum) => focusAtom(ownMapDollAtom, (t) => t.prop(slug)),
  (a, b) => a === b,
);

export const toggleDollOwnershipAtom = atomFamily(
  (slug: DollSlugEnum) =>
    atom(
      (get) => get(dollAtomLookup(slug)).owned,
      (get, set) => {
        const prev = get(dollAtomLookup(slug));
        if (prev.owned)
          set(dollAtomLookup(slug), {
            owned: false,
            armoryType: CALC_TYPE_ENUM.enum.CHAR,
            slug,
          });
        else
          set(dollAtomLookup(slug), {
            owned: true,
            armoryType: CALC_TYPE_ENUM.enum.CHAR,
            slug,
            data: { level: 1, vert: 0 },
          });
      },
    ),
  (a, b) => a === b,
);
