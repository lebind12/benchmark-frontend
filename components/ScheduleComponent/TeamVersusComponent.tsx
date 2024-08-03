import Image from 'next/image';
import { Avatar } from '@nextui-org/avatar';
import TeamNameComponent from './TeamNameComponent';

const TeamVersusComponent = () => {
  return (
    <div className="flex flex-col w-full h-full bg-slate-600 rounded-xl">
      <div className="flex w-full justify-evenly items-center">
        <TeamNameComponent />
        <span className="text-[60px] font-['MangoDdobak-B']">VS</span>
        <TeamNameComponent />
      </div>
      <div className="flex flex-col w-full justify-center">
        <span className="grid justify-center">시간: 20:00</span>
        <span className="grid justify-center">장소: Lorem ipsum dolor</span>
      </div>
    </div>
  );
};

export default TeamVersusComponent;
