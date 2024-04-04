"use client"
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { User } from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

import { getSession, useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import styled from "styled-components";
import getOrders from "@/utils/getOrders";
import Footer from "@/components/Footer";
import { Inter } from 'next/font/google'
import Link from "next/link";
import CartIcon from "@/components/icons/CartIcon";
import Image from "next/image";
import axios from "axios";
import Button from "@/components/Button";
import Trash from "@/components/icons/Trash";
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})


const ContainerProfile = styled.div`
    position: relative;
    
`
const BackgroundProfile = styled.div`
    width: 100%;
    height: 300px;
    background: #ff9966;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ff5e62, #ff9966);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ff5e62, #ff9966); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`
const ProfileImage = styled.img`
    z-index: 1;
    position: absolute;
    max-width: 200px;
    max-height: 200px;
    top:200px;
    left: 40px;    
    border-radius: 50%;
`;
const Profile = styled.div`
    padding-top: 80px;
    padding-left: 80px;
    padding-bottom: 30px;
    position: relative;     
    display: flex;
    gap:20px;
    
    background-color:#ECF0F1 ;
`

const Info = styled.div`
    width: 300px;
`
const HistoryOrder = styled.table`
    border-collapse: collapse;
    width: 100%;
    color: #333;
    
    font-size: 14px;
    text-align: left;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
    & th {
  background-color: #007bff;
  color: #efefef;
  
  padding: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  border-bottom: 1px solid #ccc;
}

& tr:hover td {
  background-color: #F8F9F9;
}
& td {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-weight: 500;
  color:#17202A;
}
& tbody tr{
    
}
`
const Order = styled.div``
const NavInfo = styled.div`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap:20px;
`
const Span = styled.span`
    font-weight: 600;
`
const Hr = styled.hr`
    border:none;
    width:100%;
    height:3px;
    background-color: #007bFF;
`
const ButtonSend = styled.button`
    margin-top: 20px;
  border:none;
  width:100%;
  height:40px;
  
  font-weight:500;
  border-radius:5px;
  color:#fff;
  background-color:  #007bFF;
  cursor:pointer;
`
const TableOrder = styled.div`
   max-width: calc(100% - 2em);
   margin: 1em auto;
   overflow: hidden;
   width: 800px;
`
const TableTitle = styled.div`

   color: #000;
   font-size: 1.5em;
   
   text-align: left;
   text-transform: uppercase;
`
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
const Empty = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    gap:10px;
    & p{
        width:70%;
    }
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

