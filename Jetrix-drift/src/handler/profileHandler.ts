import getProfileService from "../services/profile.Service";

const profileHandler = async () => {
    try{
        const response = await getProfileService();
        return response;
    }
    catch(error: any){
        return {error: {message: error.message}};
    }
}

export default profileHandler;