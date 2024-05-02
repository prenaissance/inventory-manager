import { Rarity } from "@shared/enums/rarity";

export type ItemTemplate = {
  _id: string;
  name: string;
  game: {
    name: string;
    logoUrl: string;
  };
  rarity: Rarity;
  imageUrl: string;
  description: string;
};
