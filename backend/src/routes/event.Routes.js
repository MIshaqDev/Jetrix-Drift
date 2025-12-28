// Import required modules and controllers
import express from "express";
import eventValidation from "../middleware/eventValid.Middleware.js";
import * as e from "../controller/event.Controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

// Create router instance
const eventRouter = express.Router();
// Apply auth and validation middleware
eventRouter.use(authMiddleware);
eventRouter.use(eventValidation);

// Create new event endpoint
eventRouter.post("/create-event", async (req, res) => {
    const eventDate = req.body;
    try{
        // Create new event in database
        const newEvent = await e.createEvent(eventDate);
        if(newEvent.error){
            res.send({
                data: newEvent,
            });
        }else{
            res.status(201).send({
                data: newEvent,
            });
        }
        
    }catch(error){
        // Return error message
        res.status(400).send({error: error.message});
    }
});

// Get all events endpoint
eventRouter.get("/all", async (req,res)=>{
    try{
        // Retrieve all events from database
        const events = await e.getAllEvents();
        res.status(200).send({
            Events: events
        });
    }
    catch(error){
        // Return error message
        res.status(400).send({
            error: error 
        })
    }
});

// Get event by name endpoint
eventRouter.get("/name", async (req, res) => {
    const name = req.body.name;
    try{
        // Find event by name
        const event = await e.getEventByName(name);
        res.status(200).send({
            Event: event
        });
    }catch(error){
        // Return error message
        res.status(400).send({
            error: error
        })
    }
});

// Update event status endpoint
eventRouter.put("/update-status", async (req, res) => {
    const {name, status} = req.body;
    try{
        // Update event status
        const updatedEvent = await e.updateEventStatus(name, status);
        res.status(200).send({
            data: updatedEvent
        });
    }catch(error){
        // Return error message
        res.status(400).send({
            error: error
        });
    }
});

// Get event by slug endpoint
eventRouter.get("/:slug", async (req, res) => {
    const slug = req.params.slug;
    try{
        // Find event using slug
        const event = await e.getEventBySlug(slug);
        res.status(200).send({
            Event: event
        })
    }catch(error){
        // Return error message
        res.status(400).send({
            error: error
        })
    }
});

// Update event endpoint
eventRouter.put("/update", async (req, res) => {
    const eventData = req.body;
    try{
        // Update event details
        const event = await e.updateEvent(eventData);
        res.status(200).send({
            Event: event
        });
    }catch(error){
        // Return error message
        res.status(400).send({
            error: error
        });
    }
});

// Delete event endpoint
eventRouter.delete("/delete", async (req, res) => {
    const name = req.body.name;
    try{
        // Delete event from database
        const event = await e.deleteEvent(name);
        res.status(200).send({
            message: `Your event with name *${name}* is deleted`
        })

    }catch(error){
        // Return error message
        res.status(400).send({
            error: error
        })
    }
})

// Export router
export default eventRouter;