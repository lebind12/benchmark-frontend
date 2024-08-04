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
import LeagueAvartaComponent from '@/components/ScheduleComponent/LeagueAvartaComponent';
export default function DatePickPage() {
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
              <span>날짜 선택</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              // selected={''}
              // onSelect={() => {}}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex w-full">
          <LeagueAvartaComponent
            src="https://media.api-sports.io/football/leagues/39.png"
            name="프리미어리그"
          ></LeagueAvartaComponent>
          <LeagueAvartaComponent
            src="https://media.api-sports.io/football/leagues/2.png"
            name="챔피언스리그"
          ></LeagueAvartaComponent>
          <LeagueAvartaComponent
            src="https://media.api-sports.io/football/leagues/3.png"
            name="유로파리그"
          ></LeagueAvartaComponent>
          <LeagueAvartaComponent
            src="https://media.api-sports.io/football/leagues/48.png"
            name="카라바오컵"
          ></LeagueAvartaComponent>
          <LeagueAvartaComponent
            src="https://media.api-sports.io/football/leagues/937.png"
            name="FA 컵"
          ></LeagueAvartaComponent>
        </div>
      </div>
    </div>
  );
}
