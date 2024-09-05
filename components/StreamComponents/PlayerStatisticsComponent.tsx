import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type playerObjectType = {
  name: string;
  backnumber: string;
  birthYear: string;
  nation: string;
  cards: { yellow: 0; red: 0 };
  dribbles: { attempts: null; success: null; past: null };
  duels: { total: null; won: null };
  fouls: { drawn: null; committed: null };
  games: {
    captain: false;
    minutes: null;
    number: 5;
    position: 'D';
    rating: null;
    substitute: true;
  };
  goals: { total: null; conceded: 0; assists: null; saves: null };
  offsides: null;
  passes: { total: null; key: null; accuracy: null };
  penalty: { won: null; commited: null; scored: 0; missed: 0; saved: null };
  shots: { total: null; on: null };
  tackles: { total: null; blocks: null; interceptions: null };
};

type korLineupType = {
  [key: number]: string;
};

const getPositionName = (position: string) => {
  switch (position) {
    case 'F':
      return '공격';
    case 'M':
      return '미드필더';
    case 'D':
      return '수비';
    case 'G':
      return '골키퍼';
    default:
      return '오류';
  }
};

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

const PlayerStatisticsComponent = ({
  playerId,
  fixture,
  korLineup,
  fixtureHomeLineup,
  fixtureAwayLineup,
}: {
  playerId: {
    isHome: boolean;
    positionNumber: number;
  };
  fixture: string;
  korLineup: korLineupType;
  fixtureHomeLineup: lineupData;
  fixtureAwayLineup: lineupData;
}) => {
  const [korPlayerName, setKorPlayerName] = useState('');
  const [pid, setPID] = useState(999);
  const [subNumber, setSubNumber] = useState(0);
  const [player, setPlayer] = useState<playerObjectType>({
    name: '',
    backnumber: '',
    birthYear: '',
    nation: '',
    cards: { yellow: 0, red: 0 },
    dribbles: { attempts: null, success: null, past: null },
    duels: { total: null, won: null },
    fouls: { drawn: null, committed: null },
    games: {
      captain: false,
      minutes: null,
      number: 5,
      position: 'D',
      rating: null,
      substitute: true,
    },
    goals: { total: null, conceded: 0, assists: null, saves: null },
    offsides: null,
    passes: { total: null, key: null, accuracy: null },
    penalty: { won: null, commited: null, scored: 0, missed: 0, saved: null },
    shots: { total: null, on: null },
    tackles: { total: null, blocks: null, interceptions: null },
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGoalKeeper, setIsGoalKeeper] = useState(false);
  const positionLength = useRef(0);

  useEffect(() => {
    setIsLoaded(false);
    let id: number;
    if (playerId.isHome) {
      id = fixtureHomeLineup[playerId.positionNumber][0]?.id;
      if (typeof korLineup[id] !== 'undefined') setKorPlayerName(korLineup[id]);
      else setKorPlayerName(id?.toString());
      positionLength.current =
        fixtureHomeLineup[playerId.positionNumber].length;
      setPID(id);
    } else {
      id = fixtureAwayLineup[playerId.positionNumber][0]?.id;
      if (typeof korLineup[id] !== 'undefined') setKorPlayerName(korLineup[id]);
      else setKorPlayerName(id?.toString());
      positionLength.current =
        fixtureAwayLineup[playerId.positionNumber].length;
      setPID(id);
    }
    setSubNumber(0);

    const headers = {
      'x-rapidapi-key': 'ae8a0daf8b42d12818ccbdec67ca30f5',
      'x-rapidapi-host': 'v3.football.api-sports.io',
    };
    axios
      .get(
        'https://v3.football.api-sports.io/fixtures/players?fixture=' + fixture,
        { headers: headers },
      )
      .then((res) => {
        let totalPlayerLineupData = [
          ...res.data.response[0].players,
          ...res.data.response[1].players,
        ];
        for (let playerData of totalPlayerLineupData) {
          if (playerData.player.id == id) {
            let statistics = playerData.statistics[0];
            let selectedPlayer = {
              name: playerData.player.name,
              backnumber: '',
              birthYear: '',
              nation: '',
              cards: statistics.cards,
              dribbles: statistics.dribbles,
              duels: statistics.duels,
              fouls: statistics.fouls,
              games: statistics.games,
              goals: statistics.goals,
              offsides: statistics.offside,
              passes: statistics.passes,
              penalty: statistics.penalty,
              shots: statistics.shots,
              tackles: statistics.tackles,
            };
            setPlayer(selectedPlayer);
            break;
          }
        }
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [playerId]);

  useEffect(() => {
    setIsLoaded(false);
    let id;
    if (playerId.isHome) {
      id = fixtureHomeLineup[playerId.positionNumber][subNumber]?.id;
      if (typeof korLineup[id] !== 'undefined') setKorPlayerName(korLineup[id]);
      else setKorPlayerName(id?.toString());
      setPID(id);
    } else {
      id = fixtureAwayLineup[playerId.positionNumber][subNumber]?.id;
      if (typeof korLineup[id] !== 'undefined') setKorPlayerName(korLineup[id]);
      else setKorPlayerName(id?.toString());
      setPID(id);
    }
    const headers = {
      'x-rapidapi-key': 'ae8a0daf8b42d12818ccbdec67ca30f5',
      'x-rapidapi-host': 'v3.football.api-sports.io',
    };
    axios
      .get(
        'https://v3.football.api-sports.io/fixtures/players?fixture=' + fixture,
        { headers: headers },
      )
      .then((res) => {
        let totalPlayerLineupData = [
          ...res.data.response[0].players,
          ...res.data.response[1].players,
        ];
        for (let playerData of totalPlayerLineupData) {
          if (playerData.player.id == id) {
            let statistics = playerData.statistics[0];
            let selectedPlayer = {
              name: playerData.player.name,
              backnumber: '',
              birthYear: '',
              nation: '',
              cards: statistics.cards,
              dribbles: statistics.dribbles,
              duels: statistics.duels,
              fouls: statistics.fouls,
              games: statistics.games,
              goals: statistics.goals,
              offsides: statistics.offside,
              passes: statistics.passes,
              penalty: statistics.penalty,
              shots: statistics.shots,
              tackles: statistics.tackles,
            };
            setPlayer(selectedPlayer);
            break;
          }
        }
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [subNumber]);

  const handleNext = () => {
    setSubNumber(subNumber + 1);
  };

  const handlePrev = () => {
    setSubNumber(subNumber === 0 ? subNumber : subNumber - 1);
  };

  const handleQuit = () => {
    document
      .getElementById('PlayerStatisticsComponent')
      ?.classList.remove('animate__backInLeft');
    document
      .getElementById('PlayerStatisticsComponent')
      ?.classList.add('animate__backOutLeft');
  };
  return (
    <div
      id="PlayerStatisticsComponent"
      className="absolute w-1/4 h-3/4 left-4 ml-auto mr-auto font-['TTLaundryGothicB'] animate__animated z-50 animate__backOutLeft"
    >
      <div className="flex flex-col w-7/8 h-5/6 mt-20 border-8 rounded-xl bg-white border-[#38003C]">
        {isLoaded ? (
          <>
            <div className="flex w-full h-1/4 justify-center p-4 bg-[#38003C]">
              <Image
                src={
                  'https://media.api-sports.io/football/players/' + pid + '.png'
                }
                alt={''}
                width={256}
                height={256}
                className="flex w-fit h-full rounded-full border-8 border-[#38003C]"
              ></Image>
              <div className="flex flex-col justify-center items-center text-white text-xl w-full h-full">
                <span>{korPlayerName}</span>
                <span>{player.name}</span>
                <div className="grid grid-cols-2 text-center text-lg w-full">
                  <span>포지션</span>
                  <span>{getPositionName(player.games.position)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full p-4 text-xl justify-center items-center border-t-8 border-[#38003C]">
              <div className="flex flex-col w-full h-full items-center justify-center gap-2">
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>평점</span>
                  <span>{player.games.rating ?? 0.0}</span>
                </div>
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>출전시간</span>
                  <span>{player.games.minutes ?? 0}</span>
                </div>
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>오프사이드</span>
                  <span>{player.offsides ?? 0}</span>
                </div>
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>태클</span>
                  <span>
                    {player.tackles?.total ?? 0}/{player.tackles?.blocks ?? 0}/
                    {player.tackles?.interceptions ?? 0}
                  </span>
                </div>
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>파울</span>
                  <span>
                    {player.fouls?.drawn ?? 0}/{player.fouls?.committed ?? 0}
                  </span>
                </div>
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>슈팅</span>
                  <span>
                    {player.shots?.total ?? 0}/{player.shots?.on ?? 0}
                  </span>
                </div>
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>골</span>
                  <span>{player.goals?.total ?? 0}</span>
                </div>
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>어시스트</span>
                  <span>{player.goals?.assists ?? 0}</span>
                </div>
                <div className="grid grid-cols-2 text-center items-center w-full h-fit">
                  <span>패스(전체/주요/정확도)</span>
                  <span>
                    {player.passes?.total ?? 0}/{player.passes?.key ?? 0}/
                    {player.passes?.accuracy ?? 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 w-full">
              {subNumber === 0 ? (
                <div></div>
              ) : (
                <button onClick={handlePrev}>이전</button>
              )}

              <button onClick={handleQuit}>나가기</button>
              {subNumber < positionLength.current - 1 ? (
                <button onClick={handleNext}>다음</button>
              ) : (
                <div></div>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PlayerStatisticsComponent;
