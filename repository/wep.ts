import { z } from "zod";
import { DollSlugEnum, WeaponClassEnum, WeaponSlugEnum } from "./enums";
import { ASSET_DICT } from "@/components/AssetIcon";

export const WEP_SLUGS_MAP: Record<WeaponSlugEnum, WeaponShortMeta> = {
  Blade: {
    name: "Hare",
    wClass: "BLD",
    dollSlug: "CharolicSR",
    rarities: [3, 4],
  },
  TaurusCurve: {
    name: ".380 Curva",
    wClass: "HG",
    dollSlug: "ColphneSR",
    rarities: [3, 4],
  },
  OTS14: {
    name: "OTs-14",
    wClass: "AR",
    dollSlug: "GrozaSR",
    rarities: [3, 4],
  },
  OM50: {
    name: ".50 Nemesis",
    wClass: "RF",
    dollSlug: "NemesisSR",
    rarities: [3, 4],
  },
  ROBINSONXCR: {
    name: "Robinson Modular Rifle",
    wClass: "AR",
    dollSlug: "SharkrySR",
    rarities: [3, 4],
  },
  MP7: {
    name: "MP7H1",
    wClass: "SMG",
    dollSlug: "CheetaSR",
    rarities: [3, 4],
  },
  M1895: {
    name: "Nagant M1895",
    wClass: "HG",
    dollSlug: "NagantSR",
    rarities: [3, 4],
  },
  APS: {
    name: "Stechkin",
    wClass: "HG",
    dollSlug: "KseniaSR",
    rarities: [3, 4],
  },
  Galil: {
    name: "Model ARM",
    wClass: "MG",
    dollSlug: "LittaraSR",
    rarities: [3, 4],
  },
  M1: {
    name: "M1 Super 90",
    wClass: "SG",
    dollSlug: "LottaSR",
    rarities: [3, 4],
  },
  BpHRssr001: { name: "Papa-Figo", wClass: "HG", rarities: [5] },
  BpSMGssr001: { name: "Classified Manuscript", wClass: "SMG", rarities: [5] },
  BpRFssr001: { name: "Arcana", wClass: "RF", rarities: [5] },
  BpARssr001: { name: "Guerno", wClass: "AR", rarities: [5] },
  BpKnifessr001: { name: "Crowned Jackalope", wClass: "BLD", rarities: [5] },
  BpMGssr001: { name: "Mjölnir", wClass: "MG", rarities: [5] },
  BpSGssr001: { name: "Expeditionary Pigeon", wClass: "SG", rarities: [5] },
  Vepr12: { name: "Heart Seeker", wClass: "SG", dollSlug: "VepleySSR" },
  "AK-Alfa": { name: "Planeta", wClass: "AR", dollSlug: "TololoSSR" },
  Pecheng: { name: "Optical Illusion", wClass: "MG", dollSlug: "PerityaSSR" },
  "SPAS-12": { name: "Mezzaluna", wClass: "SG", dollSlug: "SabrinaSSR" },
  "QBZ-191": { name: "Golden Melody", wClass: "AR", dollSlug: "QiongjiuSSR" },
  M1891: { name: "Samosek", wClass: "RF", dollSlug: "MosinnagantSSR" },
  PPSh41: {
    name: "Svarog",
    wClass: "SMG",
    dollSlug: "PapashaSSR",
    rarities: [4, 5],
  },
  "QBZ-95": { name: "Heavy Strings", wClass: "AR", dollSlug: "DaiyanSSR" },
  G36: { name: "G36", wClass: "AR", dollSlug: "CentaureissiSSR" },
  UMP9: { name: "UMP9", wClass: "SMG", dollSlug: "LennaSSR" },
  QBZ97: { name: "QBZ97", wClass: "AR", dollSlug: "JiangyuSSR" },
  WA2000: {
    name: "Bettersweet Caramel",
    wClass: "RF",
    dollSlug: "MacqiatoSSR",
  },
  Ullr: { name: "Rectrix", wClass: "BLD", dollSlug: "UllridSSR" },
  M1931: { name: "Unspoken Calling", wClass: "SMG", dollSlug: "SuomiSSR" },
  KSVK: { name: "Eulogistic Verse", wClass: "RF", dollSlug: "DusevnyjSSR" },
  CSLS06: { name: "CSLS06", wClass: "SMG", dollSlug: "ZhaohuiSSR" },
  HK416: { name: "HK416", wClass: "AR", dollSlug: "ClukaySSR" },
  G11: { name: "G11", wClass: "AR", dollSlug: "MishtySSR" },
  Vector: { name: "Vector", wClass: "SMG", dollSlug: "VectorSSR" },
  G28: { name: "G28", wClass: "AR", dollSlug: "BiyocaSSR" },
  G36KKSK: { name: "G36KKSK", wClass: "AR", dollSlug: "AndorisSSR" },
  M1903: {
    name: "M1903 Springfield",
    wClass: "RF",
    dollSlug: "SpringfieldSSR",
  },
  CZ75: { name: "CZ75", wClass: "HG", dollSlug: "FayeSSR" },
  MP5: { name: "MP5", wClass: "SMG", dollSlug: "PeriSSR" },
  HAWK12: { name: "HAWK12", wClass: "SG", dollSlug: "QiuhuaSSR" },
  K2: { name: "K2", wClass: "AR", dollSlug: "YooHeeSSR" },
  VSK94: { name: "VSK94", wClass: "RF", dollSlug: "NikketaSSR" },
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
  dollSlug?: DollSlugEnum;
};

