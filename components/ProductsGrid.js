import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content: center;
  align-items:center;
  gap:20px;
  margin:20px;
`;

export default function ProductsGrid({products}) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (       
        <ProductBox key={product._id} {...product} />        
      ))}
    </StyledProductsGrid>
  );
}