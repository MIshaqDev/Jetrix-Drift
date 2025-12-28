// Import all route handlers
import userRouter  from "./routes/user.Routes.js";
import eventRouter from "./routes/event.Routes.js";
import teamRouter from "./routes/teams.Routes.js";
import drifterRoute from "./routes/drifter.Router.js";
import carRouter from "./routes/car.Router.js";

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

// Register all API routes
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/team", teamRouter);
app.use("/drifter", drifterRoute);
app.use("/car", CarRoute);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Jetrix Drift Server");
});

// Start the server and establish database connection
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
