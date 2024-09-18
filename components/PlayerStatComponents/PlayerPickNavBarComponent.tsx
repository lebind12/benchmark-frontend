'use client';

import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import LeagueAvatarComponent from './LeagueAvatarComponent';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '@nextui-org/input';
import { benchmarkAPI } from '@/apis/backend';

interface Player {
  name: string;
  id: number;
}

const PlayerPickNavBarComponent = ({
  selectedLeague,
}: {
  selectedLeague: string;
}) => {
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
  };
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="text-2xl font-['ONE-Mobile-POP']">선수정보실</p>
      </NavbarBrand>
      <NavbarContent>
        <div className="flex w-full">
          <Link href="/playerstat/premier/1485" className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/39.png"
              isSelected={selectedLeague === 'premier'}
            ></LeagueAvatarComponent>
          </Link>
          <Link href="/playerstat/champions/1485" className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/2.png"
              isSelected={selectedLeague === 'champions'}
            ></LeagueAvatarComponent>
          </Link>
          <Link href="/playerstat/europa/1485" className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/3.png"
              isSelected={selectedLeague === 'europa'}
            ></LeagueAvatarComponent>
          </Link>

          <Link href="/playerstat/karabao/1485" className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/48.png"
              isSelected={selectedLeague === 'karabao'}
            ></LeagueAvatarComponent>
          </Link>

          <Link href="/playerstat/fa/1485" className="w-full">
            <LeagueAvatarComponent
              src="https://media.api-sports.io/football/leagues/937.png"
              isSelected={selectedLeague === 'fa'}
            ></LeagueAvatarComponent>
          </Link>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <Input placeholder="선수이름 입력" onChange={handleInputChange} />
        <div className="relative">
          {/* 검색어 추천 컴포넌트 */}
          <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-md">
            {/* API 결과가 있을 때만 표시 */}
            {searchResults.length > 0 && (
              <ul className="py-2">
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default PlayerPickNavBarComponent;
