import { z } from "zod";

const DOLL_SLUGS: DollSlug[] = [
  {
    name: "Krolik",
    dollClass: "vanguard",
    slug: "CharolicSR",
    rarity: "COMMON",
  },
  {
    name: "Colphne",
    dollClass: "support",
    slug: "ColphneSR",
    rarity: "COMMON",
  },
  { name: "Groza", dollClass: "bulwark", slug: "GrozaSR", rarity: "COMMON" },
  {
    name: "Nemesis",
    dollClass: "sentinel",
    slug: "NemesisSR",
    rarity: "COMMON",
  },
  {
    name: "Sharkry",
    dollClass: "sentinel",
    slug: "SharkrySR",
    rarity: "COMMON",
  },
  { name: "Cheeta", dollClass: "support", slug: "CheetaSR", rarity: "COMMON" },
  { name: "Nagant", dollClass: "support", slug: "NagantSR", rarity: "COMMON" },
  { name: "Ksenia", dollClass: "support", slug: "KseniaSR", rarity: "COMMON" },
  {
    name: "Littara",
    dollClass: "sentinel",
    slug: "LittaraSR",
    rarity: "COMMON",
  },
  { name: "Lotta", dollClass: "sentinel", slug: "LottaSR", rarity: "COMMON" },
  { name: "Vepley", dollClass: "vanguard", slug: "VepleySSR" },
  { name: "Tololo", dollClass: "sentinel", slug: "TololoSSR" },
  { name: "Peritya", dollClass: "sentinel", slug: "PerityaSSR" },
  { name: "Sabrina", dollClass: "bulwark", slug: "SabrinaSSR" },
  { name: "Qiongjiu", dollClass: "sentinel", slug: "QiongjiuSSR" },
  { name: "Mosin Nagant", dollClass: "sentinel", slug: "MosinnagantSSR" },
  { name: "Papasha", dollClass: "sentinel", slug: "PapashaSSR" },
  { name: "Daiyan", dollClass: "vanguard", slug: "DaiyanSSR" },
  { name: "Centaureissi", dollClass: "support", slug: "CentaureissiSSR" },
  { name: "Lenna", dollClass: "support", slug: "LennaSSR" },
  { name: "Jiangyu", dollClass: "sentinel", slug: "JiangyuSSR" },
  { name: "Macchiato", dollClass: "sentinel", slug: "MacqiatoSSR" },
  { name: "Ullrid", dollClass: "vanguard", slug: "UllridSSR" },
  { name: "Suomi", dollClass: "support", slug: "SuomiSSR" },
  { name: "Dushevnaya", dollClass: "support", slug: "DusevnyjSSR" },
  { name: "Zhaohui", dollClass: "vanguard", slug: "ZhaohuiSSR" },
  { name: "Klukai", dollClass: "sentinel", slug: "ClukaySSR" },
  { name: "Mechty", dollClass: "support", slug: "MishtySSR" },
  { name: "Vector", dollClass: "support", slug: "VectorSSR" },
  { name: "Belka", dollClass: "vanguard", slug: "BiyocaSSR" },
  { name: "Andoris", dollClass: "bulwark", slug: "AndorisSSR" },
  { name: "Springfield", dollClass: "support", slug: "SpringfieldSSR" },
  { name: "Faye", dollClass: "vanguard", slug: "FayeSSR" },
  { name: "Peri", dollClass: "bulwark", slug: "PeriSSR" },
  { name: "Qiuhua", dollClass: "vanguard", slug: "QiuhuaSSR" },
  { name: "YooHee", dollClass: "support", slug: "YooHeeSSR" },
];

export const DOLL_EXP_TABLE = [
  0, 2, 2, 5, 5, 5, 5, 5, 5, 60, 150, 300, 480, 525, 545, 570, 595, 625, 655,
  685, 715, 860, 1000, 1335, 1670, 1820, 1820, 2000, 2320, 2320, 2320, 2320,
  4220, 4670, 4670, 6490, 7570, 8655, 9735, 10815, 11900, 12980, 14060, 15045,
  23520, 23925, 24565, 25090, 25610, 26135, 26545, 27180, 27700, 28225, 28750,
  29245, 29795, 30315, 30840, 31360,
];

export const dollClassEnum = z.enum([
  "vanguard",
  "support",
  "sentinel",
  "bulwark",
]);
export type DollClass = z.TypeOf<typeof dollClassEnum>;

export const dollRarityEnum = z.enum(["ELITE", "COMMON"]);
export type DollRarity = z.TypeOf<typeof dollRarityEnum>;

type DollSlug = {
  name: string;
  /**
   * doll's slug, based on cn wiki
   */
  slug: string;
  dollClass: DollClass;
  rarity?: "ELITE" | "COMMON";
};

export type DollMeta = {
  name: string;
  id: string;
  rarity: "ELITE" | "COMMON";
  dollClass: DollClass;
  img: {
    head?: string;
    bust?: string;
    chibi?: string;
    artFace?: string;
    artHalf?: string;
    artFull?: string;
    artCard?: string;
  };
};

function dollMetaSerialize(_slug: DollSlug): DollMeta {
  const { name, rarity = "ELITE", slug, dollClass: dollClass } = _slug;
  return {
    name,
    id: slug,
    rarity,
    dollClass,
    img: cnIopImg(slug),
  } satisfies DollMeta;
}

export const DOLL_META: DollMeta[] = DOLL_SLUGS.map(dollMetaSerialize);

export type StockBarConf = [number, number, number, number, number, number];
export const DOLL_UNCAP_TABLE: {
  money: number;
  stockBar: StockBarConf;
}[] = [
  { money: 1000, stockBar: [4, 0, 0, 0, 0, 0] },
  { money: 2000, stockBar: [6, 8, 0, 0, 0, 0] },
  { money: 4000, stockBar: [0, 16, 8, 0, 0, 0] },
  { money: 12000, stockBar: [0, 0, 12, 5, 0, 0] },
];

// TODO: helix + key

function cnIopImg(slug: string): DollMeta["img"] {
  const toUrl = (t: string) => `https://gf2.mcc.wiki/image/doll/${t}.png`;
  return {
    artCard: toUrl(`Img_ChrSkinPic_${slug}`),
    artFace: toUrl(`Avatar_Head_${slug}UP`),
    artFull: toUrl(`Avatar_Whole_${slug}`),
    artHalf: toUrl(`Avatar_Half_${slug}`),
    bust: toUrl(`Avatar_Bust_${slug}`),
    chibi: toUrl(`Avatar_Head_${slug}_Spine`),
    head: toUrl(`Avatar_Head_${slug}`),
  };
}
