// Import MongoDB library
import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema({
    // User full name
    name:{
        type: String,
        required: true,
    },
    // User email address
    email:{
        type:String,
        required:true,
        unique:true,
    },
    // User password hash
    password:{
        type: String,
        required: true,
    },
    // User role (user or admin)
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    // Email verification status
    isVarified:{
        type: Boolean,
        default: true,
    },
    // Account creation timestamp
    createdAt:{
        type: Date,
        default: Date.now,
    },
    // Pinned teams by user
    pinnedTeam: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        }
    ],
    // Pinned drifters by user
    pinnedDrifter: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drifter",
        }
    ],
    // Pinned cars by user
    pinnedCar: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
        }
    ]
});

// Create and export User model
const User = mongoose.model("User", userSchema);

export default User;