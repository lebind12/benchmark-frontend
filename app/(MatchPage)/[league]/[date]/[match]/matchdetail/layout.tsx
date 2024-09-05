import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import '@/styles/fonts.css';

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    league: string;
    date: string;
    match: string;
  };
}) => {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <p className="text-2xl font-['ONE-Mobile-POP']">매치 디테일</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Link href={'/stream/' + params.league + '/' + params.match}>
            스트리밍
          </Link>
        </NavbarContent>
      </Navbar>
      <div className="w-full h-full">{children}</div>
    </>
  );
};

export default Layout;
