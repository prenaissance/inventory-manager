import { ItemTemplate } from "./model/item-template";
import { Item } from "./model/item";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/shared/api";

export const fetchItems = (page: number) =>
  api
    .get<Item[]>("/inventory", {
      params: {
        page,
      },
    })
    .then((response) => response.data);

type ItemTemplatesStore = {
  itemTemplates: ItemTemplate[];
  setItemTemplates: (itemTemplates: ItemTemplate[]) => void;
};
export const useItemTemplates = create<ItemTemplatesStore>()(
  persist(
    (set) => ({
      itemTemplates: [],
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
      items: [],
      setItems: (items: Item[]) => set({ items }),
    }),
    { name: "items" },
  ),
);
