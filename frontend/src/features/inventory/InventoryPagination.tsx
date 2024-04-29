import { useSearchParams } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";

export const InventoryPagination = () => {
  const [params, setParams] = useSearchParams({
    page: "1",
  });

  const page = Number(params.get("page")) - 1;
  const setPage = (page: number) => setParams({ page: String(page + 1) });

  return (
    <HStack justifyContent="space-around">
      <Text textAlign="center" fontSize="sm" color="gray.300" mt={4}>
        Page {page + 1}/5
      </Text>
      <HStack justifyContent="center" mt={4}>
        <IconButton
          aria-label="Previous page"
          onClick={() => setPage(Math.max(0, page - 1))}
          cursor="pointer"
          color="gray.300"
          disabled={page === 0}
          icon={<ArrowBackIcon />}
        />
        <IconButton
          aria-label="Next page"
          onClick={() => setPage(Math.min(4, page + 1))}
          cursor="pointer"
          color="gray.300"
          disabled={page === 4}
          icon={<ArrowForwardIcon />}
        />
      </HStack>
    </HStack>
  );
};
