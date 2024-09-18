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

const PlayerSeasonDataComponent = ({
  params,
  playerData,
}: {
  params: { league: string; playerid: string };
  playerData: PlayerStatisticsType | undefined;
}) => {
  return (
    <div className="flex flex-col w-full h-full bg-primary-50 rounded-xl justify-center items-center">
      {playerData?.statistics.map((stat) => {
        const leagueId = stat.league.id;
        const isValidLeague =
          (params.league === 'premier' && leagueId === 39) ||
          (params.league === 'champions' && leagueId === 2) ||
          (params.league === 'europa' && leagueId === 3) ||
          (params.league === 'karabao' && leagueId === 42) ||
          (params.league === 'fa' && leagueId === 45);

        if (isValidLeague) {
          return (
            <div key={leagueId} className="flex flex-col w-full h-full gap-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-100">
                    <th className="border p-2">카테고리</th>
                    <th className="border p-2">데이터</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">경기 출전</td>
                    <td className="border p-2">
                      {stat.games.appearences} 경기
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">선발 출전</td>
                    <td className="border p-2">{stat.games.lineups} 경기</td>
                  </tr>
                  <tr>
                    <td className="border p-2">총 출전 시간</td>
                    <td className="border p-2">{stat.games.minutes} 분</td>
                  </tr>
                  <tr>
                    <td className="border p-2">주 포지션</td>
                    <td className="border p-2">
                      {stat.games.position === 'Attacker'
                        ? '공격수'
                        : stat.games.position === 'Midfielder'
                        ? '미드필더'
                        : stat.games.position === 'Defender'
                        ? '수비수'
                        : stat.games.position === 'Goalkeeper'
                        ? '골키퍼'
                        : stat.games.position}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">평균 평점</td>
                    <td className="border p-2">
                      {Number(stat.games.rating).toFixed(1)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">골</td>
                    <td className="border p-2">{stat.goals.total} 골</td>
                  </tr>
                  <tr>
                    <td className="border p-2">어시스트</td>
                    <td className="border p-2">{stat.goals.assists} 개</td>
                  </tr>
                  <tr>
                    <td className="border p-2">패스 성공률</td>
                    <td className="border p-2">{stat.passes.accuracy}%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">태클</td>
                    <td className="border p-2">{stat.tackles.total}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">옐로카드</td>
                    <td className="border p-2">{stat.cards.yellow} 개</td>
                  </tr>
                  <tr>
                    <td className="border p-2">레드카드</td>
                    <td className="border p-2">{stat.cards.red} 개</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
      {playerData?.statistics.every(
        (stat) =>
          !(
            (params.league === 'premier' && stat.league.id === 39) ||
            (params.league === 'champions' && stat.league.id === 2) ||
            (params.league === 'europa' && stat.league.id === 3) ||
            (params.league === 'karabao' && stat.league.id === 42) ||
            (params.league === 'fa' && stat.league.id === 45)
          ),
      ) && <p>해당 리그 데이터가 없습니다.</p>}
    </div>
  );
};

export default PlayerSeasonDataComponent;
