import { BoxProps, Skeleton } from "@chakra-ui/react";

export type LoadingItemSlotProps = BoxProps;

export const LoadingItemSplot: React.FC<LoadingItemSlotProps> = (props) => {
  return <Skeleton bgColor="gray.800" aspectRatio={1} {...props} />;
};
