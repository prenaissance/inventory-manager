import { Stack, Image, Flex, Link, useTheme, Text } from "@chakra-ui/react";
import logoUrl from "@/assets/parody-logo.png";
import { Link as ReactRouterLink } from "react-router-dom";

export const NavBar = () => {
  const theme = useTheme();
  const xlWidth: number = theme.breakpoints.xl;

  return (
    <Flex alignItems="center" bgColor="gray.700">
      <Stack m={2} w={`min(90vw, ${xlWidth})`}>
        <Link
          as={ReactRouterLink}
          display="flex"
          alignItems="center"
          to="/"
          w="fit-content"
          color="gray.300"
          fontSize={["xl", "2xl"]}
          fontWeight="semibold"
          _hover={{
            textDecoration: "none",
            color: "gray.300",
          }}
        >
          <Image
            src={logoUrl}
            alt="logo"
            boxSize="50px"
            display="inline-block"
          />
          <Text as="span" display="inline-block">
            Generic Inventory
          </Text>
        </Link>
      </Stack>
    </Flex>
  );
};
