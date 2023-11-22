import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import CartIcon from '@/components/icons/CartIcon';



const ConstCart= styled.div`
 
  margin:20px;
`
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`  
  border-radius: 10px;
  height:400px;
  padding: 30px;
  overflow-y:auto;
`;
const Input = styled.input`
  width: 100%;
  height:15px;
  font-family:"Inter";
  font-size:14px;
  font-weight:500;
  padding:10px;
  margin-bottom: 5px;
  border: 1px solid rgb(229 231 235/1);  
  border-radius:5px;  
  
    &:focus{
        outline:none;
        box-shadow: 0 0 0 1.6px #007bff;
        border-radius:5px;
    }
`;

const InputBox = styled.div`
  
  width:100%;
  display:flex;
  gap:30px;
  align-items: center;
`
const InputContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width:600px;
`
const ProductInfoCell = styled.td`
  display:flex;
  align-items:center;
  padding: 10px 0;
`;

const Span = styled.span`
  font-family:"Inter";
  font-size:14px;
  font-weight:500;
  color:#374151;
`
const Label = styled.label`
  
  font-family:"Inter";
  font-size:14px;
  font-weight:500;
  color:#374151;
`
const Td = styled.td`
  
  font-family:"Inter";
  font-size:15px;
  font-weight:500;
  color:#374151;
`
const EmptyCenter = styled.div`
    
  position:absolute;
  top:20%;
  right:40%;
  left:40%;
  display:flex;
  align-items:center;
  justify-content:center;
    
`
const Empty = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    gap:10px;
    & span{
      font-size:30px;
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
      font-family:'Inter', Courier, monospace;
      display:flex;
      gap:10px;
      align-items:center;
      & span{
        font-size:15px;
        font-weight:500;
      }
    }
`
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const ButtonSend = styled.button`
  border:none;
  width:622px;
  height:40px;
  font-family:"Inter";
  font-weight:500;
  border-radius:5px;
  color:#fff;
  background-color: #111827;
  cursor:pointer;
`
const ContInput = styled.div`
margin-top:5px;
  width:100%;
`
export default function CartPage() {
  const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
  const [products,setProducts] = useState([]);
  const [name,setName] = useState('');
  const [lastname,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [cellphone,setCellPhone] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  const [isSuccess,setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,email,cellphone,city,postalCode,streetAddress,country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Gracias por ordenar</h1>
              <p>Nos comunicaremos contigo para continuar con la compra</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <ConstCart>
        <ColumnsWrapper>
        {!cartProducts?.length && (
              <EmptyCenter>
                  <Empty>
                    <img src="https://undsgn.com/uncode/wp-content/uploads/2020/06/pngkit_empty-sign-png_3224362-min.png" width="450px" />
                    <span>Tu carrito esta vacio</span>
                    <p>¡Oops! Parece que tu carrito está un poco solitario. Descubre componentes increíbles que potenciarán tu computadora. 🖥️🛒✨</p>
                    <a href="/"><CartIcon/> <span>Ir a Comprar</span></a>
                  </Empty>
              </EmptyCenter>
            )}
          <Box>
            
            
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Productos</th>
                    <th>Cantidades</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        <Span>{product.title}</Span>
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <Td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </Td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <Td>Total:</Td>
                    <Td>${total}</Td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <InputContainer>
              
              <InputBox>
                <ContInput className="">                                  
                  <Label htmlFor="">Nombre</Label>
                  <Input type="text"
                        
                        value={name}
                        name="name"
                        onChange={ev => setName(ev.target.value)} />
                </ContInput>                
                <ContInput>
                  <Label htmlFor="">Apellido</Label>
                  <Input type="text"                        
                        value={lastname}
                        name="lastname"
                        onChange={ev => setLastName(ev.target.value)} />
                </ContInput>
                
              </InputBox>
              <ContInput>
                <Label htmlFor="">Email</Label>
                <Input type="text"
                      
                      value={email}
                      name="email"
                      onChange={ev => setEmail(ev.target.value)}/>
              </ContInput>
              
              <ContInput>
                <Label>Celular</Label>
                <Input type="text"                     
                     value={cellphone}
                     name="cell"
                     onChange={ev => setCellPhone(ev.target.value)}/>
              </ContInput>
              <InputBox>
                
               <ContInput>
                <Label>Ciudad</Label>
               <Input type="text"                       
                       value={city}
                       name="city"
                       onChange={ev => setCity(ev.target.value)}/>
               </ContInput>
               
               <ContInput>
                <Label>Codigo Postal</Label>
                <Input type="text"
                       
                       value={postalCode}
                       name="postalCode"
                       onChange={ev => setPostalCode(ev.target.value)}/>
               </ContInput>
                
              </InputBox>
              <ContInput>
                <Label>Direccion</Label>
                <Input type="text"
                     
                     value={streetAddress}
                     name="streetAddress"
                     onChange={ev => setStreetAddress(ev.target.value)}/>
              </ContInput>
              <ContInput>
                <Label>Ciudad</Label>
                <Input type="text"
                     
                     value={country}
                     name="country"
                     onChange={ev => setCountry(ev.target.value)}/>
              </ContInput>
              
              <ContInput>
                <ButtonSend black block
                        onClick={goToPayment}>
                  Enviar
                </ButtonSend>
              </ContInput>
              
            </InputContainer>
          )}
        </ColumnsWrapper>
      </ConstCart>
    </>
  );
}

