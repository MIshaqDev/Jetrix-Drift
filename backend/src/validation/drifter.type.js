import * as z from "zod";

export const drifterSchema = z.object({
    firstName: z.string("Name must be a string").min(3, "First name must be at least 3 characters long").max(25, "First name must be less than 25` characters long"),
    lastName: z.string("Name must be a string").min(3, "Last name must be at least 3 characters long").max(25, "Last name must be less than 25 characters long"),
    image: z.string("Team logo must be a string URL").url("Team logo must be a valid URL"),
    age: z.number("Age must be a number").min(18, "Age must be at least 18").max(40, "Age must be at most 40"),
    nationallity: z.string("Country must be a string").min(3, "Country must be at least 3 characters long").max(50, "Country must be less than 50 characters long"),
    rank: z.number("Rank must be a number").min(1, "Rank must be at least 1"),
    team: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Each driver ID must be a valid MongoDB ObjectId")).optional(),
    bgColor: z.string("Team color must be a string").min(4, "Team color must be at least 4 characters long").max(9, "Team color must be less than 9 characters long"),
    catagory: z.enum(["Pro", "Prospec"], { errorMap: () => ({ message: "Catagory must be either 'Pro' or 'Prospec'" }) }),
    championships: z.number("Championships must be a number").min(0, "Championships cannot be negative").optional(),
    raceWin: z.number("Race win must be a number").min(0, "Race win cannot be negative").optional(),
    totalPoints: z.number("Total points must be a number").min(0, "Total points cannot be negative").optional(),
    biography: z.string("Biography must be a string").min(50, "Biography must be at least 50 characters long").max(5000, "Biography must be less than 5000 characters long"),
    careerSummary: z.string("Career summary must be a string").min(50, "Career summary must be at least 50 characters long").max(2000, "Career summary must be less than 2000 characters long"),
});