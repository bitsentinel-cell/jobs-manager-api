'use strict';
import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcrypt";
const registerUser = async (req , res) =>{
    try{
        const {username ,password, email} = req.body
            const salt = await bcrypt.genSalt(12);
            const hashed = await bcrypt.hash(password, salt)
        const user = await User.create({
            username : username,
            password : hashed,
            email : email
        })
        user.save();
        const token = user.createJWT();
        return await res.status(StatusCodes.CREATED).json({user:{name:user.username},token})

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
        const pass = req.body.password
        const isPasswordCorrect = await user.comparePassword(pass);
        if(!isPasswordCorrect){
            return res.status(StatusCodes.BAD_REQUEST).json({msg : "password is wrong"})
        }
        const token = user.createJWT()
        return res.status(StatusCodes.OK).json({user : email , token:token})

  }  catch (error) {
       return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant login the user"})
 }
}

export {
    registerUser,
    loginUser
}