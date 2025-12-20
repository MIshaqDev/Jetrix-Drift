import * as e from '../validation/event.type.js';

export default async function eventValidation(req, res, next){
    const path = req.path;

    try{
        if(path === '/create-event' || path === '/update'){
            const validation = await e.createEvent.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).json({
                    error: validation.error.message,
                });
            }
            next();
        }else if(path === '/update-status'){
            const validation = await e.updateEventStatus.safeParseAsync(req.body);

            if(!validation.success){
                return res.status(400).json({
                    error: validation.error.message,
                });
            }
            next();
        }
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}