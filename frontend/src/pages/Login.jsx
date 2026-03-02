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
        if (authState.loading === "successw" && authState.error === null && authState.user) {
            if (authState.user.role === "provider") {
                navigate("/provider-dashboard");
            } else {
                navigate("/user-dashboard");
            }
        }
    }, [authState, navigate]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userEmail: email,
            userPassword: password,
        };
        dispatch(loginUser(data));
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

                    {authState.error && (
                        <p className="text-red-500 text-sm mt-2 text-center">{authState.error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;