export interface WeaponMeta {
  name: string;
  /**
   * weapon's slug with rarity suffix, based on cn wiki
   */
  id: `${WeaponSlugEnum}_${number}`;
  /**
   * original slug without rarity suffix
   */
  slug: WeaponSlugEnum;
  weaponClass: WeaponClass;
  rarity: number;
  img: string;
  /**
   * slug of the respective doll if this weapon belongs to a doll
   */
  dollSlug?: DollSlugEnum;
}

function weaponMetaPropagate(): WeaponMeta[] {
  const t: WeaponMeta[] = Object.entries(WEP_SLUGS_MAP)
    .map(
      ([
        key,
        { name, dollSlug, rarities: singularRarity = [3, 4, 5], wClass },
      ]) =>
        singularRarity.map((rarity) => ({
          name,
          id: `${key as WeaponSlugEnum}_${rarity}`,
          slug: key as WeaponSlugEnum,
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

export function wepImgSrc(slug: WeaponSlugEnum, rarity: 3 | 4 | 5) {
  return `https://gf2.mcc.wiki/image/item/Weapon_${slug}_${rarity}_256.png`;
}
export function maxWepRarity(slug: WeaponSlugEnum): 3 | 4 | 5 {
  const rarities = WEP_SLUGS_MAP[slug].rarities ?? ([3, 4, 5] as const);
  return Math.max(...rarities) as 3 | 4 | 5;
}

export function minWepRarity(slug: WeaponSlugEnum): 3 | 4 | 5 {
  const rarities = WEP_SLUGS_MAP[slug].rarities ?? ([3, 4, 5] as const);
  return Math.min(...rarities) as 3 | 4 | 5;
}

export function wepClassAssetEnum(
  wepClass: WeaponClassEnum,
): keyof typeof ASSET_DICT {
  switch (wepClass) {
    case "AR":
      return "WEP_CLASS_AR";
    case "MG":
      return "WEP_CLASS_MG";
    case "SMG":
      return "WEP_CLASS_SMG";
    case "HG":
      return "WEP_CLASS_HG";
    case "SG":
      return "WEP_CLASS_SG";
    case "BLD":
      return "WEP_CLASS_BLD";
    case "RF":
      return "WEP_CLASS_RF";
  }
}
