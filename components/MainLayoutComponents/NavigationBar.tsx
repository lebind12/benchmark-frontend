import Image from 'next/image';
import Logo from '@/public/kopnya.png';
import Chzzk from '@/public/치지직_02.png';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

const NavigationBar = () => {
  return (
    <Navbar
      isBordered
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarBrand>
        <Link color="foreground" href="/">
          <p className='font-bold text-2xl font-["ONE-Mobile-POP"]'>
            BenchMark
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="/">
            경기 일정
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/statistics">
            선수 정보
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/statistics">
            팀 정보
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/ranking">
            랭킹
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link href="https://chzzk.naver.com/eaf7b569c9992d0e57db0059eb5c0eeb">
            <Image src={Chzzk} alt="치지직 연결" width={32}></Image>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="https://chzzk.naver.com/eaf7b569c9992d0e57db0059eb5c0eeb">
            <Image src={Chzzk} alt="치지직 연결" width={32}></Image>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="https://chzzk.naver.com/eaf7b569c9992d0e57db0059eb5c0eeb">
            <Image src={Chzzk} alt="치지직 연결" width={32}></Image>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;
