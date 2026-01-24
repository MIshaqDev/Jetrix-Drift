// Import required modules and middleware
import express from 'express';
import * as c from '../controller/car.Controller.js';

// Create router instance
const CarRoute = express.Router();

// Get all cars endpoint
CarRoute.get('/', async (req, res) =>{
    try{
        // Retrieve all cars from database
        const cars = await c.getAllCars();
        return res.status(200).send({
            cars: cars
        });
    }catch(error){
        return res.status(500).send("something went wrong: ");
    }
});

// Get car by slug endpoint
CarRoute.get('/:slug', async (req, res) => {
    try{
        const car = await c.getCarBySlug(req.params.slug);
        return res.status(200).send({
            car: car
        });
        if(car.error){
            return res.status(404).send("Car not found");
        }
    }catch(error){
        return res.status(500).send("something went wrong: ");   
    }
});

// Get car by ID endpoint
CarRoute.get('/id/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const car = await c.getCarById(id);

        return res.status(200).json({
            car
        });

    } catch (error) {
        if (error.message === "Car not found") {
            return res.status(404).json({ error: "Car not found" });
        }

        return res.status(500).json({
            error: "Something went wrong",
            details: error.message
        });
    }
});


// Export router
export default CarRoute;