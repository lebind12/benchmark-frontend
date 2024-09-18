'use client';

import { benchmarkAPI } from '@/apis/backend';
import PlayerDetailComponent from '@/components/PlayerStatComponents/PlayerDetailComponent';
import PlayerMatchComponent from '@/components/PlayerStatComponents/PlayerMatchComponent';
import PlayerPickNavBarComponent from '@/components/PlayerStatComponents/PlayerPickNavBarComponent';
import PlayerSeasonDataComponent from '@/components/PlayerStatComponents/PlayerSeasonDataComponent';
import PlayerTransitionComponent from '@/components/PlayerStatComponents/PlayerTransitionComponent';
import { useEffect, useState } from 'react';

type PlayerStatisticsType = {
  player_id: number;
  kor_player_name: string;
  player_age: string;
  face_url: string;
  statistics: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string | null;
      season: number;
    };
    games: {
      appearences: number | null;
      lineups: number | null;
      minutes: number | null;
      number: number | null;
      position: string;
      rating: string | null;
      captain: boolean;
    };
    substitutes: {
      in: number | null;
      out: number | null;
      bench: number | null;
    };
    shots: {
      total: number | null;
      on: number | null;
    };
    goals: {
      total: number | null;
      conceded: number | null;
      assists: number | null;
      saves: number | null;
    };
    passes: {
      total: number | null;
      key: number | null;
      accuracy: number | null;
    };
    tackles: {
      total: number | null;
      blocks: number | null;
      interceptions: number | null;
    };
    duels: {
      total: number | null;
      won: number | null;
    };
    dribbles: {
      attempts: number | null;
      success: number | null;
      past: number | null;
    };
    fouls: {
      drawn: number | null;
      committed: number | null;
    };
    cards: {
      yellow: number | null;
      yellowred: number | null;
      red: number | null;
    };
    penalty: {
      won: number | null;
      commited: number | null;
      scored: number | null;
      missed: number | null;
      saved: number | null;
    };
  }>;
  eng_player_name: string;
  id: number;
  kor_short_name: string;
  player_shirt_number: number | null;
  team_id: number;
  player_detail: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
};

export default function Home({
  params,
}: {
  params: { league: string; playerid: string };
}) {
  const [playerData, setPlayerData] = useState<PlayerStatisticsType>();

  useEffect(() => {
    benchmarkAPI
      .get('/api/match/player', {
        params: {
          player_id: params.playerid,
        },
      })
      .then((res) => {
        setPlayerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);
  // TODO
  // 선수 상세 데이터
  // 최근 매치 기록
  // 시즌 스탯

  return (
    <>
      <PlayerPickNavBarComponent selectedLeague={params.league} />
      <div className="flex h-full w-full gap-4 mt-4">
        <div className="flex flex-col w-2/5 h-full gap-4">
          <PlayerDetailComponent
            playerData={playerData}
          ></PlayerDetailComponent>
          <PlayerTransitionComponent
            playerData={playerData}
          ></PlayerTransitionComponent>
        </div>
        <div className="flex flex-col w-3/5 h-full gap-4">
          <PlayerSeasonDataComponent
            params={params}
            playerData={playerData}
          ></PlayerSeasonDataComponent>
          <PlayerMatchComponent></PlayerMatchComponent>
        </div>
      </div>
    </>
  );
}
