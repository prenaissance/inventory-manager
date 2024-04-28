import { ItemTemplate } from "./model/item-template";
import { Rarity } from "./model/rarity";

import mannCoSupplyCrateKeyUrl from "@/assets/mann-co-supply-crate-key.png";
import tf2LogoUrl from "@/assets/tf2-logo.jpg";
import tourOfDutyTicketUrl from "@/assets/tour-of-duty-ticket.png";
import { Item } from "./model/item";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";

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

export const useItemTemplates = () => {
  const [itemTemplates, setItemTemplates] = useLocalStorage<ItemTemplate[]>(
    "itemTemplates",
    defaultItemTemplates,
  );

  return {
    itemTemplates,
    setItemTemplates,
  };
};

export const useItems = () => {
  const [items, setItems] = useLocalStorage<Item[]>("items", defaultItems);

  return {
    items,
    setItems,
  };
};
