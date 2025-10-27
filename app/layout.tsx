import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/components/providers/Web3Provider";

export const metadata: Metadata = {
  title: "Clipping Platform - Web3 Creator Economy",
  description: "A decentralized platform for brands and clippers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
