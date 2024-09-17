import { Avatar } from '@nextui-org/avatar';
import { Image } from '@nextui-org/react';

type TeamNameComponentProps = {
  name: string;
  team_id: string;
};

const TeamNameComponent = ({ team_id, name }: TeamNameComponentProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Image
        src={'https://media.api-sports.io/football/teams/' + team_id + '.png'}
        width={48}
        height={48}
        className="w-fit h-full"
      ></Image>
      <span className="text-pretty text-center text-sm">{name}</span>
    </div>
  );
};

export default TeamNameComponent;
