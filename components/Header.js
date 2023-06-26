import Link from "next/link";
import styled from "styled-components";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from '@/components/icons/Search';
const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;

  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const ContInput = styled.div`
  display:flex;
  align-items: center;
  
  background-color: #fff;
  width:400px;
  height: 30px;
  
`;
const InputSearch = styled.input`
  padding-left:15px;
  width:100%;
  border:none;
  padding-left:10px;
  &:focus{
    outline:none;
  }
`
const ButtonSearch = styled.button`
  border:none;
  width:40px;
  background:none;
  cursor:pointer;
  svg{
    height:20px;
    width:20px;
  }
`
export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  return (
    <StyledHeader>      
        <Wrapper>
          <Logo href={'/'}>Ecommerce</Logo>
          <ContInput>
            <InputSearch />
            <ButtonSearch>
            <SearchIcon/>

            </ButtonSearch>
          </ContInput>          
          <StyledNav mobileNavActive={mobileNavActive}>
            {/*<NavLink href={'/'}>Inicio</NavLink>*/}
            <NavLink href={'/products'}>Productos</NavLink>
            <NavLink href={'/categories'}>Categorias</NavLink>
            {/*<NavLink href={'/account'}>Account</NavLink>*/}
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>      
    </StyledHeader>
  );
}