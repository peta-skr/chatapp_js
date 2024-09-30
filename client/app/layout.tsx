"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/lib/NextAuthProvider";
import { SocketProvider } from "@/lib/SocketProvider";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { FirebaseAuthProvider } from "@/lib/firebaseAuthProvider";

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
          <FirebaseAuthProvider>
            <QueryClientProvider client={queryClient}>
              <SocketProvider>{children}</SocketProvider>
            </QueryClientProvider>
          </FirebaseAuthProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
