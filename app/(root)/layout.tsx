import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextUIProvider } from '@nextui-org/react';
import '@/app/globals.css';
import NavigationBar from '@/components/MainLayoutComponents/NavigationBar';
import LeftSideNavigation from '@/components/MainLayoutComponents/LeftSideNavigation';
import RightSideNavigation from '@/components/MainLayoutComponents/RightSideNavigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='"h-lvh min-h-lvh w-screen dark'>
      <body className="h-lvh min-h-lvh w-screen overflow-x-hidden overflow-y-auto bg-background">
        <NextUIProvider>
          <NavigationBar />
          <main className="flex h-lvh min-h-lvh w-full">
            <LeftSideNavigation />
            {children}
            <RightSideNavigation />
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
