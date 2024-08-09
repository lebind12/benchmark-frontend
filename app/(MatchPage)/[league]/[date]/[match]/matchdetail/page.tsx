'use client';

import TeamAvatarComponent from '@/components/MatchPageComponents/TeamAvatarComponent';
import { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import FootballField from '@/public/footballfield.jpeg';
import ScoreBoardComponent from '@/components/MatchDetailComponents/ScoreBoardComponent';
import TimeLineComponent from '@/components/MatchDetailComponents/TimelineComponent';
import FormationComponent from '@/components/MatchDetailComponents/FormationComponent';
import MatchStatisticsComponent from '@/components/MatchDetailComponents/MatchStatisticsComponent';
import LineupComponent from '@/components/MatchDetailComponents/LineupComponent';

export default function Home({
  params,
}: {
  params: {
    league: string;
    date: string;
    match: string;
  };
}) {
  // TODO
  // 경기 스코어 표시
  // 현재 선수 카드 정보
  // 경기 시간 표시
  // 타임라인
  // 경기 통계

  const [HomeTeam, setHomeTeam] = useState(params.match.split('-')[0]);
  const [AwayTeam, setAwayTeam] = useState(params.match.split('-')[1]);
  return (
    <div className="flex h-full w-full mt-4 gap-4">
      <div className="flex flex-col w-2/5 h-full gap-4">
        <div className="w-full h-fit">
          <ScoreBoardComponent></ScoreBoardComponent>
        </div>
        <div className="w-full h-fit">
          <TimeLineComponent></TimeLineComponent>
        </div>
        <div className="w-full h-full">
          <MatchStatisticsComponent></MatchStatisticsComponent>
        </div>
      </div>
      <div className="flex flex-col w-3/5 h-full gap-4">
        <div className="w-full h-fit">
          <FormationComponent></FormationComponent>
        </div>
        <div className="w-full h-full">
          <LineupComponent></LineupComponent>
        </div>
      </div>
    </div>
  );
}