const EmptyCenter = styled.div`
    
  
  display:flex;
  align-items:center;
  justify-content:center;
    
`
const ButtonRemove = styled(Button)`
  background: none;
  font-size: 30px;
  svg{
    height:20px;
    width:20px;
    fill:#CB4335;
  }
`
function ProfilePage({ data, orders }) {

    const [id, setId] = useState(data._id);
    console.log(data)
    const [name, setName] = useState(data.name)
    const [lastname, setLastname] = useState(data.lastname)
    const [email, setEmail] = useState(data.email)
    const [cellphone, setCellphone] = useState(data.cellphone)
    const [parish, setParish] = useState(data.parish)
    const [canton, setCanton] = useState(data.canton)
    const [province, setProvince] = useState(data.province)
    const [streetAddress, setStreetaddress] = useState(data.streetAddress)
    const { datas, update } = useSession()
    const [historyOrder, setHistoryOrder] = useState(orders)

    const [isOpen, setIsOpen] = useState(false);
    function handleDisplayModal() {

        setIsOpen(!isOpen);
    };

    async function deleteOrder(inx,ident){               
        let order = [...data.history_order]
        order.splice(inx, 1);                       
        const response = await axios.put('/api/auth/signup', {
            _id: ident,            
            history_order:order
        });
        const rpo = await update({
            ...datas,
            user: {
              ...datas?.user,
              history_order: order
            }
          })
          window.location.reload()
                
    }

    return <>
        <Header />
        {isOpen && <Modal handleDisplayModal={handleDisplayModal} data={data} />}

        <ContainerProfile >
            <BackgroundProfile></BackgroundProfile>
            <ProfileImage src={data?.user?.perfil_image ? data?.user?.perfil_image : "/avatar.png"}  ></ProfileImage>
            <Profile className={inter.className}>
                <Info>
                    <h1>{name} {lastname}</h1>
                    <Hr />
                    <NavInfo>
                        <li>
                            <Span>Email</Span>
                            <br />
                            {email ? email: "Campo vacío."}
                        </li>
                        <li>
                            <Span>Celular</Span>
                            <br />
                            {cellphone?cellphone:"Campo vacío."}
                        </li>
                        <Hr />
                        <li>
                            <Span>Direccion</Span>
                            <br />
                            {streetAddress?streetAddress:"Campo vacío."}
                        </li>
                        <li>
                            <Span>Provincia</Span>
                            <br />
                            {province?province:"Campo vacío."}
                        </li>
                        <li>
                            <Span>Canton</Span>
                            <br />
                            {canton?canton:"Campo vacío."}
                        </li>
                        <li>
                            <Span>Parroquia</Span>
                            <br />
                            {parish?parish:"Campo vacío."}
                        </li>
                    </NavInfo>
                    <ButtonSend className={inter.className} onClick={handleDisplayModal} >Actualizar</ButtonSend>
                </Info>
                <TableOrder >
                    {orders.length == 0 ? 
                    
                    <EmptyCenter>
                            <Empty>
                                <Image src="/emptyCart.png" alt="Carrito " width={450} height={240} />
                                <span>Tu carrito esta vacio</span>
                                <p>¡Oops! Parece que tu carrito está un poco solitario. Descubre componentes increíbles que potenciarán tu computadora. 🖥️🛒✨</p>
                                <Link href="/"><CartIcon /> <span>Ir a Comprar</span></Link>
                            </Empty>
                    </EmptyCenter>
                     :
                        (
                            <>
                                <TableTitle>Historial de Ordenes</TableTitle>

                                <HistoryOrder className={inter.className} >

                                    <thead>
                                        <tr>
                                            <th>
                                                Nro
                                            </th>
                                            <th>
                                                Lista de Productos
                                            </th>

                                            <th>
                                                Fecha
                                            </th>
                                            <th>
                                                Hora
                                            </th>
                                            <th>
                                                Total
                                            </th>
                                            <th>
                                                Acciones
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>
                                        {
                                            historyOrder.map((elm, inx) => (
                                                <tr key={inx}>
                                                    <td>{inx + 1}</td>
                                                    <td>
                                                        <Select type="text" className={inter.className}
                                                        >{
                                                                elm.items.map((item, inx) => (
                                                                    <option key={inx} className={inter.className} >
                                                                        {item.price_data.product_data.name}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </td>
                                                    <td>{elm.fecha}</td>
                                                    <td>{elm.hora}</td>
                                                    <td>{elm.total}</td>
                                                    <td>
                                                        <ButtonRemove onClick={()=> deleteOrder(inx,id)}><Trash/></ButtonRemove>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>


                                </HistoryOrder>
                            </>
                        )

                    }

                </TableOrder>
            </Profile>
        </ContainerProfile>
        <Footer />
    </>
}

export default ProfilePage

export async function getServerSideProps(ctx) {
    await mongooseConnect();
    const session = await getSession(ctx)
    let id = session.user.sub
    const user = await User.findById(id);
    let order = user.history_order
    console.log("ooorder",order)
    var items = []
    if (order && order?.length > 0) {

        for (let e of order) {
            let itemp = {}
            console.log("item",e)
            let rep = await getOrders(e.items)
            itemp["items"] = rep
            itemp["hora"] = e.hora
            itemp["fecha"] = e.fecha
            itemp["total"] = e.total
            items.push(itemp)
        }
    } else {
        order = []
    }



    return {
        props: {
            data: JSON.parse(JSON.stringify(user)),
            orders: JSON.parse(JSON.stringify(items))
        }
    }
}