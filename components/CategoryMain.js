import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import ProductBox from "@/components/ProductBox";

import SliderProducts from "@/components/SliderProducts";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;
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

const StyledProductsGrid = styled.div`
  
  display:flex;
  flex-wrap:wrap;
  
  gap:20px;
  margin:20px;
`;
const ProductWrapper = styled.div`
  background-color: #fff;
  border:1px solid #eee;
  border-radius: 5px;
  width:215px;
  height: 250px;
  
  
`;

const WhiteBox = styled.div`
  
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 300px;
    max-height: 250px;
  }
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
export default function CategoryMain({ products }) {

    return (
        <ContProduct>
            <Title>Categorias Principales</Title>
            <StyledProductsGrid >
            <ProductWrapper >
                    <WhiteBox>
                        <img src={"https://www.lenovo.com/medias/lenovo-laptops-thinkbook-16-gen-4-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTM2fGltYWdlL3BuZ3xoMjEvaGZkLzEzMjU1MTI1OTkxNDU0LnBuZ3xlMGJjMDAyZjIzYzczYmY0YTY3NTlmODcwMDJjZTBhMzg5M2VlMjFlNTNlZWJkZDMyNDA3MTdlNjc3NjhhZWY5"} alt="" />
                    </WhiteBox>
                    <ProductInfoBox>
                        <Title href={"url"}>"title"</Title>                        
                    </ProductInfoBox>
                </ProductWrapper>
                <ProductWrapper >
                    <WhiteBox>
                        <img src={"https://www.asus.com/media/Odin/websites/global/ProductLine/20200805112237.png"} alt="" />
                    </WhiteBox>
                    <ProductInfoBox>
                        <Title href={"url"}>"title"</Title>                                              
                    </ProductInfoBox>
                </ProductWrapper>
                <ProductWrapper >
                    <WhiteBox>
                        <img src={"https://pc213.ru/attachments/Image/apgrejd-modernizaciya-kompyutera-v-moskve.jpg?template=generic"} alt="" />
                    </WhiteBox>
                    <ProductInfoBox>
                        <Title href={"url"}>"title"</Title>                        
                    </ProductInfoBox>
                </ProductWrapper>
                <ProductWrapper >
                    <WhiteBox>
                        <img src={"https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08319042.png"} alt="" />
                    </WhiteBox>
                    <ProductInfoBox>
                        <Title href={"url"}>"title"</Title>
                        
                    </ProductInfoBox>
                </ProductWrapper>
                <ProductWrapper >
                    <WhiteBox>
                        <img src={"https://i0.wp.com/www.tecnosmart.com.ec/wp-content/uploads/2022/06/TECLADO-LOGITECH-MECANICO-G413-SE-G-TACTILE-BLACK-920-010433_TECLADOS_9287_1.png?fit=600%2C399&ssl=1"} alt="" />
                    </WhiteBox>
                    <ProductInfoBox>
                        <Title href={"url"}>"title"</Title>
                        
                    </ProductInfoBox>
                </ProductWrapper>
                
            </StyledProductsGrid >
        </ContProduct>
    );
}