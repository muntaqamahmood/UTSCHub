import React, { useState } from "react";
import styled from "styled-components";
import { SidebarData } from "./NavbarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import Logo from '../../assets/logo.png';

const Nav = styled.div`
  background: #697BFF;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const SidebarNav = styled.nav`
  
  background: #697BFF;
  width: 270px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0px;
  padding-top: 10px;
  left: ${({ sidebar }) => (sidebar ? "0" : "-10%")};
  transition: 350ms;
  z-index: 10;
`;
  
const SidebarWrap = styled.div`
  width: 100%;
`;
  
const Navbar = () => {
  const [sidebar] = useState(true);
    
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav style={{ textAlign: "center", paddingTop: "30px", paddingLeft: "60px", paddingBottom:"20px" }}>
          
        </Nav>
        
        <SidebarNav sidebar={sidebar}>
          
          <SidebarWrap>
            <img src={Logo} width={150} height={75} style={{margin: 'auto', display: 'block'}} alt="Logo" />
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};
  
export default Navbar;