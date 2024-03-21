"use client"
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import {User }from "@/models/User";
import {mongooseConnect} from "@/lib/mongoose";

import { getSession, useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import styled from "styled-components";
import getOrders from "@/utils/getOrders";




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
  `;
const Profile = styled.div`
    padding-top: 80px;
    padding-left: 80px;
    position: relative;     
    display: flex;
    gap:20px;
    align-items: center;
    background-color:#ECF0F1 ;
`

const Info = styled.div`
    width: 300px;
`
const HistoryOrder = styled.div`
    max-width: 400px;
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
  font-family: 'Lato', sans-serif;
  font-weight:500;
  border-radius:5px;
  color:#fff;
  background-color:  #007bFF;
  cursor:pointer;
`
function ProfilePage({data,orders}) {
        
    
    const [name,setName] = useState(data.name)
    const [lastname,setLastname] = useState(data.lastname)
    const [email,setEmail] = useState(data.email)
    const [cellphone,setCellphone] = useState(data.cellphone)
    const [parish,setParish] = useState(data.parish)
    const [canton,setCanton ]= useState(data.canton)
    const [province,setProvince] = useState(data.province)
    const [streetAddress,setStreetaddress] = useState(data.streetAddress )

    
    
    const [isOpen, setIsOpen] = useState(false);
    function handleDisplayModal() {

        setIsOpen(!isOpen);
    };

    
   
    return <>
        <Header />
        {isOpen && <Modal handleDisplayModal={handleDisplayModal} data={data} />}

        <ContainerProfile>
            <BackgroundProfile></BackgroundProfile>
            <ProfileImage src={data?.user?.perfil_image ? data?.user?.perfil_image  :"/avatar.png"}  ></ProfileImage>
            <Profile>
                <Info>
                    <h1>{name} {lastname}</h1>
                    <Hr />
                    <NavInfo>
                        <li>
                            <Span>Email</Span>
                            <br />
                            {email}
                        </li>
                        <li>
                            <Span>Celular</Span>
                            <br />
                            {cellphone}
                        </li>
                        <Hr />
                        <li>
                            <Span>Direccion</Span>
                            <br />
                            {streetAddress}
                        </li>
                        <li>
                            <Span>Provincia</Span>
                            <br />
                            {province}
                        </li>
                        <li>
                            <Span>Canton</Span>
                            <br />
                            {canton}
                        </li>
                        <li>
                            <Span>Parroquia</Span>
                            <br />
                            {parish}
                        </li>
                    </NavInfo>
                    <ButtonSend onClick={handleDisplayModal} >Actualizar</ButtonSend>
                </Info>
                <HistoryOrder>
                   {
                    orders.map(elm => (
                        <h1>{elm.hora}</h1>
                    ))
                   }
                </HistoryOrder>
            </Profile>
        </ContainerProfile>
    </>
}

export default ProfilePage

export async function getServerSideProps(ctx){
    await mongooseConnect();
    const session = await getSession(ctx)
    let id = session.user.sub
    const user = await User.findById(id);  
    let order = user.history_order
    console.log(order)
    var items  =[]
    if(order){
        
        for(let e of order){
            let itemp ={}
            let rep = await getOrders(e.items)
            itemp["items"] = rep
            itemp["hora"] = e.hora
            itemp["fecha"]= e.fecha
            itemp["total"] = e.total
            items.push(itemp)
        }
    }else{
        order = []
    }
    
    
    
    return {
        props:{
            data: JSON.parse(JSON.stringify(user)),
            orders:JSON.parse(JSON.stringify(items))
        }
    }
}