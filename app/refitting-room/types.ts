import { CALC_TYPE_ENUM, CalcTypeEnum } from "@/repository/enums";

export type ArmoryDollShape = {
  /** 1-based, max 60 */
  level: number;
  /** 0-based, max 6 */
  vert: number;
};

export type ArmoryWeaponShape = {
  /** 1-based, max 60 */
  level: number;
  /** 1-based, max 6 */
  rank: number;
};

export type OwnedArmoryDoll = {
  slug: string;
  armoryType: typeof CALC_TYPE_ENUM.enum.CHAR;
  owned: true;
  data: ArmoryDollShape;
};
export type OwnedArmoryWep = {
  slug: string;
  armoryType: typeof CALC_TYPE_ENUM.enum.WEP;
  owned: true;
  data: ArmoryWeaponShape;
};

export type NotOwned = {
  slug: string;
  armoryType: CalcTypeEnum;
  owned: false;
};
