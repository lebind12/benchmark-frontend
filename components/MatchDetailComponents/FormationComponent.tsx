import Field from '@/public/footballfield.jpeg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PlayerComponent from '@/components/MatchDetailComponents/PlayerComponent';

type korLineupType = {
  [key: string]: string;
};

type FormationComponentProps = {
  HomeId: number | undefined;
  AwayId: number | undefined;
  homeLineup: any;
  awayLineup: any;
  korLineUp: {
    homeLineUp: korLineupType;
    awayLineUp: korLineupType;
  };
};

const FormationComponent = ({
  HomeId,
  AwayId,
  homeLineup,
  awayLineup,
  korLineUp,
}: FormationComponentProps) => {
  const [homeFormation, setHomeFormation] = useState<Array<any>>([]);
  const [awayFormation, setAwayFormation] = useState<Array<any>>([]);

  useEffect(() => {
    const processLineup = (lineup: any, isHome: boolean) => {
      if (!lineup || !lineup.formation) {
        console.error(
          `${isHome ? 'Home' : 'Away'} lineup or formation is undefined`,
        );
        return [];
      }

      let formation = ['1'].concat(lineup.formation.split('-'));
      let lineupArray = [];
      let index = 0;
      for (let rows of formation) {
        let line = [];
        for (let i = 0; i < parseInt(rows); i++) {
          if (lineup.startXI && lineup.startXI[index]) {
            line.push({
              ...lineup.startXI[index],
              positionNumber: index,
            });
          }
          index++;
        }
        lineupArray.push(line);
      }
      return isHome ? lineupArray : lineupArray.reverse();
    };

    if (homeLineup) {
      setHomeFormation(processLineup(homeLineup, true));
    }
    if (awayLineup) {
      setAwayFormation(processLineup(awayLineup, false));
    }
  }, [homeLineup, awayLineup]);

  if (!homeLineup || !awayLineup) {
    return (
      <div className="flex flex-col w-full h-full rounded-lg bg-primary-50 gap-2 p-4">
        <div className="w-full text-xl font-['ONE-Mobile-POP']">
          <span>포메이션</span>
        </div>
        <div className="flex justify-center items-center h-[300px]">
          <span>라인업 정보를 불러오는 중입니다...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full rounded-lg bg-primary-50 gap-2 p-4">
      <div className="w-full text-xl font-['ONE-Mobile-POP']">
        <span>포메이션</span>
      </div>
      <div className="relative w-full h-[300px]">
        <Image
          src={Field}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          alt={''}
        />
        <div className="absolute inset-0 flex">
          <div className="flex w-1/2 justify-start items-center pl-4 z-20">
            {homeFormation.map((line: Array<any>, lineIndex: number) => (
              <div
                className="flex flex-col w-full h-full justify-evenly"
                key={lineIndex}
              >
                {line.map((player: any, playerIndex: number) => (
                  <PlayerComponent
                    key={playerIndex}
                    shirtsNumber={player.player.number}
                    playerId={player.player.id.toString()}
                    position={player.player.pos}
                    teamColor="#FF0000"
                    goalkeeperColor="#00FF00"
                    numberColor="#FFFFFF"
                    goalkeeperNumberColor="#000000"
                    korName={
                      korLineUp.homeLineUp &&
                      player.player.id in korLineUp.homeLineUp
                        ? korLineUp.homeLineUp[player.player.id]
                        : player.player.name
                    }
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex w-1/2 justify-end items-center pr-4 z-20">
            {awayFormation.map((line: Array<any>, lineIndex: number) => (
              <div
                className="flex flex-col h-full w-full justify-evenly"
                key={lineIndex}
              >
                {line.map((player: any, playerIndex: number) => (
                  <PlayerComponent
                    key={playerIndex}
                    shirtsNumber={player.player.number}
                    playerId={player.player.id.toString()}
                    position={player.player.pos}
                    teamColor="#0000FF"
                    goalkeeperColor="#FFFF00"
                    numberColor="#FFFFFF"
                    goalkeeperNumberColor="#000000"
                    korName={
                      korLineUp.awayLineUp &&
                      player.player.id in korLineUp.awayLineUp
                        ? korLineUp.awayLineUp[player.player.id]
                        : player.player.name
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationComponent;
