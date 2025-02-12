import { atom } from "jotai";
import { MaybeOwnedArmoryDoll } from "./types";
import { DOLL_META } from "@/repository/dolls";
import { splitAtom } from "jotai/utils";

export const armoryDollOwnDictAtom = atom<MaybeOwnedArmoryDoll[]>(
  DOLL_META.map(
    (doll) =>
      ({
        owned: false,
        armoryType: "CHAR",
        slug: doll.id,
      }) satisfies MaybeOwnedArmoryDoll
  )
);

export const armoryDollOwnSplittedAtom = splitAtom(
  armoryDollOwnDictAtom,
  (doll) => doll.slug
);
