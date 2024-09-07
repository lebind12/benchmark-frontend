'use client';
import { benchmarkAPI } from '@/apis/backend';
import { footballAPI } from '@/apis/footballAPI';
import CommentComponent from '@/components/StreamComponents/CommentComponent';
import FixtureStatisticsComponent from '@/components/StreamComponents/FixtureStatisticsComponent';
import FormationComponent from '@/components/StreamComponents/FormationComponent';
import PlayerStatisticsComponent from '@/components/StreamComponents/PlayerStatisticsComponent';
import PopupComponent from '@/components/StreamComponents/PopupComponent';
import ScoreBoardComponent from '@/components/StreamComponents/ScoreBoardComponent';
import useInterval from '@/hooks/intervalHook';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

type fixtureDataType = {
  fixture_id: 1208021;
  id: 1;
  eng_homename: 'Manchester United';
  kor_homename: '맨체스터 유나이티드';
  home_id: 33;
  status: 'Not Started';
  league_id: 39;
  venue: 'Old Trafford';
  roundname: 'Regular Season - 1';
  date: '2024-08-17T04:00:00';
  eng_awayname: 'Fulham';
  kor_awayname: '풀럼';
  away_id: 36;
  league_name: 'Premier League';
};

type korLineupType = {
  [key: number]: string;
};

type lineupData = {
  [key: number]: lineupPlayerData[];
};

type lineupPlayerData = {
  id: number;
  name: string;
  jerseyNumber: number;
  goalCount: number;
  isWarned: boolean;
  isBanned: boolean;
  substitution: boolean;
  position: string;
};

