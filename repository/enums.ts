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
  "NikketaSSR",
]);

export const WEAPON_SLUG_ENUM = z.enum([
  "BpHRssr001",
  "BpSMGssr001",
  "BpRFssr001",
  "BpARssr001",
  "BpKnifessr001",
  "BpMGssr001",
  "BpSGssr001",
  "Vepr12",
  "AK-Alfa",
  "Pecheng",
  "SPAS-12",
  "QBZ-191",
  "M1891",
  "PPSh41",
  "QBZ-95",
  "G36",
  "UMP9",
  "QBZ97",
  "WA2000",
  "Ullr",
  "M1931",
  "KSVK",
  "CSLS06",
  "HK416",
  "G11",
  "Vector",
  "G28",
  "G36KKSK",
  "M1903",
  "CZ75",
  "MP5",
  "HAWK12",
  "K2",
  "Blade",
  "TaurusCurve",
  "OTS14",
  "OM50",
  "ROBINSONXCR",
  "MP7",
  "M1895",
  "APS",
  "Galil",
  "M1",
  "VSK94",
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
