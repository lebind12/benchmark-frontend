import useInterval from '@/hooks/intervalHook';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type FixtureStatisticsComponentProps = {
  homeName: string | undefined;
  awayName: string | undefined;
  homeId: number | undefined;
  awayId: number | undefined;
  fixtureId: string | undefined;
  pageReady: boolean;
};

const FixtureStatisticsComponent = ({
  homeName,
  awayName,
  homeId,
  awayId,
  fixtureId,
  pageReady,
}: FixtureStatisticsComponentProps) => {
  const [homeStatistics, setHomeStatistics] = useState<
    Array<{ type: string; value: number | undefined }>
  >([]);
  const [awayStatistics, setAwayStatistics] = useState<
    Array<{ type: string; value: number | undefined }>
  >([]);
  useEffect(() => {
    const headers = {
      'x-rapidapi-key': 'ae8a0daf8b42d12818ccbdec67ca30f5',
      'x-rapidapi-host': 'v3.football.api-sports.io',
    };
    if (pageReady) {
      axios
        .get(
          'https://v3.football.api-sports.io/fixtures/statistics?fixture=' +
            fixtureId,
          {
            headers: headers,
          },
        )
        .then((res) => {
          setHomeStatistics(res.data.response[0].statistics);
          setAwayStatistics(res.data.response[1].statistics);
          console.log();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pageReady]);

  useInterval(() => {
    const headers = {
      'x-rapidapi-key': 'ae8a0daf8b42d12818ccbdec67ca30f5',
      'x-rapidapi-host': 'v3.football.api-sports.io',
    };
    axios
      .get(
        'https://v3.football.api-sports.io/fixtures/statistics?fixture=' +
          fixtureId,
        {
          headers: headers,
        },
      )
      .then((res) => {
        setHomeStatistics(res.data.response[0].statistics);
        setAwayStatistics(res.data.response[1].statistics);
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  }, 30000);

  return (
    <div className="flex flex-col w-1/4 h-full justify-end font-['MangoDdobak-B']">
      <div className="flex w-full h-2/3 p-8 items-center">
        <div className="flex flex-col w-full h-full bg-white rounded-3xl border-8 border-[#38003C]">
          <div className="flex w-full h-[8rem] border-[#38003C] border-b-8">
            <div className="flex w-full h-full justify-center bg-[#38003C] border-[#38003C] border-r-8 p-2">
              <Image
                src={
                  'https://media.api-sports.io/football/teams/' +
                  homeId +
                  '.png'
                }
                alt={''}
                width={128}
                height={128}
                className="flex w-fit h-full"
              ></Image>
            </div>
            <div className="flex w-full h-full justify-center p-2 bg-[#38003C]">
              <Image
                src={
                  'https://media.api-sports.io/football/teams/' +
                  awayId +
                  '.png'
                }
                alt={''}
                width={128}
                height={128}
                className="flex w-fit h-full"
              ></Image>
            </div>
          </div>
          <div className="flex w-full h-fit text-xl text-center">
            <div className="grid w-full h-fit border-r-4 bg-[#00ff85] border-[#38003C]">
              {homeName}
            </div>
            <div className="grid w-full h-fit bg-[#00ff85]">{awayName}</div>
          </div>
          <div className="flex flex-col w-full h-full text-lg text-center pt-4">
            <div className="flex w-full h-full">
              <div className="grid w-full h-full">
                {homeStatistics[9]?.value}
              </div>
              <div className="grid w-full h-full">점유율</div>
              <div className="grid w-full h-full">
                {awayStatistics[9]?.value}
              </div>
            </div>
            <div className="flex w-full h-full">
              <div className="grid w-full h-full">
                {homeStatistics[2]?.value}
              </div>
              <div className="grid w-full h-full">전체슈팅</div>
              <div className="grid w-full h-full">
                {awayStatistics[2]?.value}
              </div>
            </div>
            <div className="flex w-full h-full">
              <div className="grid w-full h-full">
                {homeStatistics[0]?.value}
              </div>
              <div className="grid w-full h-full">유효슈팅</div>
              <div className="grid w-full h-full">
                {awayStatistics[0]?.value}
              </div>
            </div>
            <div className="flex w-full h-full">
              <div className="grid w-full h-full">
                {homeStatistics[8]?.value}
              </div>
              <div className="grid w-full h-full">오프사이드</div>
              <div className="grid w-full h-full">
                {awayStatistics[8]?.value}
              </div>
            </div>
            <div className="flex w-full h-full">
              <div className="grid w-full h-full">
                {homeStatistics[7]?.value}
              </div>
              <div className="grid w-full h-full">코너킥</div>
              <div className="grid w-full h-full">
                {awayStatistics[7]?.value}
              </div>
            </div>
            <div className="flex w-full h-full">
              <div className="grid w-full h-full">
                {homeStatistics[11]?.value ?? '0'}/
                {homeStatistics[10]?.value ?? '0'}/
                {homeStatistics[6]?.value ?? '0'}
              </div>
              <div className="grid w-full h-full">퇴장|경고|반칙</div>
              <div className="grid w-full h-full">
                {awayStatistics[11]?.value ?? '0'}/
                {awayStatistics[10]?.value ?? '0'}/
                {awayStatistics[6]?.value ?? '0'}
              </div>
            </div>
            <div className="flex w-full h-full">
              <div className="grid w-full h-full">
                {homeStatistics[16]?.value}
              </div>
              <div className="grid w-full h-full">예상득점값</div>
              <div className="grid w-full h-full">
                {awayStatistics[16]?.value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureStatisticsComponent;
