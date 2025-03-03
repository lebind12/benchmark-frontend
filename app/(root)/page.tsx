'use client';

import '@/styles/fonts.css';
import DatePickPage from '@/components/ScheduleComponent/DatePickComponent';
import { getDateString } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { benchmarkAPI } from '@/apis/backend';
import Image from 'next/image';
import Link from 'next/link';
import LoadingImage from '@/public/assets/eaglekop.png';

// 리그 정보 타입 정의
type LeagueInfo = {
  id: number;
  name: string;
  korName: string;
  imageUrl: string;
};

// 경기 데이터 타입 정의
type FixtureData = {
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

export default function Home() {
  const [fixturesByLeague, setFixturesByLeague] = useState<{
    [key: string]: FixtureData[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  // 리그 정보
  const leagues: LeagueInfo[] = [
    {
      id: 39,
      name: 'premier',
      korName: '프리미어리그',
      imageUrl: 'https://media.api-sports.io/football/leagues/39.png',
    },
    {
      id: 2,
      name: 'champions',
      korName: '챔피언스리그',
      imageUrl: 'https://media.api-sports.io/football/leagues/2.png',
    },
    {
      id: 3,
      name: 'europa',
      korName: '유로파리그',
      imageUrl: 'https://media.api-sports.io/football/leagues/3.png',
    },
    {
      id: 48,
      name: 'karabao',
      korName: '카라바오컵',
      imageUrl: 'https://media.api-sports.io/football/leagues/48.png',
    },
    {
      id: 45,
      name: 'fa',
      korName: 'FA 컵',
      imageUrl: 'https://media.api-sports.io/football/leagues/937.png',
    },
  ];

  useEffect(() => {
    const todayDate = getDateString(new Date());
    const fetchAllLeaguesFixtures = async () => {
      setIsLoading(true);
      const fixturesData: { [key: string]: FixtureData[] } = {};

      // 각 리그별로 경기 데이터 가져오기
      for (const league of leagues) {
        try {
          const response = await benchmarkAPI.get('/api/match/fixture', {
            params: {
              date: todayDate,
              league_id: league.id.toString(),
            },
          });
          fixturesData[league.name] = response.data;
        } catch (error) {
          console.error(`Error fetching fixtures for ${league.name}:`, error);
          fixturesData[league.name] = [];
        }
      }

      setFixturesByLeague(fixturesData);
      setIsLoading(false);
    };

    fetchAllLeaguesFixtures();
  }, []);

  return (
    <div className="flex flex-col">
      <DatePickPage league="" dateString={getDateString(new Date())} />

      {isLoading ? (
        <div className="flex flex-col w-full h-full justify-center items-center py-8">
          <Image
            src={LoadingImage}
            alt={''}
            width={200}
            height={200}
            className="opacity-50"
          />
          <span className="font-bold text-2xl mt-4">
            경기를 불러오는 중입니다...
          </span>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-6 py-4">
          {leagues.map((league) => {
            const fixtures = fixturesByLeague[league.name] || [];
            if (fixtures.length === 0) return null;

            return (
              <div key={league.name} className="flex flex-col w-full">
                <h2 className="text-2xl font-['ONE-Mobile-POP'] mb-2 px-4 text-white">
                  {league.korName}
                </h2>
                <div className="flex flex-col w-full gap-2">
                  {fixtures.map((fixture) => (
                    <Link
                      href={`/${league.name}/${getDateString(new Date())}/${
                        fixture.fixture_id
                      }/matchdetail`}
                      key={fixture.fixture_id}
                      className="flex w-full bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-lg items-center text-white"
                    >
                      <div className="w-16 flex justify-center">
                        <Image
                          src={league.imageUrl}
                          alt={league.name}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex flex-1 items-center justify-center">
                        <div className="flex items-center gap-2 justify-end mr-4 w-2/5">
                          <span className="font-medium text-right">
                            {fixture.kor_awayname}
                          </span>
                          <Image
                            src={`https://media.api-sports.io/football/teams/${fixture.away_id}.png`}
                            alt={fixture.kor_awayname}
                            width={24}
                            height={24}
                          />
                        </div>
                        <div className="flex justify-center text-lg font-bold w-1/5">
                          VS
                        </div>
                        <div className="flex items-center gap-2 justify-start ml-4 w-2/5">
                          <Image
                            src={`https://media.api-sports.io/football/teams/${fixture.home_id}.png`}
                            alt={fixture.kor_homename}
                            width={24}
                            height={24}
                          />
                          <span className="font-medium">
                            {fixture.kor_homename}
                          </span>
                        </div>
                      </div>
                      <div className="w-24 text-right text-gray-300">
                        {fixture.date.split('T')[1].slice(0, 5)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {Object.values(fixturesByLeague).every(
            (fixtures) => fixtures.length === 0,
          ) && (
            <div className="flex flex-col w-full h-full justify-center items-center py-8">
              <Image
                src={LoadingImage}
                alt={''}
                width={360}
                height={360}
                className="opacity-50"
              />
              <span className="font-bold text-2xl text-black">
                오늘 예정된 경기가 없습니다
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
