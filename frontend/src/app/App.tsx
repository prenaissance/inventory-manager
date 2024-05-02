import { InventoryPage } from "@/pages/InventoryPage";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="inventory-manager">
        <Routes>
          <Route path="" element={<InventoryPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </ChakraProvider>
);
