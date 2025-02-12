import { CALC_TYPE_ENUM } from "@/repository/enums";

export type ArmoryDoll = {
  /** 1-based, max 60 */
  level: number;
  /** 0-based, max 6 */
  vert: number;
};

export type ArmoryWeapon = {
  /** 1-based, max 60 */
  level: number;
  /** 1-based, max 6 */
  rank: number;
};

export type OwnedArmoryDoll = {
  slug: string;
  armoryType: typeof CALC_TYPE_ENUM.enum.CHAR;
  owned: true;
  data: ArmoryDoll;
};
export type OwnedArmoryWep = {
  slug: string;
  armoryType: typeof CALC_TYPE_ENUM.enum.WEP;
  owned: true;
  data: ArmoryWeapon;
};

export type MaybeOwnedArmoryDoll =
  | OwnedArmoryDoll
  | {
      slug: string;
      armoryType: typeof CALC_TYPE_ENUM.enum.CHAR;
      owned: false;
    };

export type MaybeOwnedArmoryWep =
  | OwnedArmoryWep
  | {
      slug: string;
      armoryType: typeof CALC_TYPE_ENUM.enum.WEP;
      owned: false;
    };

export type ArmoryOwn = MaybeOwnedArmoryDoll | MaybeOwnedArmoryWep;
