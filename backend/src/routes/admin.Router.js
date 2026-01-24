// Import required modules and middleware
import express from "express";
import authorization from "../middleware/authoriz.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import carValidation from '../middleware/car.middleware.js';
import drifterValidation from '../middleware/drifter.middleware.js';
import teamValidation from '../middleware/team.Middleware.js';

// Import admin controllers
import * as admin from "../controller/admin.Colntroller.js";

// Create router instance
const AdminRouter = express.Router();

// Apply authentication and authorization middleware
AdminRouter.use(authMiddleware);
AdminRouter.use(authorization(["admin"]));

// Change user role endpoint
AdminRouter.put("/user/change-role", async (req, res) => {
  try {
    const { email, role} = req.body;
    if(!email || !role){
      return res.status(400).json({ error: "Email and role are required" });
    }
    // Call changeUserRole controller
    const response = await admin.changeUserRole(email, role);
    if (response.error) {
      return res.status(400).json({ error: response.error });
    } else {
      return res.status(200).json({ message: response.message, user: response.user });
    }
  }catch(error){
    return res.status(400).json({ error: error.message });
  }
});

// Create Team
AdminRouter.post("/team/add", teamValidation, async (req, res) => {
    try{
        // call controller function
        const teamData = req.body;
        const team = await admin.createTeam(teamData);
        if(!team){
            return res.status(400).send({
                error: team.error,
            })
        }else{
            return res.status(200).send({
                data: team,
            })
        }
    }catch(error){
        return res.status(500).send({
            error: error.message || "Failed to create team",
        });
    }
});

// Update team details
AdminRouter.put("/team/update", teamValidation, async (req, res) => {
    const team = req.body;
    try{
        // call controller function
        const updatedTeam = await admin.updateTeam(team);
        if(!updatedTeam){
            return res.status(400).send({
                error: updatedTeam.error,
            })
        }else{
            return res.status(200).send({
                data: updatedTeam
            })
        }   
    }catch(error){
        return res.status(500).send({
            error: error.message || "Failed to update team",
        });
    }
});

// Add drifter to team
AdminRouter.put("/team/add-drifter", teamValidation, async (req, res) => {
    const teamID = req.body.teamID;
    const drifterID = req.body.drifterID;
    try{
        // call controller function
        const updatedTeam = await admin.addDriver(teamID, drifterID);
        if(!updatedTeam){
            return res.status(400).send({
                error: updatedTeam.error,
            })
        }else{
            return res.status(200).send({
                data: updatedTeam
            })
        }
    }catch(error){
        return res.status(500).send({
            error: error.message || "Failed to add driver to team",
        });
    }
});

// Remove driver from team
AdminRouter.delete("/team/remove-drifter", teamValidation, async (req, res) => {
    const teamID = req.body.teamID;
    const drifterID = req.body.drifterID;

    try{
        // call controller function
        const updatedTeam = await admin.removeDriver(teamID, drifterID);
        if(!updatedTeam){
            return res.status(400).send({
                error: updatedTeam.error,
            })
        }else{
            return res.status(200).send({
                data: updatedTeam
            })
        }
    }catch(error){
        return res.status(500).send({
            error: error.message || "Failed to remove driver from team",
        });
    }
});

// Add vehicle to team
AdminRouter.put("/team/add-car", teamValidation, async (req, res) => {
    const teamID = req.body.teamID;
    const carID = req.body.carID;
    try{
        // call controller function
        const updatedTeam = await admin.addVehicle(teamID, carID);
        if(!updatedTeam){
            return res.status(400).send({
                error: updatedTeam.error,
            })
        }else{
            return res.status(200).send({
                data: updatedTeam
            })
        }
    }catch(error){
        return res.status(500).send({
            error: error.message || "Failed to add vehicle to team",
        });
    }
});

// Delete Vehicle from team
AdminRouter.delete("/team/remove-car", teamValidation, async (req, res) => {
    const teamID = req.body.teamID;
    const carID = req.body.carID;
    try{
        // call controller function
        const updatedTeam = await admin.removeVehicle(teamID, carID);
        if(!updatedTeam){
            return res.status(400).send({
                error: updatedTeam.error,
            })
        }else{
            return res.status(200).send({
                data: updatedTeam
            })
        }
    }catch(error){
        return res.status(500).send({
            error: error.message || "Failed to remove vehicle from team",
        });
    }
});

// Delete team
AdminRouter.delete("/team/delete", teamValidation, async (req, res) => {
    const teamId = req.body.teamId;
    try{
        // call controller function
        const deletedTeam = await admin.deleteTeam(teamId);
        if(!deletedTeam){
            return res.status(400).send({
                error: deletedTeam.error,
            })
        }else{
            return res.status(200).send({
                data: deletedTeam
            })
        }
    }catch(error){
        return res.status(500).send({
            error: error.message || "Failed to delete team",
        });
    }
});

// Add new car endpoint
AdminRouter.post('/car/add', carValidation, async (req, res)=> {
    try{
        // Create and save new car
        const newCar = await admin.addCar(req.body);
        res.status(200).send({
            car: newCar
        });
        if(newCar.error){
            return res.status(400).send("Car with this model already exists");
        }
    }catch(error){
        return res.status(406).send(error.message);
    }
});

// Update car endpoint
AdminRouter.put('/car/update', carValidation, async (req, res)=>{
    try{
        // Update existing car
        const updatedCar = await admin.updateCar(req.body);
        res.status(200).send({
            car: updatedCar
        });
        if(updatedCar.error){
            return res.status(404).send(error.message);
        }
    }catch(error){
        return res.status(500).send("something went wrong: " + error.message);
    }
});

// Delete car endpoint
AdminRouter.delete("/car/delete", async (req, res) =>{
    try{
        const car = await admin.deleteCar(req.body.id);
        return res.status(200).send({
            message: car
        });
    }catch(error){
        return res.status(400).send(error.message);
    }
    
});

// Add new drifter endpoint
AdminRouter.post("/drifter/add", drifterValidation, async (req, res) => {
    try{
        // Create and save drifter
        const drifterData = await admin.addDrifter(req.body);
        return res.status(201).send({
            data: drifterData
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// Update drifter endpoint
AdminRouter.put("/drifter/update", drifterValidation, async (req, res) => {
    try{
        // Update existing drifter
        const drifterData = await admin.updateDrifter(req.body);
        if(!drifterData){
            return res.status(404).send({ error: "Drifter not found" });
        }
        return res.status(200).send({
            data: drifterData
        });
    }catch(error){
        return res.status(500).send({ error: error.message });
    }
});

// Delete drifter endpoint
AdminRouter.delete("/drifter/delete", drifterValidation, async (req, res) => {
    try{
        const drifterId =  req.body.drifterId;
        // Delete drifter from database
        const result = await admin.deleteDRifter(drifterId);
        return res.status(200).send({
            data: result
        });
    }catch(error){
        return res.status(500).send({ error: error.message });
    }
});

export default AdminRouter;