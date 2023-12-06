import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import CartIcon from '@/components/icons/CartIcon';
import Link from "next/link";
import Image from "next/image";
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Montserrat, Lato } from 'next/font/google'
import swal from 'sweetalert';
import { useRouter } from 'next/router';


const roboto = Montserrat({
  weight: '500',
  subsets: ['latin'],
})


const ConstCart = styled.div`
  
  margin:20px;
  @media (max-width:768px){
    width: 100vw;
  }
`

const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap:20px;
  
  align-items: center;
  justify-content: stretch;
  margin-top: 40px;
  @media (max-width:768px){
    flex-wrap: wrap;
    flex-direction: column;
  }

`;

const Box = styled.div`  
  position:relative;
  width:100%;
  height:520px;
  overflow-y: auto;  
  display:flex;
  flex-direction: column;
  gap:30px;
  
  @media (max-width:768px){
    width:100vw;
    & img{
      width:80px;
      height: 80px;
    }
  }

  scroll-margin: 50px 0 0 50px;
  &::-webkit-scrollbar{           
      width:8px;
    }    
    &::-webkit-scrollbar-thumb{
        background-color:#AED6F1 ;                
        border-radius:4px;
    }
    &::-webkit-scrollbar-thumb:hover{
        background-color:#2E86C1;
    }
`;
const Input = styled.input`  
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
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
     
`;
const Select = styled.select`
  width: 100%;
  
  font-family:"Inter";
  font-size:14px;
  font-weight:500;
  padding:8px;
  margin-bottom: 5px;
  border: 1px solid rgb(229 231 235/1);  
  border-radius:5px;  
  cursor:pointer;
    &:focus{
        outline:none;
        box-shadow: 0 0 0 1.6px #007bff;
        border-radius:5px;
    }
    &::-ms-expand {
        display: none; /* Para ocultar la flecha en IE 10 y versiones anteriores */
    }
    & option:nth-child(1) {
      margin-top:20px;
      
      color: #333;
    }
`;

const InputBox = styled.div`  
  width: 100%;
  display:flex;
  gap:10px;
  @media (max-width:768px){
    max-width:191px;
    
  }
`
const InputContainer = styled.div`    
  
  display:flex;
  flex-direction:column;
  align-items:center;
  
  @media (max-width:768px){
    width:95%;
    align-items: normal;
    justify-content:start;  
  }
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
  width:100%;
  height:40px;
  font-family:"Inter";
  font-weight:500;
  border-radius:5px;
  color:#fff;
  background-color: #111827;
  cursor:pointer;
`
const ContInput = styled.div`
  width:100%;
  margin-top:5px;
  display:flex;
  flex-direction: column;
  gap:0.5em;
  @media screen and (max-width: 768px) {
    
  }

`

const ContProduct = styled.div`
  width: 98%;
  display:grid;
  grid-template-columns: 3fr 1fr 0.5fr;
  padding:25px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(229 231 235/1);  
  border-radius:5px;    
 
`

const Product = styled.div`
  margin-left:20px;
  display:flex;
  flex-direction: row;
  align-items: center;
  gap:20px;
`
const ButtonsContainer = styled.div`  
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
`

const EshopButton = styled.button`  
  height:35px;
  border:none;
  background:#ffc439;
  cursor:pointer;
  font-family:"Inter";
  color:#17202A ;
  font-weight:500;
  border-radius: 5px;
`
const Total = styled.p`
  background: #fff;
    position:sticky;
    right:0;
    bottom:0;
    padding:10px;
    
    font-size:25px;
    font-weight: 500;
    text-align: right;
    margin-right: 20px;
  span{
    font-size:20px;
  }
`
const ProductInfo = styled.div`
  
  p{
    font-family:"Inter";
    color:#111827 ;
    font-weight:500;
  }
  span{
    color:#374151 ;
    font-weight:400;    
    margin-top: -15px;
  }
`
const ContCantity = styled.div`
  
