import { IconButton, Image } from "@chakra-ui/react";

import { Item } from "../model/item";

export type ItemSlotProps = {
  item: Item;
};

export const ItemSlot = ({ item }: ItemSlotProps) => {
  return (
    <IconButton
      aria-label={item.template.name}
      icon={<Image src={item.template.imageUrl} />}
    />
  );
};
