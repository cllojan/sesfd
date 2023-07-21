import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

import SliderProducts from "@/components/SliderProducts";
const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const ContProduct = styled.div`
  height: 400px;
  display:flex;
  flex-direction: column;
  margin:20px;
`
export default function Teclados({products}) {
 
  return (
    <ContProduct>                    
      <ProductsGrid products={products} />
    </ContProduct>
  );
}

