import { ItemTemplate } from "./model/item-template";

import mannCoSupplyCrateKeyUrl from "@/assets/mann-co-supply-crate-key.png";
import tf2LogoUrl from "@/assets/tf2-logo.jpg";
import tourOfDutyTicketUrl from "@/assets/tour-of-duty-ticket.png";
import { Item } from "./model/item";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Rarity } from "@shared/enums/rarity";

export const defaultItemTemplates: ItemTemplate[] = [
  {
    id: "1",
    name: "Mann Co. Supply Crate Key",
    imageUrl: mannCoSupplyCrateKeyUrl,
    game: {
      name: "Team Fortress 2",
      logoUrl: tf2LogoUrl,
    },
    description:
      "Used to open locked supply crates.\n\nThis is a limited use item. Uses: 1",
    rarity: Rarity.COMMON,
  },
  {
    id: "2",
    name: "Tour of Duty Ticket",
    imageUrl: tourOfDutyTicketUrl,
    game: {
      name: "Team Fortress 2",
      logoUrl: tf2LogoUrl,
    },
    description:
      "Grants access to a Tour of Duty in Mann vs. Machine mode.\n\nThis is a limited use item. Uses: 1",
    rarity: Rarity.UNCOMMON,
  },
];

export const defaultItems: Item[] = [
  {
    id: "1",
    template: defaultItemTemplates[0],
    order: 0,
  },
  {
    id: "2",
    template: defaultItemTemplates[0],
    order: 1,
  },
  {
    id: "3",
    template: defaultItemTemplates[1],
    order: 2,
  },
];

type ItemTemplatesStore = {
  itemTemplates: ItemTemplate[];
  setItemTemplates: (itemTemplates: ItemTemplate[]) => void;
};
export const useItemTemplates = create<ItemTemplatesStore>()(
  persist(
    (set) => ({
      itemTemplates: defaultItemTemplates,
      setItemTemplates: (itemTemplates: ItemTemplate[]) =>
        set({ itemTemplates }),
    }),
    { name: "item-templates" },
  ),
);

type ItemsStore = {
  items: Item[];
  setItems: (items: Item[]) => void;
};

export const useItems = create<ItemsStore>()(
  persist(
    (set) => ({
      items: defaultItems,
      setItems: (items: Item[]) => set({ items }),
    }),
    { name: "items" },
  ),
);
