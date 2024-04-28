import { Box, BoxProps } from "@chakra-ui/react";

export type EmptyItemSlotProps = BoxProps;

export const EmptyItemSlot: React.FC<EmptyItemSlotProps> = (props) => {
  return (
    <Box
      drop
      bgColor="gray.800"
      aspectRatio={1}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      {...props}
    />
  );
};
