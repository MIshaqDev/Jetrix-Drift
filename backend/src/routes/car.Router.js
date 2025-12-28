// Import required modules and middleware
import express from 'express';
import carValidation from '../middleware/car.middleware.js';
import * as c from '../controller/car.Controller.js';

// Create router instance
const CarRoute = express.Router();
// Apply validation middleware
CarRoute.use(carValidation)

// Add new car endpoint
CarRoute.post('/add', async (req, res)=> {
    try{
        // Create and save new car
        const newCar = await c.addCar(req.body);
        res.status(200).send({
            car: newCar
        });
        if(newCar.error){
            res.status(400).send({error: newCar.error});
        }
    }catch(error){
        res.status(500).send({error: error.message});
    }
});

// Update car endpoint
CarRoute.put('/update', async (req, res)=>{
    try{
        // Update existing car
        const updatedCar = await c.updateCar(req.body);
        res.status(200).send({
            car: updatedCar
        });
        if(updatedCar.error){
            res.status(400).send({error: updatedCar.error});
        }
    }catch(error){
        res.status(500).send({error: error.message});
    }
});

// Get all cars endpoint
CarRoute.get('/all', async (req, res) =>{
    try{
        // Retrieve all cars from database
        const cars = await c.getAllCars();
        res.status(200).send({
            cars: cars
        });
    }catch(error){
        res.status(500).send({error: error.message});
    }
})

// Export router
export default CarRoute;