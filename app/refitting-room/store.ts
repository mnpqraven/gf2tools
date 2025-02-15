import { atom } from "jotai";
import { ArmoryDollShape, NotOwned, OwnedArmoryDoll } from "./types";
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
        data: undefined,
      } satisfies NotOwned,
    ]),
  ) as ArmoryMapDoll,
);

export const dollAtomLookup = atomFamily(
  (slug: DollSlugEnum) => focusAtom(ownMapDollAtom, (t) => t.prop(slug)),
  (a, b) => a === b,
);

const defaultDollOwnership: ArmoryDollShape = {
  level: 1,
  vert: 0,
  helix: 0,
  key: [],
};

export const toggleDollOwnershipAtom = atomFamily(
  (slug: DollSlugEnum) =>
    atom(
      (get) => get(dollAtomLookup(slug)).owned,
      (get, set) => {
        const prev = get(dollAtomLookup(slug));
        set(dollAtomLookup(slug), {
          armoryType: CALC_TYPE_ENUM.enum.CHAR,
          slug,
          ...(prev.owned
            ? { owned: false, data: undefined }
            : { owned: true, data: defaultDollOwnership }),
        });
      },
    ),
  (a, b) => a === b,
);
