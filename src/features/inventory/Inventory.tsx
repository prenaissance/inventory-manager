import {
  Box,
  BoxProps,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";

import parodyLogo from "@/assets/parody-logo.png";
import { InventorySearchBar } from "./InventorySearchBar";
import { useItems } from "@/entities/item/api";
import { DragEvent, useState } from "react";
import { ItemSlot } from "@/entities/item/ui/ItemSlot";
import { EmptyItemSlot } from "@/entities/item/ui/EmptyItemSlot";
import { Item } from "@/entities/item/model/item";
import { ItemPreview } from "@/entities/item/ui/ItemPreview";

export type InventoryProps = BoxProps;
const ITEMS_PER_PAGE = 25;

export const Inventory = (props: InventoryProps) => {
  const [page, setPage] = useState(0);
  const { items, setItems } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(items[0]);
  const minOrder = 0 + page * ITEMS_PER_PAGE;
  const maxOrder = 24 + page * ITEMS_PER_PAGE;

  const itemsOnPage = items.filter(
    (item) => item.order >= minOrder && item.order <= maxOrder,
  );
  const orderedItems = new Array(ITEMS_PER_PAGE).fill(null).map((_, index) => {
    const order = index + minOrder;
    return itemsOnPage.find((item) => item.order === order);
  });
  const getSelectedHandler = (item: Item) => () => setSelectedItem(item);

  const getDragStartHandler =
    (item: Item) => (e: DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("item", JSON.stringify(item));
      e.dataTransfer.effectAllowed = "move";
    };

  const getDropHandler = (order: number) => (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item")) as Item;
    if (item.order === order) {
      return;
    }
    const itemToSwap = items.find((i) => i.order === order);
    if (itemToSwap) {
      setItems(
        items.map((x) => {
          if (x.id === item.id) {
            return { ...x, order: itemToSwap.order };
          }
          if (x.id === itemToSwap.id) {
            return { ...x, order };
          }
          return x;
        }),
      );
    } else {
      setItems(
        items.map((x) => {
          if (x.id === item.id) {
            return { ...x, order };
          }
          return x;
        }),
      );
    }
  };

  return (
    <Box
      maxW="56rem"
      mx="auto"
      bgColor="#1c1f21"
      p={2}
      mt={8}
      border="1px solid"
      borderColor="gray.600"
      {...props}
    >
      <Heading color="white" as="h1" size="lg" mb={4}>
        <Image
          src={parodyLogo}
          alt="logo"
          boxSize="50px"
          display="inline-block"
        />
        Inventory
      </Heading>
      <HStack gap={2}>
        <Text color="gray.300">Looking for a specific item?</Text>
        <InventorySearchBar />
      </HStack>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "2fr 1fr",
        }}
        gap={4}
        my={2}
      >
        <Grid
          bgColor="black"
          p={1}
          templateColumns="repeat(5, 1fr)"
          gap={1}
          border="1px solid"
          borderColor="gray.600"
        >
          {orderedItems.map((item, index) =>
            item ? (
              <ItemSlot
                key={item.id}
                item={item}
                onDragStart={getDragStartHandler(item)}
                selected={selectedItem?.id === item.id}
                onSelected={getSelectedHandler(item)}
              />
            ) : (
              <EmptyItemSlot
                key={Math.random()}
                onDrop={getDropHandler(minOrder + index)}
              />
            ),
          )}
        </Grid>
        {selectedItem ? <ItemPreview item={selectedItem} /> : null}
      </Grid>
    </Box>
  );
};
