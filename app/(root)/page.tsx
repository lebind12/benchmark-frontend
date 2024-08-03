import { Metadata } from 'next';
import { Calendar } from '@nextui-org/calendar';
import TeamVersusComponent from '@/components/ScheduleComponent/TeamVersusComponent';

export const metadata: Metadata = {
  title: '벤치단의 쉼터 벤치마크',
  description: '벤치단의 축구정보 사이트 벤치마크입니다.',
};

export default function Home() {
  return (
    <div className="h-full w-full text-white">
      <div
        id="날짜 선택"
        className="flex p-10 h-fit w-full justify-center gap-10 overflow-hidden"
      >
        <Calendar></Calendar>
        <Calendar></Calendar>
        <Calendar></Calendar>
        <Calendar></Calendar>
      </div>
      <div className="grid grid-cols-4 auto-cols-min auto-rows-min p-3 gap-3 w-full h-full">
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
        <TeamVersusComponent />
      </div>
    </div>
  );
}
