'use strict'
import express from 'express';
import authRoutes from "./src/routes/authRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import dbconnection from "./src/db/dbconnection.js";
import dotenv from 'dotenv';
dotenv.config();
import auth from "./src/middlewares/authentication.js";


// security packages
import helmet from 'helmet';
import cors from 'cors'
import xss from 'xss-clean'
import rateLimit from "express-rate-limit";




const app = express();
const port = process.env.PORT | 8000;


app.set('trust proxy', 1);
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss())




app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs' , auth , jobRoutes);



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
