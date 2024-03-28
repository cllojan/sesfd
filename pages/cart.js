import Header from "@/components/Header";
import styled from "styled-components";

import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";

import emailjs from '@emailjs/nodejs';

import CartIcon from '@/components/icons/CartIcon';
import Link from "next/link";
import Image from "next/image";

import { Montserrat, Lato } from 'next/font/google'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { Inter } from 'next/font/google'
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

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
  
  font-size:14px;
  font-weight:500;
  color:#374151;
`
const Label = styled.label`
  
  
  font-size:14px;
  font-weight:500;
  color:#374151;
`
const Td = styled.td`
  
  
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
  
  const { data, update } = useSession()
    
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [nombre, setNombre] = useState( data?.user.name || data?.user._doc.name);
  const [apellido, setApellido] = useState(data?.user.lastname || data?.user._doc.lastname);
  const [email, setEmail] = useState(data?.user.email || data?.user._doc.email);
  const [celular, setCelular] = useState(data?.user.cellphone || data?.user._doc.cellphone);


  const [parish, setparish] = useState(data?.user.parish || data?.user._doc.parish);
  const [canton, setPanton] = useState(data?.user.canton || data?.user._doc.canton);
  const [province, setPovince] = useState(data?.user.province || data?.user._doc.province);

  const [direccion, setDireccion] = useState(data?.user.streetAddress || data?.user._doc.streetAddress);


  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('1');
  const [cantonSeleccionada, setCantonSeleccionada] = useState('101');
  const [parroquiaSeleccionada, setParroquiaSeleccionada] = useState("10101");

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
    let cantonSelecc = String(Object.keys(provincias[provinciaSelec].cantones)[0])
    setCantonSeleccionada(cantonSelecc)
    let parroquiasSle = provincias[provinciaSelec]?.cantones[cantonSelecc].parroquias || []
    setParroquias(parroquiasSle);
    setParroquiaSeleccionada(String(Object.keys(parroquiasSle)[0]))

  };
  const handleCantonChange = (event) => {

    const cantonSeleccionada = event.target.value;
    const parroquias = provincias[provinciaSeleccionada]?.cantones[cantonSeleccionada].parroquias || []

    setParroquias(parroquias);
    setParroquiaSeleccionada(String(Object.keys(parroquias)[0]))
    setCantonSeleccionada(cantonSeleccionada);
  };

  const handleParroquiaChange = (event) => {
    setParroquiaSeleccionada(event.target.value)
  }
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }


  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  async function goToPayment() {
    let id = data?.user._doc._id
    if (nombre == "" || apellido == "" || email == "" || celular == "" || direccion == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parece que te faltan algunos campos de llenar",
      });
      return
    }
    Swal.fire({
      title: "¡Gracias por tu compra!",
      text: "Nos comunicaremos contigo para continuar con la compra",
      icon: "success",
      button: "OK"
    });
    /*
    if(data.user.history_order){
      let lastKey = Object.keys(data.user.history_order).length;
      cartTemp = cartProducts.reduce((acc, value, index) => {
          acc[lastKey + index] = value;
          return acc;
      }, {});
    }*/
    let cartTemp = cartProducts
    const now = new Date();
    const options = { timeZone: 'America/Guayaquil', hour12: false }; 
    const horas = now.toLocaleString('en-US', { hour: 'numeric', ...options }); 
    const minutos = now.toLocaleString('en-US', { minute: 'numeric', ...options });
    
    const optionsFecha = { day: '2-digit', month: '2-digit', year: 'numeric' }; // Opciones para el formato de la fecha
    const date = now.toLocaleDateString('es-ES', optionsFecha); //
    let temp = data?.user.history_order || []
    let order = { items: cartTemp, fecha: date, hora: `${horas}:${minutos}`, total: total }
    const resps = await axios.put('/api/auth/signup', {
      _id: id, ...data?.user, history_order: [...temp, order]
    });

    const rpo = await update({
      ...data,
      user: {
        ...data?.user,
        history_order: [...temp, order]
      }
    })

    emailjs.send(
      "service_7kb4if6",
      "template_zte5gge",
      {
        to_email: email,
        user_name: nombre,
        lista_productos: "raizen",
        precio_total: total,
        fecha_orden: `${date} - ${horas}:${minutos}`,
        direccion: direccion,
        },{
          publicKey: "onhd841m1THfb0I-F",
          privateKey:"NLUSM4a15zOSfSdqJ2ANl"
        }
    ).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (err) => {
        console.log('FAILED...', err);
      },
    );
    let provincia = provincias[provinciaSeleccionada].provincia
    let canton = provincias[provinciaSeleccionada].cantones[cantonSeleccionada].canton
    let parroquia = provincias[provinciaSeleccionada].cantones[cantonSeleccionada].parroquias[parroquiaSeleccionada]


    const response = await axios.post('/api/checkout', {
      name: nombre + apellido, email, cellphone: celular, parish: parroquia, canton, streetAddress: direccion, province: provincia,
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
            <Box className={inter.className}>
              {products.map((product, inx) => (
                <ContProduct key={inx}>
                  <Product>
                    <Image src={product.images[0]} alt={product.title} width="100" height="100" />
                    <ProductInfo className={inter.className}>
                      <p >{product.title}</p>
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
                    className={inter.className}
                    value={nombre}
                    name="nombre"
                    onChange={ev => setNombre(ev.target.value)} />
                </ContInput>
                <ContInput>
                  <Label htmlFor="">Apellido</Label>
                  <Input type="text"
                    value={apellido}
                    className={inter.className}
                    name="apellido"
                    onChange={ev => setApellido(ev.target.value)} />
                </ContInput>

              </InputBox>
              <ContInput>
                <Label htmlFor="">Email</Label>
                <Input type="text"
                  className={inter.className}
                  value={email}
                  name="email"
                  onChange={ev => setEmail(ev.target.value)} />
              </ContInput>

              <ContInput>
                <Label>Celular</Label>
                <Input type="number"
                  value={celular}
                  name="celular"
                  className={inter.className}
                  onChange={e => setCelular(e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10))} />
              </ContInput>
              <InputBox>
                <ContInput>
                  <Label>Provincia</Label>


                  <Select type="text"
                    onChange={handleProvinciaChange}
                    className={inter.className}
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
                    className={inter.className}
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
                className={inter.className}
                  onChange={handleParroquiaChange}
                >
                  {
                    Object.entries(parroquias).map((parroquia) => (
                      <option key={parroquia[0]} value={parroquia[0]} >
                        {parroquias[parroquia[0]]}
                      </option>
                    ))
                  }
                </Select>
              </ContInput>
              <ContInput>
                <Label>Direccion</Label>
                <Input type="text"
                  className={inter.className}
                  value={direccion}
                  name="direccion"
                  onChange={ev => setDireccion(ev.target.value)} />
              </ContInput>

              <ContInput>
                <ButtonSend black block
                  className={inter.className}
                  onClick={goToPayment}>
                  Enviar
                </ButtonSend>
              </ContInput>

            </InputContainer>

          )}
        </ColumnsWrapper>
      </ConstCart>
      <Footer/>
    </>
  );
}

