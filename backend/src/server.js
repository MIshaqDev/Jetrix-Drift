// Router Imports
import userRouter  from "./routes/user.Routes.js";
import eventRouter from "./routes/event.Routes.js";
import teamRouter from "./routes/teams.Routes.js";
import drifterRoute from "./routes/drifter.Router.js";
// Server Imports
import express from "express";
// Database and Config Imports
import { connectDB, port } from "./config/db.js";
// Middleware Imports
import cookieParser from "cookie-parser";

// Initialize Express App
const app = express();

// Middleware Setup
app.use(express.json());
app.use(cookieParser());

// Route Setup
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/team", teamRouter);
app.use("/drifter", drifterRoute);

// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to Jetrix Drift Server");
});

// Start Server and Connect to Database
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
