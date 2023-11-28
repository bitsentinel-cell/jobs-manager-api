'use strict';
import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcrypt";


const registerUser = async (req , res) =>{
    try{
        const {username ,password, email} = req.body
        const user = await User.create({
            username : username,
            password : password,
            email : email
        })
        user.save();
        const token = user.createJWT();
        return  await res.status(StatusCodes.CREATED).json({user:{name:user.username},token})

    }catch (error) {
        return res.status(401).json({msg : "cant register the user"})
    }
}

const loginUser = async (req , res) => {
  try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg : "must provide with password and email"})
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({msg : "cant find the user"})
        }
        console.log(password)
        console.log(user.password);
        const hash = user.password

          const Match = await bcrypt.compare(password , hash)
          if(Match){
              const token = user.createJWT()
              res.status(StatusCodes.OK).json({ user: { name: user.username } , token})
          }else{
              return res.status(StatusCodes.BAD_REQUEST).json({msg : "password does not match"})
          }

  }  catch (error) {
       return res.status(StatusCodes.BAD_REQUEST).json({msg : error})
 }
}


export {
    registerUser,
    loginUser
}