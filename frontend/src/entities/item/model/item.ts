import { ItemTemplate } from "./item-template";

export type Item = {
  _id: string;
  template: ItemTemplate;
  stacks?: number;
  order: number;
};
