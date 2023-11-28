const registerUser = async (req , res) =>{
    try{
       return  await res.send('register user')
    }catch (error) {
        return res.status(401).json({})
    }
}


const loginUser  = async (req,res) =>{

    try{
        return res.status(200).json({msg : "login user"})
    }catch (error){

    }
}


export {
    registerUser,
    loginUser
}