import {
  CALC_TYPE_ENUM,
  WEAPON_SLUG_ENUM,
  type WeaponSlugEnum,
} from "@/repository/enums";
import { WEP_SLUGS_MAP } from "@/repository/wep";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { type OpticFor_, optic_ } from "optics-ts";
import type { ArmoryWeaponShape, NotOwned, OwnedArmoryWep } from "./types";

/**
 * family atom type
 */
type ArmoryMapWep = Record<WeaponSlugEnum, OwnedArmoryWep | NotOwned>;

export const ownMapWepAtom = atomWithStorage<ArmoryMapWep>(
  "ArmoryMapWep",
  Object.fromEntries(
    WEAPON_SLUG_ENUM.options.map((slug) => [
      slug satisfies WeaponSlugEnum,
      {
        owned: false,
        expanded: false,
        armoryType: "WEP",
        slug,
        data: undefined,
      } satisfies NotOwned,
    ]),
  ) as ArmoryMapWep,
);

export const wepAtomLookup = atomFamily(
  (slug: WeaponSlugEnum) => focusAtom(ownMapWepAtom, (o) => o.prop(slug)),
  (a, b) => a === b,
);

function defaultWepOwnership(slug: WeaponSlugEnum): ArmoryWeaponShape {
  const rarities = WEP_SLUGS_MAP[slug].rarities ?? [3, 4, 5];
  return {
    rarity: Math.max(...rarities) as 3 | 4 | 5,
    level: 1,
    rank: 1,
  };
}

export const toggleWepOwnershipAtom = atomFamily(
  (slug: WeaponSlugEnum) =>
    atom(null, (get, set) => {
      const prev = get(wepAtomLookup(slug));
      set(wepAtomLookup(slug), {
        armoryType: CALC_TYPE_ENUM.enum.WEP,
        slug,
        ...(prev.owned
          ? { owned: false, expanded: false, data: undefined }
          : { owned: true, expanded: true, data: defaultWepOwnership(slug) }),
      });
    }),
  (a, b) => a === b,
);

type WepOptic = OpticFor_<ArmoryMapWep[WeaponSlugEnum]>;
const WepAccessors = {
  owned: (o: WepOptic = optic_()) => o.prop("owned"),
  level: (o: WepOptic = optic_()) =>
    o
      .guard((e) => e.owned)
      .prop("data")
      .prop("level"),
  rarity: (o: WepOptic = optic_()) =>
    o
      .guard((e) => e.owned)
      .prop("data")
      .prop("rarity"),
  rank: (o: WepOptic = optic_()) =>
    o
      .guard((e) => e.owned)
      .prop("data")
      .prop("rank"),
};

export const wepExpandedAtom = atomFamily(
  (slug: WeaponSlugEnum) =>
    focusAtom(wepAtomLookup(slug), (o) => o.prop("expanded")),
  (a, b) => a === b,
);

export const wepOwnedAtom = atomFamily(
  (slug: WeaponSlugEnum) => focusAtom(wepAtomLookup(slug), WepAccessors.owned),
  (a, b) => a === b,
);

export const wepRankAtom = atomFamily(
  (slug: WeaponSlugEnum) => focusAtom(wepAtomLookup(slug), WepAccessors.rank),
  (a, b) => a === b,
);

export const wepLevelAtom = atomFamily(
  (slug: WeaponSlugEnum) => focusAtom(wepAtomLookup(slug), WepAccessors.level),
  (a, b) => a === b,
);

export const wepRarityAtom = atomFamily(
  (slug: WeaponSlugEnum) => focusAtom(wepAtomLookup(slug), WepAccessors.rarity),
  (a, b) => a === b,
);
