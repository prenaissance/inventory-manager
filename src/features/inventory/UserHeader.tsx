import { Avatar } from "@/shared/components/Avatar";
import { chakra, Heading, HStack } from "@chakra-ui/react";

export const UserHeader = () => (
  <chakra.header
    display="flex"
    alignItems="center"
    mx="auto"
    maxW="60rem"
    justifyContent="space-between"
    p={4}
    bgColor="gray.600"
    color="white"
  >
    <HStack gap={2}>
      <Avatar name="Generic User" boxSize={16} />
      <Heading as="h1" size="lg" fontWeight="normal">
        Generic User Inventory
      </Heading>
    </HStack>
  </chakra.header>
);
