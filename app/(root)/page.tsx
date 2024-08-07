'use client';

import '@/styles/fonts.css';
import DatePickPage from '@/components/ScheduleComponent/DatePickComponent';
import { getDateString } from '@/lib/utils';

export default function Home() {
  return (
    <div className="">
      <DatePickPage
        league=""
        dateString={getDateString(new Date())}
      ></DatePickPage>
      <div className="flex w-full h-full justify-center items-center text-3xl">
        <span>날짜를 선택해주세요</span>
      </div>
    </div>
  );
}
