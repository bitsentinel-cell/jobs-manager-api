import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const validateEmail = function(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
};
const UserSchema = new mongoose.Schema({

    username : {
        type : String,
        required : [true , "username must be provided"],
        maxLength : 15,

    },
    email : {
        type : String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password : {
        type : String,
        required : [true , "please choose wisely"],
        minLength: 6,

    },
})
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)

})


UserSchema.methods.createJWT = function (){
    return  jwt.sign({userId : this._id,name:this.username},process.env.JWT_SECRET, {expiresIn: '30m'});
}


UserSchema.methods.comparePassword = async function (pass){
    return await bcrypt.compare(pass, this.password);
}





const User = mongoose.model('User' , UserSchema);
export default User;