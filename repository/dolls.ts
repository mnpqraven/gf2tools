const DOLL_SLUGS: DollSlug[] = [
  { name: "Krolik", slug: "CharolicSR", rarity: "COMMON" },
  { name: "Colphne", slug: "ColphneSR", rarity: "COMMON" },
  { name: "Groza", slug: "GrozaSR", rarity: "COMMON" },
  { name: "Nemesis", slug: "NemesisSR", rarity: "COMMON" },
  { name: "Sharkry", slug: "SharkrySR", rarity: "COMMON" },
  { name: "Cheeta", slug: "CheetaSR", rarity: "COMMON" },
  { name: "Nagant", slug: "NagantSR", rarity: "COMMON" },
  { name: "Ksenia", slug: "KseniaSR", rarity: "COMMON" },
  { name: "Littara", slug: "LittaraSR", rarity: "COMMON" },
  { name: "Lotta", slug: "LottaSR", rarity: "COMMON" },
  { name: "Vepley", slug: "VepleySSR" },
  { name: "Tololo", slug: "TololoSSR" },
  { name: "Peritya", slug: "PerityaSSR" },
  { name: "Sabrina", slug: "SabrinaSSR" },
  { name: "Qiongjiu", slug: "QiongjiuSSR" },
  { name: "Mosin Nagant", slug: "MosinnagantSSR" },
  { name: "Papasha", slug: "PapashaSSR" },
  { name: "Daiyan", slug: "DaiyanSSR" },
  { name: "Centaureissi", slug: "CentaureissiSSR" },
  { name: "Lenna", slug: "LennaSSR" },
  { name: "Jiangyu", slug: "JiangyuSSR" },
  { name: "Macchiato", slug: "MacqiatoSSR" },
  { name: "Ullrid", slug: "UllridSSR" },
  { name: "Suomi", slug: "SuomiSSR" },
  { name: "Dushevnaya", slug: "DusevnyjSSR" },
  { name: "Zhaohui", slug: "ZhaohuiSSR" },
  { name: "Klukai", slug: "ClukaySSR" },
  { name: "Mechty", slug: "MishtySSR" },
  { name: "Vector", slug: "VectorSSR" },
  { name: "Belka", slug: "BiyocaSSR" },
  { name: "Andoris", slug: "AndorisSSR" },
  { name: "Springfield", slug: "SpringfieldSSR" },
  { name: "Faye", slug: "FayeSSR" },
  { name: "Peri", slug: "PeriSSR" },
  { name: "Qiuhua", slug: "QiuhuaSSR" },
  { name: "YooHee", slug: "YooHeeSSR" },
];

export const DOLL_EXP_TABLE = [
  0, 2, 2, 5, 5, 5, 5, 5, 5, 60, 150, 300, 480, 525, 545, 570, 595, 625, 655,
  685, 715, 860, 1000, 1335, 1670, 1820, 1820, 2000, 2320, 2320, 2320, 2320,
  4220, 4670, 4670, 6490, 7570, 8655, 9735, 10815, 11900, 12980, 14060, 15045,
  23520, 23925, 24565, 25090, 25610, 26135, 26545, 27180, 27700, 28225, 28750,
  29245, 29795, 30315, 30840, 31360,
];

type DollSlug = {
  name: string;
  /**
   * doll's slug, based on cn wiki
   */
  slug: string;
  rarity?: "ELITE" | "COMMON";
};

export interface DollMeta {
  name: string;
  id: string;
  rarity: "ELITE" | "COMMON";
  img: {
    head?: string;
    bust?: string;
    chibi?: string;
    artFace?: string;
    artHalf?: string;
    artFull?: string;
    artCard?: string;
  };
}

function dollMetaSerialize(_slug: DollSlug): DollMeta {
  const { name, rarity = "ELITE", slug } = _slug;
  return {
    name,
    id: slug,
    rarity,
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
