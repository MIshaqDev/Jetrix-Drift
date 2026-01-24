import * as d from "../validation/drifter.type.js";

export default async function drifterValidation(req, res, next){
    const path = req.path;

    try{
        if(path === '/drifter/add'){
            const validation = await d.drifterSchema.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).json({
                    error: validation.error,
                });
            }
            next();
        }else if(path === '/drifter/update'){
            const validation = await d.drifterSchemaUpdate.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).json({
                    error: validation.error.message,
                });
            }
            next();
        } 
        else{
            next();
        }
    }
    catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}