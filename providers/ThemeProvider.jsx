'use client';

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import { ScrollProvider } from "./ScrollContext";


export function ThemeProvider({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <MantineProvider>
          <ScrollProvider>
            {children}
          </ScrollProvider>
        </MantineProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