export default function Home({
  params,
}: {
  params: { league_id: string; fixture: string };
}) {
  const [fixtureData, setFixtureData] = useState<fixtureDataType>();
  const [fixtureHomeLineup, setFixtureHomeLineup] = useState<lineupData>({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
  });
  const [fixtureAwayLineup, setFixtureAwayLineup] = useState<lineupData>({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
  });
  const [scores, setScores] = useState([0, 0]);
  const [selectedPlayer, setSelectedPlayer] = useState({
    isHome: true,
    positionNumber: 3,
  });
  const [fixtureStatistics, setFixturesStatistics] = useState();
  const [homeTotalLineup, setHomeTotalLineup] = useState<any[]>([]);
  const [awayTotalLineup, setAwayTotalLineup] = useState<any[]>([]);
  const [homeKorLineup, setHomeKorLineup] = useState<korLineupType>([]);
  const [awayKorLineup, setAwayKorLineup] = useState<korLineupType>([]);
  const [changeCount, setChangeCount] = useState(0);
  const [pageReady, setPageReady] = useState(false);

  const homeId = useRef(-1);
  const awayId = useRef(-1);

  useEffect(() => {
    const headers = {
      'x-rapidapi-key': 'ae8a0daf8b42d12818ccbdec67ca30f5',
      'x-rapidapi-host': 'v3.football.api-sports.io',
    };

    benchmarkAPI
      .get('/api/match/fixture', {
        params: {
          fixture_id: params.fixture,
        },
      })
      .then((res) => {
        setFixtureData(res.data);
        homeId.current = res.data.home_id;
        awayId.current = res.data.away_id;
        benchmarkAPI
          .get('/api/match/player/lineup', {
            params: {
              team_id: homeId.current,
            },
          })
          .then((res) => {
            setHomeKorLineup(res.data);
          })
          .catch((err) => console.log(err));
        benchmarkAPI
          .get('/api/match/player/lineup', {
            params: {
              team_id: awayId.current,
            },
          })
          .then((res) => {
            setAwayKorLineup(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    benchmarkAPI
      .get('/api/match/fixture', {
        params: {
          fixture_id: params.fixture,
        },
      })
      .then((res) => {
        setFixtureData(res.data);
        homeId.current = res.data.home_id;
        awayId.current = res.data.away_id;

        benchmarkAPI
          .get('/api/match/player/lineup', {
            params: { team_id: homeId.current },
          })
          .then((res) => {
            setHomeKorLineup(res.data);
          })
          .catch((err) => console.log(err));

        benchmarkAPI
          .get('/api/match/player/lineup', {
            params: { team_id: awayId.current },
          })
          .then((res) => {
            setAwayKorLineup(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    footballAPI
      .get('https://v3.football.api-sports.io/fixtures?id=' + params.fixture, {
        headers: headers,
      })
      .then((res) => {
        const response = res.data.response[0];
        // 초기 라인업 집어넣기
        // 홈팀
        let homeLineupData: lineupData = {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
          10: [],
        };
        let awayLineupData: lineupData = {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
          10: [],
        };
        for (let playerNumber in response.lineups[0].startXI) {
          let player = response.lineups[0].startXI[playerNumber].player;
          let inputPlayer: lineupPlayerData = {
            id: player.id,
            name: player.name,
            jerseyNumber: player.number,
            goalCount: 0,
            isWarned: false,
            isBanned: false,
            substitution: false,
            position: player.pos,
          };
          homeLineupData[parseInt(playerNumber)] = [inputPlayer];
        }
        // 어웨이팀
        for (let playerNumber in response.lineups[1].startXI) {
          let player = response.lineups[1].startXI[playerNumber].player;
          let inputPlayer: lineupPlayerData = {
            id: player.id,
            name: player.name,
            jerseyNumber: player.number,
            goalCount: 0,
            isWarned: false,
            isBanned: false,
            substitution: false,
            position: player.pos,
          };
          awayLineupData[parseInt(playerNumber)] = [inputPlayer];
        }

        setFixtureHomeLineup(homeLineupData);
        setFixtureAwayLineup(awayLineupData);
        setHomeTotalLineup([
          ...res.data.response[0].lineups[0].startXI,
          ...res.data.response[0].lineups[0].substitutes,
        ]);
        setAwayTotalLineup([
          ...res.data.response[0].lineups[1].startXI,
          ...res.data.response[0].lineups[1].substitutes,
        ]);
        setChangeCount(0);
        setPageReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* 상단 */}
      <div className="flex h-1/4 w-full">
        <div className="flex h-full w-full">
          {/* 팝업 컴포넌트 */}
          <PopupComponent></PopupComponent>
          {/* 스코어보드 컴포넌트 */}
          <ScoreBoardComponent
            homeName={fixtureData?.kor_homename}
            awayName={fixtureData?.kor_awayname}
            homeId={fixtureData?.home_id}
            awayId={fixtureData?.away_id}
            fixtureId={params.fixture}
            pageReady={pageReady}
          ></ScoreBoardComponent>
          <div className="flex w-1/4 h-full"></div>
        </div>
      </div>
      {/* 하단 */}
      <div className="flex h-full w-full">
        {/* 포메이션 컴포넌트 */}
        <FormationComponent
          fixtureHomeLineup={fixtureHomeLineup}
          fixtureAwayLineup={fixtureAwayLineup}
          fixtureId={params.fixture}
          setPlayerId={setSelectedPlayer}
          korHomeLineup={homeKorLineup}
          korAwayLineup={awayKorLineup}
          changeCount={changeCount}
          pageReady={pageReady}
        ></FormationComponent>
        <PlayerStatisticsComponent
          korLineup={{ ...homeKorLineup, ...awayKorLineup }}
          playerId={selectedPlayer}
          fixture={params.fixture}
          fixtureHomeLineup={fixtureHomeLineup}
          fixtureAwayLineup={fixtureAwayLineup}
        ></PlayerStatisticsComponent>
        {/* 코멘트 컴포넌트 */}
        <CommentComponent
          fixtureHomeLineup={fixtureHomeLineup}
          fixtureAwayLineup={fixtureAwayLineup}
          fixtureId={params.fixture}
          homeId={homeId.current}
          awayId={awayId.current}
          korHomeLineup={homeKorLineup}
          korAwayLineup={awayKorLineup}
          homeTotalLineup={homeTotalLineup}
          awayTotalLineup={awayTotalLineup}
          setFixtureHomeLineup={setFixtureHomeLineup}
          setFixtureAwayLineup={setFixtureAwayLineup}
          setChangeCount={setChangeCount}
          changeCount={changeCount}
          pageReady={pageReady}
        ></CommentComponent>
        {/* 경기정보 컴포넌트 */}
        <FixtureStatisticsComponent
          homeName={fixtureData?.kor_homename}
          awayName={fixtureData?.kor_awayname}
          homeId={fixtureData?.home_id}
          awayId={fixtureData?.away_id}
          fixtureId={params.fixture}
          pageReady={pageReady}
        ></FixtureStatisticsComponent>
      </div>
    </div>
  );
}
