import api from "./api";

export const signup = async (data: {name: string, email: string, password: string}) => {
    try{
        console.log("Raw response: ", JSON.stringify(data));
        console.log("Service called with data: ", data);
        const baseURL=import.meta.env.VITE_API_BASE_URL;
        const response = await api.post(`${baseURL}/user/signup`, data);

        console.log("Serviced: ", response.data)
        return{
            success: response.status,
            ...response.data,
        }
    } catch(error: any){
        return {error: {message: error.response.data.message}};
    }
}