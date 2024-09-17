import { useState, useEffect } from 'react';

type PlayerComponentProps = {
  shirtsNumber: number;
  playerId: string;
  position: string;
  teamColor: string;
  goalkeeperColor: string;
  numberColor: string;
  goalkeeperNumberColor: string;
  korName: string;
};

const PlayerComponent = ({
  shirtsNumber,
  playerId,
  position,
  teamColor,
  goalkeeperColor,
  numberColor,
  goalkeeperNumberColor,
  korName,
}: PlayerComponentProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
        style={{
          backgroundColor: position === 'G' ? goalkeeperColor : teamColor,
          color: position === 'G' ? goalkeeperNumberColor : numberColor,
        }}
      >
        {shirtsNumber}
      </div>
      <span className="text-md mt-1 text-black font-bold text-center">
        {korName}
      </span>
    </div>
  );
};

export default PlayerComponent;
