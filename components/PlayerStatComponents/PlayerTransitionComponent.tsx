import { useEffect, useState } from 'react';
import Image from 'next/image';

type PlayerStatisticsType = {
  player_id: number;
  kor_player_name: string;
  player_age: string;
  face_url: string;
  statistics: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string | null;
      season: number;
    };
    games: {
      appearences: number | null;
      lineups: number | null;
      minutes: number | null;
      number: number | null;
      position: string;
      rating: string | null;
      captain: boolean;
    };
    substitutes: {
      in: number | null;
      out: number | null;
      bench: number | null;
    };
    shots: {
      total: number | null;
      on: number | null;
    };
    goals: {
      total: number | null;
      conceded: number | null;
      assists: number | null;
      saves: number | null;
    };
    passes: {
      total: number | null;
      key: number | null;
      accuracy: number | null;
    };
    tackles: {
      total: number | null;
      blocks: number | null;
      interceptions: number | null;
    };
    duels: {
      total: number | null;
      won: number | null;
    };
    dribbles: {
      attempts: number | null;
      success: number | null;
      past: number | null;
    };
    fouls: {
      drawn: number | null;
      committed: number | null;
    };
    cards: {
      yellow: number | null;
      yellowred: number | null;
      red: number | null;
    };
    penalty: {
      won: number | null;
      commited: number | null;
      scored: number | null;
      missed: number | null;
      saved: number | null;
    };
  }>;
  eng_player_name: string;
  id: number;
  kor_short_name: string;
  player_shirt_number: number | null;
  team_id: number;
  player_detail: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
};

type teamType = Array<{
  team: {
    id: number;
    name: string;
    logo: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
  };
  games: {
    appearences: number | null;
    lineups: number | null;
    minutes: number | null;
    number: number | null;
    position: string;
    rating: string | null;
    captain: boolean;
  };
  substitutes: {
    in: number | null;
    out: number | null;
    bench: number | null;
  };
  shots: {
    total: number | null;
    on: number | null;
  };
  goals: {
    total: number | null;
    conceded: number | null;
    assists: number | null;
    saves: number | null;
  };
  passes: {
    total: number | null;
    key: number | null;
    accuracy: number | null;
  };
  tackles: {
    total: number | null;
    blocks: number | null;
    interceptions: number | null;
  };
  duels: {
    total: number | null;
    won: number | null;
  };
  dribbles: {
    attempts: number | null;
    success: number | null;
    past: number | null;
  };
  fouls: {
    drawn: number | null;
    committed: number | null;
  };
  cards: {
    yellow: number | null;
    yellowred: number | null;
    red: number | null;
  };
  penalty: {
    won: number | null;
    commited: number | null;
    scored: number | null;
    missed: number | null;
    saved: number | null;
  };
}>;

type PlayerTransitionComponentProps = {
  playerData: PlayerStatisticsType | undefined;
};

const PlayerTransitionComponent = ({
  playerData,
}: PlayerTransitionComponentProps) => {
  const [playerTransitionData, setPlayerTransitionData] = useState<teamType>(
    [],
  );

  useEffect(() => {
    setPlayerTransitionData(playerData?.statistics ?? []);
  }, [playerData]);

  return (
    <div className="flex flex-col w-full h-fit bg-primary-50 rounded-xl p-4 gap-4">
      {playerTransitionData.map((item, key) => (
        <div key={key} className="flex gap-2">
          <div className="flex flex-col w-full h-full gap-2">
            <span>{item.team.name}</span>
            <span>{item.league.name}</span>
            <span>{item.league.country}</span>
            <span>{item.league.season}</span>
          </div>
          <div className="flex flex-col w-full h-full gap-2 justify-center items-center bg-white">
            <Image
              src={item.league.logo}
              alt={''}
              width={100}
              height={100}
              className="w-fit h-full bg-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerTransitionComponent;
