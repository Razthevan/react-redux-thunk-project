import React, { useState } from "react";
import styled from "styled-components";

import logo from "./header/logo.svg";
import hamburger from "./header/hamburger.svg";

const Header = () => {
  const [isMobileMenuOpen, toggleMobileMenu] = useState(false);

  return (
    <Navigation>
      <HeaderContainer
        visible={isMobileMenuOpen}
        onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
      >
        <HeaderItem>
          <Logo src={logo} alt={"Influentials"} />
        </HeaderItem>
        <HeaderItem>Dashboard</HeaderItem>
        <HeaderItem active>Marketplace</HeaderItem>
        <HeaderItem>Campaigns</HeaderItem>
        <HeaderItem>Messenger</HeaderItem>
      </HeaderContainer>
      <Hamburger
        visible={!isMobileMenuOpen}
        onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
      >
        <HamburgerIcon src={hamburger} alt={"Influentials"} />
      </Hamburger>
    </Navigation>
  );
};

const Logo = styled.img`
  min-width: 26px;
  min-height: 30px;
`;

const HamburgerIcon = styled.img`
  height: 100%;
`;

const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    height: 70%;
    margin: 10px;
    align-items: center;
    display: ${(props) => (props.visible ? "flex" : "none")};
  }
`;

const Navigation = styled.nav`
  top: 0;
  left: 0;
  z-index: 2;
  height: 60px;
  position: sticky;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
    box-shadow: none;
  }
`;

const HeaderContainer = styled.ul`
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    display: ${(props) => (props.visible ? "flex" : "none")};
    width: auto;
    margin: 5px;
  }
`;

const HeaderItem = styled.li`
  font-size: ${(props) => props.theme.fontSizes.navigationItem};
  list-style: none;
  margin: 0px 20px;
  font-weight: 600;
  color: ${(props) =>
    props.active
      ? props.theme.colors.influentialsBlue
      : props.theme.colors.black};
  &:hover {
    cursor: pointer;
    opacity: 0.4;
  }
  :first-of-type {
    margin: 0 20px 0 0;
  }
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 5px;
    :first-of-type {
      margin: 5px;
    }
  }
`;

export default Header;
