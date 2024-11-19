"use client";

import React from "react";
import { Inter } from "next/font/google";
import ChakraProvider from "~/chakra/provider";
import WagmiProvider from "~/wagmi/provider";
import { AppContextProvider } from "~/contexts/app";
import { ScrollDirectionProvider } from "~/contexts/scrollDirection";
import * as mixpanel from "~/lib/mixpanel";

const inter = Inter({
  subsets: ["latin"],
});

mixpanel.init();

export default function ClientLayout({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <WagmiProvider cookies={cookies}>
            <ScrollDirectionProvider>
              <AppContextProvider>{children}</AppContextProvider>
            </ScrollDirectionProvider>
          </WagmiProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
