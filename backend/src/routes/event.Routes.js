import express from "express";
import eventValidation from "../middleware/eventValid.Middleware.js";
import * as e from "../controller/event.Controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const eventRouter = express.Router();
eventRouter.use(authMiddleware);
eventRouter.use(eventValidation);


// Create Event
eventRouter.post("/create-event", async (req, res) => {
    const eventDate = req.body;
    try{
        // call controller function
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
        // show error message
        res.status(400).send({error: error.message});
    }
});

// Get all events
eventRouter.get("/all", async (req,res)=>{
    try{
        // call controller function
        const events = await e.getAllEvents();
        res.status(200).send({
            Events: events
        });
    }
    catch(error){
        // show error message
        res.status(400).send({
            error: error 
        })
    }
});

// Get event by Name
eventRouter.get("/name", async (req, res) => {
    const name = req.body.name;
    try{
        // call controller function
        const event = await e.getEventByName(name);
        res.status(200).send({
            Event: event
        });
    }catch(error){
        // show error message
        res.status(400).send({
            error: error
        })
    }
});

// Update event status
eventRouter.put("/update-status", async (req, res) => {
    const {name, status} = req.body;
    try{
        // call controller function
        const updatedEvent = await e.updateEventStatus(name, status);
        res.status(200).send({
            data: updatedEvent
        });
    }catch(error){
        // show error message
        res.status(400).send({
            error: error
        });
    }
});

// Get event by Slug
eventRouter.get("/:slug", async (req, res) => {
    const slug = req.params.slug;
    try{
        // call controller function
        const event = await e.getEventBySlug(slug);
        res.status(200).send({
            Event: event
        })
    }catch(error){
        // show error message
        res.status(400).send({
            error: error
        })
    }
});

// Update event
eventRouter.put("/update", async (req, res) => {
    const eventData = req.body;
    try{
        // call controller function
        const event = await e.updateEvent(eventData);
        res.status(200).send({
            Event: event
        });
    }catch(error){
        // show error message
        res.status(400).send({
            error: error
        });
    }
});

// Delete event
eventRouter.delete("/delete", async (req, res) => {
    const name = req.body.name;
    try{
        // call controller function
        const event = await e.deleteEvent(name);
        res.status(200).send({
            message: `Your event with name *${name}* is deleted`
        })

    }catch(error){
        // show error message
        res.status(400).send({
            error: error
        })
    }
})

export default eventRouter;