// Import database models
import Drifter from "../models/drifter.mongos.js";
import Team from "../models/team.mongos.js";

// Create new drifter in database
export async function addDrifter(drifter) {
    // Check for duplicate drifter
    const existingDrifter = await Drifter.findOne({ firstName: drifter.firstName, lastName: drifter.lastName, nationallity: drifter.nationallity });

    if(existingDrifter){
        throw new Error("Drifter with this name and nationallity already exists");
    }
    try {
        // Save new drifter record
        const newDrifter = new Drifter({ ...drifter });
        await newDrifter.save();
        return newDrifter;
    } catch (error) {
        throw error;
    }
}

// Update drifter information
export async function updateDrifter(drifterData){
    try{
        // Update drifter by ID with new data
        const updatedDrifter = await Drifter.findByIdAndUpdate(
            drifterData.id,
            { $set: drifterData },
            { new: true }
        );
        if(!updatedDrifter){
            throw new Error("Drifter not found");
        }
        return updatedDrifter;
    } catch (error) {
        throw error;
    }
}

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
        return drifter;
    } catch (error) {
        return { error: error.message };
    }
}

// Get drifter by ID
export async function getDrifterById(drifterId) {
    // Fetch drifter by ID and get team information
    const drifter = await Drifter.findById(drifterId).populate("team");
    return drifter;
}

// Delete drifter and remove from team
export async function deleteDRifter(drifterId) {
    try{
        // Check if drifter is part of any team
        const teamWithDrifter = await Team.findOne({ drifters: drifterId});
        if(teamWithDrifter){
            // Remove drifter from team
            await Team.updateOne(
                { _id: teamWithDrifter._id },
                { $pull: { drifters: drifterId } }
            );
        }
        // Delete drifter record
        const drifter = await Drifter.findByIdAndDelete(drifterId);
        if(!drifter){
            throw new Error("Drifter not found");
        }
        return {message: `Drifter with Id ${drifterId} deleted successfully` };
    }catch(error){
        throw new Error({Error: error.message});
    }
}