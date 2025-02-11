const WEP_SLUGS: WeaponSlug[] = [
  {
    name: "Hare",
    slug: "Blade",
    dollSlug: "CharolicSR",
    singularRarity: [3, 4],
  },
  {
    name: "Colphne",
    slug: "TaurusCurve",
    dollSlug: "ColphneSR",
    singularRarity: [3, 4],
  },
  { name: "Groza", slug: "OTS14", dollSlug: "GrozaSR", singularRarity: [3, 4] },
  {
    name: "Nemesis",
    slug: "OM50",
    dollSlug: "NemesisSR",
    singularRarity: [3, 4],
  },
  {
    name: "Sharkry",
    slug: "ROBINSONXCR",
    dollSlug: "SharkrySR",
    singularRarity: [3, 4],
  },
  { name: "Cheeta", slug: "MP7", dollSlug: "CheetaSR", singularRarity: [3, 4] },
  {
    name: "Nagant",
    slug: "M1895",
    dollSlug: "NagantSR",
    singularRarity: [3, 4],
  },
  { name: "Ksenia", slug: "APS", dollSlug: "KseniaSR", singularRarity: [3, 4] },
  {
    name: "Littara",
    slug: "Galil",
    dollSlug: "LittaraSR",
    singularRarity: [3, 4],
  },
  { name: "Lotta", slug: "M1", dollSlug: "LottaSR", singularRarity: [3, 4] },
  { name: "BP HG", slug: "BpHRssr001", singularRarity: [5] },
  { name: "BP SMG", slug: "BpSMGssr001", singularRarity: [5] },
  { name: "BP RF", slug: "BpRFssr001", singularRarity: [5] },
  { name: "BP AR", slug: "BpARssr001", singularRarity: [5] },
  { name: "BP BLD", slug: "BpKnifessr001", singularRarity: [5] },
  { name: "BP MG", slug: "BpMGssr001", singularRarity: [5] },
  { name: "BP SG", slug: "BpSGssr001", singularRarity: [5] },
  { name: "Vepley", slug: "Vepr12", dollSlug: "VepleySSR" },
  { name: "Tololo", slug: "AK-Alfa", dollSlug: "TololoSSR" },
  { name: "Peritya", slug: "Pecheng", dollSlug: "PerityaSSR" },
  { name: "Sabrina", slug: "SPAS-12", dollSlug: "SabrinaSSR" },
  { name: "Qiongjiu", slug: "QBZ-191", dollSlug: "QiongjiuSSR" },
  { name: "Mosin Nagant", slug: "M1891", dollSlug: "MosinnagantSSR" },
  {
    name: "Svarog",
    slug: "PPSh41",
    dollSlug: "PapashaSSR",
    singularRarity: [4, 5],
  },
  { name: "Daiyan", slug: "QBZ-95", dollSlug: "DaiyanSSR" },
  { name: "Centaureissi", slug: "G36", dollSlug: "CentaureissiSSR" },
  { name: "UMP9", slug: "UMP9", dollSlug: "LennaSSR" },
  { name: "QBZ97", slug: "QBZ97", dollSlug: "JiangyuSSR" },
  { name: "Macchiato", slug: "WA2000", dollSlug: "MacqiatoSSR" },
  { name: "Ullrid", slug: "Ullr", dollSlug: "UllridSSR" },
  { name: "Suomi", slug: "M1931", dollSlug: "SuomiSSR" },
  { name: "Dushevnaya", slug: "KSVK", dollSlug: "DusevnyjSSR" },
  { name: "Zhaohui", slug: "CSLS06", dollSlug: "ZhaohuiSSR" },
  { name: "Klukai", slug: "HK416", dollSlug: "ClukaySSR" },
  { name: "Mechty", slug: "G11", dollSlug: "MishtySSR" },
  { name: "Vector", slug: "Vector", dollSlug: "VectorSSR" },
  { name: "Belka", slug: "G28", dollSlug: "BiyocaSSR" },
  { name: "Andoris", slug: "G36KKSK", dollSlug: "AndorisSSR" },
  { name: "Springfield", slug: "M1903", dollSlug: "SpringfieldSSR" },
  { name: "Faye", slug: "CZ75", dollSlug: "FayeSSR" },
  { name: "Peri", slug: "MP5", dollSlug: "PeriSSR" },
  { name: "Qiuhua", slug: "HAWK12", dollSlug: "QiuhuaSSR" },
  { name: "K2", slug: "K2", dollSlug: "YooHeeSSR" },
];

export const WEP_EXP_TABLE = [
  0, 5, 10, 20, 25, 30, 55, 105, 160, 210, 265, 315, 340, 370, 395, 395, 410,
  510, 610, 715, 815, 860, 1000, 1335, 1750, 1910, 2275, 2500, 2500, 2500, 2580,
  2580, 4125, 5160, 6190, 7995, 8795, 9595, 10395, 11195, 11995, 12790, 13590,
  17990, 27840, 28460, 29080, 29695, 30315, 30935, 31555, 32170, 32790, 33410,
  34025, 34645, 35265, 35885, 36500, 38000,
];

type WeaponSlug = {
  name: string;
  /**
   * weapon's slug, based on cn wiki
   */
  slug: string;
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
  rarity: number;
  img: string;
  dollSlug?: string;
}

function weaponMetaSerialize(_slug: WeaponSlug): WeaponMeta[] {
  const { name, slug, dollSlug, singularRarity } = _slug;
  return (singularRarity ?? [3, 4, 5]).map((rarity) => ({
    name,
    id: slug,
    dollSlug,
    img: `https://gf2.mcc.wiki/image/item/Weapon_${slug}_${rarity}_256.png`,
    rarity,
  })) satisfies WeaponMeta[];
}

export const WEP_META: WeaponMeta[] = WEP_SLUGS.map(weaponMetaSerialize).flat();
