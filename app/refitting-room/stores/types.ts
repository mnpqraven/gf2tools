import {
  CALC_TYPE_ENUM,
  CalcTypeEnum,
  DollSlugEnum,
  WeaponSlugEnum,
} from "@/repository/enums";

export type ArmoryDollShape = {
  /** 1-based, max 60 */
  level: number;
  /** 0-based, max 6 */
  vert: number;
  /** 0-based, amount of helix node acquired, max 6 */
  helix: number;
  /** 0-|ased array of key node acquired, max 6
   * [tier1, tier1, tier2, tier2, tier3, tier3]
   * 0 2 4
   * 1 3 5
   */
  key: boolean[];
};

export type ArmoryWeaponShape = {
  variants: {
    /** probably used for adding an extra calc object, won't be used often */
    active: boolean;
    rarity: number;
    /** 1-based, max 60 */
    level: number;
    /** 1-based, max 6 */
    rank: number;
  }[];
};

export type OwnedArmoryDoll = {
  slug: DollSlugEnum;
  armoryType: typeof CALC_TYPE_ENUM.enum.CHAR;
  owned: true;
  data: ArmoryDollShape;
};

export type OwnedArmoryWep = {
  slug: WeaponSlugEnum;
  armoryType: typeof CALC_TYPE_ENUM.enum.WEP;
  owned: true;
  data: ArmoryWeaponShape;
};

export type NotOwned = {
  slug: string;
  armoryType: CalcTypeEnum;
  owned: false;
  data: undefined;
};
