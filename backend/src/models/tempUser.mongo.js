import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
  name: { type: String,},
  email: { type: String, unique: true },
  password: { type: String,},
  otp: { type: String, },
  otpExpiry: { type: Date,},
  token: { type: String, },
  tokenExpiry: { type: Date, },
  createdAt: { type: Date, default: Date.now, index: { expires: 3600 } } // auto-delete after 1 hour
});

const TempUser = mongoose.model("TempUser", tempUserSchema);

export default TempUser;