import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import * as t from "../controller/team.Controller.js";

const teamRouter = express.Router();
teamRouter.use(authMiddleware);

// Get all teams
teamRouter.get("/", async (req, res) => {
    try{
        const teams = await t.getAllTeams();
        if(teams.error){
            return res.status(400).send({
                error: teams.error,
            })
        }else{
            return res.status(200).send({
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
teamRouter.get("/id/:id", async (req, res) => {
    try{
        // call controller function
        const team = await t.getById(req.params.id);
        if(!team){
            return res.status(400).send({
                error: "Team not found",
            })
        }else{
            return res.status(200).send({
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
            return res.status(400).send({
                error: team.error,
            })
        }else{
            return res.status(200).send({
                Team: team
            })
        }
    }catch(error){
        res.status(500).send({
            error: error.message || "Failed to fetch team",
        });
    }
});

export default teamRouter;