import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    isadmin:{
        type:String,
        default:'NO'
    }
    
},{
    timestamps:true
})

const User = mongoose.model("User",UserSchema); // This is User Collection or table
export default User;