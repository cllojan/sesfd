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
                fullname:name,email,password
            });
            console.log(response)
        }catch(e){
            console.log(e)
        }
       
      }
    return (
        <div>
            <form >
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
                <button onClick={e =>  handleSubmit(e)}>Registrar</button>
            </form>
        </div>
    )
}