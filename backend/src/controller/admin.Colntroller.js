// Import database models
import User from "../models/user.mongos.js";
import Team from "../models/team.mongos.js";
import Drifter from "../models/drifter.mongos.js";
import Car from "../models/cars.model.js";
import Event from "../models/event.mongos.js";
import mongoose from "mongoose";

// Import utils
import generateSlug from "../utils/slugify.js";

// Change user role in database
export async function changeUserRole(email, newRole){
  // Update user role
  const user = await User.findOneAndUpdate({email: email}, {role: newRole}, {new: true});
  if(!user){
    return {error: "User not found"};
  }
  return {message: `User role updated to ${newRole} successfully`, user: user};
}

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

// Update team information
export async function updateTeam(teamData) {
  try {
    // Validate team name
    if (!teamData.id) {
      console.log(teamData);
      throw new Error("Team name is required for update");
    }
    teamData.fullName = teamData.firstName+" "+teamData.lastName;
    teamData.slug = await generateSlug(teamData.fullName);
    // Update team record in database
    const team = await Team.findByIdAndUpdate(teamData.id, teamData, { new: true });
    if (!team) {
      throw new Error("Team not found");
    }

    return team;
  } catch (error) {
    return error;
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
    return error;
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
    return error;
  }
}

// Add vehicle to team
export async function addVehicle(teamID, carID) {
 try {
    // Validate MongoDB IDs
    if (!mongoose.Types.ObjectId.isValid(carID)) {
      throw new Error("Invalid Car ID");
    }
    if (!mongoose.Types.ObjectId.isValid(teamID)) {
      throw new Error("Invalid Team ID");
    }
    // Check if car exists
    const car = await Car.findById(carID);
    if (!car) {
      throw new Error("Car not found");
    }
    // Check if car already in team
    const alreadyInTeam = await Team.findOne({ _id: teamID, car: carID });
    if (alreadyInTeam) {
      throw new Error("Car already in team");
    }

    // Add car to team
    const team = await Team.findByIdAndUpdate(teamID, {car: carID},{ new: true })
    if (team.matchedCount === 0) {
      throw new Error("Team not found");
    }

    // Update car team reference
    car.team = teamID;
    car.bgColor = team.teamColor;
    await car.save();

    return { message: "Car added successfully" };
  } catch (error) {
    return error;
  }
}

// Remove vehicle from team
export async function removeVehicle(teamID, carID) {
  try {
    // Validate vehicle ID
    if (!carID) {
      throw new Error("Vehicle ID is required");
    }
    // Find team by ID
    const team = await Team.findById(teamID);
    if (!team) {
      throw new Error("Team not found");
    }
    // Remove vehicle from team
    const car = await Team.findByIdAndUpdate(teamID, { car: null });
    if (car.matchedCount === 0) {
      throw new Error("Vehicle not found in team");
    }
    // Clear car's team reference
    const carData = await Car.findByIdAndUpdate(carID, { team: null });

    return { message: "Vehicle removed successfully" };
  } catch (error) {
    return error;
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
    return error;
  }
}

// Add new car to database
export async function addCar(CarData){
    try{
        // Check if car model already exists
        const existingCar = await Car.findOne({ model: CarData.model});

        if(existingCar){
            throw new Error("Car with this model already exists");
        }

        // Create and save new car
        const newCar = new Car({...CarData});
        await newCar.save();
        return newCar;
    } catch (error) {
        throw error;
    }
}

// Update car details in database
export async function updateCar(carData){
    try{
        if(!mongoose.isValidObjectId(carData.id)) throw new Error("Invalid ID")
        carData.slug= await generateSlug(carData.model);
        // Update car by ID with new data
        const updatedCar = await Car.findByIdAndUpdate(
            carData.id,
            carData,
            {new: true}
        )
    
        if(!updatedCar) throw new Error("Car not found");
    
        return updatedCar;
    }catch(error){
        throw error;
    }
}

// Delete car by ID
export async function deleteCar(id){
    try{
        const team = await Team.findOne({ car: id});
        if(team){
            throw new Error("Cannot delete car assigned to a team");
        } 
        const deletedCar = await Car.findByIdAndDelete(id);
        if(!deletedCar) throw new Error("Car not found");
        return deletedCar;
    }catch(error){
        throw error;
    }
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
        throw error;
    }
}

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
        drifterData.fullName = `${drifterData.firstName} ${drifterData.lastName}`;
        drifterData.slug = await generateSlug(drifterData.fullName);
        // Update drifter by ID with new data
        const updatedDrifter = await Drifter.findByIdAndUpdate(
            drifterData.id,
            drifterData,
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