const authorization = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!requiredRoles.includes(userRole)) {
            return res.status(403).send({
                message: "Access Denied! You do not have permission to perform this action."
            });
        } else {
            next();
        }
    }
}

export default authorization;