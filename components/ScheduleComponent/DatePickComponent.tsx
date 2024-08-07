'use client';

import { DatePicker, Link } from '@nextui-org/react';
import { CalendarIcon } from '@radix-ui/react-icons';

import { cn, getDateString } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import LeagueAvatarComponent from '@/components/ScheduleComponent/LeagueAvatarComponent';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DatePickPage({
  league = 'premier',
  dateString = getDateString(new Date()),
}: {
  league: string;
  dateString: string;
}) {
  // const [selectDay, setSelectDay] = useState<string>(
  //   getDateString(new Date(Date.now())),
  // );
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();
  const CalendarSelect = (date: Date) => {
    setDate(date);
    router.push('/' + league + '/' + getDateString(date));
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div
        id="날짜 선택"
        className="flex flex-col min-h-52 gap-4 w-full justify-center items-center overflow-hidden"
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal text-xl',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{dateString}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={CalendarSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex w-full">
          <Link href={'/premier/' + dateString} className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/39.png"
              name="프리미어리그"
              isSelected={league == 'premier' ? true : false}
            ></LeagueAvatarComponent>
          </Link>
          <Link href={'/champions/' + dateString} className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/2.png"
              name="챔피언스리그"
              isSelected={league == 'champions' ? true : false}
            ></LeagueAvatarComponent>
          </Link>

          <Link href={'/europa/' + dateString} className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/3.png"
              name="유로파리그"
              isSelected={league == 'europa' ? true : false}
            ></LeagueAvatarComponent>
          </Link>

          <Link href={'/karabao/' + dateString} className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/48.png"
              name="카라바오컵"
              isSelected={league == 'karabao' ? true : false}
            ></LeagueAvatarComponent>
          </Link>

          <Link href={'/fa/' + dateString} className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/937.png"
              name="FA 컵"
              isSelected={league == 'fa' ? true : false}
            ></LeagueAvatarComponent>
          </Link>
        </div>
      </div>
    </div>
  );
}
