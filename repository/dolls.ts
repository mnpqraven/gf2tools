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
  { name: "Groza", rarity: "COMMON", img: {} },
  { name: "Nemesis", rarity: "COMMON", img: {} },
  { name: "Krolik", rarity: "COMMON", img: {} },
  { name: "Colphne", rarity: "COMMON", img: {} },
  { name: "Sharkry", rarity: "COMMON", img: {} },
  { name: "Tololo", rarity: "COMMON", img: {} },
  { name: "Cheeta", rarity: "COMMON", img: {} },
  { name: "Nagant", rarity: "COMMON", img: {} },
  { name: "Ksenia", rarity: "COMMON", img: {} },
  { name: "Littara", rarity: "COMMON", img: {} },
  { name: "Vepley", rarity: "ELITE", img: {} },
  { name: "Peritya", rarity: "ELITE", img: {} },
  { name: "Sabrina", rarity: "ELITE", img: {} },
  { name: "Qiongjiu", rarity: "ELITE", img: {} },
  { name: "Mosin", rarity: "ELITE", img: {} },
  { name: "Mosin Nagant", rarity: "ELITE", img: {} },
  { name: "Daiyan", rarity: "ELITE", img: {} },
  { name: "Centaureissi", rarity: "ELITE", img: {} },
  { name: "Lenna", rarity: "ELITE", img: {} },
  { name: "Jiangyu", rarity: "ELITE", img: {} },
  { name: "Macchiato", rarity: "ELITE", img: {} },
  { name: "Ullrid", rarity: "ELITE", img: {} },
  { name: "Lotta", rarity: "ELITE", img: {} },
  { name: "Suomi", rarity: "ELITE", img: {} },
  { name: "Dushevnaya", rarity: "ELITE", img: {} },
  { name: "Zhaohui", rarity: "ELITE", img: {} },
  { name: "Papasha", rarity: "ELITE", img: {} },
  { name: "Klukai", rarity: "ELITE", img: {} },
  { name: "Mechty", rarity: "ELITE", img: {} },
  { name: "Vector", rarity: "ELITE", img: {} },
  { name: "Belka", rarity: "ELITE", img: {} },
  { name: "Andoris", rarity: "ELITE", img: {} },
  { name: "Springfield", rarity: "ELITE", img: {} },
  { name: "Faye", rarity: "ELITE", img: {} },
  { name: "Peri", rarity: "ELITE", img: {} },
  { name: "Qiuhua", rarity: "ELITE", img: {} },
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
