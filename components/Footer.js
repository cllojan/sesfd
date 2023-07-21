import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

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

export default function Footer({product}) {
  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>          
              <Title>Ecommerce</Title>                          
          </Column>
          <Column>
           <p>Copyright © 2022. All rights reserved.</p>
          </Column>
        </ColumnsWrapper>
      </Center>

    </Bg>
  );
}