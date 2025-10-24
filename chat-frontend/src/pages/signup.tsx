import React, { useState,useEffect } from "react";
import  {useAppDispatch, useAppSelector}  from "../hooks/reduxHooks";
import { register } from "../store/features/authSlice";
import { Navigate } from "react-router-dom";
import SigninLayout from '../components/signinLayout'
import 

const SignupForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user,loading, error } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
        employeeID: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    useEffect(
        ()=>{if (user){Navigate('/chatRoom')}},[]
    )

    return (
        <SigninLayout>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded p-2"
                required
            />
            <input
                type="text"
                name="employeeID"
                value={formData.employeeID}
                onChange={handleChange}
                placeholder="Employee ID"
                className="border rounded p-2"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded p-2"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border rounded p-2"
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                {loading ? "Registering..." : "Sign Up"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            
        </form>
        </SigninLayout>
    );
};

export default SignupForm;
