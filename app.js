'use strict'
import express from 'express';
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
const port = process.env.PORT | 8000;

app.use(express.json());

app.use('/api/v1' , userRoutes)



app.listen(port , ()=>{
    console.log(`express server is up and running on port : ${port}`);
})

