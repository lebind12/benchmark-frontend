'use client';

import { useEffect, useState } from 'react';
import ScoreBoardComponent from '@/components/MatchDetailComponents/ScoreBoardComponent';
import TimeLineComponent from '@/components/MatchDetailComponents/TimelineComponent';
import FormationComponent from '@/components/MatchDetailComponents/FormationComponent';
import MatchStatisticsComponent from '@/components/MatchDetailComponents/MatchStatisticsComponent';
import LineupComponent from '@/components/MatchDetailComponents/LineupComponent';
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

type eventType = {
  time: {
    elapsed: number;
    extra: number | null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number;
    name: string;
  };
  assist: {
    id: number | null;
    name: number | null;
  };
  type: string;
  detail: string;
  comments: string;
};

type lineupType = {
  team: {
    id: number;
    name: string;
    logo: string;
    colors: {
      player: {
        primary: string;
        number: string;
        border: string;
      };
      goalkeeper: {
        primary: string;
        number: string;
        border: string;
      };
    };
  };
};

type playerType = {
  player: {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string;
  };
};

type fixtureResponseType = {
  id: number;
  fixture_id: number;
  eng_homename: string;
  kor_homename: string;
  home_id: number;
  status: string;
  league_id: number;
  event: Array<eventType>;
  lineup: Array<{
    team: lineupType;
    coach: {
      id: number;
      name: string;
      photo: string;
    };
    formation: string;
    startXI: Array<playerType>;
    substitutes: Array<playerType>;
  }>;
  venue: string;
  roundname: string;
  date: string;
  eng_awayname: string;
  kor_awayname: string;
  away_id: number;
  league_name: string;
  score: {
    home: number;
    away: number;
  };
  statistics: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    statistics: Array<{
      type: string;
      value: number;
    }>;
  }>;
};

type korLineupType = {
  [key: string]: string;
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
  const [fixtureData, setFixtureData] = useState<fixtureResponseType>();
  const [kor_homename, setKor_homename] = useState<korLineupType>();
  const [kor_awayname, setKor_awayname] = useState<korLineupType>();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    benchmarkAPI
      .get('/api/match/fixture', {
        params: { fixture_id: params.match },
      })
      .then((res) => {
        setFixtureData(res.data);
        benchmarkAPI
          .get('/api/match/player/lineup', {
            params: { team_id: res.data.home_id },
          })
          .then((res) => {
            setKor_homename(res.data);
            setIsLoaded(true);
          })
          .catch((err) => console.log(err));
        benchmarkAPI
          .get('/api/match/player/lineup', {
            params: { team_id: res.data.away_id },
          })
          .then((res) => {
            setKor_awayname(res.data);
            setIsLoaded(true);
          })
          .catch((err) => console.log(err));
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoaded ? (
        <div className="flex h-full w-full mt-4 gap-4">
          <div className="flex flex-col w-2/5 h-full gap-4">
            <div className="w-full h-fit">
              <ScoreBoardComponent
                HomeId={fixtureData?.home_id}
                AwayId={fixtureData?.away_id}
                score={fixtureData?.score}
                homeName={fixtureData?.kor_homename}
                awayName={fixtureData?.kor_awayname}
                venue={fixtureData?.venue}
                fixtureState={fixtureData?.status}
              ></ScoreBoardComponent>
            </div>
            <div className="w-full h-fit">
              <TimeLineComponent
                HomeId={fixtureData?.home_id}
                AwayId={fixtureData?.away_id}
                homeName={fixtureData?.kor_homename}
                awayName={fixtureData?.kor_awayname}
                eventData={fixtureData?.event}
                korLineUp={{
                  homeLineUp: kor_homename,
                  awayLineUp: kor_awayname,
                }}
              ></TimeLineComponent>
            </div>
            <div className="w-full h-full">
              <MatchStatisticsComponent
                HomeId={fixtureData?.home_id}
                AwayId={fixtureData?.away_id}
                statistics={fixtureData?.statistics}
              ></MatchStatisticsComponent>
            </div>
          </div>
          <div className="flex flex-col w-3/5 h-full gap-4">
            <div className="w-full h-fit">
              <FormationComponent
                HomeId={fixtureData?.home_id}
                AwayId={fixtureData?.away_id}
              ></FormationComponent>
            </div>
            <div className="w-full h-full">
              <LineupComponent
                HomeId={fixtureData?.home_id}
                AwayId={fixtureData?.away_id}
                homeLineUp={fixtureData?.lineup?.[0]?.startXI ?? []}
                awayLineUp={fixtureData?.lineup?.[1]?.startXI ?? []}
                homeName={fixtureData?.kor_homename}
                awayName={fixtureData?.kor_awayname}
                korLineUp={{
                  homeLineUp: kor_homename,
                  awayLineUp: kor_awayname,
                }}
                status={fixtureData?.status}
              ></LineupComponent>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
