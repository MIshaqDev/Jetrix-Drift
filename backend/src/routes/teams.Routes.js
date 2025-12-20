import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import teamValidation from "../middleware/teamValid.Middleware.js";
import * as t from "../controller/team.Controller.js";

const teamRouter = express.Router();
teamRouter.use(authMiddleware);
teamRouter.use(teamValidation);

// Create Team
teamRouter.post("/add-team", async (req, res) => {
    try{
        // call controller function
        const teamData = req.body;
        const team = await t.createTeam(teamData);
        if(team.error){
            res.status(400).send({
                error: team.error,
            })
        }else{
            res.status(200).send({
                data: team,
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.message || "Failed to create team",
        });
    }
});

// Get all teams
teamRouter.get("/all", async (req, res) => {
    try{
        const teams = await t.getAllTeams();
        if(teams.error){
            res.status(400).send({
                error: teams.error,
            })
        }else{
            res.status(200).send({
                data: teams,
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.message || "Failed to fetch teams",
        });
    }
});

// Get team by Name
teamRouter.get("/name", async (req, res) => {
    const fullName = req.body.fullName;
    try{
        // call controller function
        const team = await t.getTeamByName(fullName);
        if(!team){
            throw new Error("Team not found");
        }else{
            res.status(200).send({
                Team: team
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.message || "Failed to fetch team",
        });
    }
});

// Get team by Slug
teamRouter.get("/:slug", async (req, res) => {
    const slug = req.params.slug;
    try{
        // call controller function
        const team = await t.getTeamBySlug(slug);
        if(team.error){
            res.status(400).send({
                error: team.error,
            })
        }else{
            res.status(200).send({
                Team: team
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.message || "Failed to fetch team",
        });
    }
});

// Update team details
teamRouter.put("/update", async (req, res) => {
    const team = req.body;
    try{
        // call controller function
        const updatedTeam = await t.updateTeam(team);
        if(updatedTeam.error){
            res.status(400).send({
                error: updatedTeam.error,
            })
        }else{
            res.status(200).send({
                data: updatedTeam
            })
        }   
    }catch(error){
        res.status(500).send({
            error: error.message || "Failed to update team",
        });
    }
});

// Add driver to team
teamRouter.put("/add-driver", async (req, res) => {
    const teamName = req.body.teamName;
    const driverId = req.body.driverId;
    try{
        // call controller function
        const updatedTeam = await t.addDriver(teamName, driverId);
        if(updatedTeam.error){
            res.status(400).send({
                error: updatedTeam.error,
            })
        }else{
            res.status(200).send({
                data: updatedTeam
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.message || "Failed to add driver to team",
        });
    }
});

// Remove driver from team
teamRouter.put("/remove-driver", async (req, res) => {
    const teamName = req.body.teamName;
    const driverId = req.body.driverId;
    try{
        // call controller function
        const updatedTeam = await t.removeDriver(teamName, driverId);
        if(updatedTeam.error){
            res.status(400).send({
                error: updatedTeam.error,
            })
        }else{
            res.status(200).send({
                data: updatedTeam
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.message || "Failed to remove driver from team",
        });
    }
});

// 

export default teamRouter;