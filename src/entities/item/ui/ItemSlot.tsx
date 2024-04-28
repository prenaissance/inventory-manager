import { DragEventHandler } from "react";
import { Box, Image } from "@chakra-ui/react";

import { Item } from "../model/item";
import { RARITY_COLORS } from "../model/rarity";

export type ItemSlotProps = {
  item: Item;
  onDragStart?: DragEventHandler<HTMLDivElement>;
};

export const ItemSlot = ({ item, onDragStart }: ItemSlotProps) => {
  return (
    <Box
      onDragStart={onDragStart}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      draggable
      aspectRatio={1}
      w="full"
      h="full"
      border="1px solid"
      borderColor={RARITY_COLORS[item.template.rarity]}
      rounded="none"
      _hover={{
        bgColor: "gray.600",
        borderColor: RARITY_COLORS[item.template.rarity],
      }}
      _focus={{
        bgColor: "gray.600",
        borderColor: RARITY_COLORS[item.template.rarity],
      }}
      aria-label={item.template.name}
      bgColor="rgb(60, 53, 46)"
    >
      <Image
        objectFit="contain"
        aspectRatio={1}
        w="full"
        src={item.template.imageUrl}
        pointerEvents="none"
      />
    </Box>
  );
};
