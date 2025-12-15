import jwt from "jsonwebtoken";
import "dotenv/config";

export function TokenGenrate(existingUser) {
    try{
        if(!existingUser){
            throw new Error("User not found");
        }
        const token = jwt.sign(
          {
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          },
          process.env.KEY
        );
        return {
          token: token,
        };
    }catch(error){
        console.log("Error generating token:", error);
        throw error;
    }
}

export default TokenGenrate;