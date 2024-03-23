import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "@/components/Button";
import ErrorIcon from "./icons/Error";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

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
const InputBox = styled.div`  
  width: 100%;
  display:flex;
  gap:10px;
  @media (max-width:768px){
    max-width:191px;
    
  }
`

const Label = styled.label`
  
  font-size:14px;
  font-weight:500;
  color:#374151;
`
const ContError = styled.div`
    width:100%;
    height: 50px;
    margin-top:5px;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color:#EC7063;
    gap:0.5em;
    border-radius: 7px;
    svg{
        height:20px;
        width:20px;
        fill:#374151;
    }
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
const FormContainer = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Form = styled.div`
    width:40%;
    height:100%;
    display:flex;
    flex-direction:column;  
  
`
const Input = styled.input`  
width:400px;
  height:15px;
  
  font-size:15px;
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
export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    async function handleSubmit(event) {        
        event.preventDefault()
        try {
            
            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false
            })
            console.log(email, password,res)
            setError(res.error)
            if (res.ok) return router.push("/dashboard/profile")
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <FormContainer>

            <InputContainer>
                <h1 >Iniciar Sesion</h1>
                {error ?
                    <ContError>
                        <ErrorIcon/>
                        <Label htmlFor="">{error}</Label>

                    </ContError> :
                    <ContInput>
                    </ContInput>}

                <ContInput>
                    <Label htmlFor="">Correo electrónico</Label>
                    <Input type="text"
                        className={inter.className}
                        value={email}
                        name="email"
                        onChange={ev => setEmail(ev.target.value)} />
                </ContInput>

                <ContInput>
                    <Label className={inter.className}>Contraseña</Label>
                    <Input type="password"
                        value={password}
                        name="celular"
                        className={inter.className}
                        onChange={e => setPassword(e.target.value)} />
                </ContInput>
                <InputBox>

                    <ButtonSend className={inter.className} onClick={e => handleSubmit(e)}>Iniciar Sesion</ButtonSend>
                    <ButtonSend className={inter.className} onClick={e => router.push("/register")}>Registrar</ButtonSend>
                </InputBox>


            </InputContainer>

        </FormContainer>
    )
}