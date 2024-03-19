"use client"
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import axios from "axios";
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import styled from "styled-components";

import Swal from 'sweetalert2'

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
  font-family:"Inter";
  font-weight:500;
  border-radius:5px;
  color:#fff;
  background-color:  #007bFF;
  cursor:pointer;
`
function ProfilePage() {
    const { data, update } = useSession();
    
    const name = data?.user.name || data?.user._doc.name;
    const lastname = data?.user.lastname || data?.user._doc.lastname;
    const email = data?.user.email|| data?.user._doc.email;
    const cellphone = data?.user.cellphone || data?.user._doc.cellphone;
    const parish = data?.user.parish || data?.user._doc.parish;
    const canton = data?.user.canton || data?.user._doc.canton;
    const province = data?.user.province || data?.user._doc.province;
    const streetAddress = data?.user.streetAddress || data?.user._doc.streetAddress;
    console.log(data)
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
                    <Order>
                        asdasdasd
                    </Order>
                    <Order>
                        asdasdasd
                    </Order>
                    <Order>
                        asdasdasd
                    </Order>
                    <Order>
                        asdasdasd
                    </Order>
                </HistoryOrder>
            </Profile>
        </ContainerProfile>
    </>
}

export default ProfilePage
