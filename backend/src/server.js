// Import Node HTTPS and FS for certificates
import https from "https";
import fs from "fs";
import cors from "cors";

// Import all route handlers
import userRouter  from "./routes/user.Routes.js";
import eventRouter from "./routes/event.Routes.js";
import teamRouter from "./routes/teams.Routes.js";
import drifterRoute from "./routes/drifter.Router.js";
import carRouter from "./routes/car.Router.js";
import AdminRouter from "./routes/admin.Router.js";
import LeaderBoardRouter from "./routes/leaderBoard.Router.js";
import corsMiddleware from "./middleware/cors.middleware.js";

// Import Express framework
import express from "express";

// Import database connection and configuration
import { connectDB, port } from "./config/db.js";

// Import middleware packages
import cookieParser from "cookie-parser";
import CarRoute from "./routes/car.Router.js";

// Create Express application instance
const app = express();

// Setup middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());
//app.use(corsMiddleware);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


// Register all API routes
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/team", teamRouter);
app.use("/drifter", drifterRoute);
app.use("/car", CarRoute);
app.use("/admin", AdminRouter);
app.use("/leaderboard", LeaderBoardRouter);


// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Jetrix Drift Server");
});

// Start the server and establish database connection
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
