import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


function emailFromHeader(authHeader) {
    try {
    if (!authHeader) {
      throw new Error("No token provided");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Invalid token format");
    }
    const decoded = jwt.verify(token, process.env.KEY);
    return decoded.email;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

export default emailFromHeader;