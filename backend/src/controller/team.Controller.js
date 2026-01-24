// Import models and libraries
import Team from "../models/team.mongos.js";
import mongoose from "mongoose";

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
export async function getById(teamId) {
  try {
    // Validate team ID
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        throw new Error("Invalid car ID");
    }
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