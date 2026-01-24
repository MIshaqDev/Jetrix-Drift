import * as t from "../validation/team.type.js";

export default async function teamValidation(req, res, next){
    const path = req.path;

    try{
        if(path === '/add-team' || path === '/update'){
            const validation = await t.teamType.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).json({
                    error: validation.error.message,
                });
            }
            next();
        }else if(path === '/team/add-drifter' || path === '/team/remove-drifter'){
            const validation = await t.driverType.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).json({
                    error: validation.error.message,
                });
            }
            next();
        }else if(path === '/team/add-car' || path === '/team/remove-car'){
            const validation = await t.vehicleType.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).json({
                    error: validation.error.message,
                });
            }
            next();
        }else{
            next();
        }
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}