import Team from "../models/team.mongos.js";

// Create a new team
export async function createTeam(team) {
  const existingTeam = await Team.findOne({ firstName: team.firstName });
  if (existingTeam) {
    throw new Error("Team with this first name already exists");
  }
  try {
    const newTeam = new Team({
      firstName: team.firstName,
      lastName: team.lastName,
      country: team.country,
      foundedIn: team.foundedIn,
      teamcolor: team.teamColor,
      teamLogo: team.teamLogo,
      Championships: team.Championships,
      yearsActive: team.yearsActive,
    });
    await newTeam.save();
    return newTeam;
  } catch (error) {
    throw error;
  }
}

// Get all teams
export function getAllTeams() {
  try {
  } catch (error) {}
}
