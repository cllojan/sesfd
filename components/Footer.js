import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import LogoIcon from '@/components/icons/LogoIcon';
import Link from "next/link";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const Center = styled.div`
 
  margin: 0 auto;
  padding: 0 40px;
`;
const Bg = styled.div`

  background-color: #222;
  color:#fff;
  
  padding: 10px 0;
`;
const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (max-width: 768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#aaa;
  font-size:.8rem;
`;
const ColumnsWrapper = styled.div`
  display:flex;  
  align-items:center;
  justify-content: space-between;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
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
    font-size:1.5em;
    font-weight: bold;
    color:#1B4F72;
  }
  & span{
    color:#FACC15;
  }
`;

const Hr = styled.hr`
  height:1px;
  background-color: #fff;
  border:none;
`
const Ul = styled.ul`
  width: 400px;
  list-style: none;
  display:flex;
  flex-direction:row;
  align-items: center;
  
  justify-content: space-evenly;
`
export default function Footer({product}) {
  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <div>          
          <ColumnsWrapper>
            <Column>          
            <Logo href={'/'}>            
              <LogoIcon/>
              <p className={inter.className}>e<span>-</span>shop</p>
            </Logo>
            
            </Column>
            <Column>
              <Ul>
                  <li>Inicio</li>
                  <li>Productos</li>
                  <li>Carrito</li>
              </Ul>
            </Column>
          </ColumnsWrapper>
          <Hr/>
          <ColumnsWrapper>
          <Column>
            <p>Copyright © 2022. All rights reserved.</p>
            </Column>
            <Column>
              <Ul>
                  <li>+5930990143583</li>
                  <li>cllojan</li>
                  <li>cllcampoverde@gmail.com</li>
              </Ul>
            </Column>
          </ColumnsWrapper>
        </div>
      </Center>

    </Bg> 
  );
}