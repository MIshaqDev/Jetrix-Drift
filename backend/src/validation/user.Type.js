import * as z from 'zod';

export const userSignUp = z.object({
    name: z.string("Name must be a string").min(3, "Name must be at least 3 characters long").max(50, "Name must be less than 50 characters long"),
    email: z.string("Email must be a string").email("Invalid email address"),
    password: z.string("Password must be a string").min(8, "Password must be at least 8 characters long").max(12, "Password must be less than 12 characters long"),
});

export const userLogin = z.object({
    email: z.string("Email must be a string").email("Invalid email address"),
    password: z.string("Password must be a string").min(8, "Password must be at least 8 characters long").max(12, "Password must be less than 12 characters long"),
});