'use client';;
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { ScrollProvider } from "./ScrollContext";


export function ThemeProvider({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
