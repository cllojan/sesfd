import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { NextResponse } from 'next/server'
import bcrypt from "bcryptjs"

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  
  if (method === "POST") {
    const { name, lastname, email, password, perfil_image } = req.body
    try {

      const userFound = await User.findOne({ email })

      if (!password || password.length < 6) return res.status(400).json({ message: "Contrasena incorrecta" })

      if (userFound) return res.status(409).json({ message: "El correo electronico existe" })

      const hashPassword = await bcrypt.hash(password, 12)

      const user = new User({
        name: name,
        lastname: lastname,
        email,
        password: hashPassword,
        perfil_image: perfil_image,
        cellphone:"",
        parish:"",
        canton:"",
        streetAddress:"",
        province:"",
        perfil_image:"/avatar.png",
        history_order:{},
      })

      const newUser = await user.save()

      return res.json(newUser)
    } catch (error) {

      if (error instanceof Error) {
        return res.status(400).json(
          {
            message: error.message,

          }
        )
      }
    }
  }
  if(method === "PUT"){
    const { 
      _id,
      name, 
      lastname, 
      email, 
      password, 
      cellphone,
      perfil_image,      
      parish,
      canton,
      streetAddress,
      province,      
      history_order} = req.body
      try {
        
        
        
        let response = await User.updateOne({_id},{
          name,
          lastname,
          email,                  
          cellphone,        
          perfil_image,    
          parish,canton,

          streetAddress,
          province,
          history_order:history_order
          });
        console.log("PUT:",_id)
          res.json(true)     
      } catch (error) {
        console.log(error)
      }
  }
}