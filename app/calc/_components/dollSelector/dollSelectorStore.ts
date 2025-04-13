import {
  DOLL_CLASS_ENUM,
  DOLL_RARITY_ENUM,
  type DollClassEnum,
  type DollRarityEnum,
} from "@/repository/enums";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithReset } from "jotai/utils";

type DollFilterAtom = {
  // TODO: intergrate
  open: boolean;
  search: string;
  dollClass: DollClassEnum[];
  rarity: DollRarityEnum[];
};
export const dollFilterAtom = atomWithReset<DollFilterAtom>({
  open: false,
  search: "",
  dollClass: DOLL_CLASS_ENUM.options,
  rarity: DOLL_RARITY_ENUM.options,
});

const _dollClassScope = focusAtom(dollFilterAtom, (t) => t.prop("dollClass"));
const _dollRarityScope = focusAtom(dollFilterAtom, (t) => t.prop("rarity"));

export const filterDollClassAtom = atom(
  (get) => get(_dollClassScope),
  (get, set, next: DollClassEnum) => {
    const currentList = get(_dollClassScope);
    const index = currentList.indexOf(next);
    if (index === -1) set(_dollClassScope, [...currentList, next]);
    else
      return set(
        _dollClassScope,
        currentList.filter((e) => e !== next),
      );
  },
);

export const filterDollRarityAtom = atom(
  (get) => get(_dollRarityScope),
  (get, set, next: "COMMON" | "ELITE") => {
    const currentList = get(_dollRarityScope);
    const index = currentList.indexOf(next);
    if (index === -1) set(_dollRarityScope, [...currentList, next]);
    else
      return set(
        _dollRarityScope,
        currentList.filter((e) => e !== next),
      );
  },
);
