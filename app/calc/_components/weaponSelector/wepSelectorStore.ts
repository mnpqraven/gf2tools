import { type WeaponClass, weaponClassEnum } from "@/repository/wep";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithReset } from "jotai/utils";

type WeaponFilterAtom = {
  open: boolean;
  search: string;
  weaponClass: WeaponClass[];
  rarity: number[];
};
export const weaponFilterAtom = atomWithReset<WeaponFilterAtom>({
  open: false,
  search: "",
  weaponClass: weaponClassEnum.options,
  rarity: [3, 4, 5],
});

const _weaponClassScope = focusAtom(weaponFilterAtom, (t) =>
  t.prop("weaponClass"),
);
const _weaponRarityScope = focusAtom(weaponFilterAtom, (t) => t.prop("rarity"));

export const filterWeaponClassAtom = atom(
  (get) => get(_weaponClassScope),
  (get, set, next: WeaponClass) => {
    const currentList = get(_weaponClassScope);
    const index = currentList.indexOf(next);
    if (index === -1) set(_weaponClassScope, [...currentList, next]);
    else
      return set(
        _weaponClassScope,
        currentList.filter((e) => e !== next),
      );
  },
);

export const filterWeaponRarityAtom = atom(
  (get) => get(_weaponRarityScope),
  (get, set, next: number) => {
    const currentList = get(_weaponRarityScope);
    const index = currentList.indexOf(next);
    if (index === -1) set(_weaponRarityScope, [...currentList, next]);
    else
      return set(
        _weaponRarityScope,
        currentList.filter((e) => e !== next),
      );
  },
);
