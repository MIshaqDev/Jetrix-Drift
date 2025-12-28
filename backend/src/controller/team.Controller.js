// Import models and libraries
import Team from "../models/team.mongos.js";
import Drifter from "../models/drifter.mongos.js";
import mongoose from "mongoose";

// Create new team in database
export async function createTeam(team) {
  // Check for duplicate team name
  const existingTeam = await Team.findOne({ firstName: team.firstName });
  if (existingTeam) {
    throw new Error("Team with this first name already exists");
  }
  try {
    // Save new team to database
    const newTeam = new Team({ ...team });
    await newTeam.save();
    return newTeam;
  } catch (error) {
    throw error;
  }
}

// Retrieve all teams with related data
export async function getAllTeams() {
  try {
    // Get all teams and populate drivers and cars
    const teams = await Team.find().populate("drifters").populate("car");
    if (!teams) {
      throw new Error("No teams found");
    }
    return teams;
  } catch (error) {
    return { error: error.message };
  }
}

// Get team by ID with related data
export async function getByIdteam(teamId) {
  try {
    // Find team by ID and populate drifters and car
    const team = await Team.findById(teamId).populate("drifters").populate("car");
    if (!team) {
      throw new Error("Team not found");
    }
    return team;
  } catch (error) {
    return { error: error.message };
  }
}

// Get team using slug URL
export async function getTeamBySlug(slug) {
  try {
    // Find team by slug and populate related data
    const team = await Team.findOne({ slug: slug }).populate("drifters").populate("car");
    if (!team) {
      throw new Error("Team not found");
    }
    return team;
  } catch (error) {
    return { error: error.message };
  }
}

// Update team information
export async function updateTeam(teamData) {
  try {
    // Validate team name
    if (!teamData.firstName) {
      console.log(teamData);
      throw new Error("Team name is required for update");
    }
    // Update team record in database
    const team = await Team.findOneAndUpdate({ firstName: teamData.firstName }, teamData, { new: true });
    if (!team) {
      throw new Error("Team not found");
    }

    return team;
  } catch (error) {
    return { error: error.message };
  }
}

// Add drifter to team
export async function addDriver(teamID, drifterID) {
  try {
    // Validate MongoDB IDs
    if (!mongoose.Types.ObjectId.isValid(drifterID)) {
      throw new Error("Invalid Drifter ID");
    }
    if (!mongoose.Types.ObjectId.isValid(teamID)) {
      throw new Error("Invalid Team ID");
    }
    // Check if drifter exists
    const drifter = await Drifter.findById(drifterID);
    if (!drifter) {
      throw new Error("Drifter not found");
    }
    // Check if drifter already in team
    const alreadyInTeam = await Team.findOne({ _id: teamID, drifters: drifterID });
    if (alreadyInTeam) {
      throw new Error("Drifter already in team");
    }

    // Add drifter to team
    const team = await Team.updateOne(
      { _id: teamID },
      { $addToSet: { drifters: drifterID } }
    );
    if (team.matchedCount === 0) {
      throw new Error("Team not found");
    }

    // Update drifter team reference
    drifter.team = teamID;
    drifter.bgColor = team.teamColor;
    await drifter.save();

    return { message: "Driver added successfully" };
  } catch (error) {
    return { error: error.message };
  }
}

// Remove drifter from team
export async function removeDriver(teamID, drifterID) {
  try {
    // Validate MongoDB IDs
    if( !mongoose.Types.ObjectId.isValid(drifterID)) throw new Error("Invalid Driver ID");
    if( !mongoose.Types.ObjectId.isValid(teamID)) throw new Error("Invalid Team ID");

    // Remove drifter from team
    const drifter = await Team.updateOne(
      { _id: teamID},
      {$pull: {drifters: drifterID}}
    );
    console.log(drifter);
    if(drifter.matchedCount === 0){
      throw new Error("Team not found");
    }
    // Clear drifter's team reference
    const drifterData = await Drifter.findByIdAndUpdate(drifterID, { team: null });

    return { message: "Driver removed successfully" };
  } catch (error) {
    return { error: error.message };
  }
}

// Add vehicle to team
export async function addVehicle(teamName, vehicleId) {
  try {
    // Validate vehicle ID
    if (!vehicleId) {
      throw new Error("Vehicle ID is required");
    }
    // Find team by name
    const team = await Team.findOne({ fullName: teamName });
    if (!team) {
      throw new Error("Team not found");
    }
    // Check if vehicle already in team
    const normalizedVehicleId = vehicleId.toString();
    const alreadyInTeam = (team.vehicles || []).filter(Boolean).some(id => id.toString() === normalizedVehicleId);
    if (alreadyInTeam) {
      throw new Error("Vehicle already in team");
    }
    // Add vehicle to team
    team.vehicles.push(vehicleId);
    await team.save();
    return team;
  } catch (error) {
    return { error: error.message };
  }
}

// Remove vehicle from team
export async function removeVehicle(teamName, vehicleId) {
  try {
    // Validate vehicle ID
    if (!vehicleId) {
      throw new Error("Vehicle ID is required");
    }
    // Find team by name
    const team = await Team.findOne({ fullName: teamName });
    if (!team) {
      throw new Error("Team not found");
    }
    // Remove vehicle from team
    const normalizedVehicleId = vehicleId.toString();
    const vehicleIndex = (team.vehicles || []).filter(Boolean).findIndex(id => id.toString() === normalizedVehicleId);
    if (vehicleIndex === -1) {
      throw new Error("Vehicle not found in team");
    }
    team.vehicles.splice(vehicleIndex, 1);
    await team.save();
    return team;
  } catch (error) {
    return { error: error.message };
  }
}

// Delete team from database
export async function deleteTeam(teamId) {
  try {
    // Validate team ID
    if (!teamId) {
      throw new Error("Team ID is required for deletion");
    }
    // Delete team record
    const team = await Team.findByIdAndDelete(teamId);
    if (!team) {
      throw new Error("Team not found");
    }
    return { message: "Team deleted successfully" };
  } catch (error) {
    return { error: error.message };
  }
}