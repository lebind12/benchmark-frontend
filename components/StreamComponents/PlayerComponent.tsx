import Ban from '@/public/assets/Ban.png';
import Substitude from '@/public/assets/playerSubstitution.png';
import Goal from '@/public/assets/Goal.png';
import Image from 'next/image';
import YellowCard from '@/public/Yellow_card.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/lib/utils';

type lineupData = {
  [key: number]: lineupPlayerData[];
};

type lineupPlayerData = {
  id: number;
  name: string;
  jerseyNumber: number;
  goalCount: number;
  isWarned: boolean;
  isBanned: boolean;
  substitution: boolean;
  position: string;
};

type PlayerComponentProps = {
  shirtsNumber: number;
  playerId: string;
  position: string;
  teamColor: string;
  goalkeeperColor: string;
  numberColor: string;
  goalkeeperNumberColor: string;
  setPlayerId: any;
  fixtureLineup: lineupData;
  korFixtureLineup: korLineupType;
  positionNumber: number;
  changeCount: number;
  isHome: boolean;
  lineupReady: boolean;
};

type korLineupType = {
  [key: number]: string;
};

const PlayerComponent = ({
  shirtsNumber,
  playerId,
  position,
  teamColor,
  goalkeeperColor,
  numberColor,
  goalkeeperNumberColor,
  setPlayerId,
  fixtureLineup,
  korFixtureLineup,
  positionNumber,
  changeCount,
  isHome,
  lineupReady,
}: PlayerComponentProps) => {
  const [playerKorName, setPlayerKorName] = useState(playerId);
  const [isWarned, setIsWarned] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [isScored, setIsScored] = useState(false);
  const [isSubPlayer, setIsSubPlayer] = useState(false);

  useEffect(() => {
    if (lineupReady) {
      try {
        setPlayerKorName(korFixtureLineup[parseInt(playerId)]);
      } catch (err) {
        setPlayerKorName(fixtureLineup[positionNumber][0]?.name);
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    if (lineupReady) {
      try {
        let name = korFixtureLineup[fixtureLineup[positionNumber][0]?.id];
        if (typeof name !== 'undefined') setPlayerKorName(name);
        else setPlayerKorName(fixtureLineup[positionNumber][0]?.name);
      } catch (err) {
        setPlayerKorName(fixtureLineup[positionNumber][0]?.name);
        console.log(err);
      }
    }
    if (fixtureLineup[positionNumber][0]?.isBanned) setIsBanned(true);
    else setIsBanned(false);

    if (fixtureLineup[positionNumber][0]?.isWarned) setIsWarned(true);
    else setIsWarned(false);

    if (fixtureLineup[positionNumber][0]?.substitution) setIsSubPlayer(true);
    else setIsSubPlayer(false);

    if (fixtureLineup[positionNumber][0]?.goalCount > 0) setIsScored(true);
    else setIsScored(false);
  }, [
    fixtureLineup[positionNumber],
    fixtureLineup[positionNumber][0],
    fixtureLineup[positionNumber][0]?.goalCount,
    fixtureLineup[positionNumber][0]?.isBanned,
    fixtureLineup[positionNumber][0]?.isWarned,
    fixtureLineup[positionNumber][0]?.substitution,
    changeCount,
  ]);

  const handlePlayerId = () => {
    document
      .getElementById('PlayerStatisticsComponent')
      ?.classList.remove('animate__backOutLeft');
    document
      .getElementById('PlayerStatisticsComponent')
      ?.classList.add('animate__backInLeft');
    setPlayerId({
      isHome: isHome,
      positionNumber: positionNumber,
    });
  };

  return (
    <button
      className="flex flex-col w-full items-center"
      onClick={handlePlayerId}
    >
      <div className="flex flex-col w-full items-center">
        <svg
          fill={position === 'G' ? goalkeeperColor : teamColor}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 40.143 40.143"
          xmlSpace="preserve"
          className={cn('w-[36px] object-center z-10')}
        >
          <g>
            <g>
              <path
                d="M29.248,4.118l-0.502,0.503V4.118h-2.473c-1.115,1.723-3.469,2.914-6.202,2.914c-2.732,0-5.086-1.191-6.201-2.914h-2.473
			v0.503l-0.503-0.503L2,13.017l4.865,4.869l4.532-4.534v22.672h17.347V13.353l4.533,4.534l4.864-4.87L29.248,4.118z"
              />
              <path
                d="M28.744,38.024H11.397c-1.104,0-2-0.896-2-2V18.182L8.279,19.3c-0.375,0.376-0.884,0.586-1.415,0.586c0,0,0,0,0,0
			c-0.53,0-1.04-0.211-1.415-0.586l-4.865-4.869c-0.78-0.781-0.78-2.046,0-2.828L9.48,2.704c0.434-0.435,1.061-0.646,1.665-0.57
			c0.083-0.01,0.167-0.016,0.252-0.016h2.473c0.678,0,1.311,0.344,1.679,0.913c0.787,1.216,2.562,2.001,4.522,2.001
			s3.736-0.785,4.523-2.001c0.368-0.569,1-0.913,1.679-0.913h2.473c0.085,0,0.169,0.005,0.252,0.016
			c0.082-0.01,0.165-0.016,0.249-0.016c0.001,0,0.001,0,0.001,0c0.53,0,1.039,0.211,1.415,0.586l8.894,8.898
			c0.78,0.781,0.78,2.046,0,2.828l-4.864,4.87c-0.375,0.375-0.884,0.586-1.414,0.586c-0.001,0-0.001,0-0.001,0
			c-0.53,0.001-1.039-0.21-1.414-0.585l-1.119-1.12v17.843C30.744,37.129,29.849,38.024,28.744,38.024z M13.397,34.024h13.347
			V13.353c0-0.809,0.487-1.538,1.234-1.848c0.748-0.311,1.607-0.139,2.18,0.434l3.118,3.118l2.038-2.04l-6.399-6.403
			c-0.319,0.029-0.633-0.021-0.934-0.145c-0.209-0.086-0.398-0.206-0.562-0.351h-0.172c-1.651,1.82-4.297,2.914-7.176,2.914
			c-2.879,0-5.524-1.094-7.176-2.914h-0.172c-0.163,0.145-0.352,0.264-0.561,0.351c-0.303,0.125-0.625,0.169-0.936,0.145l-6.4,6.404
			l2.038,2.04l3.117-3.119c0.572-0.573,1.432-0.744,2.18-0.434c0.748,0.31,1.235,1.039,1.235,1.848V34.024z"
              />
            </g>
          </g>
        </svg>
        {position === 'G' ? (
          <span
            className="absolute text-lg z-20"
            style={{ color: goalkeeperNumberColor }}
          >
            {shirtsNumber}
          </span>
        ) : (
          <span
            className="absolute text-lg z-20"
            style={{ color: numberColor }}
          >
            {shirtsNumber}
          </span>
        )}

        <span className="text-md text-pretty text-center">{playerKorName}</span>
        <div className="relative w-7 -top-[4.5rem] right-5">
          {isScored ? (
            <Image
              src={Goal}
              alt={''}
              width={24}
              className="absolute w-8 z-30"
            ></Image>
          ) : (
            <></>
          )}
        </div>
        <div className="relative w-5 -top-[4rem] -right-5">
          {isSubPlayer ? (
            <Image
              src={Substitude}
              alt={''}
              width={24}
              className="absolute z-30"
            ></Image>
          ) : (
            <></>
          )}
        </div>
        <div className="relative w-3 -top-[2.5rem] right-4">
          {isWarned ? (
            <Image
              src={YellowCard}
              alt={''}
              width={24}
              className="absolute z-30"
            ></Image>
          ) : (
            <></>
          )}
        </div>
        {isBanned ? (
          <Image
            src={Ban}
            alt={''}
            width={36}
            className="absolute z-30"
          ></Image>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

export default PlayerComponent;
