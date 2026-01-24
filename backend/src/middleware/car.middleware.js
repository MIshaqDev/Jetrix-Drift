import { CarType } from "../validation/car.type.js";

export default async function carValidation(req, res, next){
    const path = req.path;

    try{
        if(path ==='/car/add' || path === '/car/update'){
            const validation = await CarType.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).send({
                    error: validation.error.message,
                });
            }
            next();
        }else{
            next();
        }
        }catch(error){
            return res.status(500).send({
                error: "Internal Server Error",
            });
        }
}
