import React from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

const Header = ({ session, fetchNextPage }: any) => {
  return (
    <Navbar className="bg-primary-100">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <p>チャンネル名</p>
        </NavbarItem>
        <NavbarItem>
          <p>{session.data?.user?.name}さん（ここは本来アイコン）</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
