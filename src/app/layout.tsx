import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import ChakraProvider from "~/chakra/provider";
import WagmiProvider from "~/wagmi/provider";

export const metadata: Metadata = {
  title: "Merits hub",
  description: "Merits hub for Web3 scouts",
  openGraph: {
    type: "website",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <WagmiProvider cookies={cookies}>{children}</WagmiProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
