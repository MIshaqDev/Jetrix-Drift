import { useForm } from "react-hook-form";
import type { SignupForm } from "../types/signup.Types";
import signupHandler from "../handler/signupHandler";
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/authContext';
import React from "react";

// Signup Page Component
function SignupPage() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const [message, setMassage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const setUser = useAuth();

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    const response = await signupHandler(data);

    if (response.success) {
      
      return navigate("/profile", { replace: true });
    }else{
            setError("root", {type: "manual",message: response.message});
        }
        setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-[80%] max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md [&>input]: p-3 [&>input]:border [&>input]:border-[#FF0000] [&>input]:rounded-md"
    >
      {/* Form fields will go here */}
      <input
        type="text"
        placeholder="Name"
        {...register("name", {
          required: { value: true, message: "Name required" },
          minLength: {
            value: 3,
            message: "Name must be atleast 3 characters",
          },
          maxLength: {
            value: 50,
            message: "Name must be at most 50 characters",
          },
        })}
      />
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: { value: true, message: "Email is required" },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: { value: true, message: "Password is required" },
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          maxLength: {
            value: 12,
            message: "Password must be at most 12 characters",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit" disabled={loading}>
        {loading ? "Logging..." : "Signup"}
      </button>
      {errors.root && <span>{errors.root.message}</span>}
    </form>
  );
}

export default SignupPage;
