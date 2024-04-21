import { ItemTemplate } from "./item-template";

export type Item = {
  id: string;
  template: ItemTemplate;
  stacks?: number;
  order?: number;
};
