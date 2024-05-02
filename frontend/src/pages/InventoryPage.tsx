import { Inventory } from "@/features/inventory/Inventory";
import { UserHeader } from "@/features/auth/UserHeader";
import { Layout } from "@/shared/components/Layout";
import { Box } from "@chakra-ui/react";

export const InventoryPage = () => {
  return (
    <Layout>
      <Box justifySelf="center" m={0} p={0}>
        <UserHeader />
        <Inventory />
      </Box>
    </Layout>
  );
};
