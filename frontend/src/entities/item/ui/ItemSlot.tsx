import { DragEventHandler } from "react";
import { Box, Image } from "@chakra-ui/react";

import { Item } from "../model/item";
import { RARITY_COLORS } from "../model/rarity";

export type ItemSlotProps = {
  item: Item;
  onDragStart?: DragEventHandler<HTMLDivElement>;
  onSelected?: () => void;
  selected?: boolean;
};

export const ItemSlot = ({
  item,
  onDragStart,
  onSelected,
  selected,
}: ItemSlotProps) => {
  return (
    <Box
      tabIndex={0}
      onDragStart={onDragStart}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onClick={onSelected}
      onFocus={onSelected}
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
      bgColor={selected ? "gray.600" : "rgb(60, 53, 46)"}
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
