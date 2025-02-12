import { z } from "zod";

const WEP_SLUGS: WeaponSlug[] = [
  {
    name: "Hare",
    slug: "Blade",
    weaponClass: "BLD",
    dollSlug: "CharolicSR",
    singularRarity: [3, 4],
  },
  {
    name: "Colphne",
    slug: "TaurusCurve",
    weaponClass: "HG",
    dollSlug: "ColphneSR",
    singularRarity: [3, 4],
  },
  {
    name: "Groza",
    slug: "OTS14",
    weaponClass: "AR",
    dollSlug: "GrozaSR",
    singularRarity: [3, 4],
  },
  {
    name: "Nemesis",
    slug: "OM50",
    weaponClass: "RF",
    dollSlug: "NemesisSR",
    singularRarity: [3, 4],
  },
  {
    name: "Sharkry",
    slug: "ROBINSONXCR",
    weaponClass: "AR",
    dollSlug: "SharkrySR",
    singularRarity: [3, 4],
  },
  {
    name: "Cheeta",
    slug: "MP7",
    weaponClass: "SMG",
    dollSlug: "CheetaSR",
    singularRarity: [3, 4],
  },
  {
    name: "Nagant",
    slug: "M1895",
    weaponClass: "HG",
    dollSlug: "NagantSR",
    singularRarity: [3, 4],
  },
  {
    name: "Ksenia",
    slug: "APS",
    weaponClass: "HG",
    dollSlug: "KseniaSR",
    singularRarity: [3, 4],
  },
  {
    name: "Littara",
    slug: "Galil",
    weaponClass: "MG",
    dollSlug: "LittaraSR",
    singularRarity: [3, 4],
  },
  {
    name: "Lotta",
    slug: "M1",
    weaponClass: "SG",
    dollSlug: "LottaSR",
    singularRarity: [3, 4],
  },
  { name: "BP HG", slug: "BpHRssr001", weaponClass: "HG", singularRarity: [5] },
  {
    name: "BP SMG",
    slug: "BpSMGssr001",
    weaponClass: "SMG",
    singularRarity: [5],
  },
  { name: "BP RF", slug: "BpRFssr001", weaponClass: "RF", singularRarity: [5] },
  { name: "BP AR", slug: "BpARssr001", weaponClass: "AR", singularRarity: [5] },
  {
    name: "BP BLD",
    slug: "BpKnifessr001",
    weaponClass: "BLD",
    singularRarity: [5],
  },
  { name: "BP MG", slug: "BpMGssr001", weaponClass: "MG", singularRarity: [5] },
  { name: "BP SG", slug: "BpSGssr001", weaponClass: "SG", singularRarity: [5] },
  { name: "Vepley", slug: "Vepr12", weaponClass: "SG", dollSlug: "VepleySSR" },
  { name: "Tololo", slug: "AK-Alfa", weaponClass: "AR", dollSlug: "TololoSSR" },
  {
    name: "Peritya",
    slug: "Pecheng",
    weaponClass: "MG",
    dollSlug: "PerityaSSR",
  },
  {
    name: "Sabrina",
    slug: "SPAS-12",
    weaponClass: "SG",
    dollSlug: "SabrinaSSR",
  },
  {
    name: "Qiongjiu",
    slug: "QBZ-191",
    weaponClass: "AR",
    dollSlug: "QiongjiuSSR",
  },
  {
    name: "Mosin Nagant",
    slug: "M1891",
    weaponClass: "RF",
    dollSlug: "MosinnagantSSR",
  },
  {
    name: "Svarog",
    slug: "PPSh41",
    weaponClass: "SMG",
    dollSlug: "PapashaSSR",
    singularRarity: [4, 5],
  },
  { name: "Daiyan", slug: "QBZ-95", weaponClass: "AR", dollSlug: "DaiyanSSR" },
  {
    name: "Centaureissi",
    slug: "G36",
    weaponClass: "AR",
    dollSlug: "CentaureissiSSR",
  },
  { name: "UMP9", slug: "UMP9", weaponClass: "SMG", dollSlug: "LennaSSR" },
  { name: "QBZ97", slug: "QBZ97", weaponClass: "AR", dollSlug: "JiangyuSSR" },
  {
    name: "Macchiato",
    slug: "WA2000",
    weaponClass: "RF",
    dollSlug: "MacqiatoSSR",
  },
  { name: "Ullrid", slug: "Ullr", weaponClass: "BLD", dollSlug: "UllridSSR" },
  { name: "Suomi", slug: "M1931", weaponClass: "SMG", dollSlug: "SuomiSSR" },
  {
    name: "Dushevnaya",
    slug: "KSVK",
    weaponClass: "RF",
    dollSlug: "DusevnyjSSR",
  },
  {
    name: "Zhaohui",
    slug: "CSLS06",
    weaponClass: "SMG",
    dollSlug: "ZhaohuiSSR",
  },
  { name: "Klukai", slug: "HK416", weaponClass: "AR", dollSlug: "ClukaySSR" },
  { name: "Mechty", slug: "G11", weaponClass: "AR", dollSlug: "MishtySSR" },
  { name: "Vector", slug: "Vector", weaponClass: "SMG", dollSlug: "VectorSSR" },
  { name: "Belka", slug: "G28", weaponClass: "AR", dollSlug: "BiyocaSSR" },
  {
    name: "Andoris",
    slug: "G36KKSK",
    weaponClass: "AR",
    dollSlug: "AndorisSSR",
  },
  {
    name: "Springfield",
    slug: "M1903",
    weaponClass: "RF",
    dollSlug: "SpringfieldSSR",
  },
  { name: "Faye", slug: "CZ75", weaponClass: "HG", dollSlug: "FayeSSR" },
  { name: "Peri", slug: "MP5", weaponClass: "SMG", dollSlug: "PeriSSR" },
  { name: "Qiuhua", slug: "HAWK12", weaponClass: "SG", dollSlug: "QiuhuaSSR" },
  { name: "K2", slug: "K2", weaponClass: "AR", dollSlug: "YooHeeSSR" },
];

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

type WeaponSlug = {
  name: string;
  /**
   * weapon's slug, based on cn wiki
   */
  slug: string;
  weaponClass: WeaponClass;
  /**
   * @default false
   */
  singularRarity?: number[];
  /**
   * slug of the respective doll if this weapon belongs to a doll
   */
  dollSlug?: string;
};

export interface WeaponMeta {
  name: string;
  id: string;
  weaponClass: WeaponClass;
  rarity: number;
  img: string;
  dollSlug?: string;
}

function weaponMetaSerialize(_slug: WeaponSlug): WeaponMeta[] {
  const {
    name,
    slug,
    weaponClass: weaponClass,
    dollSlug,
    singularRarity,
  } = _slug;
  return (singularRarity ?? [3, 4, 5]).map((rarity) => ({
    name,
    id: slug,
    weaponClass,
    dollSlug,
    img: `https://gf2.mcc.wiki/image/item/Weapon_${slug}_${rarity}_256.png`,
    rarity,
  })) satisfies WeaponMeta[];
}

export const WEP_META: WeaponMeta[] = WEP_SLUGS.map(weaponMetaSerialize).flat();
