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

// Get all drifters endpoint
drifterRoute.get("/", async (req, res) => {
    try{
        // Retrieve all drifters
        const drifters = await d.getAllDrifters();
        return res.status(200).send({
            drifters: drifters
        });
    }catch(error){
        return res.status(500).send({ error: error.message });
    }
});

// Get drifter by slug endpoint
drifterRoute.get("/:slug", async (req, res) => {
    try{
        const slug = req.params.slug;
        // Find drifter using slug
        const drifter = await d.getDrifterBySlug(slug);
        return res.status(200).send({
            drifters: drifter
        });
    }catch(error){
        return res.status(500).send({ error: error.message });
    }
});

// Get drifter by ID endpoint
drifterRoute.get("/id/:id", async (req, res) => {
    try{
        const drifterId = req.params.id;
        // Find drifter using ID
        const drifter = await d.getDrifterById(drifterId);
        return res.status(200).send({
            drifter: drifter
        });
    }catch(error){
        return res.status(300).send({ error: error.message });
    }
});

// Export router
export default drifterRoute;