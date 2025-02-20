import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type : String , required : true},
  email: { type: String, unique: true , require : true  , lowercase : true},
  password : {type : String , require : true},
  role: { type: String, enum: ["student", "recruiter"], required: true },
  profilePicture: { type: String, default: '' , required : true}, 
 
},{timestamps : true});


const User = mongoose.model("User" , userSchema)

export default User
