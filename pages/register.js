import { useState } from "react";
import axios from "axios";
export default function RegisterPage(){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const response = await axios.post('/api/auth/signup', {
                name,email,password
            });
        }catch(e){
            console.log(e)
        }
       
      }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="a" 
                name="fullname"
                onChange={e => setName(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="email" 
                    name="email" 
                    onChange={e => setEmail(e.target.value)} />
                <input 
                    type="password" 
                    placeholder="password" 
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    />
                <button >Registrar</button>
            </form>
        </div>
    )
}