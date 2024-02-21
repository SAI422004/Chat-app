import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        minilength:6
    },
    Gender:{
        type:String,
        required:true,
        enum:["male","female","others"]
    },
    profilePic: {
        type: String,
        default: "",
    },

}, {timestamps: true });

const User = mongoose.model("User",userSchema);

export default User;