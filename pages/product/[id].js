import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";


const Test = styled.div`
  margin:20px;
`
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  
  gap: 40px;
  margin: 40px 0;

  @media screen and (max-width: 768px) {
    grid-template-columns:1fr;
    grid-template-rows: .8fr 1.2fr;
  }
`;
const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
const Parh = styled.p`
  text-align:justify;
`

const Info = styled.div`
  margin-top:40px;
`

const AddCartButton= styled.button`
  border:none;
  border-radius:4px;
  width:100%;
  height:40px;
  background:#FACC15;
  color:#000;
  font-weight:bolder;  
  margin-top:10px;
  vertical-align: middle;
`
export default function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);  
  return (
    <>
      <Header />
      <Test>
        <ColWrapper>
        
          <div>
          <Title>{product.title}</Title>    
            <ProductImages images={product.images} />
          </div>
          <Info>
            <h3>Descripcion</h3>
            <Parh>{product.description}</Parh>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>                
                <AddCartButton primary onClick={() => addProduct(product._id)}>
                  Add to cart
                </AddCartButton>
              </div>
            </PriceRow>
          </Info>
        </ColWrapper>
      </Test>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}