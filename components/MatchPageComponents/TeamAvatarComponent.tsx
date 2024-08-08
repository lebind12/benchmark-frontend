import { Avatar } from '@nextui-org/avatar';

const TeamAvatarComponent = ({
  src = 'https://media.api-sports.io/football/teams/33.png',
  name = 'TEST',
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Avatar src={src} size="lg" name="??" isBordered color="success"></Avatar>
      <span className="text-2xl">{name}</span>
    </div>
  );
};

export default TeamAvatarComponent;
