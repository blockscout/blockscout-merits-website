import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import ClientLayout from "./ClientLayout";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") || "localhost:3000";
  return {
    title: "Merits hub",
    description: "Merits hub for Web3 scouts",
    metadataBase: new URL(`https://${host}`),
    openGraph: {
      type: "website",
      images: [{ url: "/static/og_image.png", width: 1200, height: 600 }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");

  return <ClientLayout cookies={cookies}>{children}</ClientLayout>;
}
