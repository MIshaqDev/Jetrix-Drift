import * as d from "../validation/drifter.type.js";

export default async function drifterValidation(req, res, next){
    const path = req.path;

    try{
        if(path === '/add' || path === '/update'){
            const validation = await d.drifterSchema.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).json({
                    error: validation.error.message,
                });
            }
            next();
        }else{
            next();
        }
    }
    catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}