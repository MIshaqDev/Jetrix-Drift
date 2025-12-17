import Event from "../models/event.mongos.js";

export async function createEvent(eventDate){
    try{
        if(!eventDate.name || !eventDate.date){
            throw new Error("Event name and date are required");
        }
        const existingEvent = await Event.findOne({name: eventDate.name});
        if(existingEvent){
            throw new Error("Event with this name already exists");
        }
        const newEvent = new Event({
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
    }catch(error){
        return {error: error.message}
    }
}

export async function getAllEvents(){
    try{
        const events = await Event.find();
        if(!Event){
            throw new Error("No events found");
        }
        return events;
    }catch(error){
        return {error: error.message};
    }
}

export async function getEventByName(eventName){
    try{
        if(!eventName){
            throw new Error("Event name is required");
        }
        const event = await Event.findOne({name: eventName});
        if(!event){
            throw new Error("Event not found");
        }
        return event;
    }catch(error){
        return {error: error.message};
    }
}

export async function updateEventStatus(eventName, status){
    try{
        if(!eventName){
            throw new Error("Event name is required for status update");
        }
        if(!status){
            throw new Error("Status is required for update");
        }
        const event = await Event.findOneAndUpdate({name: eventName}, {status: status}, {new: true});
        if(!event){
            throw new Error("Event not found");
        }
        return event;
    }catch(error){
        return {error: error.message};
    }
    }

export async function deleteEvent(eventName){
    try{
        if(!eventName){
            throw new Error("Event name is required for deletion");
        }
        await Event.findOneAndDelete({name: eventName});
        if(!event){
            throw new Error("Event not found");
        }
        return {message: "Event deleted successfully"};
    }catch(error){
        return {error: error.message};
    }
}

export async function updateEvent(eventUpdate){
    try{
        if(!eventUpdate.name){
            throw new Error("Event name is required for update");
        }
        const event = await Event.findOneAndUpdate({name: eventUpdate.name}, eventUpdate, {new: true});
        if(!event){
            throw new Error("Event not found");
        }

        return event;
    }catch(error){
        return {error: error.message};
    }
}

export async function getEventBySlug(slug) {
    try{
        if(!slug){
            throw new Error("Slug is required");
        }
        const slugEvent = await Event.findOne({ slug: slug});
        if(!slugEvent){
            throw new Error("Event not found");
        }
        return slugEvent;

    }catch(error){
        return {error: error.message};
    }
}