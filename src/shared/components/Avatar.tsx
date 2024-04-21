import { IconButton, type IconButtonProps, Image } from "@chakra-ui/react";
import exampleAvatarUrl from "@/assets/example-avatar.jpg";
export type AvatarProps = Omit<IconButtonProps, "aria-label"> & {
  imageUrl?: string;
};

export const Avatar = ({ imageUrl, ...props }: AvatarProps) => (
  <IconButton
    borderWidth={2}
    borderRadius={0}
    borderColor="blue.400"
    _hover={{ borderColor: "blue.400" }}
    aria-label="User Avatar"
    icon={<Image src={imageUrl ?? exampleAvatarUrl} />}
    {...props}
  />
);
