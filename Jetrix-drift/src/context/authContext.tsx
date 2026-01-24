import React, { createContext, useContext, useEffect, useState } from "react";
import profileHandler from "../handler/profileHandler";

const AuthContext = createContext<any>(null);

export const AuthProvider= ({children}: {children: React.ReactNode})=> {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading]= useState<boolean>(true);

    const checkAuth= async ()=>{
        const response = await profileHandler();

        if(response.status === 401){
            setUser(null);
        }
        else{
            setUser(response.data.user);
        }
        setLoading(false);
    };
    useEffect(()=>{
        checkAuth();
    },[]);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth= ()=>{
    return useContext(AuthContext);
}

export default useAuth;
