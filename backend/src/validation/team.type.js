import * as z from 'zod';

export const teamType = z.object({
    firstName: z.string("Name must be a string").min(2, "First name must be at least 2 characters long").max(50, "First name must be less than 50 characters long"),
    lastName: z.string("Name must be a string").min(2, "Last name must be at least 2 characters long").max(50, "Last name must be less than 50 characters long"),
    country: z.string("Country must be a string").min(2, "Country must be at least 2 characters long").max(50, "Country must be less than 50 characters long"),
    foundedIn: z.string("Founded In must be a string representing a date").refine((date) => !isNaN(Date.parse(date)), {
        message: "Founded In must be a valid date string",
    }),
    teamColor: z.string("Team color must be a string").min(4, "Team color must be at least 4 characters long").max(9, "Team color must be less than 9 characters long"),
    teamLogo: z.string("Team logo must be a string URL").url("Team logo must be a valid URL"),
    Championships: z.number("Championships must be a number").min(0, "Championships cannot be negative").optional(),
    yearsActive: z.number("Years active must be a number").min(0, "Years active cannot be negative").optional(),
    drivers: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Each driver ID must be a valid MongoDB ObjectId")).optional(),
    vehicles: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Each vehicle ID must be a valid MongoDB ObjectId")).optional(),
});

export const driverType = z.object({
    teamID: z.string("Team ID must be a string").regex(/^[0-9a-fA-F]{24}$/, "Team ID must be a valid MongoDB ObjectId"),
    drifterID: z.string("Driver ID must be a string").regex(/^[0-9a-fA-F]{24}$/, "Driver ID must be a valid MongoDB ObjectId"),
});

export const vehicleType = z.object({
    teamID: z.string("Team ID must be a string").regex(/^[0-9a-fA-F]{24}$/, "Team ID must be a valid MongoDB ObjectId"),

    carID: z.string("Car ID must be a string").regex(/^[0-9a-fA-F]{24}$/, "Car ID must be a valid MongoDB ObjectId"),
});