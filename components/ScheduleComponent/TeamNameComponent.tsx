import { Avatar } from '@nextui-org/avatar';
import { Image } from '@nextui-org/react';

type TeamNameComponentProps = {
  name: string;
  url: string;
  color: string;
};

const TeamNameComponent = ({
  src = 'https://media.api-sports.io/football/teams/33.png',
  team_id = '39',
  name = 'TEST',
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Image
        src={'https://media.api-sports.io/football/teams/' + team_id + '.png'}
        width={48}
        height={48}
      ></Image>
      <span className="text-pretty text-center text-sm">{name}</span>
    </div>
  );
};

export default TeamNameComponent;
