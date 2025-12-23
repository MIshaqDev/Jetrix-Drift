import * as d from "../controller/drifter.Controller.js";


// Server Imports
import express from "express";


const drifterRoute = express.Router();

drifterRoute.post("/add", async (req, res) => {
    try{
        const drifterData = d.addDrifter(req.body);
        res.status(201).send({
            data: drifterData
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default drifterRoute;