import Image from 'next/image';
import { Avatar } from '@nextui-org/avatar';
import TeamNameComponent from './TeamNameComponent';
import Link from 'next/link';

const TeamVersusComponent = ({
  HomeTeam = 'ManUtd',
  AwayTeam = 'ManCity',
  League = 'premier',
  Date = '2020',
}) => {
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
          <TeamNameComponent name={HomeTeam} />
          <span className="grid items-center text-[60px] font-['MangoDdobak-B']">
            VS
          </span>
          <TeamNameComponent name={AwayTeam} />
        </div>
        <div className="flex flex-col w-full justify-center">
          <span className="grid justify-center">시간: 20:00</span>
          <span className="grid justify-center">장소: Lorem ipsum dolor</span>
        </div>
      </div>
    </Link>
  );
};

export default TeamVersusComponent;
