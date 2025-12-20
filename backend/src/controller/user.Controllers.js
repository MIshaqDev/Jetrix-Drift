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

export async function createUser(user) {
  const exiestingUser = await User.findOne({ email: user.email });
  const existingTemp = await TempUser.findOne({ email: user.email });
  if (exiestingUser || existingTemp) {
    return {error: "User already exists with this email"}
  }
    try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    const opt = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const newUser = new TempUser({
      name: user.name,
      email: user.email,
      password: hash,
      otp: opt,
      otpExpiry: otpExpiry,
    });
    await newUser.save();
    await sendMail(
      user.email,
      `Hi ${user.name}, your OTP for account verification`,
      signinOTPEmail(opt)
    );
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
export async function verifyOtp(otp, email) {
  const tempUser = await TempUser.findOne({ email: email });
  if (!tempUser) {
    return { error: "No user found with this email" };
  }
  if (tempUser.otp !== otp) {
    return { error: "Invalid OTP" };
  }
  if (tempUser.otpExpiry < new Date()) {
    return { error: "OTP has expired" };
  }
  const newUser = new User({
    name: tempUser.name,
    email: tempUser.email,
    password: tempUser.password,
  });
  await newUser.save();
  await TempUser.deleteOne({ email: email });
  return { message: "User verified and created successfully" };
}
export async function verifyUser(user) {
  const email = user.email;
  const password = user.password;
  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    return { error: "User not found" };
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (isMatch) {
    const token = jwt.sign(
      {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.KEY
    );
    return {
      message: "You are logged in seccessfully",
      token: token,
    };
  } else {
    return { error: "Invalid credentials" };
  }
}

export async function resendOtp(email) {
  const tempUser = await TempUser.findOne({ email: email });
  if (!tempUser) {
    return { error: "No user found with this email" };
  }
  const opt = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  tempUser.otp = opt;
  tempUser.otpExpiry = otpExpiry;
  await tempUser.save();
  await sendMail(
    email,
    `Hi ${tempUser.name}, your OTP for account verification`,
    signinOTPEmail(opt)
  );
  return { message: "OTP resent successfully" };
}

export async function forgetPassword(email) {
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return { error: "User not found" };
  }

  const token = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
  const newTempUser = new TempUser({
    email: email,
    token: token,
    tokenExpiry: resetPasswordExpiry,
  });
  await newTempUser.save();
  await sendMail(
    email,
    `Hi ${user.name}, reset your password`,
    resetPasswordEmail(
      `http://yourfrontend.com/reset-password?token=${token}&email=${email}`
    )
  );
  return { message: "Password reset email sent successfully" };
}

export async function resetPassword(email, token, newPassword) {
  const tempUser = await TempUser.findOne({
    email: email,
    token: token,
  });
  if(!tempUser){
    return {error: "Invalid or expired token"};
  }
  if(tempUser.tokenExpiry < Date.now()){
    return {error: "Invalid or expired token"};
  }
  const user = await User.findOne({ email: email });
  if(!user){
    return {error: "User not found"};
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  user.password = hash;
  await user.save();
  await TempUser.deleteOne({email: email, token: token});
  return {message: "Password reset successfully"};
}

export async function logoutUser(res){
  res.clearCookie("token");
  return {message: "Logged out successfully"};
}