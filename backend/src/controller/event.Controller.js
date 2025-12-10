import Event from "../models/event.mongos.js";

export async function createEvent(eventDate){
    const newEvent = new event({
        name: eventDate.name,
        eventImage: eventDate.eventImage,
        rounds: eventDate.rounds,
        location: eventDate.location,
        date: eventDate.date,
        description: eventDate.description,
        pricePool: eventDate.pricePool,
    })
    await newEvent.save();
    return newEvent;
}

export async function getAllEvents(){
    const events = await Event.find();
    return events;
}

export async function getEventByName(eventName){
    const event = event.findOne({name: eventName});
    return event;
}

export async function updateEventStatus(eventName, status){
    const event = await Event.findOneAndUpdate({name: eventName}, {status: status}, {new: true});
    return event;
}

export async function deleteEvent(eventName){
    await Event.findOneAndDelete({name: eventName});
    return {message: "Event deleted successfully"};
}

export async function updateEvent(eventUpdate){
    const event = await Event.findOneAndUpdate({name: eventUpdate.name}, eventUpdate, {new: true});
    return event;
}