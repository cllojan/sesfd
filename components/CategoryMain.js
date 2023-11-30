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
const TitleH = styled.h2`
  font-size: 1.5em;
  margin:30px 0 20px;
  color:#000;
  font-weight: normal;
  font-family: 'Inter',sans-serif;
  position:relative;
  @media (max-width: 768px) {
    text-align: center;
  }  
`;
const Title = styled.h2`
  font-size: 1.5em;
  margin:30px 0 20px;
  font-weight: normal;
  font-family: 'Inter',sans-serif;
  position:relative;
  @media (max-width: 768px) {
    text-align: center;
  }
  &::after{
    z-index: 100;
    content:" ";
    position:absolute;
    top:50px;
    left: 0;
    width:255px;
    height: 3px;
    background-color: #007bff;
  }
`;
const ContProduct = styled.div`
  
  
  display:flex;
  position:relative;
  flex-direction: column;
  margin:40px 20px;
  
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

const StyledProductsGrid = styled.div`  
  display:flex;  
  gap:30px;  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    align-items:center;
    justify-content: center;
  }
`;
const ProductWrapper = styled.a`
  background-color: #fff;  
  text-decoration: none;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: space-between;  
  width:150px;
  height: 150px;    
  margin:35px;
  @media (max-width: 768px) {
    margin:30px;
    width:150px;
  height: 150px;    
  }
`;

const WhiteBox = styled.div`
    
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    width:200px;
    height: 150px;
  }
`;


const ProductInfoBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  gap:10px;
  font-family: 'Inter',sans-serif;
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
export default function CategoryMain() {
    let URL= "https://ecommerce-front-cllojan.vercel.app/product/search/%20?categorys=";
    const listCategory = [
      {
        img:"https://www.lenovo.com/medias/lenovo-laptops-thinkbook-16-gen-4-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTM2fGltYWdlL3BuZ3xoMjEvaGZkLzEzMjU1MTI1OTkxNDU0LnBuZ3xlMGJjMDAyZjIzYzczYmY0YTY3NTlmODcwMDJjZTBhMzg5M2VlMjFlNTNlZWJkZDMyNDA3MTdlNjc3NjhhZWY5",
        title:"Laptops",
        code: URL + "64bb1494de4b8c08b057528e"
      },
      {
        img:"https://www.asus.com/media/Odin/websites/global/ProductLine/20200805112237.png",
        title:"PC de Escritorio",
        code: URL + "64bb148cde4b8c08b057528a"

      },
      {
        img:"https://pc213.ru/attachments/Image/apgrejd-modernizaciya-kompyutera-v-moskve.jpg?template=generic",
        title:"Hardware",
        code:URL + ["6490d47f07756020e23836d9","649a0fd76c8734e690b7a51c","64a6e321baa8f76629dab656","64a6e32bbaa8f76629dab659","64a6e334baa8f76629dab65c"].join(",")
      },
      {
        img:"https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08319042.png",
        title:"Monitores",
        code:URL+"64a6e52ebaa8f76629dab69d"
      },
      {
        img:"https://i0.wp.com/www.tecnosmart.com.ec/wp-content/uploads/2022/06/TECLADO-LOGITECH-MECANICO-G413-SE-G-TACTILE-BLACK-920-010433_TECLADOS_9287_1.png?fit=600%2C399&ssl=1",
        title:"Teclados",
        code:URL+"64a6e51cbaa8f76629dab695"
      },
    ]
    return (
        <ContProduct>
            <Title>Categorias Principales</Title>
            

            <StyledProductsGrid >                                            
                {
                  listCategory?.map((elm,inx) => (
                <ProductWrapper key={inx} href={elm.code}>
                    <WhiteBox>
                        <img src={elm.img} alt="" />
                    </WhiteBox>                    
                    <TitleH href={"url"}>{elm.title}</TitleH>                      
                </ProductWrapper>
                  ))
                }                
            </StyledProductsGrid >
        </ContProduct>
    );
}