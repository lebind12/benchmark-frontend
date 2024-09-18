'use client';

import { Avatar } from '@nextui-org/avatar';

type LeagueAvatarComponentProps = {
  src: string;
  isSelected: boolean;
};

const LeagueAvatarComponent = ({
  src = 'https://media.api-sports.io/football/teams/33.png',
  isSelected = false,
}: LeagueAvatarComponentProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Avatar
        src={src}
        name="??"
        isBordered
        color={isSelected ? 'success' : 'default'}
        className="w-6 h-6 mb-2"
      />
    </div>
  );
};

export default LeagueAvatarComponent;
