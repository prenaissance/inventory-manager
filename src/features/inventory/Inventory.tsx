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

export type InventoryProps = BoxProps;

export const Inventory = (props: InventoryProps) => {
  return (
    <Box
      maxW="56rem"
      mx="auto"
      bgColor="gray.800"
      p={2}
      mt={8}
      border="1px solid"
      borderColor="gray.600"
      {...props}
    >
      <Heading as="h1" size="lg" mb={4}>
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
      ></Grid>
    </Box>
  );
};
