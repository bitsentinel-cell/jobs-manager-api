'use strict'
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import StatusCodes from "http-status-codes"
import dotenv from 'dotenv';
dotenv.config();
const auth = async (req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.NOT_FOUND).json({msg: "token must be provided"})
        }
        const token = authHeader.split(' ')[1];

        const payload = jwt.verify(token ,process.env.JWT_SECRET);
        if(!payload){
            return res.status(StatusCodes.FORBIDDEN).json({msg : "you are not authorize to access this route"})
        }
        req.user = {userId:payload.userId, name:payload.name}
        next()
    }catch (e) {
        return res.status(StatusCodes.FORBIDDEN).json({msg : "Authentication error"})
    }

}


export default auth;