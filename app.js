'use strict'
import express from 'express';
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import dbconnection from "./src/db/dbconnection.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT | 8000;

app.use(express.json());

app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs' , jobRoutes);



const serverStart = async () =>{
    try {
        await dbconnection(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`express server is up and running on port : ${port}`);
        })
    }catch (err){
        console.log(err)
    }
}
serverStart().then();
