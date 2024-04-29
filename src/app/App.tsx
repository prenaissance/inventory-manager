import { InventoryPage } from "@/pages/InventoryPage";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => (
  <ChakraProvider>
    <BrowserRouter basename="inventory-manager">
      <Routes>
        <Route path="" element={<InventoryPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
