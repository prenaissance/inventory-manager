import { InventoryPage } from "@/pages/InventoryPage";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => (
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<InventoryPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
