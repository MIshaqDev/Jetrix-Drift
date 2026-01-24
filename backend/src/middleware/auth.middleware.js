import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send({
            message: "unauthorized"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.KEY);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).send({
            message: "Invalid Token"
        });
    }
}

export default authMiddleware
