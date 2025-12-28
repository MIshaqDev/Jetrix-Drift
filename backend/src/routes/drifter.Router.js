// Import required modules and controllers
import * as d from "../controller/drifter.Controller.js";
import drifterValidation from "../middleware/drifter.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import express from "express";

// Create router instance
const drifterRoute = express.Router();
// Apply validation and auth middleware
drifterRoute.use(drifterValidation);
drifterRoute.use(authMiddleware);

// Add new drifter endpoint
drifterRoute.post("/add", async (req, res) => {
    try{
        // Create and save drifter
        const drifterData = await d.addDrifter(req.body);
        res.status(201).send({
            data: drifterData
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update drifter endpoint
drifterRoute.put("/update", async (req, res) => {
    try{
        // Update existing drifter
        const drifterData = await d.updateDrifter(req.body);
        if(!drifterData){
            res.status(404).send({ error: "Drifter not found" });
        }
        res.status(200).send({
            data: drifterData
        });
    }catch(error){
        res.status(500).send({ error: error.message });
    }
});

// Get all drifters endpoint
drifterRoute.get("/all", async (req, res) => {
    try{
        // Retrieve all drifters
        const drifters = await d.getAllDrifters();
        res.status(200).send({
            data: drifters
        });
    }catch(error){
        res.status(500).send({ error: error.message });
    }
});

// Get drifter by slug endpoint
drifterRoute.get("/:slug", async (req, res) => {
    try{
        const slug = req.params.slug;
        // Find drifter using slug
        const drifter = await d.getDrifterBySlug(slug);
        res.status(200).send({
            data: drifter
        });
    }catch(error){
        res.status(500).send({ error: error.message });
    }
});

// Get drifter by ID endpoint
drifterRoute.get("/id", async (req, res) => {
    try{
        const drifterId = req.body.drifterId;
        // Find drifter using ID
        const drifter = await d.getDrifterById(drifterId);
        res.status(200).send({
            data: drifter
        });
    }catch(error){
        res.status(500).send({ error: error.message });
    }
});

// Delete drifter endpoint
drifterRoute.delete("/delete", async (req, res) => {
    try{
        const drifterId =  req.body.drifterId;
        // Delete drifter from database
        const result = await d.deleteDRifter(drifterId);
        res.status(200).send({
            data: result
        });
    }catch(error){
        res.status(500).send({ error: error.message });
    }
});

// Export router
export default drifterRoute;