'use strict'
import express from "express";
const router = express.Router();
import {
    getAllJobs,
    getSingleJob,
    createJobs,
    updateJobs,
    deleteJobs} from "../controllers/JobsController.js";


router.get('/' , getAllJobs);
router.post('/' , createJobs);
router.get('/:id' , getSingleJob);
router.patch('/:id' , updateJobs);
router.delete('/:id' , deleteJobs)

export default router;