'use strict'
import StatusCodes from "http-status-codes"
import Job from "../models/Job.js";



const getAllJobs = async (req,res) =>{
    try{
        // req.body.createdBy = req.user.userId
        const allJobsData = await Job.find({createdBy: req.user.userId}).sort('createdAt');
        if(!allJobsData){
            return res.status(StatusCodes.NOT_FOUND).json({msg : "requested data is not available"})
        }
        return res.status(StatusCodes.OK).json({allJobsData , count:allJobsData.length})
    }catch (error) {
        return res.status(401).json({msg : "cant get the jobs!!!"})
    }
}

const getSingleJob = async (req,res) =>{
    try{
        const singleJob = req.params.id;
        // const creator = req.user.userId
        // const {user:{userId} , params:{id:Jobid}} = req
        const findJob = await Job.findById(singleJob)
        if(!findJob){
            return res.status(StatusCodes.NOT_FOUND).json({msg : `there is no job record for id : ${singleJob}`});
        }
        return res.status(StatusCodes.OK).json({findJob})
    }catch (error) {
        return res.status(401).json({msg : "cant get the single job!!!"})
    }
}


const createJobs = async (req,res) =>{
     try{
         req.body.createdBy = req.user.userId
        const {company , position} = req.body;
        if(!company || !position){
            return res.status(StatusCodes.BAD_REQUEST).json({msg : "you must provide with company and position fields"});
        }
        const jobData = await Job.create(req.body);

        return res.status(StatusCodes.OK).json({jobData});

    }catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : "cant create jobs!!!"})
    }
}


const updateJobs = async (req,res) =>{


    try{
        const data = await Job.findById(req.params.id);
        const createdBy = data.createdBy.valueOf()
        const requester = req.user.userId
        const targetRecord = req.params.id

        const update = {company : req.body.company , position: req.body.position}

         if(createdBy !== requester){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg : 'this user can not update this record'})
        }

        const updateJob = await Job.findByIdAndUpdate(targetRecord , update,{
            new:true,
            returnOriginal:false,
            runValidators: true
        });
        if(!updateJob){
            return res.status(StatusCodes.NOT_FOUND).json({msg : "something went wrong"})
        }

        return res.status(StatusCodes.OK).json({updateJob})
    }catch (error) {
        return res.status(401).json({msg : "cant update jobs!!!"})
    }

}

const deleteJobs = async (req,res) =>{
    try{
        return await res.status().json({msg : "delete the jobs"})
    }catch (error) {
        return res.status(401).json({msg : "cant delete jobs!!!"})
    }
}

export {
    getAllJobs,
    getSingleJob,
    createJobs,
    updateJobs,
    deleteJobs
}

