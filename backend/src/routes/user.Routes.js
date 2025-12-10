import express from "express";
import emailFromHeader from "../utils/headerEmail.js";
import {
  createUser,
  verifyOtp,
  verifyUser,
  resendOtp,
  forgetPassword,
  resetPassword,
  logoutUser,
} from "../controller/user.Controllers.js";
const userRouter = express.Router();
userRouter.post("/signup", async (req, res) => {
  const user = req.body;
  const response = await createUser(user);
  if (response.error) {
    res.send({
      data: response,
    });
  } else {
    res.cookie("token", response.token, {
      httpOnly: true,
    });
    res.send({
      data: response.message,
    });
  }
});

userRouter.get("/verify-otp", (req, res) => {
    try{
        const otp = req.body.otp;
        const token = req.cookies.token;
        const email = emailFromHeader(`Bearer ${token}`);
        verifyOtp(otp, email)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => {
            res.status(400).json({ error: error.message });
          });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

userRouter.get("/login", async (req, res) => {
    try{
        const user = req.body;
        const response = await verifyUser(user);
        if (response.error) {
            res.send({
                data: response,
            });
        } else {
            res.cookie("token", response.token, {
                httpOnly: true,
            });
            res.send({
                data: response.message,
            });
        }
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

userRouter.get("/resend-otp", async(req, res) => {
    const token = req.cookies.token;
    try{
        const email = emailFromHeader(`Bearer ${token}`);
        const response = await resendOtp(email);
        res.send({
            data: response,
        });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

userRouter.get("/forget-password", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const response = await forgetPassword(email);
    res.send({
      data: response,
    });
  } catch (error) {
    res.status(440).json({ error: error.message });
  }
});

userRouter.put("/reset-password", async (req, res) => {
  try{
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) {
      return res.status(400).json({ error: "Email, token and new password are required" });
    }
    const response = await resetPassword(email, token, newPassword);
    res.send({
      data: response,
    });
  }catch(error){
    res.status(440).json({ error: error.message });
  }
});

userRouter.get("/logout", async (req, res) => {
  try{
    const response = await logoutUser(res);
    res.send({
      data: response,
    });
  }catch(error){
    res.status(440).json({ error: error.message });
  }
});

export default userRouter;
