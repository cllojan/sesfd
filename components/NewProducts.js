import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const ContProduct = styled.div`
  display:flex;
  flex-direction: column;
  margin:20px;
`
export default function NewProducts({products}) {
  return (
    <ContProduct>              
      <Title>Nuevos Productos</Title>
      <ProductsGrid products={products} />
    </ContProduct>
  );
}