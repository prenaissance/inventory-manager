import { login } from "@/entities/user/api";
import { useAuth } from "@/shared/stores/auth-store";
import { Button, HStack, StackProps, Text } from "@chakra-ui/react";
import { Permission } from "@shared/enums/permission";
import { useMutation } from "@tanstack/react-query";

export type LoginActionsProps = StackProps;

export const LoginActions = (props: StackProps) => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const setupJwt = useAuth((state) => state.login);
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setupJwt(data.token);
    },
  });

  return (
    <HStack {...props}>
      <Text color="gray.300">
        {isAuthenticated ? "Logged in" : "Not logged in"}
      </Text>
      <Button
        variant="outline"
        color="gray.300"
        _hover={{ color: "gray.100" }}
        onClick={() => loginMutation.mutate([Permission.Read])}
        isLoading={loginMutation.isPending}
      >
        Login Readonly
      </Button>
      <Button
        variant="outline"
        color="gray.300"
        _hover={{ color: "gray.100" }}
        onClick={() =>
          loginMutation.mutate([Permission.Read, Permission.Write])
        }
        isLoading={loginMutation.isPending}
      >
        Login Read/Write
      </Button>
    </HStack>
  );
};
