import Image from 'next/image';
import Field from '@/public/assets/FieldBoard.png';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import PlayerComponent from './PlayerComponent';
import 'animate.css';
import { footballAPI } from '@/apis/footballAPI';

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
type korLineupType = {
  [key: number]: string;
};

type FormationComponentProps = {
  fixtureId: string | undefined;
  fixtureHomeLineup: lineupData;
  fixtureAwayLineup: lineupData;
  korHomeLineup: korLineupType;
  korAwayLineup: korLineupType;
  setPlayerId: any;
  changeCount: number;
  pageReady: boolean;
  korHomeLineupReady: boolean;
  korAwayLineupReady: boolean;
};

const FormationComponent = ({
  fixtureId,
  fixtureHomeLineup,
  fixtureAwayLineup,
  korHomeLineup,
  korAwayLineup,
  setPlayerId,
  changeCount,
  pageReady,
  korHomeLineupReady,
  korAwayLineupReady,
}: FormationComponentProps) => {
  const [homeLineup, setHomeLineup] = useState<Array<any>>([]);
  const [awayLineup, setAwayLineup] = useState<Array<any>>([]);
  const [homeTeamColor, setHomeTeamColor] = useState('');
  const [awayTeamColor, setAwayTeamColor] = useState('');
  const [homeGoalkeeperTeamColor, setHomeGoalkeeperTeamColor] = useState('');
  const [awayGoalkeeperTeamColor, setAwayGoalkeeperTeamColor] = useState('');
  const [homeNumberColor, setHomeNumberColor] = useState('');
  const [awayNumberColor, setAwayNumberColor] = useState('');
  const [homeGoalkeeperNumberColor, setHomeGoalkeeperNumberColor] =
    useState('');
  const [awayGoalkeeperNumberColor, setAwayGoalkeeperNumberColor] =
    useState('');
  const [homeLineupReady, setHomeLineupReady] = useState(false);
  const [awayLineupReady, setAwayLineupReady] = useState(false);
  const homeIndex = useRef(0);
  const awayIndex = useRef(0);

  useEffect(() => {
    if (pageReady && korHomeLineupReady && korAwayLineupReady) {
      footballAPI
        .get('/fixtures/lineups', {
          params: { fixture: fixtureId },
        })
        .then((res) => {
          if (res.data.response.length > 0) {
            setHomeTeamColor(res.data.response[0].team.colors.player.primary);
            setAwayTeamColor(res.data.response[1].team.colors.player.primary);
            setHomeGoalkeeperTeamColor(
              res.data.response[0].team.colors.goalkeeper.primary,
            );
            setAwayGoalkeeperTeamColor(
              res.data.response[1].team.colors.goalkeeper.primary,
            );
            setHomeNumberColor(res.data.response[0].team.colors.player.number);
            setAwayNumberColor(res.data.response[1].team.colors.player.number);
            setHomeGoalkeeperNumberColor(
              res.data.response[0].team.colors.goalkeeper.number,
            );
            setAwayGoalkeeperNumberColor(
              res.data.response[1].team.colors.goalkeeper.number,
            );
            // response.formation
            let homeFormation = ['1'].concat(
              res.data.response[0].formation.split('-'),
            );
            let awayFormation = ['1'].concat(
              res.data.response[1].formation.split('-'),
            );
            // response.startXI
            let homeLineupArray = [];
            let index = 0;
            for (let rows of homeFormation) {
              let line = [];
              for (let i = 0; i < parseInt(rows); i++) {
                line.push({
                  ...res.data.response[0].startXI[index],
                  positionNumber: index,
                });
                index++;
              }
              homeLineupArray.push(line);
            }
            let awayLineupArray = [];
            index = 0;
            for (let rows of awayFormation) {
              let line = [];
              for (let i = 0; i < parseInt(rows); i++) {
                line.push({
                  ...res.data.response[1].startXI[index],
                  positionNumber: index,
                });
                index++;
              }
              awayLineupArray.push(line.reverse());
            }
            setHomeLineup(homeLineupArray);
            setAwayLineup(awayLineupArray.reverse());

            setHomeLineupReady(true);
            setAwayLineupReady(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pageReady, korAwayLineupReady, korHomeLineupReady]);

  return (
    <div className="flex flex-col w-1/4 h-full items-center justify-center pl-4 font-['TTLaundryGothicB']">
      <Image
        src={Field}
        alt={''}
        width={487}
        height={653}
        className="absolute left-4"
      ></Image>
      <div className="flex flex-col w-full justify-end h-2/5 pl-4 pt-2 z-20">
        {homeLineup.map((lines: Array<any>, key) => (
          <div className="flex w-full h-full justify-evenly" key={key}>
            {lines.map((player: any, key) => (
              <PlayerComponent
                key={key}
                positionNumber={player.positionNumber}
                shirtsNumber={player.player.number}
                playerId={player.player.id}
                position={player.player.pos}
                teamColor={'#' + homeTeamColor}
                goalkeeperColor={'#' + homeGoalkeeperTeamColor}
                numberColor={'#' + homeNumberColor}
                goalkeeperNumberColor={'#' + homeGoalkeeperNumberColor}
                setPlayerId={setPlayerId}
                fixtureLineup={fixtureHomeLineup}
                korFixtureLineup={korHomeLineup}
                changeCount={changeCount}
                isHome={true}
                lineupReady={homeLineupReady}
              ></PlayerComponent>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full justify-start h-2/5 pl-4 pt-2 z-20">
        {awayLineup.map((lines: Array<any>, key) => (
          <div className="flex w-full h-full justify-evenly" key={key}>
            {lines.map((player: any, key) => (
              <PlayerComponent
                key={key}
                positionNumber={player.positionNumber}
                shirtsNumber={player.player.number}
                playerId={player.player.id}
                position={player.player.pos}
                teamColor={'#' + awayTeamColor}
                goalkeeperColor={'#' + awayGoalkeeperTeamColor}
                numberColor={'#' + awayNumberColor}
                goalkeeperNumberColor={'#' + awayGoalkeeperNumberColor}
                setPlayerId={setPlayerId}
                fixtureLineup={fixtureAwayLineup}
                korFixtureLineup={korAwayLineup}
                changeCount={changeCount}
                isHome={false}
                lineupReady={awayLineupReady}
              ></PlayerComponent>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationComponent;
