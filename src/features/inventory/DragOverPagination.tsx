import { Box, BoxProps } from "@chakra-ui/react";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  direction: "forward" | "backward";
} & BoxProps;
export const DragOverPagination = ({ direction, ...props }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });
  const page = Number(searchParams.get("page")) - 1;
  const setPage = (page: number) => setSearchParams({ page: String(page + 1) });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleDragEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (direction === "forward") {
        setPage(Math.min(4, page + 1));
      }
      if (direction === "backward") {
        setPage(Math.max(0, page - 1));
      }
    }, 500);
  };

  const handleDragLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <Box
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      {...props}
    />
  );
};
