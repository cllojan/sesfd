import Link from "next/link";
import styled from "styled-components";
import { useRouter } from 'next/router';
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import CartIcon from '@/components/icons/CartIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import SearchIcon from '@/components/icons/Search';
import { Montserrat } from 'next/font/google'

import { signOut, useSession } from "next-auth/react"


const StyledHeader = styled.header`
  background-color: #fff;
`;
const roboto = Montserrat({
  weight: '500',
  subsets: ['latin'],
})
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
    font-size:1.5em;
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
  justify-content: space-evenly;
  padding: 5px 0;
`;
const StyledNav = styled.nav`
  margin-left: 180px;
  ${props => (props.mobileNavActive) ? `
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
  @media screen and (max-width: 988px) {
    display: none;
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
const NavReg = styled(NavLink)`
  padding: 10px 10px;  
`
const NavLogin = styled(NavLink)`
    display: block;
    color:#333333;
    font-weight: 500;
    text-decoration:none;
    padding: 10px 10px;
    border-radius: 7px;
`
const NavButton = styled.button`
  display: none;
  background-color: transparent;
  width: 50px;
  height: 50px;
  border:0;
  color: #333333;
  cursor: pointer;
  position: relative;
  
  z-index: 3;
  @media screen and (max-width: 988px) {
    display: block;
  }
`;
const ContInput = styled.form`
  margin-left: 40px;
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
const CartLink = styled(NavLink)`

  position:relative;  
  
`
const Account = styled.div`
  margin-left:20px;
  display: flex;
  align-items: center;
  gap:20px;
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
const ProfileImage = styled.img`
  border-radius: 50%;
`

const ContModal = styled.div`

  position: absolute;
  top: 80px;
  width: 100%;
  height: 30%;
  background:#fff;
`
const ModalFlex = styled.div`
  margin: 40px;
  display:flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`
export default function Header() {
  const router = useRouter();
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, status } = useSession();
  console.log(useSession())
  const handleSearch = (event) => {
    event.preventDefault();
    // Redirigir a la página de búsqueda con el término de búsqueda en la URL
    router.push({
      pathname: `/product/search/${searchTerm}`
    });
    setSearchTerm("");
  };
  async function cerrarsesion() {
    await signOut()

  }
  return (
    <StyledHeader>
      <Wrapper>
        <Logo href={'/'}>
          <LogoIcon />
          <p className={roboto.className}>e<span>-</span>shop</p>
        </Logo>

        <ContInput onSubmit={handleSearch}>

          <InputSearch type="text" name="search" onChange={(e) => setSearchTerm(e.target.value)} />
          <ButtonSearch type="submit">
            <SearchIcon />
          </ButtonSearch>
        </ContInput>
        {mobileNavActive ?  <ContModal>
          <ModalFlex>
            {/*<NavLink href={'/'}>Inicio</NavLink>
              <NavLink href={"/categoria"}>Categorias</NavLink>
            */}
            <NavLink href={'/products'}>Productos</NavLink>

            <CartLink href={"/cart"}>Carrito ({cartProducts.length})</CartLink>
            <Account>
              {
                status != "authenticated" ? <>
                  <NavLogin href={'/login'}>Iniciar Sesión</NavLogin>
                  <NavReg href={'/register'}>Registrar</NavReg>
                </>
                  : (
                    <>
                      <NavLink href={'/dashboard/profile'} >
                        <ProfileImage src={data?.user?.perfil_image ? data?.user?.perfil_image : "/avatar.png"} width="45px" height="45px" />
                      </NavLink>
                      <NavLogin href={"/"} onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Cerrar Sesion</NavLogin>
                    </>
                  )
              }
            </Account>

          </ModalFlex>
        </ContModal> : <></>}
        <StyledNav  >
          {/*<NavLink href={'/'}>Inicio</NavLink>
              <NavLink href={"/categoria"}>Categorias</NavLink>
            */}
          <NavLink href={'/products'}>Productos</NavLink>

          <CartLink href={"/cart"}><CartIcon /> <SpanCont>{cartProducts.length}</SpanCont></CartLink>
          <Account>
            {
              status != "authenticated" ? <>
                <NavLogin href={'/login'}>Iniciar Sesión</NavLogin>
                <NavReg href={'/register'}>Registrar</NavReg>
              </>
                : (
                  <>
                    <NavLink href={'/dashboard/profile'} >
                      <ProfileImage src={data?.perfil_image ? data.perfil_image : "/avatar.png"} width="45px" height="45px" />
                    </NavLink>
                    <NavLogin href={"/"} onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Cerrar Sesion</NavLogin>
                  </>
                )
            }
          </Account>

        </StyledNav>
        <NavButton onClick={() => setMobileNavActive(!mobileNavActive)}>
          <BarsIcon />
        </NavButton>

      </Wrapper>




    </StyledHeader>
  );
}
