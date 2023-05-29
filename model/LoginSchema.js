
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs"
const LoginSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});



export default mongoose.model("Login", LoginSchema);