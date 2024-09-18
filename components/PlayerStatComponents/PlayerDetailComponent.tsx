'use client';

import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

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

type PlayerDetailComponentProps = {
  playerData: PlayerStatisticsType | undefined;
};

const PlayerDetailComponent = ({ playerData }: PlayerDetailComponentProps) => {
  const [teamName, setTeamName] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [playerAge, setPlayerAge] = useState<string>('');
  const [playerHeight, setPlayerHeight] = useState<string>('');
  const [playerWeight, setPlayerWeight] = useState<string>('');
  const [playerNationality, setPlayerNationality] = useState<string>('');
  const [playerPhoto, setPlayerPhoto] = useState<string>('');
  const [playerShirtNumber, setPlayerShirtNumber] = useState<string>('');

  useEffect(() => {
    setTeamName(playerData?.statistics[0]?.team.name ?? '');
    setPlayerName(playerData?.kor_player_name ?? '');
    setPlayerAge(playerData?.player_age ?? '');
    setPlayerHeight(playerData?.player_detail.height ?? '');
    setPlayerWeight(playerData?.player_detail.weight ?? '');
    setPlayerNationality(playerData?.player_detail.nationality ?? '');
    setPlayerPhoto(playerData?.player_detail.photo ?? '');
    setPlayerShirtNumber(playerData?.player_shirt_number?.toString() ?? '');
  }, [playerData]);

  return (
    <div className="flex flex-col w-full h-fit gap-4">
      <div className="flex w-full h-fit bg-primary-50 rounded-xl p-4 gap-4 ">
        <div className="w-2/5">
          <Image
            src={'https://media.api-sports.io/football/players/1485.png'}
            alt={''}
            width={150}
            height={150}
            className="rounded-full"
          ></Image>
        </div>
        <div className="flex grow-0 flex-col w-full justify-center items-center">
          <span className="text-2xl">{playerName}</span>
          <span>{teamName}</span>
        </div>
      </div>
      <div className="flex w-full h-fit bg-primary-50 rounded-xl p-4 gap-4 text-xl">
        <div className="flex w-full">
          <div className="grid grid-cols-1 w-1/2">
            <div className="flex w-full">
              <span className="w-full">키</span>
              <span className="w-full">{playerHeight}</span>
            </div>
            <div className="flex w-full">
              <span className="w-full">나이</span>
              <span className="w-full">{playerAge}</span>
            </div>
            <div className="flex w-full">
              <span className="w-full">국가</span>
              <span className="w-full">{playerNationality}</span>
            </div>
          </div>
          <Separator orientation="vertical"></Separator>
          <div className="grid grid-cols-1 w-1/2">
            <div className="flex w-full">
              <span className="w-full">셔츠 넘버</span>
              <span className="w-full">{playerShirtNumber}</span>
            </div>
            <div className="flex w-full">
              <span className="w-full">몸무게</span>
              <span className="w-full">{playerWeight}</span>
            </div>
            <div className="flex w-full">
              <span className="w-full">부상상태</span>
              <span className="w-full">
                {playerData?.player_detail.injured ? '부상' : '정상'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailComponent;
