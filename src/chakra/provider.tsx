"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@blockscout/chakra-theme";

const dummyColorModeManager = {
  type: "cookie" as const,
  get() {
    return "light" as const;
  },
  set() {},
};

export default function ChakraUiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme} colorModeManager={dummyColorModeManager}>
      {children}
    </ChakraProvider>
  );
}
