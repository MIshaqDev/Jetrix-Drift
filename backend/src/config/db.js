import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_URL;
const port = process.env.PORT;

async function connectDB(){
    if (!url) {
      console.error("DB_URL is not defined in .env!");
      process.exit(1);
    }
    try {
        await mongoose.connect(url);
        console.log("Database Connected");
      } catch (error) {
        console.error("Database connection failed:", error);
      }
}

export { connectDB, port };

