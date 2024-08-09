import LeagueAvatarComponent from '@/components/PlayerStatComponents/LeagueAvatarComponent';
import { Input } from '@/components/ui/input';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import Link from 'next/link';
import '@/styles/fonts.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <p className="text-2xl font-['ONE-Mobile-POP']">팀 정보실</p>
        </NavbarBrand>
        <NavbarContent>
          <div className="flex w-full">
            <Link href="#" className="w-full">
              <LeagueAvatarComponent
                src="https://media.api-sports.io/football/leagues/39.png"
                isSelected={false}
              ></LeagueAvatarComponent>
            </Link>
            <Link href="#" className="w-full">
              <LeagueAvatarComponent
                src="https://media.api-sports.io/football/leagues/2.png"
                isSelected={false}
              ></LeagueAvatarComponent>
            </Link>

            <Link href="#" className="w-full">
              <LeagueAvatarComponent
                src="https://media.api-sports.io/football/leagues/3.png"
                isSelected={false}
              ></LeagueAvatarComponent>
            </Link>

            <Link href="#" className="w-full">
              <LeagueAvatarComponent
                src="https://media.api-sports.io/football/leagues/48.png"
                isSelected={false}
              ></LeagueAvatarComponent>
            </Link>

            <Link href="#" className="w-full">
              <LeagueAvatarComponent
                src="https://media.api-sports.io/football/leagues/937.png"
                isSelected={false}
              ></LeagueAvatarComponent>
            </Link>
          </div>
        </NavbarContent>
        <NavbarContent justify="end">
          <Input placeholder="팀 이름 입력" />
        </NavbarContent>
      </Navbar>
      {children}
    </>
  );
};

export default Layout;
