// Import MongoDB library
import mongoose from "mongoose";

// Define temporary user schema for OTP and password reset
const tempUserSchema = new mongoose.Schema({
  // User name
  name: { type: String,},
  // User email
  email: { type: String, unique: true },
  // Hashed password
  password: { type: String,},
  // OTP for email verification
  otp: { type: String, },
  // OTP expiration time
  otpExpiry: { type: Date,},
  // Password reset token
  token: { type: String, },
  // Password reset token expiration time
  tokenExpiry: { type: Date, },
  // Auto-delete document after 1 hour
  createdAt: { type: Date, default: Date.now, index: { expires: 3600 } }
});

// Create and export TempUser model
const TempUser = mongoose.model("TempUser", tempUserSchema);

export default TempUser;