'use client';

import { Metadata } from 'next';
import TeamVersusComponent from '@/components/ScheduleComponent/TeamVersusComponent';
import TeamNameComponent from '@/components/ScheduleComponent/TeamNameComponent';
import LeagueAvartaComponent from '@/components/ScheduleComponent/LeagueAvartaComponent';
import { DatePicker } from '@nextui-org/react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import '@/styles/fonts.css';

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full text-center text-[32px] font-[]">
      날짜를 선택해주세요
    </div>
  );
}
