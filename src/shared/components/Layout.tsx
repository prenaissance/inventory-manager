import { PropsWithChildren } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { NavBar } from "./NavBar";

export const Layout = ({ children }: PropsWithChildren) => (
  <Flex
    minH="100vh"
    w="100vw"
    overflowX="hidden"
    flexDir="column"
    bgColor="blue.800"
  >
    <NavBar />
    <Box flex={1} p={4}>
      {children}
    </Box>
  </Flex>
);
