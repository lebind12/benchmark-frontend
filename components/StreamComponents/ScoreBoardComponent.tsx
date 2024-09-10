import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import Image from 'next/image';
import useInterval from '@/hooks/intervalHook';
import '@/app/globals.css';
import { footballAPI } from '@/apis/footballAPI';

type ScoreBoardComponentProps = {
  homeName: string | undefined;
  awayName: string | undefined;
  homeId: number | undefined;
  awayId: number | undefined;
  fixtureId: string | undefined;
  pageReady: boolean;
};

const ScoreBoardComponent = ({
  homeName,
  awayName,
  homeId,
  awayId,
  fixtureId,
  pageReady,
}: ScoreBoardComponentProps) => {
  const [injuryTime, setInjuryTime] = useState(0);
  const [time, setTime] = useState('00:00');
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  useEffect(() => {
    if (pageReady) {
      footballAPI
        .get('/fixtures', {
          params: {
            id: fixtureId,
          },
        })
        .then((res) => {
          setHomeScore(res.data.response[0]?.goals?.home);
          setAwayScore(res.data.response[0]?.goals?.away);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pageReady]);

  useInterval(() => {
    footballAPI
      .get('/fixtures', {
        params: {
          id: fixtureId,
        },
      })
      .then((res) => {
        setHomeScore(res.data.response[0]?.goals?.home);
        setAwayScore(res.data.response[0]?.goals?.away);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 10000);

  const makeSecond = (second: number) => {
    if (second < 10) {
      return '0' + second.toString();
    } else {
      return second.toString();
    }
  };

  const makeMinute = (minute: number) => {
    if (minute < 10) {
      return '0' + minute.toString();
    } else {
      return minute.toString();
    }
  };

  useInterval(
    () => {
      if (second + 1 >= 60) {
        setMinute(minute + 1);
        setSecond(0);
      } else {
        setSecond(second + 1);
      }
    },
    isRunning ? 1000 : null,
  );

  return (
    <div className="flex w-2/4 h-full justify-center font-['ONE-Mobile-POP'] mt-4">
      <div className="flex flex-col h-2/3 w-4/5">
        <div className="flex h-1/2 w-full bg-[#38003C] text-2xl text-center border-8 border-[#38003C] rounded-2xl">
          <div className="flex h-full w-full">
            <div className="flex h-full w-1/3 bg-white text-center items-center justify-center overflow-hidden border-1 border-[#38003C] rounded-xl">
              <Image
                src={
                  'https://media.api-sports.io/football/teams/' +
                  homeId +
                  '.png'
                }
                alt={''}
                width={256}
                height={256}
                className="flex w-fit h-full"
              ></Image>
            </div>
            <button
              onClick={() => {
                let time = prompt('시간 입력. 사이에 : 가 있어야합니다.');
                if (time !== null && time.includes(':')) {
                  setTime(time);
                  let a = time.split(':');
                  setSecond(parseInt(a[1]));
                  setMinute(parseInt(a[0]));
                }
              }}
              className="grid items-center h-full w-full"
            >
              <div className="text-white">{homeName}</div>
            </button>
            <div className="grid h-full w-1/4 bg-[#00ff85] text-3xl text-center items-center">
              {homeScore ?? '-'}
            </div>
          </div>
          <Separator
            orientation="vertical"
            decorative
            className="w-1 h-full p-1 bg-[#38003C]"
          ></Separator>
          <div className="flex h-full w-full">
            <div className="grid h-full w-1/4 bg-[#00ff85] text-3xl text-center items-center">
              {awayScore ?? '-'}
            </div>
            <button
              onClick={() => {
                if (isRunning) setIsRunning(false);
                else setIsRunning(true);
              }}
              className="grid items-center h-full w-full"
            >
              <div className="text-white">{awayName}</div>
            </button>

            <div className="flex h-full w-1/3 bg-white text-center justify-center items-center overflow-hidden border-1 border-[#38003C] rounded-xl">
              <Image
                src={
                  'https://media.api-sports.io/football/teams/' +
                  awayId +
                  '.png'
                }
                alt={''}
                width={256}
                height={256}
                className="flex w-fit h-full"
              ></Image>
            </div>
          </div>
        </div>
        <div className="flex h-1/2 w-full">
          <div className="w-5/12"></div>
          <button
            onClick={() => {
              let time = prompt("추가시간 입력. 단위는 '분'입니다");
              if (time !== null) {
                setInjuryTime(parseInt(time));
              }
            }}
            className="grid items-center h-2/3 w-1/6 bg-white text-center text-3xl border-[#38003C] rounded-b-xl"
          >
            <div className="">
              {makeMinute(minute)}:{makeSecond(second)}
            </div>
          </button>
          <button
            onClick={() => {
              let time = prompt("추가시간 입력. 단위는 '분'입니다");
              if (time !== null) {
                setInjuryTime(parseInt(time));
              }
            }}
            className="grid items-center h-1/2 w-[4rem] bg-white text-center text-xl border-[#38003C] rounded-br-xl"
          >
            <div className="">+{injuryTime}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardComponent;
