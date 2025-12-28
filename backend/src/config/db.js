// Import MongoDB library and dotenv for environment variables
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Get database URL and port from environment variables
const url = process.env.DB_URL;
const port = process.env.PORT;

// Connect to MongoDB database
async function connectDB(){
    if (!url) {
      console.error("DB_URL is not defined in .env!");
      process.exit(1);
    }
    try {
        // Establish connection to MongoDB
        await mongoose.connect(url);
        console.log("Database Connected");
      } catch (error) {
        console.error("Database connection failed:", error);
      }
}

// Export functions and constants for use in other files
export { connectDB, port };

