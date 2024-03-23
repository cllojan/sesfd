import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
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
export default function RegisterForm() {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    async function handleSubmit(event) {
        event.preventDefault()        
        try {
            const response = await axios.post('/api/auth/signup', {
                name:name,lastname:lastname, email, password,  perfil_image: `/avatar.png`
            });
            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false
            })
            console.log(response)
            if (res.ok) return router.push("/dashboard/profile")
            console.log(response)
        } catch (e) {
            console.log(e)
        }

    }
    
    return (
        <FormContainer>
            
             <InputContainer>
             <h1>Registrar</h1>
              <InputBox>
                <ContInput className="">
                  <Label htmlFor="">Nombre</Label>
                  <Input type="text"
                    className={inter.className}
                    value={name}
                    name="nombre"
                    onChange={ev => setName(ev.target.value)} />
                </ContInput>
                <ContInput>
                  <Label htmlFor="">Apellido</Label>
                  <Input type="text"
                    value={lastname}
                    name="apellido"
                    className={inter.className}
                    onChange={ev => setLastname(ev.target.value)} />
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
                <Label>Contrasena</Label>
                <Input type="password"
                  value={password}
                  name="password"
                  className={inter.className}
                  onChange={e => setPassword( e.target.value)} />
              </ContInput>
              
              <ButtonSend className={inter.className} onClick={e => handleSubmit(e)}>Registrar</ButtonSend>
              
              </InputContainer>
           
        </FormContainer>
    )
}
