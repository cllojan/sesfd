import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { NextResponse } from 'next/server'
import bcrypt from "bcryptjs"
export default async function handle(req, res) {
  
  const { fullname, email, password } = req.body
  if (!password || password.length < 6) {
    return res.json(
      {
        message: "Contrasena incorrecta",
        
      },{
        status: 400,
      }
    )
  }
  try{
    await mongooseConnect();  
    const userFound = await User.findOne({email})
  
  
    if(userFound) return res.json(
      {
        message:"Email already exist",status:409
      },
      {
        status: 409,
      }
      )
    const hashPassword = await bcrypt.hash(password,12)
    const user = new User({
      email,
      password:hashPassword,
      fullname,
      
    })
    const newUser = await user.save()
  
    return res.json(newUser)
  }catch(error){
    
    if(error instanceof Error){
      return res.status(400).json(
        {
          message:error.message,
          
        },
        {
          status: 400,
        }
      )
    }

  }

}