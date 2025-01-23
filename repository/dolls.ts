interface DollMeta {
  name: string;
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

export const DOLL_META: DollMeta[] = [
  { name: "Krolik", rarity: "COMMON", img: cnIopImg("CharolicSR") },
  { name: "Colphne", rarity: "COMMON", img: cnIopImg("ColphneSR") },
  { name: "Groza", rarity: "COMMON", img: cnIopImg("GrozaSR") },
  { name: "Nemesis", rarity: "COMMON", img: cnIopImg("NemesisSR") },
  { name: "Sharkry", rarity: "COMMON", img: cnIopImg("SharkrySR") },
  { name: "Cheeta", rarity: "COMMON", img: cnIopImg("CheetaSR") },
  { name: "Nagant", rarity: "COMMON", img: cnIopImg("NagantSR") },
  { name: "Ksenia", rarity: "COMMON", img: cnIopImg("KseniaSR") },
  { name: "Littara", rarity: "COMMON", img: cnIopImg("LittaraSR") },
  { name: "Lotta", rarity: "COMMON", img: cnIopImg("LottaSR") },
  { name: "Vepley", rarity: "ELITE", img: cnIopImg("VepleySSR") },
  { name: "Tololo", rarity: "ELITE", img: cnIopImg("TololoSSR") },
  { name: "Peritya", rarity: "ELITE", img: cnIopImg("PerityaSSR") },
  { name: "Sabrina", rarity: "ELITE", img: cnIopImg("SabrinaSSR") },
  { name: "Qiongjiu", rarity: "ELITE", img: cnIopImg("QiongjiuSSR") },
  { name: "Mosin Nagant", rarity: "ELITE", img: cnIopImg("MosinnagantSSR") },
  { name: "Papasha", rarity: "ELITE", img: cnIopImg("PapashaSSR") },
  { name: "Daiyan", rarity: "ELITE", img: cnIopImg("DaiyanSSR") },
  { name: "Centaureissi", rarity: "ELITE", img: cnIopImg("CentaureissiSSR") },
  { name: "Lenna", rarity: "ELITE", img: cnIopImg("LennaSSR") },
  { name: "Jiangyu", rarity: "ELITE", img: cnIopImg("JiangyuSSR") },
  { name: "Macchiato", rarity: "ELITE", img: cnIopImg("MacqiatoSSR") },
  { name: "Ullrid", rarity: "ELITE", img: cnIopImg("UllridSSR") },
  { name: "Suomi", rarity: "ELITE", img: cnIopImg("SuomiSSR") },
  { name: "Dushevnaya", rarity: "ELITE", img: cnIopImg("DusevnyjSSR") },
  { name: "Zhaohui", rarity: "ELITE", img: cnIopImg("ZhaohuiSSR") },
  { name: "Klukai", rarity: "ELITE", img: cnIopImg("ClukaySSR") },
  { name: "Mechty", rarity: "ELITE", img: cnIopImg("MishtySSR") },
  { name: "Vector", rarity: "ELITE", img: cnIopImg("VectorSSR") },
  { name: "Belka", rarity: "ELITE", img: cnIopImg("BiyocaSSR") },
  { name: "Andoris", rarity: "ELITE", img: cnIopImg("AndorisSSR") },
  { name: "Springfield", rarity: "ELITE", img: cnIopImg("SpringfieldSSR") },
  { name: "Faye", rarity: "ELITE", img: cnIopImg("FayeSSR") },
  { name: "Peri", rarity: "ELITE", img: cnIopImg("PeriSSR") },
  { name: "Qiuhua", rarity: "ELITE", img: cnIopImg("QiuhuaSSR") },
];

// TODO:
export const DOLL_KEYS = [];

export const DOLL_EXP_TABLE = [
  0, 2, 2, 5, 5, 5, 5, 5, 5, 60, 150, 300, 480, 525, 545, 570, 595, 625, 655,
  685, 715, 860, 1000, 1335, 1670, 1820, 1820, 2000, 2320, 2320, 2320, 2320,
  4220, 4670, 4670, 6490, 7570, 8655, 9735, 10815, 11900, 12980, 14060, 15045,
  23520, 23925, 24565, 25090, 25610, 26135, 26545, 27180, 27700, 28225, 28750,
  29245, 29795, 30315, 30840, 31360,
];

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
