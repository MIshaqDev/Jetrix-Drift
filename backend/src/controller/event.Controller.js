// Import event model
import Event from "../models/event.mongos.js";

// Create new event in database
export async function createEvent(eventData) {
    try {
        // Validate required fields
        if (!eventData.name || !eventData.date) {
            throw new Error("Event name and date are required");
        }
        // Check for existing event with same name
        const existingEvent = await Event.findOne({ name: eventData.name });
        if (existingEvent) {
            throw new Error("Event with this name already exists");
        }
        // Save new event
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
    } catch (error) {
        return { error: error.message }
    }
}

// Get all events from database
export async function getAllEvents() {
    try {
        // Retrieve all events
        const events = await Event.find();
        if (!events) {
            throw new Error("No events found");
        }
        return events;
    } catch (error) {
        return { error: error.message };
    }
}

// Find event by ID
export async function getEventById(eventId) {
    try {
        // Validate event ID
        if (!eventId) {
            throw new Error("Event ID is required");
        }
        // Search for event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }
        return event;
    } catch (error) {
        throw new Error({ error: error.message });
    }
}

// Update event status
export async function updateEventStatus(id, status) {
    try {
        // Validate inputs
        if (!id) {
            throw new Error("Event ID is required for status update");
        }
        if (!status) {
            throw new Error("Status is required for update");
        }
        // Update status in database
        const event = await Event.findByIdAndUpdate(id, { status: status }, { new: true });
        if (!event) {
            throw new Error("Event not found");
        }
        return event;
    } catch (error) {
        return { error: error.message };
    }
}

// Delete event from database
export async function deleteEvent(id) {
    try {
        // Validate event ID
        if (!id) {
            throw new Error("Event ID is required for deletion");
        }
        // Remove event record
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            throw new Error("Event not found");
        }
        return { message: "Event deleted successfully" };
    } catch (error) {
        return { error: error.message };
    }
}

// Update event details
export async function updateEvent(eventUpdate) {
    try {
        // Validate event ID
        if (!eventUpdate.id) {
            throw new Error("Event ID is required for update");
        }
        // Update event record
        const event = await Event.findByIdAndUpdate(eventUpdate.id, eventUpdate, { new: true });
        if (!event) {
            throw new Error("Event not found");
        }

        return event;
    } catch (error) {
        return { error: error.message };
    }
}

// Get event by slug URL
export async function getEventBySlug(slug) {
    if (!slug) {
        throw new Error("Slug is required");
    }

    const event = await Event.findOne({ slug });

    if (!event) {
        throw new Error("Event not found");
    }

    return event;

}