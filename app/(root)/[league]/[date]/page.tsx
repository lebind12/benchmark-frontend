'use client';

import DatePickPage from '@/components/ScheduleComponent/DatePickComponent';
import TeamVersusComponent from '@/components/ScheduleComponent/TeamVersusComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';

type fixtureData = {
  away_id: number;
  date: string;
  eng_awayname: string;
  eng_homename: string;
  fixture_id: number;
  home_id: number;
  id: number;
  kor_awayname: string;
  kor_homename: string;
  league_id: number;
  league_name: string;
  roundname: string;
  status: string;
  venue: string;
};

const leagueConvert = (leagueId: string) => {
  let convertedId = 39;
  switch (leagueId) {
    case 'champions':
      convertedId = 2;
      break;
    case 'europa':
      convertedId = 3;
      break;
    case 'karabao':
      convertedId = 48;
      break;
    case 'fa':
      convertedId = 45;
      break;
    default:
      convertedId = 39;
  }
  return convertedId;
};

export default function Page({
  params,
}: {
  params: { league: string; date: string };
}) {
  const [fixtureList, setFixtureList] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://localhost:8000/api/match/fixture?date=' +
          params.date +
          '&league_id=' +
          leagueConvert(params.league),
      )
      .then((res) => {
        setFixtureList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <DatePickPage
        league={params.league}
        dateString={params.date}
      ></DatePickPage>
      <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 gap-4">
        {fixtureList.map((fixture: fixtureData, key: number) => (
          <TeamVersusComponent
            key={key}
            League={params.league}
            HomeTeam={fixture.kor_homename}
            AwayTeam={fixture.kor_awayname}
            HomeId={fixture.home_id.toString()}
            AwayId={fixture.away_id.toString()}
            Date={fixture.date}
            venue={fixture.venue}
            fixtureId={fixture.fixture_id.toString()}
          ></TeamVersusComponent>
        ))}
      </div>
    </div>
  );
}
