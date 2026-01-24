import * as auth from '../services/signup.Services';

const signupHandler = async(data:{name: string, email: string, password: string})=>{
    try{
        const response = await auth.signup(data);

        if(response.token){
            console.log("Storing token in localStorage:", response.token);
            localStorage.setItem('token', response.token);
        }
        if(response.success){
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    }catch(error: any){
        return {error: {message: error.message}};
    }
}

export default signupHandler;