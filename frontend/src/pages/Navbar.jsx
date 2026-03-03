import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth); // ✅ renamed data -> user
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const handleLogout = () => {
        console.log("Logout clicked");
        dispatch(logoutUser());
    };
    
    // Dynamic dashboard link based on role
    const dashboardLink = user?.userRole === "jobProvider" 
        ? "/job-provider-dashboard" 
        : "/job-seeker-dashboard";
    
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-emerald-600">
                            Job<span className="text-gray-800">Portal</span>
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/" className="text-gray-700 hover:text-gray-900 transition">Home</Link>

                        {isAuthenticated ? (
                            <>
                                <span className="text-gray-700">
                                    Welcome, {user?.username || "User"}
                                </span>
                                <Link
                                    to={dashboardLink} // ✅ dynamic
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-2xl text-gray-700"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-white">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to={dashboardLink} // ✅ dynamic
                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Login</Link>
                            <Link to="/register" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;