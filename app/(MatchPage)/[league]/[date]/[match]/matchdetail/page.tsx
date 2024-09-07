'use client';

import { useEffect, useState } from 'react';
import ScoreBoardComponent from '@/components/MatchDetailComponents/ScoreBoardComponent';
import TimeLineComponent from '@/components/MatchDetailComponents/TimelineComponent';
import FormationComponent from '@/components/MatchDetailComponents/FormationComponent';
import MatchStatisticsComponent from '@/components/MatchDetailComponents/MatchStatisticsComponent';
import LineupComponent from '@/components/MatchDetailComponents/LineupComponent';
import axios from 'axios';
import { benchmarkAPI } from '@/apis/backend';

type fixtureDataType = {
  fixture_id: number;
  id: number;
  eng_homename: string;
  kor_homename: string;
  home_id: number;
  status: string;
  league_id: number;
  venue: string;
  roundname: string;
  date: string;
  eng_awayname: string;
  kor_awayname: string;
  away_id: number;
  league_name: string;
};

export default function Home({
  params,
}: {
  params: {
    league: string;
    date: string;
    match: string;
  };
}) {
  const [fixtureData, setFixtureData] = useState<fixtureDataType>({
    fixture_id: 1208021,
    id: 1,
    eng_homename: 'Manchester United',
    kor_homename: '맨체스터 유나이티드',
    home_id: 33,
    status: 'Not Started',
    league_id: 39,
    venue: 'Old Trafford',
    roundname: 'Regular Season - 1',
    date: '2024-08-17T04:00:00',
    eng_awayname: 'Fulham',
    kor_awayname: '풀럼',
    away_id: 36,
    league_name: 'Premier League',
  });
  useEffect(() => {
    benchmarkAPI
      .get('/api/match/fixture', {
        params: { fixture_id: params.match },
      })
      .then((res) => {
        setFixtureData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex h-full w-full mt-4 gap-4">
      <div className="flex flex-col w-2/5 h-full gap-4">
        <div className="w-full h-fit">
          <ScoreBoardComponent
            HomeId={fixtureData.home_id}
            AwayId={fixtureData.away_id}
            venue={fixtureData.venue}
            fixtureId={fixtureData.fixture_id}
          ></ScoreBoardComponent>
        </div>
        <div className="w-full h-fit">
          <TimeLineComponent
            HomeId={fixtureData.home_id}
            AwayId={fixtureData.away_id}
          ></TimeLineComponent>
        </div>
        <div className="w-full h-full">
          <MatchStatisticsComponent
            HomeId={fixtureData.home_id}
            AwayId={fixtureData.away_id}
          ></MatchStatisticsComponent>
        </div>
      </div>
      <div className="flex flex-col w-3/5 h-full gap-4">
        <div className="w-full h-fit">
          <FormationComponent
            HomeId={fixtureData.home_id}
            AwayId={fixtureData.away_id}
          ></FormationComponent>
        </div>
        <div className="w-full h-full">
          <LineupComponent
            HomeId={fixtureData.home_id}
            AwayId={fixtureData.away_id}
          ></LineupComponent>
        </div>
      </div>
    </div>
  );
}
