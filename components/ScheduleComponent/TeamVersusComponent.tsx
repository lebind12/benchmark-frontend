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
  fixtureId: string;
  status: string;
  score: {
    home: number;
    away: number;
  };
};

const TeamVersusComponent = ({
  HomeTeam,
  AwayTeam,
  League,
  Date,
  HomeId,
  AwayId,
  venue,
  fixtureId,
  status,
  score,
}: TeamVersusComponentType) => {
  return (
    <Link
      href={
        '/' +
        League +
        '/' +
        Date.split('T')[0] +
        '/' +
        fixtureId +
        '/matchdetail'
      }
    >
      <div className="flex flex-col w-full h-full p-2 bg-slate-600 rounded-xl">
        <div className="flex w-full justify-evenly items-center">
          <TeamNameComponent name={HomeTeam} team_id={HomeId} />
          {status !== 'Match Finished' ? (
            <span className="flex w-2/5 text-center justify-center items-center text-red-500 text-lg font-['MangoDdobak-B']">
              경기 전
            </span>
          ) : (
            <span className="flex w-2/5 text-center justify-center items-center text-red-500 text-lg font-['MangoDdobak-B']">
              {score.home} - {score.away}
            </span>
          )}

          <TeamNameComponent name={AwayTeam} team_id={AwayId} />
        </div>
        <div className="flex flex-col w-full justify-center">
          <span className="grid justify-center">
            시간: {Date.split('T')[1].slice(0, 5)}
          </span>
          <span className="grid justify-center">장소: {venue}</span>
        </div>
      </div>
    </Link>
  );
};

export default TeamVersusComponent;
