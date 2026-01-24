// Import database models
import Drifter from "../models/drifter.mongos.js";
import mongoose from "mongoose";

// Retrieve all drifters from database
export async function getAllDrifters() {
    // Fetch all drifters and populate team information
    const drifters = await Drifter.find().populate("team");
    return drifters;
}

// Get drifter using slug URL
export async function getDrifterBySlug(slug) {
    try{
        // Find drifter by slug and populate team details
        const drifter = await Drifter.findOne({ slug: slug}).populate("team");
        if(!drifter){
            throw new Error("Drifter not found");
        }
        // Calculate player rank
        const betterPlayerCount = await Drifter.countDocuments({
            totalPoints: {$gt: drifter.totalPoints}
        });
        const rank = betterPlayerCount +1;
        drifter.rank = rank;
        return drifter;
    } catch (error) {
        return { error: error.message };
    }
}

// Get drifter by ID
export async function getDrifterById(drifterId) {
    try {
        // Validate drifter ID
        if (!mongoose.Types.ObjectId.isValid(drifterId)) {
            throw new Error("Invalid drifter ID");
        }
        // Find drifter by ID and populate team
        const drifter = await Drifter.findById(drifterId).populate("team");
        if (!drifter) {
          throw new Error("Drifter not found");
        }
        // Calculate player rank
        const betterPlayerCount = await Drifter.countDocuments({
            totalPoints: {$gt: drifter.totalPoints}
        });
        const rank = betterPlayerCount +1;
        drifter.rank = rank;
        return drifter;
      } catch (error) {
        throw new Error(error.message);
      }
}