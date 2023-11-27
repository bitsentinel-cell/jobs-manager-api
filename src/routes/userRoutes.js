'use strict'
import express from "express";
const router = express.Router();
import UserLogin from "../controllers/UserController.js";


router.get('/' , UserLogin);


export default router;