export type OwnedArmoryDoll = {
  slug: string;
  /** 1-based, max 60 */
  level: number;
  /** 0-based, max 6 */
  vert: number;
};

export type OwnedArmoryWeapon = {
  slug: string;
  /** 1-based, max 60 */
  level: number;
  /** 1-based, max 6 */
  rank: number;
};

export type ArmoryOwnPair = {
  slug: string;
  owned: boolean;
};