`
export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellPhone] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');

  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('1'); 
  const [cantonSeleccionada, setCantonSeleccionada] = useState('101'); 

  const router = useRouter();
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    // Realizar la solicitud a la API
    fetch('https://gist.githubusercontent.com/emamut/6626d3dff58598b624a1/raw/166183f4520c4603987c55498df8d2983703c316/provincias.json')
      .then(response => response.json())
      .then(data => {
        // Actualizar el estado con los datos de las provincias
        setProvincias(data);
        setCantones(data[provinciaSeleccionada].cantones);                
        setParroquias(data[provinciaSeleccionada].cantones[cantonSeleccionada].parroquias)
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  const handleProvinciaChange = (event) => {    
    const provinciaSelec = event.target.value;    
    const cantonesDeProvincia = provincias[provinciaSelec]?.cantones || [];       
    
    setCantones(cantonesDeProvincia);  
    setProvinciaSeleccionada(provinciaSelec);
    setCantonSeleccionada(String(Object.keys(provincias[provinciaSeleccionada].cantones)[0]));
    let a =  cantonSeleccionada
    console.log(a)
    console.log(provincias[provinciaSelec].cantones[a])
    
    setParroquias(parroquias);
  };
  const handleCantonChange = (event) => {    
    
    const cantonSeleccionada = event.target.value;    
    const parroquias = provincias[provinciaSeleccionada]?.cantones[cantonSeleccionada].parroquias || []
    
    setParroquias(parroquias);  
    setCantonSeleccionada(cantonSeleccionada);
  };
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    if (name == "" || lastname == "" || email == "" || cellphone == "" || streetAddress == "") {
      swal("Oops", "Parece que te faltan algunos campos de llenar", "error")
      return
    }

    swal({
      title: "¡Gracias por tu compra!",
      text: "Nos comunicaremos contigo para continuar con la compra",
      icon: "success",
      button: "OK",
    });

    const response = await axios.post('/api/checkout', {
      name, email, cellphone, city, postalCode, streetAddress, country,
      cartProducts,
    });
    clearCart()
    router.push('/');

    /*
    if(response.data.status == 200){
      setIsSuccess(true)
    }
    if (response.data.url) {
      window.location = response.data.url;
    }*/
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }


  return (
    <>
      <Header />
      <ConstCart>

        <ColumnsWrapper>
          {!cartProducts?.length && (
            <EmptyCenter>
              <Empty>
                <Image src="/emptyCart.png" alt="Carrito " width={450} height={240} />
                <span>Tu carrito esta vacio</span>
                <p>¡Oops! Parece que tu carrito está un poco solitario. Descubre componentes increíbles que potenciarán tu computadora. 🖥️🛒✨</p>
                <Link href="/"><CartIcon /> <span>Ir a Comprar</span></Link>
              </Empty>
            </EmptyCenter>
          )}

          {products?.length > 0 && (
            <Box>
              {products.map((product, inx) => (
                <ContProduct key={inx}>
                  <Product>
                    <Image src={product.images[0]} alt={product.title} width="100" height="100" />
                    <ProductInfo>
                      <p>{product.title}</p>
                      <span>$ {product.price}</span>
                    </ProductInfo>
                  </Product>
                  <ContCantity>
                    <Button
                      onClick={() => lessOfThisProduct(product._id)}>-</Button>
                    <QuantityLabel>
                      {cartProducts.filter(id => id === product._id).length}
                    </QuantityLabel>
                    <Button
                      onClick={() => moreOfThisProduct(product._id)}>+</Button>
                  </ContCantity>
                  <div>${cartProducts.filter(id => id === product._id).length * product.price}</div>
                </ContProduct>

              ))}

              <Total>Total: <span>${Math.round(total)}</span></Total>

            </Box>
          )}


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
                  onChange={ev => setEmail(ev.target.value)} />
              </ContInput>

              <ContInput>
                <Label>Celular</Label>
                <Input type="number"
                  value={cellphone}
                  name="cell"
                  onChange={ev => setCellPhone(ev.target.value)} />
              </ContInput>
              <InputBox>
                <ContInput>
                  <Label>Provincia</Label>


                  <Select type="text"
                    onChange={handleProvinciaChange}
                    
                  >
                    {
                      Object.entries(provincias).map((elm, inx) => (
                        <option key={elm[0]} value={elm[0]}>{provincias[elm[0]].provincia}</option>
                      ))
                    }
                  </Select>
                </ContInput>

                <ContInput>
                  <Label>Canton</Label>
                  <Select type="text"
                    onChange={handleCantonChange}
                    
                  >
                    {
                     Object.entries(cantones)?.map((canton) => (
                        <option key={canton[0]} value={canton[0]}>
                          {cantones[canton[0]].canton}
                        </option>
                      ))
                     }
                  </Select>
                </ContInput>

              </InputBox>
              <ContInput>
                <Label>Parroquia</Label>
                <Select type="text"                                        
                  >
                    {
                     Object.entries(parroquias).map((parroquia) => (
                        <option key={parroquia[0]} value={parroquia[0]}>
                          {parroquias[parroquia[0]]}
                        </option>
                      ))
                     }
                  </Select>
              </ContInput>
              <ContInput>
                <Label>Direccion 2 (Opcional)</Label>
                <Input type="text"

                  value={country}
                  name="country"
                  onChange={ev => setCountry(ev.target.value)} />
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

