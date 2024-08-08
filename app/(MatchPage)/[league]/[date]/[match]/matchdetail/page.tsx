'use client';

import TeamAvatarComponent from '@/components/MatchPageComponents/TeamAvatarComponent';
import { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import FootballField from '@/public/footballfield.jpeg';

export default function Home({
  params,
}: {
  params: {
    league: string;
    date: string;
    match: string;
  };
}) {
  const [HomeTeam, setHomeTeam] = useState(params.match.split('-')[0]);
  const [AwayTeam, setAwayTeam] = useState(params.match.split('-')[1]);
  return (
    <div className="h-full w-full mt-4">
      <div className="flex flex-col w-full h-full gap-4">
        <div className="flex w-full justify-center items-center">
          <div className="w-full justify-center">
            <TeamAvatarComponent name={HomeTeam}></TeamAvatarComponent>
          </div>
          <div className="w-full justify-center">
            <span className="grid justify-center text-2xl">VS</span>
          </div>
          <div className="w-full justify-center">
            <TeamAvatarComponent name={AwayTeam}></TeamAvatarComponent>
          </div>
        </div>
        <div className="w-full text-2xl text-center">
          <div>00:00</div>
          <div>에미레이츠 스타디움</div>
        </div>
        <div className="flex flex-none w-full justify-center">
          <Image src={FootballField} alt={'경기장'} />
        </div>
        <div>라인업</div>
      </div>
    </div>
  );
}
