import Image from 'next/image';
import { Avatar } from '@nextui-org/avatar';
import TeamNameComponent from './TeamNameComponent';
import Link from 'next/link';

type TeamVersusComponentType = {
  HomeTeam: string;
  AwayTeam: string;
  League: string;
  Date: string;
  HomeId: string;
  AwayId: string;
  venue: string;
};

const TeamVersusComponent = ({
  HomeTeam = 'ManUtd',
  AwayTeam = 'ManCity',
  League = 'premier',
  Date = '2020',
  HomeId,
  AwayId,
  venue,
}: TeamVersusComponentType) => {
  return (
    <Link
      href={
        '/' +
        League +
        '/' +
        Date +
        '/' +
        HomeTeam +
        '-' +
        AwayTeam +
        '/matchdetail'
      }
    >
      <div className="flex flex-col w-full h-full p-2 bg-slate-600 rounded-xl">
        <div className="flex w-full justify-evenly items-center">
          <TeamNameComponent name={HomeTeam} team_id={HomeId} />
          <span className="flex w-2/5 text-center justify-center items-center text-red-500 text-lg font-['MangoDdobak-B']">
            0 - 0
          </span>
          <TeamNameComponent name={AwayTeam} team_id={AwayId} />
        </div>
        <div className="flex flex-col w-full justify-center">
          <span className="grid justify-center">시간: {Date.slice(0, 5)}</span>
          <span className="grid justify-center">장소: {venue}</span>
        </div>
      </div>
    </Link>
  );
};

export default TeamVersusComponent;
