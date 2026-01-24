// Import database models
import Car from "../models/cars.model.js";
import Team from "../models/team.mongos.js";

// Retrieve all cars from database
export async function getAllCars(){
    try{
        // Fetch all cars
        const cars = await Car.find();
        return cars;
    }catch(error){
        throw new Error("Something went wrong while fetching cars: ");
    }
}

// Get car details by slug
export async function getCarBySlug(slug){
    try{
        // Find car by slug
        const car = await Car.findOne({slug: slug});
        if(!car) throw new Error("Car not found");
        return car;
    }catch(error){
        throw new Error("Something went wrong while fetching the car: ");
    }
}

// Get car details by ID
export async function getCarById(id){
    try{
        // Find car by ID
        const car = await Car.findById(id);
        if(!car) throw new Error("Car not found");
        return car;
    }catch(error){
        throw new Error("Something went wrong while fetching the car: " + error.message);
    }
}