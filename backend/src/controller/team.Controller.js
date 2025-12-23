import Team from "../models/team.mongos.js";

// Create a new team
export async function createTeam(team) {
  // Check if team with the same first name already exists
  const existingTeam = await Team.findOne({ firstName: team.firstName });
  if (existingTeam) {
    throw new Error("Team with this first name already exists");
  }
  // Create and save the new team
  try {
    const newTeam = new Team({
      firstName: team.firstName,
      lastName: team.lastName,
      country: team.country,
      foundedIn: team.foundedIn,
      teamcolor: team.teamcolor,
      teamLogo: team.teamLogo,
      Championships: team.Championships,
      yearsActive: team.yearsActive,
    });
    // Save the new team to the database
    await newTeam.save();
    return newTeam;
  } catch (error) {
    throw error;
  }
}

// Get all teams
export async function getAllTeams() {
  try {
    // Retrieve all teams from the database
    const teams = await Team.find();
    // If no teams found, throw an error
    if(!teams){
        throw new Error("No teams found");
    }
    return teams;
  } catch (error) {
    return { error: error.message };
  }
}

//Get team by Name
export async function getTeamByName(fullName){
  try{
    // Retrieve team by full name
    const team = await Team.findOne({fullName: fullName});
    if(!team){
      // If team not found, throw an error
        // throw new Error("Team not found");
    }
    return team;
  }catch(error){
    return { error: error.message };
  }
}

// Get team by Slug
export async function getTeamBySlug(slug){
  try{
    const team = await Team.findOne({slug: slug});
    if(!team){
      throw new Error("Team not found");
    }
    return team;
  }catch(error){
    return { error: error.message };
  }
}

// Update team details
export async function updateTeam(teamData){
    try{
        // Validate input
        if(!teamData.firstName){
          console.log(teamData);
            throw new Error("Team name is required for update");
        }
        // Update event
        const team = await Team.findOneAndUpdate({firstName: teamData.firstName}, teamData, {new: true});
        if(!team){
            throw new Error("Team not found");
        }

        return team;
    }catch(error){
        return {error: error.message};
    }
}

// Add drivers to team
export async function addDriver(teamName, driverId){
  try{
    if(!driverId){
      throw new Error("Driver ID is required");
    }
    const team = await Team.findOne({fullName: teamName});
    if(!team){
      throw new Error("Team not found");
    }
    const normalizedDriverId = driverId.toString();
    const alreadyInTeam = (team.drivers || []).filter(Boolean).some(id => id.toString() === normalizedDriverId);
    if(alreadyInTeam){
      throw new Error("Driver already in team");
    }
    team.drivers.push(driverId);
    await team.save();
    return team;
  }catch(error){
    return { error: error.message };
  }
}

// Remove driver from team
export async function removeDriver(teamName, driverId){
  try{
    if(!driverId){
      throw new Error("Driver ID is required");
    }
    const team = await Team.findOne({fullName: teamName});
    if(!team){
      throw new Error("Team not found");
    }
    const normalizedDriverId = driverId.toString();
    const driverIndex = (team.drivers || [  ]).filter(Boolean).findIndex(id => id.toString() === normalizedDriverId);
    if(driverIndex === -1){
      throw new Error("Driver not found in team");
    }
    team.drivers.splice(driverIndex, 1);
    await team.save();
    return team;
  }catch(error){
    return { error: error.message };
  }
}

// Add vehicles to team
export async function addVehicle(teamName, vehicleId){
  try{
    if(!vehicleId){
      throw new Error("Vehicle ID is required");
    }
    const team = await Team.findOne({fullName: teamName});
    if(!team){
      throw new Error("Team not found");
    }
    const normalizedVehicleId = vehicleId.toString();
    const alreadyInTeam = (team.vehicles || []).filter(Boolean).some(id => id.toString() === normalizedVehicleId);
    if(alreadyInTeam){
      throw new Error("Vehicle already in team");
    }
    team.vehicles.push(vehicleId);
    await team.save();
    return team;
  }catch(error){
    return { error: error.message };
  }
}

// Remove vehicle from team
export async function removeVehicle(teamName, vehicleId){
  try{
    if(!vehicleId){
      throw new Error("Vehicle ID is required");
    }
    const team = await Team.findOne({fullName: teamName});
    if(!team){
      throw new Error("Team not found");
    }
    const normalizedVehicleId = vehicleId.toString();
    const vehicleIndex = (team.vehicles || [  ]).filter(Boolean).findIndex(id => id.toString() === normalizedVehicleId);
    if(vehicleIndex === -1){
      throw new Error("Vehicle not found in team");
    }
    team.vehicles.splice(vehicleIndex, 1);
    await team.save();
    return team;
  }catch(error){
    return { error: error.message };
  }
}

// Delete team
export async function deleteTeam(teamName){
  try{
    // Validate input
    if(!teamName){
      throw new Error("Team name is required for deletion");
    }
    // Delete team
    const team = await Team.findOneAndDelete({fullName: teamName});
    if(!team){
      throw new Error("Team not found");
    }
    return {message: "Team deleted successfully"};
  }catch(error){
    return {error: error.message};
  }
}