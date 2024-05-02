import { ObjectId } from "@fastify/mongodb";
import { Rarity } from "@shared/enums/rarity";

export const ITEM_TEMPLATES_COLLECTION = "item-templates";

export type ItemTemplate = {
  _id: ObjectId;
  name: string;
  game: {
    name: string;
    logoUrl: string;
  };
  rarity: Rarity;
  imageUrl: string;
  description: string;
};
