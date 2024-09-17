'use client';

import DatePickPage from '@/components/ScheduleComponent/DatePickComponent';
import TeamVersusComponent from '@/components/ScheduleComponent/TeamVersusComponent';
import { Suspense, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { benchmarkAPI } from '@/apis/backend';
import LoadingImage from '@/public/assets/eaglekop.png';

type fixtureData = {
  away_id: number;
  date: string;
  eng_awayname: string;
  eng_homename: string;
  fixture_id: number;
  home_id: number;
  id: number;
  kor_awayname: string;
  kor_homename: string;
  league_id: number;
  league_name: string;
  roundname: string;
  status: string;
  venue: string;
  score: {
    home: number;
    away: number;
  };
};

const getMatchStatus = (status: string) => {
  if (status === 'Match Finished') {
    return '경기 종료';
  } else {
    return '경기 전';
  }
};

const leagueConvert = (leagueId: string) => {
  let convertedId = 39;
  switch (leagueId) {
    case 'champions':
      convertedId = 2;
      break;
    case 'europa':
      convertedId = 3;
      break;
    case 'karabao':
      convertedId = 48;
      break;
    case 'fa':
      convertedId = 45;
      break;
    default:
      convertedId = 39;
  }
  return convertedId;
};

export default function Page({
  params,
}: {
  params: { league: string; date: string };
}) {
  const [fixtureList, setFixtureList] = useState([]);
  const isLoading = useRef(false);

  useEffect(() => {
    isLoading.current = false;
    try {
      benchmarkAPI
        .get('/api/match/fixture', {
          params: {
            date: params.date,
            league_id: leagueConvert(params.league).toString(),
          },
        })
        .then((res) => {
          setFixtureList(res.data);
          isLoading.current = true;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      isLoading.current = true;
    } finally {
      isLoading.current = true;
    }
  }, []);

  return (
    <>
      {isLoading.current ? (
        <div>
          <DatePickPage
            league={params.league}
            dateString={params.date}
          ></DatePickPage>
          {fixtureList.length === 0 ? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <Image
                src={LoadingImage}
                alt={''}
                width={360}
                height={360}
                className="opacity-50"
              ></Image>
              <span className="font-bold text-2xl">경기가 없습니다.</span>
            </div>
          ) : (
            <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 gap-4">
              {fixtureList.map((fixture: fixtureData, key: number) => (
                <TeamVersusComponent
                  key={key}
                  League={params.league}
                  HomeTeam={fixture.kor_homename}
                  AwayTeam={fixture.kor_awayname}
                  HomeId={fixture.home_id.toString()}
                  AwayId={fixture.away_id.toString()}
                  Date={fixture.date}
                  venue={fixture.venue}
                  fixtureId={fixture.fixture_id.toString()}
                  status={fixture.status}
                  score={fixture.score}
                ></TeamVersusComponent>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Image src={LoadingImage} alt={''} width={120} height={120}></Image>
        </div>
      )}
    </>
  );
}
