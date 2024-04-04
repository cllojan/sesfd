import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import Link from "next/link";
import CartIcon from "./icons/CartIcon";
import Image from "next/image";
import { Inter } from 'next/font/google'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
const StyledProductsGrid = styled.div`
  height:100vh;
  
  display:flex;
  flex-wrap:wrap;
  overflow-y: auto;
  gap:20px;
  margin:20px;
  
  
`;
const EmptyCenter = styled.div`    
  position:absolute;
  top:160px;
  display:flex;
  align-items:center;
  justify-content:center;
    
`
const Empty = styled.div`
width: 80%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    gap:10px;
    & span{
      font-size:25px;
      font-weight:500;
    }
    & a{
      text-decoration:none;
      border:none;
      border-radius:4px;  
      padding:0 10px;    
      height:40px;
      background:#FACC15;
      color:#000;
      font-weight:bolder;        
      vertical-align: middle;
      font-weight: 500;
      cursor:pointer;      
      
      display:flex;
      gap:10px;
      align-items:center;
      & span{
        font-size:15px;
        font-weight:500;
      }
    }
`
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
      {products?.length > 0 ? products.map(product => (       
        <ProductBox key={product._id} {...product} />        
      )):<>
      <EmptyCenter>
              <Empty>
                <Image src="/emptyProduct.png" alt="Carrito " width={260} height={260} />
                <span className={inter.className}>¡Ops! No hay resultados para tu búsqueda</span>
                <p>¡Vaya! 😕 No hay productos aquí. Es posible que necesites ajustar los filtros de búsqueda para encontrar lo que estás buscando.</p>
                
              </Empty>
            </EmptyCenter>
      </>}
    </StyledProductsGrid>
  );
}