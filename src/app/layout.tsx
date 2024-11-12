import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChakraProvider from "@/chakra/provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
