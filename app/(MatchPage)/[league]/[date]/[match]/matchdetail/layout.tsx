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

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <p className="text-2xl font-['ONE-Mobile-POP']">매치 디테일</p>
        </NavbarBrand>
      </Navbar>
      <div className="w-full h-full">{children}</div>
    </>
  );
};

export default Layout;
