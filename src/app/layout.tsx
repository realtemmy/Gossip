'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { CategoryProvider } from './context/category-context';
import { Sidebar } from '@/components/sidebar/sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('lifestyle');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <html lang="en">
      <body className={inter.className}>
        <CategoryProvider>

          <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </div>
        </CategoryProvider>
      </body>
    </html>
  );
}
