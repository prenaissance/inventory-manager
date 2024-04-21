import { Rarity } from "./rarity";

export type ItemTemplate = {
  id: string;
  name: string;
  game: {
    name: string;
    logoUrl: string;
  };
  rarity: Rarity;
  imageUrl: string;
  description: string;
};
