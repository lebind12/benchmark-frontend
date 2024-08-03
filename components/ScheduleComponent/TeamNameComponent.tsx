import { Avatar } from '@nextui-org/avatar';

const TeamNameComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Avatar
        src="https://media.api-sports.io/football/teams/33.png"
        size="lg"
        name="??"
        isBordered
        color="success"
      ></Avatar>
      <span>MAN UTD</span>
    </div>
  );
};

export default TeamNameComponent;
