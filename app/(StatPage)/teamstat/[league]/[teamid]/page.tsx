import PlayerPickNavBarComponent from '@/components/TeamStatComponents/PlayerPickNavBarComponent';
import MatchHeadComponent from '@/components/TeamStatComponents/MatchHeadComponent';
import TeamRankComponent from '@/components/TeamStatComponents/TeamRankComponent';
import TeamSquadComponent from '@/components/TeamStatComponents/TeamSquadComponent';
import TeamStatisticsComponent from '@/components/TeamStatComponents/TeamStatisticsComponent';
import { Metadata } from 'next';
import Image from 'next/image';

export default function Home(params: { league: string; teamid: string }) {
  // TODO
  // FOTMOB 참조
  // 팀 개요
  // 순위
  // 경기
  // 통계
  // 스쿼드

  return (
    <>
      <PlayerPickNavBarComponent selectedLeague={params.league} />
      <div className="flex flex-col h-full w-full gap-4">
        <div className="w-full h-fit mt-4">
          <MatchHeadComponent></MatchHeadComponent>
        </div>
        <div className="flex w-full h-fit gap-4">
          <div className="w-2/5 h-full">
            <TeamSquadComponent></TeamSquadComponent>
          </div>
          <div className="flex flex-col w-3/5 h-full gap-4">
            <TeamRankComponent></TeamRankComponent>
          </div>
        </div>
        <TeamStatisticsComponent></TeamStatisticsComponent>
      </div>
    </>
  );
}
