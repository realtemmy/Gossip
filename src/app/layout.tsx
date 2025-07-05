"use client";
import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { CategoryProvider } from "../contexts/category-context";
import ReactQueryProvider from "@/lib/providers/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Gossipit",
  description: "Web application for gossip groups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <CategoryProvider>
            <div className="h-screen">{children}</div>
          </CategoryProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
