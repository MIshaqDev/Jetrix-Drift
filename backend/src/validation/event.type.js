import * as z from 'zod';

export const createEvent = z.object({
    name: z.string().min(5, "Event name should be at least 5 characters long").max(50, "Event name should not exceed 50 characters"),
    eventImage: z.string().url("Event image must be a valid URL"),
    rounds: z.number().min(1, "There must be at least 1 round").max(20, "Number of rounds cannot exceed 20"),
    location: z.string().min(5, "Location should be at least 5 characters long").max(20, "Location should not exceed 20 characters"),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Date must be a valid date string",
    }),
    description: z.string().min(10, "Description should be at least 10 characters long").max(500, "Description should not exceed 500 characters"),
    pricePool: z.number().min(0, "Price pool cannot be negative"),
    status: z.enum(["upcoming", "ongoing", "completed"]).optional(),
});

export const updateEventStatus = z.object({
    name: z.string().min(5, "Event name should be at least 5 characters long").max(50, "Event name should not exceed 50 characters"),
    status: z.enum(["upcoming", "ongoing", "completed"], "Status must be one of: upcoming, ongoing, completed"),
});