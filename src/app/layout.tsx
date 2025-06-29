'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { CategoryProvider } from '../contexts/category-context';
import { Sidebar } from '@/components/sidebar/sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CategoryProvider>
          <div className='h-screen overflow-y-'>
            {children}
          </div>
          
        </CategoryProvider>
      </body>
    </html>
  );
}
