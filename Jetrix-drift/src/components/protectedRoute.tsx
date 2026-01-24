import { Navigate } from "react-router-dom";
import useAuth from "../context/authContext";
import Loading from "./loader";

// Protected Route Component 
const ProtectedRoute = ({children}: {children: React.ReactNode})=> {
    const {user, loading} = useAuth();
    if(loading){
        return <Loading />;
    }
    console.log("ProtectedRoute - user:", user, "loading:", loading);
    // if(user){
    //     return <Navigate to="/profile" replace />;
    // }
    if(!user){
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;