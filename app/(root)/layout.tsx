import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { NextUIProvider } from '@nextui-org/react';
import '@/app/globals.css';
import NavigationBar from '@/components/MainLayoutComponents/NavigationBar';
import LeftSideNavigation from '@/components/MainLayoutComponents/LeftSideNavigation';
import RightSideNavigation from '@/components/MainLayoutComponents/RightSideNavigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DatePicker } from '@nextui-org/react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import LeagueAvartaComponent from '@/components/ScheduleComponent/LeagueAvartaComponent';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '벤치단의 쉼터 벤치마크',
  description: '벤치단의 축구정보 사이트 벤치마크입니다.',
};

export default function RootLayout({
  children,
  datepick,
}: Readonly<{
  children: React.ReactNode;
  datepick: React.ReactNode;
}>) {
  return (
    <html lang="en" className='"h-lvh min-h-lvh w-screen dark'>
      <body className="h-lvh min-h-lvh w-screen overflow-x-hidden overflow-y-auto bg-background">
        <NextUIProvider>
          <NavigationBar />
          <main className="flex h-lvh min-h-lvh w-full">
            <LeftSideNavigation />
            <div className="flex flex-col h-full w-full">
              {datepick}
              {children}
            </div>
            <RightSideNavigation />
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
