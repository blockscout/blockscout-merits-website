import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import ClientLayout from "./ClientLayout";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");

  return <ClientLayout cookies={cookies}>{children}</ClientLayout>;
}
