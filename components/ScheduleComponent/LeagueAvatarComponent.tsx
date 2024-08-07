import { Avatar } from '@nextui-org/avatar';

type TeamNameComponentProps = {
  name: string;
  url: string;
  color: string;
};

const LeagueAvatarComponent = ({
  src = 'https://media.api-sports.io/football/teams/33.png',
  name = 'TEST',
  isSelected = false,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Avatar
        src={src}
        name="??"
        isBordered
        color={isSelected ? 'success' : 'default'}
        className="w-20 h-20 text-large mb-2"
      ></Avatar>
      <span>{name}</span>
    </div>
  );
};

export default LeagueAvatarComponent;
