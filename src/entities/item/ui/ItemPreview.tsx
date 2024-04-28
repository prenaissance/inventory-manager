import { Box, Divider, HStack, Image, Text } from "@chakra-ui/react";

import { Item } from "../model/item";
import { RARITY_COLORS } from "../model/rarity";

export type ItemPreviewProps = {
  item: Item;
};

export const ItemPreview = ({ item }: ItemPreviewProps) => {
  return (
    <Box
      p={2}
      w="full"
      h="full"
      border="1px solid"
      borderColor={RARITY_COLORS[item.template.rarity]}
      rounded="none"
      aria-label={item.template.name}
      backgroundImage="radial-gradient(circle at 20% 50%, #fff2, #fff0)"
    >
      <Image h="10rem" src={item.template.imageUrl} pointerEvents="none" />
      <Divider />
      <Text color={RARITY_COLORS[item.template.rarity]} fontSize="xl">
        {item.template.name}
      </Text>
      <HStack mb={4}>
        <Image h="2rem" w="2rem" src={item.template.game.logoUrl} />
        <Text color="gray.500">{item.template.game.name}</Text>
      </HStack>
      <Text color="gray.300">{item.template.description}</Text>
    </Box>
  );
};
