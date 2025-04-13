import type { ASSET_DICT } from "@/components/AssetIcon";
import {
  DOLL_RARITY_ENUM,
  DOLL_SLUG_ENUM,
  type DollClassEnum,
  type DollRarityEnum,
  type DollSlugEnum,
} from "./enums";

export const DOLL_SLUGS_MAP: Record<DollSlugEnum, DollShortMeta> = {
  CharolicSR: { name: "Krolik", dClass: "vanguard", rarity: "COMMON" },
  ColphneSR: { name: "Colphne", dClass: "support", rarity: "COMMON" },
  GrozaSR: { name: "Groza", dClass: "bulwark", rarity: "COMMON" },
  NemesisSR: { name: "Nemesis", dClass: "sentinel", rarity: "COMMON" },
  SharkrySR: { name: "Sharkry", dClass: "sentinel", rarity: "COMMON" },
  CheetaSR: { name: "Cheeta", dClass: "support", rarity: "COMMON" },
  NagantSR: { name: "Nagant", dClass: "support", rarity: "COMMON" },
  KseniaSR: { name: "Ksenia", dClass: "support", rarity: "COMMON" },
  LittaraSR: { name: "Littara", dClass: "sentinel", rarity: "COMMON" },
  LottaSR: { name: "Lotta", dClass: "sentinel", rarity: "COMMON" },
  VepleySSR: { name: "Vepley", dClass: "vanguard" },
  TololoSSR: { name: "Tololo", dClass: "sentinel" },
  PerityaSSR: { name: "Peritya", dClass: "sentinel" },
  SabrinaSSR: { name: "Sabrina", dClass: "bulwark" },
  QiongjiuSSR: { name: "Qiongjiu", dClass: "sentinel" },
  MosinnagantSSR: { name: "Mosin Nagant", dClass: "sentinel" },
  PapashaSSR: { name: "Papasha", dClass: "sentinel" },
  DaiyanSSR: { name: "Daiyan", dClass: "vanguard" },
  CentaureissiSSR: { name: "Centaureissi", dClass: "support" },
  LennaSSR: { name: "Lenna", dClass: "support" },
  JiangyuSSR: { name: "Jiangyu", dClass: "sentinel" },
  MacqiatoSSR: { name: "Macchiato", dClass: "sentinel" },
  UllridSSR: { name: "Ullrid", dClass: "vanguard" },
  SuomiSSR: { name: "Suomi", dClass: "support" },
  DusevnyjSSR: { name: "Dushevnaya", dClass: "support" },
  ZhaohuiSSR: { name: "Zhaohui", dClass: "vanguard" },
  ClukaySSR: { name: "Klukai", dClass: "sentinel" },
  MishtySSR: { name: "Mechty", dClass: "support" },
  VectorSSR: { name: "Vector", dClass: "support" },
  BiyocaSSR: { name: "Belka", dClass: "vanguard" },
  AndorisSSR: { name: "Andoris", dClass: "bulwark" },
  SpringfieldSSR: { name: "Springfield", dClass: "support" },
  FayeSSR: { name: "Faye", dClass: "vanguard" },
  PeriSSR: { name: "Peri", dClass: "bulwark" },
  QiuhuaSSR: { name: "Qiuhua", dClass: "vanguard" },
  YooHeeSSR: { name: "YooHee", dClass: "support" },
  NikketaSSR: { name: "Nikketa", dClass: "sentinel" },
};

export const DOLL_EXP_TABLE = [
  0, 2, 2, 5, 5, 5, 5, 5, 5, 60, 150, 300, 480, 525, 545, 570, 595, 625, 655,
  685, 715, 860, 1000, 1335, 1670, 1820, 1820, 2000, 2320, 2320, 2320, 2320,
  4220, 4670, 4670, 6490, 7570, 8655, 9735, 10815, 11900, 12980, 14060, 15045,
  23520, 23925, 24565, 25090, 25610, 26135, 26545, 27180, 27700, 28225, 28750,
  29245, 29795, 30315, 30840, 31360,
];

type DollShortMeta = {
  name: string;
  dClass: DollClassEnum;
  rarity?: DollRarityEnum;
};

export type DollMeta = {
  name: string;
  /**
   * doll's slug, based on cn wiki
   */
  id: DollSlugEnum;
  rarity: DollRarityEnum;
  dollClass: DollClassEnum;
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

function dollMetaPropagate(): DollMeta[] {
  const t: DollMeta[] = Object.entries(DOLL_SLUGS_MAP).map(
    ([id, { name, dClass: dollClass, rarity = DOLL_RARITY_ENUM.enum.ELITE }]) =>
      ({
        name,
        id: DOLL_SLUG_ENUM.parse(id),
        rarity,
        dollClass,
        img: cnIopImg(id),
      }) satisfies DollMeta,
  );
  return t;
}

export const DOLL_META: DollMeta[] = dollMetaPropagate();

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

/**
 * @returns highest tier of helix available
 */
export function byLevelCapHelix(level: number): number {
  if (level < 20) return 1;
  if (level < 25) return 2;
  if (level < 30) return 3;
  if (level < 35) return 4;
  if (level < 40) return 5;
  return 6;
}

/**
 * @returns highest index of key tier
 */
export function byLevelCapKey(level: number): number {
  if (level < 20) return 1;
  if (level < 30) return 3;
  // TODO: double check
  return 5;
}

export function dollClassAssetEnum(
  dollClass: DollClassEnum,
): keyof typeof ASSET_DICT {
  switch (dollClass) {
    case "vanguard":
      return "DOLL_CLASS_VANGUARD";
    case "support":
      return "DOLL_CLASS_SUPPORT";
    case "sentinel":
      return "DOLL_CLASS_SENTINEL";
    case "bulwark":
      return "DOLL_CLASS_BULWARK";
  }
}

// NOTE: for key calc
// tier1: 3k gold 1/3 cores
// tier2: 8k gold 1/3 cores
// tier2: 12k gold 1/3 cores

// NOTE: for helix calc
// conductor count, money (lvl req) | conductor count, money (lvl req)
// 1st block: 20x T1 1k (none) | 20x T2 2k (20)
// 2nd block: 40x T3 4k (25) | 80x T4 8k (30)
// 3rd block: 120x T5 10k (35) | 160 T6 12k (40)
