import express from "express";
import * as t from "../controller/team.Controller.js";

const teamRouter = express.Router();

teamRouter.post("/add-team", async (req, res) => {
    try{
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
        console.error("Error creating team:", error);
        res.status(500).send({
            error: error.message || "Failed to create team",
        });
    }
});

export default teamRouter;