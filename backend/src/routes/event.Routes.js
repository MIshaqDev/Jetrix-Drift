import express from "express";
import * as e from "../controller/event.Controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const eventRouter = express.Router();
// eventRouter.use(authMiddleware);

eventRouter.post("/create-event", async (req, res) => {
    try{
        const eventDate = req.body;
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
        res.status(400).send({error: error.message});
    }
});

eventRouter.get("/all", async (req,res)=>{
    try{
        const events = await e.getAllEvents();
        res.status(200).send({
            Events: events
        });
    }
    catch(error){
        res.status(400).send({
            error: error 
        })
    }
});

eventRouter.get("/name", async (req, res) => {
    try{
        const name = req.body.name;
        const event = await e.getEventByName(name);
        res.status(200).send({
            Event: event
        });
    }catch(error){
        res.status(400).send({
            error: error
        })
    }
});

eventRouter.put("/update-status", async (req, res) => {
    const {name, status} = req.body;
    try{
        const updatedEvent = await e.updateEventStatus(name, status);
        res.status(200).send({
            data: updatedEvent
        });
    }catch(error){
        res.status(400).send({
            error: error
        });
    }
});

eventRouter.get("/:slug", async (req, res) => {
    try{
        const slug = req.params.slug;
        const event = await e.getEventBySlug(slug);
        res.status(200).send({
            Event: event
        })
    }catch(error){
        res.status(400).send({
            error: error
        })
    }
});

eventRouter.put("/update", async (req, res) => {
    try{
        const eventData = req.body;
        const event = await e.updateEvent(eventData);
        res.status(200).send({
            Event: event
        });
    }catch(error){
        res.status(400).send({
            error: error
        });
    }
});

eventRouter.delete("/delete", async (req, res) => {
    try{
        const name = req.body.name;
        const event = await e.deleteEvent(name);
        res.status(200).send({
            message: `Your event with name *${name}* is deleted`
        })

    }catch(error){
        res.status(400).send({
            error: error
        })
    }
})

export default eventRouter;