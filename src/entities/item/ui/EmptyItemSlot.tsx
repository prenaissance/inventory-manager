import { Box, BoxProps } from "@chakra-ui/react";

export type EmptyItemSlotProps = BoxProps;

export const EmptyItemSlot: React.FC<EmptyItemSlotProps> = (props) => {
  return <Box {...props} />;
};
