import axios from "axios";
import api from "./api";

export const loginService = async (data: { email: string; password: string }) => {
    try{
        const baseURL = import.meta.env.VITE_API_BASE_URL;
    
        const response = await api.post(`${baseURL}/user/login`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        console.log(response);
        return {
            success: true,
            ...response.data            
        }
        
    }catch(error: any){
        return {error: {message: error.response.data.message}};
    }
}