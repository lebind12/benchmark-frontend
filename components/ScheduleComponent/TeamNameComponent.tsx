import { Avatar } from '@nextui-org/avatar';

type TeamNameComponentProps = {
  name: string;
  url: string;
  color: string;
};

const TeamNameComponent = ({
  src = 'https://media.api-sports.io/football/teams/33.png',
  name = 'TEST',
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Avatar src={src} size="lg" name="??" isBordered color="success"></Avatar>
      <span>{name}</span>
    </div>
  );
};

export default TeamNameComponent;