import { data } from "react-router-dom";

const getProfileService = async ()=> {
    try{
        const BaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${BaseUrl}/user/profile`,
            {credentials: 'include'}
        )
        const json = await response.json();
        return {
            status: response.status,
            success: response.ok,
            ...json
        }
    }catch(error:any){
        return {error: error.message}
    }
}

export default getProfileService;