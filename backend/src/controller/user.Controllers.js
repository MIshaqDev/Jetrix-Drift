// Import required modules and models
import User from "../models/user.mongos.js";
import TempUser from "../models/tempUser.mongo.js";
import bcrypt from "bcrypt";
import sendMail from "../utils/emails/sendMail.js";
import signinOTPEmail from "../utils/emails/templetes/signin.email.js";
import resetPasswordEmail from "../utils/emails/templetes/resetPassword.email.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

// Create new user with OTP verification
export async function createUser(user) {
  // Check if user already exists
  const exiestingUser = await User.findOne({ email: user.email });
  const existingTemp = await TempUser.findOne({ email: user.email });
  if (exiestingUser || existingTemp) {
    return { error: "User already exists with this email" }
  }
  try {
    // Hash password with salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    // Generate OTP
    const opt = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Create temporary user record
    const newUser = new TempUser({
      name: user.name,
      email: user.email,
      password: hash,
      otp: opt,
      otpExpiry: otpExpiry,
    });
    await newUser.save();
    // Send OTP to email
    await sendMail(
      user.email,
      `Hi ${user.name}, your OTP for account verification`,
      signinOTPEmail(opt)
    );
    // Create JWT token
    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.KEY
    );
    return {
      message: "Please verify OTP sent to your email",
      token: token,
    };
  } catch (error) {
    throw error;
  }
}
// Verify OTP and create permanent user account
export async function verifyOtp(otp, email) {
  // Validate email
  if (!email) {
    return { error: "Email must need." }
  }
  // Find temporary user record
  const tempUser = await TempUser.findOne({ email: email });
  if (!tempUser) {
    return { error: "No user found with this email" };
  }
  // Check if OTP matches
  if (tempUser.otp !== otp) {
    return { error: "Invalid OTP" };
  }
  // Check if OTP has expired
  if (tempUser.otpExpiry < new Date()) {
    return { error: "OTP has expired" };
  }
  // Create permanent user account
  const newUser = new User({
    name: tempUser.name,
    email: tempUser.email,
    password: tempUser.password,
  });
  await newUser.save();
  // Delete temporary user record
  await TempUser.deleteOne({ email: email });
  return { message: "User verified and created successfully" };
}
// Verify user credentials and return JWT token
export async function verifyUser(user) {
  const email = user.email;
  const password = user.password;
  // Find user by email
  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    return { error: "User not found" };
  }
  // Compare password with hash
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (isMatch) {
    const user = {
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    }
    // Create JWT token with user data
    const token = jwt.sign(user, process.env.KEY);
    return {
      message: "You are logged in seccessfully",
      token: token,
      user: user,
    };
  } else {
    return { error: "Invalid credentials" };
  }
}

// Resend OTP to user email
export async function resendOtp(email) {
  // Find temporary user
  const tempUser = await TempUser.findOne({ email: email });
  if (!tempUser) {
    return { error: "No user found with this email" };
  }
  // Generate new OTP
  const opt = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  // Update OTP in database
  tempUser.otp = opt;
  tempUser.otpExpiry = otpExpiry;
  await tempUser.save();
  // Send new OTP to email
  await sendMail(
    email,
    `Hi ${tempUser.name}, your OTP for account verification`,
    signinOTPEmail(opt)
  );
  return { message: "OTP resent successfully" };
}

// Send password reset email
export async function forgetPassword(email) {
  // Find user by email
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return { error: "User not found" };
  }

  // Generate reset token
  const token = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
  // Create temporary user record with reset token
  const newTempUser = new TempUser({
    email: email,
    token: token,
    tokenExpiry: resetPasswordExpiry,
  });
  await newTempUser.save();
  // Send password reset email
  await sendMail(
    email,
    `Hi ${user.name}, reset your password`,
    resetPasswordEmail(
      `http://yourfrontend.com/reset-password?token=${token}&email=${email}`
    )
  );
  return { message: "Password reset email sent successfully" };
}

// Reset user password with token verification
export async function resetPassword(email, token, newPassword) {
  // Find temporary user with reset token
  const tempUser = await TempUser.findOne({
    email: email,
    token: token,
  });
  // Validate token exists
  if (!tempUser) {
    return { error: "Invalid or expired token" };
  }
  // Check if token has expired
  if (tempUser.tokenExpiry < Date.now()) {
    return { error: "Invalid or expired token" };
  }
  // Find user account
  const user = await User.findOne({ email: email });
  if (!user) {
    return { error: "User not found" };
  }
  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  // Update password
  user.password = hash;
  await user.save();
  // Delete temporary reset token
  await TempUser.deleteOne({ email: email, token: token });
  return { message: "Password reset successfully" };
}

// Logout user by clearing token
export async function logoutUser(res) {
  // Clear authentication cookie
  res.clearCookie("token");
  return { message: "Logged out successfully" };
}

// Get user profile with pinned items
export async function profile(email) {
  // Find user and populate related data
  const user = await User.findOne({ email: email }).populate("pinnedTeam").populate("pinnedDrifter").populate("pinnedCar");
  if (!user) {
    return { error: "User not found" };
  }
  return { 
    user:{
        email: user.email,
        name: user.name,
        role: user.role,
        cars: user.pinnedCar,
        drifters: user.pinnedDrifter,
        teams: user.pinnedTeam
        }
    };
}
