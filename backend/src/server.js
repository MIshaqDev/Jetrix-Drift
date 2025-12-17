import express from "express";
import userRouter  from "./routes/user.Routes.js";
import eventRouter from "./routes/event.Routes.js";
import teamRouter from "./routes/teams.Routes.js";
import { connectDB, port } from "./config/db.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/team", teamRouter);
app.get("/", (req, res) => {
  res.send("Welcome to Jetrix Drift Server");
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
