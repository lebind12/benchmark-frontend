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
          '&league_id=39',
      )
      .then((res) => {
        console.log(res.data);
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
            Date={fixture.date.split('T')[1]}
            venue={fixture.venue}
          ></TeamVersusComponent>
        ))}
      </div>
    </div>
  );
}
