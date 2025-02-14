import { z } from "zod";

export const DOLL_SLUG_ENUM = z.enum([
  "CharolicSR",
  "ColphneSR",
  "GrozaSR",
  "NemesisSR",
  "SharkrySR",
  "CheetaSR",
  "NagantSR",
  "KseniaSR",
  "LittaraSR",
  "LottaSR",
  "VepleySSR",
  "TololoSSR",
  "PerityaSSR",
  "SabrinaSSR",
  "QiongjiuSSR",
  "MosinnagantSSR",
  "PapashaSSR",
  "DaiyanSSR",
  "CentaureissiSSR",
  "LennaSSR",
  "JiangyuSSR",
  "MacqiatoSSR",
  "UllridSSR",
  "SuomiSSR",
  "DusevnyjSSR",
  "ZhaohuiSSR",
  "ClukaySSR",
  "MishtySSR",
  "VectorSSR",
  "BiyocaSSR",
  "AndorisSSR",
  "SpringfieldSSR",
  "FayeSSR",
  "PeriSSR",
  "QiuhuaSSR",
  "YooHeeSSR",
]);

export const WEAPON_SLUG_ENUM = z.enum([
  "K2",
  "HAWK12",
  "MP5",
  "CZ75",
  "M1903",
  "G36KKSK",
  "G28",
  "Vector",
  "G11",
  "HK416",
  "CSLS06",
  "KSVK",
  "M1931",
  "Ullr",
  "WA2000",
  "QBZ97",
  "UMP9",
  "G36",
  "QBZ-95",
  "PPSh41",
  "M1891",
  "QBZ-191",
  "SPAS-12",
  "Pecheng",
  "AK-Alfa",
  "Vepr12",
  "BpSGssr001",
  "BpMGssr001",
  "BpKnifessr001",
  "BpARssr001",
  "BpRFssr001",
  "BpSMGssr001",
  "BpHRssr001",
  "M1",
  "Galil",
  "APS",
  "M1895",
  "MP7",
  "ROBINSONXCR",
  "OM50",
  "OTS14",
  "TaurusCurve",
  "Blade",
]);

export type DollSlugEnum = z.TypeOf<typeof DOLL_SLUG_ENUM>;

export const DOLL_CLASS_ENUM = z.enum([
  "vanguard",
  "support",
  "sentinel",
  "bulwark",
]);
export type DollClassEnum = z.TypeOf<typeof DOLL_CLASS_ENUM>;

export const DOLL_RARITY_ENUM = z.enum(["ELITE", "COMMON"]);
export type DollRarityEnum = z.TypeOf<typeof DOLL_RARITY_ENUM>;

export const CALC_TYPE_ENUM = z.enum(["CHAR", "WEP"]);
export type CalcTypeEnum = z.TypeOf<typeof CALC_TYPE_ENUM>;

export const WEAPON_CLASS_ENUM = z.enum([
  "AR",
  "MG",
  "SMG",
  "HG",
  "SG",
  "BLD",
  "RF",
]);
export type WeaponClassEnum = z.TypeOf<typeof WEAPON_CLASS_ENUM>;

export type WeaponSlugEnum = z.TypeOf<typeof WEAPON_SLUG_ENUM>;
