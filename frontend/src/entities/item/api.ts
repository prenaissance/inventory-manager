import { Item } from "./model/item";
import { api } from "@/shared/api";
import { ItemTemplate } from "./model/item-template";

export const fetchItems = (page: number) =>
  api
    .get<Item[]>("/inventory", {
      params: {
        page,
      },
    })
    .then((response) => response.data);

export const fetchItemTemplates = () =>
  api.get<ItemTemplate[]>("/items/templates").then((response) => response.data);

export const addItem = ({ templateId }: { templateId: string }) =>
  api
    .post<Item>("/inventory", { templateId })
    .then((response) => response.data);
