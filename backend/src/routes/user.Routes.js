// Import required modules and middleware
import express from "express";
import userValidation from "../middleware/userValidation.middleware.js";
import emailFromHeader from "../utils/headerEmail.js";
import * as u from "../controller/user.Controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

// Create router instance
const userRouter = express.Router();
// Apply validation middleware
userRouter.use(userValidation);

// User registration endpoint
userRouter.post("/signup", async (req, res) => {
  const user = req.body;
  console.log("Signup user is: ", user);
  // Call signup controller
  const response = await u.createUser(user);
console.log("response: ", response);
  if (response.error) {
    return res.status(404).send({
      data: response,
    });
  } else {
    // Set authentication token cookie
    res.cookie("token", response.token, {
      httpOnly: true,
    });
    res.send({
      data: response.message,
    });
  }
});

// Verify OTP endpoint
userRouter.get("/verify-otp", (req, res) => {
    try{
        const otp = req.body.otp;
        const token = req.cookies.token;
        // Extract email from JWT token
        const email = emailFromHeader(`Bearer ${token}`);
        // Verify OTP with controller
        u.verifyOtp(otp, email)
          .then((result) => {
            return res.status(200).json(result);
          })
          .catch((error) => {
            return res.status(400).json({ error: error.message });
          });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

// User login endpoint
userRouter.post("/login", async (req, res) => {
    try{
        const user = req.body;
        // Verify user credentials
        const response = await u.verifyUser(user);
        if (response.error) {
          return res.status(404).send({
            message: response.error,
          })
            
        } else {
        
  res.cookie('token', response.token,{httpOnly: true}).send({data: response.message,
user: response.user});
        }
    }catch(error){
        res.status(400).ok(false).json({ error: error.message });
    }
});

// Resend OTP endpoint
userRouter.get("/resend-otp", async(req, res) => {
    const token = req.cookies.token;
    try{
        // Extract email from token
        const email = emailFromHeader(`Bearer ${token}`);
        // Resend OTP to user
        const response = await u.resendOtp(email);
        res.send({
            data: response,
        });
        if (response.error) {
            return res.status(404).send({
              data: response,
            });
        }
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

// Request password reset endpoint
userRouter.get("/forget-password", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    // Send password reset email
    const response = await u.forgetPassword(email);
    res.send({
      data: response,
    });
  } catch (error) {
    res.status(440).json({ error: error.message });
  }
});

// Reset password with token endpoint
userRouter.put("/reset-password", async (req, res) => {
  try{
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) {
      return res.status(400).json({ error: "Email, token and new password are required" });
    }
    // Reset user password
    const response = await u.resetPassword(email, token, newPassword);
    res.send({
      data: response,
    });
  }catch(error){
    res.status(440).json({ error: error.message });
  }
});

// User logout endpoint
userRouter.get("/logout", async (req, res) => {
  try{
    // Clear user session
    const response = await u.logoutUser(res);
    res.send({
      data: response,
    });
  }catch(error){
    res.status(440).json({ error: error.message });
  }
});

// Change user role endpoint
userRouter.put("/change-role", async (req, res) => {
  try{
    const { email, role} = req.body;
    if(!email || !role){
      return res.status(400).json({ error: "Email and new role are required" });
    }
    // Update user role in database
    const response = await u.changeUserRole(email, role);
    res.send({
      data: response,
    });
  }catch(error){
    res.status(440).json({ error: error.message });
  }
});

// Get user profile endpoint
userRouter.get("/profile", authMiddleware, async (req, res) => {
  try{
    const email = req.user.email;
    // Retrieve user profile with pinned items
    const userProfile = await u.profile(email);
    res.send({
      data: userProfile,
    });
  }catch(error){
    res.status(440).json({ error: error.message });
  }
});

// Export router
export default userRouter;
