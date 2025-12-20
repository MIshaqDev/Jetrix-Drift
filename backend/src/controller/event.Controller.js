import Event from "../models/event.mongos.js";

// Create Event
export async function createEvent(eventData){
    try{
        // Validate required fields
        if(!eventData.name || !eventData.date){
            throw new Error("Event name and date are required");
        }
        // Check if event with the same name already exists
        const existingEvent = await Event.findOne({name: eventData.name});
        if(existingEvent){
            throw new Error("Event with this name already exists");
        }
        // Create and save the new event
        const newEvent = new Event({
            name: eventData.name,
            eventImage: eventData.eventImage,
            rounds: eventData.rounds,
            location: eventData.location,
            date: eventData.date,
            description: eventData.description,
            pricePool: eventData.pricePool,
        })
        await newEvent.save();
        return newEvent;
    }catch(error){
        return {error: error.message}
    }
}

// Get all events
export async function getAllEvents(){
    try{
        // Retrieve all events from the database
        const events = await Event.find();
        if(!events){
            throw new Error("No events found");
        }
        return events;
    }catch(error){
        return {error: error.message};
    }
}

// Get event by Name
export async function getEventByName(eventName){
    try{
        // Retrieve event by name
        if(!eventName){
            throw new Error("Event name is required");
        }
        // Retrieve event by name
        const event = await Event.findOne({name: eventName});
        if(!event){
            throw new Error("Event not found");
        }
        return event;
    }catch(error){
        return {error: error.message};
    }
}

// Update event status
export async function updateEventStatus(eventName, status){
    try{
        // Validate inputs
        if(!eventName){
            throw new Error("Event name is required for status update");
        }
        if(!status){
            throw new Error("Status is required for update");
        }
        // Update event status
        const event = await Event.findOneAndUpdate({name: eventName}, {status: status}, {new: true});
        if(!event){
            throw new Error("Event not found");
        }
        return event;
    }catch(error){
        return {error: error.message};
    }
    }

    // Delete event
export async function deleteEvent(eventName){
    try{
        // Validate input
        if(!eventName){
            throw new Error("Event name is required for deletion");
        }
        // Delete event
        const event = await Event.findOneAndDelete({name: eventName});
        if(!event){
            throw new Error("Event not found");
        }
        return {message: "Event deleted successfully"};
    }catch(error){
        return {error: error.message};
    }
}

// Update event
export async function updateEvent(eventUpdate){
    try{
        // Validate input
        if(!eventUpdate.name){
            throw new Error("Event name is required for update");
        }
        // Update event
        const event = await Event.findOneAndUpdate({name: eventUpdate.name}, eventUpdate, {new: true});
        if(!event){
            throw new Error("Event not found");
        }

        return event;
    }catch(error){
        return {error: error.message};
    }
}

// Get event by Slug
export async function getEventBySlug(slug) {
    try{
        if(!slug){
            throw new Error("Slug is required");
        }
        // Retrieve event by slug
        const slugEvent = await Event.findOne({ slug: slug});
        if(!slugEvent){
            throw new Error("Event not found");
        }
        return slugEvent;

    }catch(error){
        return {error: error.message};
    }
}