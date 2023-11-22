import Link from "next/link";
import styled from "styled-components";
import {useRouter} from 'next/router';
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import CartIcon from '@/components/icons/CartIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import SearchIcon from '@/components/icons/Search';
const StyledHeader = styled.header`
  background-color: #fff;
`;
const Logo = styled(Link)`
  color:#000;
  text-decoration:none;
  position: relative;
  z-index: 3;
  display:flex;
  align-items: center;
  & svg{        
    margin:0;
    width:70px;
    height: 70px;    
  }
  & p{
    margin:0 ;
    font-size:30px;
    font-weight: bold;
    color:#1B4F72;
  }
  & span{
    color:#FACC15;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  padding: 5px 0;
`;
const StyledNav = styled.nav`
  ${props => (props.mobileNavActive || props.cartOpen) ? `
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
 
  @media screen and (min-width: 768px) {
    display: flex;
    align-items:center;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#17202A;
  text-decoration:none;
  padding: 10px 0;
  svg{
    margin:0;
    padding:0;
    height:25px;
    width:25px;
  }
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
const ContInput = styled.form`
  position:relative;
  display:flex;
  flex-direction: row;
  align-items: center;  
  justify-content: flex-end;
  border:1px solid #eee;
  padding:1px;
  background-color: #fff;
  width:450px;
  height: 40px;
  border-radius:50px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  &:focus-within{
    outline:1px solid #007bff; 
    
  }
`;
const InputSearch = styled.input`
  flex-grow:2;
  width:100%;
  border:none;
  border-radius:50px;
  padding-left:16px;
  font-family: 'Inter';
 
  &:focus{
    outline:none;
  }
  
`
const ButtonSearch = styled.button`
  position: absolute;
  width:35px;
  height:35px;
  top: 50%;
  right: 8px;
  
  transform: translateY(-50%);
  border: none;
  border-radius: 9999px;
  color: #17202A;
  background-color: #eee;
  padding: 8px;  
  transition: color 0.2s;
  cursor: pointer;
  svg{
    height:20px;
    width:20px;
  }
`
const CartLink= styled(NavLink)`

  position:relative;  
  
`

const SpanCont = styled.span`
  position:absolute;
  bottom: 15px;
  left:20px;
  text-align: center;
  width:20px;
  height:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:#FACC15;
  border-radius:50%;
  font-family:'Roboto Mono',sans-serif;
  color:#17202A;
  font-weight: bold;
`
export default function Header() {
  const router = useRouter();
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {    
    event.preventDefault();
    // Redirigir a la página de búsqueda con el término de búsqueda en la URL
    router.push({
      pathname:`/product/search/${searchTerm}`
    });
    setSearchTerm("");
  };
  
  return (
    <StyledHeader>      
        <Wrapper>
          <Logo href={'/'}>            
            <LogoIcon/>
            <p>e<span>-</span>shop</p>
          </Logo>
          
          <ContInput onSubmit={handleSearch}>
            
            <InputSearch type="text" name="search" onChange={(e)=>setSearchTerm(e.target.value)}/>
            <ButtonSearch type="submit">
              <SearchIcon/>
            </ButtonSearch>            
          </ContInput>          
          <StyledNav mobileNavActive={mobileNavActive} >
            {/*<NavLink href={'/'}>Inicio</NavLink>
              <NavLink href={"/categoria"}>Categorias</NavLink>
            */}
            <NavLink href={'/products'}>Productos</NavLink>
            
            {/*<NavLink href={'/account'}>Account Cart ({cartProducts.length})</NavLink>*/}
            <CartLink href={"/cart"}><CartIcon/> <SpanCont>{cartProducts.length}</SpanCont></CartLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
        
           


    </StyledHeader>
  );
}