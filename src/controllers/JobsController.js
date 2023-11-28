'use strict'
const getAllJobs = async (req,res) =>{
    try{
        return await res.status(200).json({msg : "get the jobs"})
    }catch (error) {
        return res.status(401).json({msg : "cant get the jobs!!!"})
    }
}

const getSingleJob = async (req,res) =>{
    try{
        return await res.status(200).json({msg : "get a single jobs"})
    }catch (error) {
        return res.status(401).json({msg : "cant get the single job!!!"})
    }
}


const createJobs = async (req,res) =>{
    try{
        return await res.status(200).json({msg : "create jobs"})
    }catch (error) {
        return res.status(401).json({msg : "cant create jobs!!!"})
    }
}


const updateJobs = async (req,res) =>{
    try{
        return await res.status(200).json({msg : "update the jobs"})
    }catch (error) {
        return res.status(401).json({msg : "cant update jobs!!!"})
    }
}


const deleteJobs = async (req,res) =>{
    try{
        return await res.status(200).json({msg : "delete the jobs"})
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

