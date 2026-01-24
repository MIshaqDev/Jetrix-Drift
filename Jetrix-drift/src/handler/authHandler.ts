import * as auth from '../services/auth.Service';

export const loginHandler = async (data:{email: string, password: string}) =>{
    try{
        const response = await auth.loginService(data);

        if(response.success){
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    }catch(error:any){
        return {error: {message: error.message}};

    }
}