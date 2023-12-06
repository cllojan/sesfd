import styled from "styled-components";

import Image from "next/image";

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
        img:"/category/laptop.webp",
        title:"Laptops",
        code: URL + "64bb1494de4b8c08b057528e"
      },
      {
        img:"/category/PC.png",
        title:"PC de Escritorio",
        code: URL + "64bb148cde4b8c08b057528a"

      },
      {
        img:"/category/hardware.jpg",
        title:"Hardware",
        code:URL + ["6490d47f07756020e23836d9","649a0fd76c8734e690b7a51c","64a6e321baa8f76629dab656","64a6e32bbaa8f76629dab659","64a6e334baa8f76629dab65c"].join(",")
      },
      {
        img:"/category/Monitor.webp",
        title:"Monitores",
        code:URL+"64a6e52ebaa8f76629dab69d"
      },
      {
        img:"/category/teclado.webp",
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
                        <Image src={elm.img} alt="" width={150} height={150} sizes="100vw"
        // Make the image display full width
        style={{
          width: '100%',
          height: 'auto',
        }} />
                    </WhiteBox>                    
                    <TitleH href={"url"}>{elm.title}</TitleH>                      
                </ProductWrapper>
                  ))
                }                
            </StyledProductsGrid >
        </ContProduct>
    );
}