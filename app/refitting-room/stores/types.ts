import type {
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
  /** @default highest rarity on creation */
  rarity: 3 | 4 | 5;
  /** 1-based, max 60 */
  level: number;
  /** 1-based, max 6 */
  rank: number;
};

export type OwnedArmoryDoll = {
  slug: DollSlugEnum;
  expanded: boolean;
  armoryType: typeof CALC_TYPE_ENUM.enum.CHAR;
  owned: true;
  data: ArmoryDollShape;
};

export type OwnedArmoryWep = {
  slug: WeaponSlugEnum;
  expanded: boolean;
  armoryType: typeof CALC_TYPE_ENUM.enum.WEP;
  owned: true;
  data: ArmoryWeaponShape;
};

export type NotOwned = {
  slug: string;
  expanded: false;
  armoryType: CalcTypeEnum;
  owned: false;
  data: undefined;
};
