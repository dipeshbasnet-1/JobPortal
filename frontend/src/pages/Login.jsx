import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Redirect based on user role after login
    useEffect(() => {
        if (authState.user && authState.loading === "success") {
            const role = authState.user.userRole;
            
            // Double-check the role from backend
            if (role === "jobProvider") navigate("/job-provider-dashboard");
            else if (role === "jobSeeker") navigate("/job-seeker-dashboard");
            else {
                console.error("Unknown user role:", role);
                alert("Cannot determine your role. Contact support.");
            }
        }
    }, [authState, navigate]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }
        
        dispatch(loginUser({ userEmail: email, userPassword: password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Login to Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-emerald-500
                                focus:border-emerald-500 transition duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-emerald-500
                                focus:border-emerald-500 transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold
                            hover:bg-emerald-700 transition duration-200"
                    >
                        Login
                    </button>
                    
            
            <div className="text-center text-sm mt-4">
                <span className="text-gray-600">
                    Don't have an account?{" "}
                    <span
                    onClick={() => navigate("/register")}
                    className="text-emerald-600 cursor-pointer hover:underline"
                    >
                        Register here
                    </span>
                </span>
            </div>
            
            
            <div className="text-center text-sm mt-2">
                <span
                onClick={() => navigate("/forgot-password")}
                className="text-emerald-600 cursor-pointer hover:underline"
                >
                    Forgot Password?
                </span>
            </div>
            
            
            
                    {authState.error && (
                        <p className="text-red-500 text-sm mt-2 text-center">{authState.error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;