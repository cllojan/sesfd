import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const ProductWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width:250px;
  height: 290px;
`;

const WhiteBox = styled(Link)`
  
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight:bold;
  font-size:.8em;
  color:#333;
  text-decoration:none;
  margin:0;
  white-space:nowrap;
  text-overflow:ellipsis;
`;

const ProductInfoBox = styled.div`
  display:flex;
  flex-direction: column;
  
  margin: 20px;
  gap:10px;
`;

const PriceRow = styled.div`
  display: flex;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:10px;
`;

const Price = styled.div`
  font-size: .8em;
  font-weight:400;
  color:rgb(55, 65, 81/1);
  text-align: right;
  @media screen and (min-width: 768px) {
    
    text-align: left;
  }
`;

const AddCartButton= styled(Button)`
  border:none;
  border-radius:4px;
  height:30px;
  background:#FACC15;
  color:#000;
  font-weight:bolder;
  
`
export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  return (
    <ProductWrapper className={inter.className}>
      <WhiteBox href={url}>        
          <img src={images?.[0]} alt=""/>        
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          
        </PriceRow>
        <AddCartButton block onClick={() => addProduct(_id)} primary outline>
            Add to cart
          </AddCartButton>
      </ProductInfoBox>
    </ProductWrapper>
  );
}