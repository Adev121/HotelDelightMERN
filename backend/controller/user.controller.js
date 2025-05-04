import User from "../models/user.model.js";

export const signup =  async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const existingUser = await User.findOne({email})
        if(!existingUser){
            const user = new User({
                name:name,
                email:email,
                password:password,
            })
            await user.save();
            res.status(201).json({user,message:"User created Succesfully !"});
        }
        else{
            res.status(400).json({message:"User Already Exists !"});
        }
        
       } catch (error) {
        console.log(error)
        res.status(500).json({message:"Interal server error!"});
       }
}

export const login =  async(req,res)=>{
    try {
        const {email,password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            console.log(existingUser)
            console.log(existingUser.password , existingUser.email)
            if(password === existingUser.password)
            {
                res.status(201).json({user:{id:existingUser._id,name:existingUser.name,email:existingUser.email},message:"User Login Succesfully !"});
            }
            else
            res.status(401).json({message:"Invalid Password !"});
        }
        else{
            res.status(400).json({message:"User Not registered !"});
        }
        
       } catch (error) {
        console.log(error)
        res.status(500).json({message:"Interal server error!"});
       }
}


export const getAllUser = async (req,res)=>{
try {
    const alluser = await User.find()
    res.send(alluser)
} catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Interal server error!"});
}
}