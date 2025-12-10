import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventByName,
  updateEventStatus,
  deleteEvent,
  updateEvent,
} from "../controller/event.Controller.js";

const eventRouter = express.Router();

eventRouter.post("/create-event", async (req, res) => {
    try{
        const eventDate = req.body;
        const newEvent = await createEvent(eventDate);
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


export default eventRouter;