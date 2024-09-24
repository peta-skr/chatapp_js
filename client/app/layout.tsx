"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/lib/NextAuthProvider";
import { SocketProvider } from "@/lib/SocketProvider";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            <SocketProvider>{children}</SocketProvider>
          </QueryClientProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
