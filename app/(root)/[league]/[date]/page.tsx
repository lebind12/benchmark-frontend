import DatePickPage from '@/components/ScheduleComponent/DatePickComponent';
import TeamVersusComponent from '@/components/ScheduleComponent/TeamVersusComponent';

export default function Page({
  params,
}: {
  params: { league: string; date: string };
}) {
  return (
    <div>
      <DatePickPage
        league={params.league}
        dateString={params.date}
      ></DatePickPage>
      <div className="grid grid-cols-4 gap-4">
        <TeamVersusComponent></TeamVersusComponent>
        <TeamVersusComponent></TeamVersusComponent>
        <TeamVersusComponent></TeamVersusComponent>
        <TeamVersusComponent></TeamVersusComponent>
        <TeamVersusComponent></TeamVersusComponent>
        <TeamVersusComponent></TeamVersusComponent>
      </div>
    </div>
  );
}
