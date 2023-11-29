'use strict';
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({

    company:{
        type: String,
        required: [true , "company name is must be declared"],
        maxLength : 50
    },
    position:{
        type: String,
        required: [true , "position must be declared"],
        maxLength: 100

    },
    status:{
        type: String,
        enums : ['interview' , 'declined' , 'pending'],
        default : 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required : [true , "please provide with a user"]
    }
},{timestamps:true})

const Job = mongoose.model('Job' , JobSchema);

export default Job;