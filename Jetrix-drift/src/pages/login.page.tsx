import * as React from 'react';
import * as authHandler from '../handler/authHandler';
import type { LoginForm } from '../types/loginForm';
import  {useForm} from 'react-hook-form';
import useAuth from '../context/authContext';

// Login Page Component
function LoginPage(){
    // React Hook Form setup
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();
    
    // Loading state
    const [loading, setLoading] = React.useState(false);

    const { user,setUser } = useAuth();

    // Check if user is already logged in
    React.useEffect(() => {
        if(user){
            window.location.href = '/profile';
        }
    }, [user]);

    // Form submission handler
    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        const response = await authHandler.loginHandler(data);
        console.log(response);
        
        if(response.success){
            setUser(response.data.user);
            window.location.href = '/profile';
        }else{
            setError("root", {type: "manual",message: response.message});
        }
        setLoading(false);
    };

    

    // Render the login form
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-[80%] max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md [&>input]: p-3 [&>input]:border [&>input]:border-[#FF0000] [&>input]:rounded-md'>
                {/* Form fields will go here */}
                <input className='inputs' type="email" {...register("email", {required: {value: true, message: "Email is required"}, pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address"}})} />
                {errors.email && <span>{errors.email.message}</span>}
                <input className='inputs' type="password" {...register("password", {required: {value: true, message: "Password is required"}, minLength: {value: 8, message: "Password must be at least 8 characters"}, maxLength: {value: 12, message: "Password must be at most 12 characters"}})} />
                {errors.password && <span>{errors.password.message}</span>}
                <button className='button' type="submit" disabled={loading}>{loading ? "Logging..." : "Login"}</button>
                {errors.root && <span>{errors.root.message}</span>}
            </form>
        </>
    )
}

export default LoginPage;