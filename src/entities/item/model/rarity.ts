export enum Rarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

export const RARITY_COLORS = {
  [Rarity.COMMON]: "#b0b0b0",
  [Rarity.UNCOMMON]: "#4caf50",
  [Rarity.RARE]: "#2196f3",
  [Rarity.EPIC]: "#673ab7",
  [Rarity.LEGENDARY]: "#ff9800",
} as const;
