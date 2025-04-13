import { DOLL_META, byLevelCapHelix, byLevelCapKey } from "@/repository/dolls";
import {
  CALC_TYPE_ENUM,
  DOLL_CLASS_ENUM,
  DOLL_RARITY_ENUM,
  type DollClassEnum,
  type DollRarityEnum,
  type DollSlugEnum,
} from "@/repository/enums";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { type OpticFor_, set as Oset, optic_ } from "optics-ts";
import type { ArmoryDollShape, NotOwned, OwnedArmoryDoll } from "./types";

export type ArmoryDollFilter = {
  rarity: DollRarityEnum[];
  classes: DollClassEnum[];
  // TODO: sortby
};
export const dollFilterAtom = atom<ArmoryDollFilter>({
  rarity: DOLL_RARITY_ENUM.options,
  classes: DOLL_CLASS_ENUM.options,
});

/**
 * family atom type
 */
type ArmoryMapDoll = Record<DollSlugEnum, OwnedArmoryDoll | NotOwned>;

export const ownMapDollAtom = atomWithStorage<ArmoryMapDoll>(
  "ArmoryMapDoll",
  Object.fromEntries(
    DOLL_META.map((doll) => [
      doll.id satisfies DollSlugEnum,
      {
        owned: false,
        expanded: false,
        armoryType: "CHAR",
        slug: doll.id,
        data: undefined,
      } satisfies NotOwned,
    ]),
  ) as ArmoryMapDoll,
);

export const dollAtomLookup = atomFamily(
  (slug: DollSlugEnum) => focusAtom(ownMapDollAtom, (o) => o.prop(slug)),
  (a, b) => a === b,
);

const defaultDollOwnership: ArmoryDollShape = {
  level: 1,
  vert: 0,
  helix: 0,
  key: [false, false, false, false, false, false],
};

export const toggleDollOwnershipAtom = atomFamily(
  (slug: DollSlugEnum) =>
    atom(null, (get, set) => {
      const prev = get(dollAtomLookup(slug));
      set(dollAtomLookup(slug), {
        armoryType: CALC_TYPE_ENUM.enum.CHAR,
        slug,
        ...(prev.owned
          ? { owned: false, expanded: false, data: undefined }
          : { owned: true, expanded: true, data: defaultDollOwnership }),
      });
    }),
  (a, b) => a === b,
);

type DollOptic = OpticFor_<ArmoryMapDoll[DollSlugEnum]>;
const DollAccessors = {
  level: (o: DollOptic = optic_()) =>
    o
      .guard((e) => e.owned)
      .prop("data")
      .prop("level"),
  helix: (o: DollOptic = optic_()) =>
    o
      .guard((e) => e.owned)
      .prop("data")
      .prop("helix"),
  key: (o: DollOptic = optic_()) =>
    o
      .guard((e) => e.owned)
      .prop("data")
      .prop("key"),
  vert: (o: DollOptic = optic_()) =>
    o
      .guard((e) => e.owned)
      .prop("data")
      .prop("vert"),
};

export const vertAtom = atomFamily(
  (slug: DollSlugEnum) => {
    const a = focusAtom(ownMapDollAtom, (o) =>
      o
        .prop(slug)
        .guard((e) => e.owned)
        .prop("data")
        .prop("vert"),
    );
    a.debugLabel = `${slug}_vert`;
    return a;
  },
  (a, b) => a === b,
);

export const dollKeyAtom = atomFamily(
  (slug: DollSlugEnum) => {
    const a = atom(
      (get) => get(dollAtomLookup(slug)).data?.key ?? defaultDollOwnership.key,
      (get, set, toKey: boolean[] | { index: number; value: boolean }) => {
        const doll = get(dollAtomLookup(slug));
        if (!doll.owned) return;

        if (Array.isArray(toKey)) {
          // TODO:
        } else {
          const keyCap = byLevelCapKey(doll.data.level);
          const { index, value } = toKey;
          if (index <= keyCap) {
            const nextKeys = [...doll.data.key];
            nextKeys[index] = value;

            const nextDoll = Oset(DollAccessors.key())(nextKeys)(doll);
            if (nextDoll.owned) set(dollAtomLookup(slug), nextDoll);
          }
        }
      },
    );
    a.debugLabel = `${slug}_key`;
    return a;
  },
  (a, b) => a === b,
);

export const dollHelixAtom = (slug: DollSlugEnum) => {
  const a = atom(
    (get) =>
      get(dollAtomLookup(slug)).data?.helix ?? defaultDollOwnership.helix,
    (get, set, toHelix: number) => {
      const doll = get(dollAtomLookup(slug));
      const level = doll.data?.level;
      if (level === undefined) return;

      if (toHelix <= byLevelCapHelix(level)) {
        const nextDoll = Oset(DollAccessors.helix())(toHelix)(doll);
        set(dollAtomLookup(slug), nextDoll);
      }
    },
  );
  a.debugLabel = `${slug}_helix`;

  return a;
};

export const dollLevelAtom = atomFamily(
  (slug: DollSlugEnum) => {
    const a = atom(
      (get) =>
        get(dollAtomLookup(slug)).data?.level ?? defaultDollOwnership.level,
      (get, set, toLevel: number) => {
        // if not owned then just no-op the whole thing
        // TODO: refactor
        const doll = get(dollAtomLookup(slug));

        if (!doll.owned) return;
        const { helix, key: keys } = doll.data;

        // if level drops below cap then update key and helix to cap
        const capHelix = byLevelCapHelix(toLevel);
        if (helix > capHelix) {
          const nextDoll = Oset(DollAccessors.helix())(capHelix)(doll);
          set(dollAtomLookup(slug), nextDoll);
        }

        const capKey = byLevelCapKey(toLevel);

        if (keys?.some((e, i) => i > capKey && e)) {
          const nextKeys = keys.map((e, i) => (i > capKey ? false : e));
          const nextDoll = Oset(DollAccessors.key())(nextKeys)(doll);
          if (nextDoll.owned) set(dollAtomLookup(slug), nextDoll);
        }

        set(dollAtomLookup(slug), Oset(DollAccessors.level())(toLevel)(doll));
      },
    );
    a.debugLabel = `${slug}_level`;
    return a;
  },
  (a, b) => a === b,
);

export const dollExpandedAtom = atomFamily(
  (slug: DollSlugEnum) =>
    focusAtom(dollAtomLookup(slug), (o) => o.prop("expanded")),
  (a, b) => a === b,
);
