import * as z from "zod";

export const CarType = z.object({
    model: z.string("Model must be a string").min(2, "Model is required").max(100, "Model can not be more than 100 characters"),
    image: z.string("Url must be a string").min(5, "Image URL is required").url("Image must be a valid URL").regex(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/, "Image URL must end with a valid image extension"),
    brand: z.string("Brand must be a string").min(2, "Brand is required").max(100, "Brand can not be more than 100 characters"),
    year: z.string("Year must be a string").min(4, "Year is required").max(4, "Year must be 4 characters").optional(),
    engine: z.string("Engine must be a string").optional(),
    horsePower: z.number("Horse Power must be a number").optional(),
    weight: z.number("Weight must be a number").optional(),
    torque: z.number("Torque must be a number").optional(),
    brakes: z.string("Brakes must be a string").optional(),
    tires: z.string("Tires must be a string").optional(),
    modifications: z.string("Modifications must be a string").max(2000, "Modifications can not be more than 2000 characters").optional(),
});