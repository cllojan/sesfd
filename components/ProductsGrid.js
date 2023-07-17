import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  height:0;
  display:flex;
  flex-wrap:wrap;
  
  gap:20px;
  margin:20px;
`;

export default function ProductsGrid({products}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (       
        <ProductBox key={product._id} {...product} />        
      ))}
    </StyledProductsGrid>
  );
}