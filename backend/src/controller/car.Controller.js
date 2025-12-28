// Import database models
import Car from "../models/cars.model.js";
import Team from "../models/team.mongos.js";

// Add new car to database
export async function addCar(CarData){
    try{
        // Check if car model already exists
        const existingCar = await Car.findOne({ model: CarData.model});

        if(existingCar){
            throw new Error("Car with this model already exists");
        }

        // Create and save new car
        const newCar = new Car({...CarData});
        await newCar.save();
        return newCar;
    } catch (error) {
        throw error;
    }
}

// Retrieve all cars from database
export async function getAllCars(){
    try{
        // Fetch all cars
        const cars = await Car.find();
        return cars;
    }catch(error){
        throw new Error("Something went wrong while fetching cars: " + error.message);
    }
}

// Update car details in database
export async function updateCar(carData){
    try{
        // Update car by ID with new data
        const updatedCar = await Car.findByIdAndUpdate(
            carData.id,
            {$set: carData},
            {new: true}
        )
    
        if(!updatedCar) throw new Error("Car not found");
    
        return updatedCar;
    }catch(error){
        throw new Error("Something went wrong while updating the car: " + error.message);
    }

}