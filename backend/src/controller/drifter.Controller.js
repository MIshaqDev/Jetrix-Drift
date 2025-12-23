import Drifter from "../models/drifter.mongos";

export default async function addDrifter(drifter) {
    const existingDrifter = await Drifter.findOne({ firstName: drifter.firstName, lastName: drifter.lastName, nationallity: drifter.nationallity });

    if(existingDrifter){
        throw new Error("Drifter with this name and nationallity already exists");
    }
    try {
        const newDrifter = new Drifter(...drifter);
        await newDrifter.save();
        return newDrifter;
    } catch (error) {
        throw error;
    }
}