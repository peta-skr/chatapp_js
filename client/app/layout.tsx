"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/lib/NextAuthProvider";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "@/lib/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <SocketProvider>{children}</SocketProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
