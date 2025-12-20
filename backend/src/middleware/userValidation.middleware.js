import * as u from "../validation/user.Type.js";

export default async function userValidation(req, res, next) {
  const path = req.path;

  if (path === "/signup") {
    try {
      const validation = await u.userSignUp.safeParseAsync(req.body);

      if (!validation.success) {
          return res.status(400).json({
            error: validation.error.message,
          });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  } else if (path === "/login") {
    try{
        const validation = u.userLogin.safeParse(req.body);
    
        if (!validation.success) {
          return res.status(400).json({
            error: validation.error.message,
          });
        }
        next();
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error",
        });
        }
    }
}
