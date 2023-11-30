import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

import SliderProducts from "@/components/SliderProducts";
const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  position:relative;
  font-weight: normal;
  @media (max-width: 768px) {
    text-align: center;
  }
  &::after{
    z-index: 100;
    content:" ";
    position:absolute;
    top:50px;
    left: 0;
    width:280px;
    height: 3px;
    background-color: #007bff;
  }
`;
const ContProduct = styled.div`
  
  display:flex;
  margin:0 20px;
  flex-direction: column;
  position:relative;
  
  &::after{
    content:" ";
    z-index: 0;
    position:absolute;
    top:80px;
    left: 0;
    width:100%;
    height: 3px;
    background-color: #ccc;
  }
`
export default function NewProducts({products}) {
 
  return (
    <ContProduct>              
      <Title>Nuevos Productos</Title>
      <SliderProducts products={products} />
    </ContProduct>
  );
}