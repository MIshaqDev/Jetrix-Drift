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

// Get all events endpoint
eventRouter.get("/", async (req,res)=>{
    try{
        // Retrieve all events from database
        const events = await e.getAllEvents();
        return res.status(200).send({
            Events: events
        });
    }
    catch(error){
        // Return error message
        return res.status(400).send({
            error: error 
        })
    }
});
// Create new event endpoint
eventRouter.post("/create-event", async (req, res) => {
    const eventDate = req.body;
    try{
        // Create new event in database
        const newEvent = await e.createEvent(eventDate);
        if(newEvent.error){
            return res.send({
                data: newEvent,
            });
        }else{
            return res.status(201).send({
                data: newEvent,
            });
        }
        
    }catch(error){
        // Return error message
        return res.status(400).send({error: error.message});
    }
});


// Get event by ID endpoint
eventRouter.get("/id/:id", async (req, res) => {
    const id = req.params.id;
    try{
        // Find event by ID
        const event = await e.getEventById(id);
        return res.status(200).send({
            Event: event
        });
    }catch(error){
        // Return error message
        return res.status(400).send({
            error: error
        })
    }
});

// Update event status endpoint
eventRouter.put("/update-status", async (req, res) => {
    const {id, status} = req.body;
    try{
        // Update event status
        const updatedEvent = await e.updateEventStatus(id, status);
        return res.status(200).send({
            data: updatedEvent
        });
    }catch(error){
        // Return error message
        return res.status(400).send({
            error: error
        });
    }
});

// Get event by slug endpoint
eventRouter.get("/:slug", async (req, res) => {
    const slug = req.params.slug;
    console.log("Slug received:", slug);
    try{
        // Find event using slug
        const event = await e.getEventBySlug(slug);
        return res.status(200).send({
            Event: event
        })
    }catch(error){
        // Return error message
        return res.status(400).send({
            error: "Here is an error: " + error
        })
    }
});

// Update event endpoint
eventRouter.put("/update", async (req, res) => {
    const eventData = req.body;
    try{
        // Update event details
        const event = await e.updateEvent(eventData);
        return res.status(200).send({
            Event: event
        });
    }catch(error){
        // Return error message
        return res.status(400).send({
            error: error
        });
    }
});

// Delete event endpoint
eventRouter.delete("/delete", async (req, res) => {
    const id = req.body.id;
    try{
        // Delete event from database
        const event = await e.deleteEvent(id);
        return res.status(200).send({
            message: `Your event with ID *${id}* is deleted`
        })

    }catch(error){
        // Return error message
        return res.status(400).send({
            error: error
        })
    }
})

// Export router
export default eventRouter;