import { z } from "zod";
import { WEAPON_SLUG_ENUM, WeaponSlugEnum } from "./enums";

const WEP_SLUGS: Record<WeaponSlugEnum, WeaponShortMeta> = {
  Blade: {
    name: "Hare",
    wClass: "BLD",
    dollSlug: "CharolicSR",
    rarities: [3, 4],
  },
  TaurusCurve: {
    name: "Colphne",
    wClass: "HG",
    dollSlug: "ColphneSR",
    rarities: [3, 4],
  },
  OTS14: { name: "Groza", wClass: "AR", dollSlug: "GrozaSR", rarities: [3, 4] },
  OM50: {
    name: "Nemesis",
    wClass: "RF",
    dollSlug: "NemesisSR",
    rarities: [3, 4],
  },
  ROBINSONXCR: {
    name: "Sharkry",
    wClass: "AR",
    dollSlug: "SharkrySR",
    rarities: [3, 4],
  },
  MP7: {
    name: "Cheeta",
    wClass: "SMG",
    dollSlug: "CheetaSR",
    rarities: [3, 4],
  },
  M1895: {
    name: "Nagant",
    wClass: "HG",
    dollSlug: "NagantSR",
    rarities: [3, 4],
  },
  APS: { name: "Ksenia", wClass: "HG", dollSlug: "KseniaSR", rarities: [3, 4] },
  Galil: {
    name: "Littara",
    wClass: "MG",
    dollSlug: "LittaraSR",
    rarities: [3, 4],
  },
  M1: { name: "Lotta", wClass: "SG", dollSlug: "LottaSR", rarities: [3, 4] },
  BpHRssr001: { name: "BP HG", wClass: "HG", rarities: [5] },
  BpSMGssr001: { name: "BP SMG", wClass: "SMG", rarities: [5] },
  BpRFssr001: { name: "BP RF", wClass: "RF", rarities: [5] },
  BpARssr001: { name: "BP AR", wClass: "AR", rarities: [5] },
  BpKnifessr001: { name: "BP BLD", wClass: "BLD", rarities: [5] },
  BpMGssr001: { name: "BP MG", wClass: "MG", rarities: [5] },
  BpSGssr001: { name: "BP SG", wClass: "SG", rarities: [5] },
  Vepr12: { name: "Vepley", wClass: "SG", dollSlug: "VepleySSR" },
  "AK-Alfa": { name: "Tololo", wClass: "AR", dollSlug: "TololoSSR" },
  Pecheng: { name: "Peritya", wClass: "MG", dollSlug: "PerityaSSR" },
  "SPAS-12": { name: "Sabrina", wClass: "SG", dollSlug: "SabrinaSSR" },
  "QBZ-191": { name: "Qiongjiu", wClass: "AR", dollSlug: "QiongjiuSSR" },
  M1891: { name: "Mosin Nagant", wClass: "RF", dollSlug: "MosinnagantSSR" },
  PPSh41: {
    name: "Svarog",
    wClass: "SMG",
    dollSlug: "PapashaSSR",
    rarities: [4, 5],
  },
  "QBZ-95": { name: "Daiyan", wClass: "AR", dollSlug: "DaiyanSSR" },
  G36: { name: "Centaureissi", wClass: "AR", dollSlug: "CentaureissiSSR" },
  UMP9: { name: "UMP9", wClass: "SMG", dollSlug: "LennaSSR" },
  QBZ97: { name: "QBZ97", wClass: "AR", dollSlug: "JiangyuSSR" },
  WA2000: { name: "Macchiato", wClass: "RF", dollSlug: "MacqiatoSSR" },
  Ullr: { name: "Ullrid", wClass: "BLD", dollSlug: "UllridSSR" },
  M1931: { name: "Suomi", wClass: "SMG", dollSlug: "SuomiSSR" },
  KSVK: { name: "Dushevnaya", wClass: "RF", dollSlug: "DusevnyjSSR" },
  CSLS06: { name: "Zhaohui", wClass: "SMG", dollSlug: "ZhaohuiSSR" },
  HK416: { name: "Klukai", wClass: "AR", dollSlug: "ClukaySSR" },
  G11: { name: "Mechty", wClass: "AR", dollSlug: "MishtySSR" },
  Vector: { name: "Vector", wClass: "SMG", dollSlug: "VectorSSR" },
  G28: { name: "Belka", wClass: "AR", dollSlug: "BiyocaSSR" },
  G36KKSK: { name: "Andoris", wClass: "AR", dollSlug: "AndorisSSR" },
  M1903: { name: "Springfield", wClass: "RF", dollSlug: "SpringfieldSSR" },
  CZ75: { name: "Faye", wClass: "HG", dollSlug: "FayeSSR" },
  MP5: { name: "Peri", wClass: "SMG", dollSlug: "PeriSSR" },
  HAWK12: { name: "Qiuhua", wClass: "SG", dollSlug: "QiuhuaSSR" },
  K2: { name: "K2", wClass: "AR", dollSlug: "YooHeeSSR" },
};

export const WEP_EXP_TABLE = [
  0, 5, 10, 20, 25, 30, 55, 105, 160, 210, 265, 315, 340, 370, 395, 395, 410,
  510, 610, 715, 815, 860, 1000, 1335, 1750, 1910, 2275, 2500, 2500, 2500, 2580,
  2580, 4125, 5160, 6190, 7995, 8795, 9595, 10395, 11195, 11995, 12790, 13590,
  17990, 27840, 28460, 29080, 29695, 30315, 30935, 31555, 32170, 32790, 33410,
  34025, 34645, 35265, 35885, 36500, 38000,
];

export const weaponClassEnum = z.enum([
  "AR",
  "MG",
  "SMG",
  "HG",
  "SG",
  "BLD",
  "RF",
]);
export type WeaponClass = z.TypeOf<typeof weaponClassEnum>;

type WeaponShortMeta = {
  name: string;
  wClass: WeaponClass;
  /**
   * @default [3,4,5]
   */
  rarities?: number[];
  dollSlug?: string;
};

export interface WeaponMeta {
  name: string;
  /**
   * weapon's slug, based on cn wiki
   */
  id: WeaponSlugEnum;
  weaponClass: WeaponClass;
  rarity: number;
  img: string;
  /**
   * slug of the respective doll if this weapon belongs to a doll
   */
  dollSlug?: string;
}

function weaponMetaPropagate(): WeaponMeta[] {
  const t: WeaponMeta[] = Object.entries(WEP_SLUGS)
    .map(
      ([
        key,
        { name, dollSlug, rarities: singularRarity = [3, 4, 5], wClass },
      ]) =>
        singularRarity.map((rarity) => ({
          name,
          id: WEAPON_SLUG_ENUM.parse(key),
          weaponClass: wClass,
          dollSlug,
          img: `https://gf2.mcc.wiki/image/item/Weapon_${key}_${rarity}_256.png`,
          rarity,
        })) satisfies WeaponMeta[],
    )
    .flat();
  return t;
}

export const WEP_META: WeaponMeta[] = weaponMetaPropagate();
