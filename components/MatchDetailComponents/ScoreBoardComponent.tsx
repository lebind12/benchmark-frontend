import Image from 'next/image';
import '@/styles/fonts.css';
import { useEffect, useState } from 'react';
import { benchmarkAPI } from '@/apis/backend';

type ScoreBoardComponentProps = {
  HomeId: number | undefined;
  AwayId: number | undefined;
  score:
    | {
        home: number;
        away: number;
      }
    | undefined;
  homeName: string | undefined;
  awayName: string | undefined;
  venue: string | undefined;
  fixtureState: string | undefined;
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

const ScoreBoardComponent = ({
  HomeId,
  AwayId,
  venue,
  score,
  homeName,
  awayName,
  fixtureState,
}: ScoreBoardComponentProps) => {
  return (
    <div className="flex flex-col w-full h-full bg-primary-50 text-2xl rounded-xl font-['ONE-Mobile-POP'] p-4">
      <div className="flex w-full h-full p-4">
        <div className="flex flex-col w-full justify-center items-center text-lg">
          <Image
            src={
              'https://media.api-sports.io/football/teams/' + HomeId + '.png'
            }
            alt={''}
            width={120}
            height={120}
            className="w-fit h-full"
          />
          <span>{homeName}</span>
        </div>

        <div className="grid grid-cols-3 w-full h-full justify-center text-center items-center">
          <span className="text-5xl">{score?.home}</span>
          <span className="text-5xl">:</span>
          <span className="text-5xl">{score?.away}</span>
        </div>
        <div className="flex flex-col w-full justify-center items-center text-lg">
          <Image
            src={
              'https://media.api-sports.io/football/teams/' + AwayId + '.png'
            }
            alt={''}
            width={120}
            height={120}
            className="w-fit h-full"
          />
          <span>{awayName}</span>
        </div>
      </div>
      <div className="flex flex-col w-full h-fit justify-center text-center">
        <div className="w-full">
          <span className="text-pretty text-lg">
            {fixtureState === 'Match Finished' ? '경기 종료' : '경기 전'}
          </span>
        </div>
        <span className="text-xl">{venue}</span>
      </div>
    </div>
  );
};

export default ScoreBoardComponent;
