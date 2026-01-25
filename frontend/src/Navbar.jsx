import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    <nav className="bg-blue-600 shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/">
                    <h1 className="text-white text-2xl font-bold">Job Portal</h1>
                    </Link>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="px-4 py-2 text-white rounded hover:bg-blue-500 font-medium">Home</Link>
                    <Link to="/jobs" className="px-4 py-2 text-white rounded hover:bg-blue-500 font-medium">Jobs</Link>
                    <Link to="/post-job" className="px-4 py-2 text-white rounded hover:bg-blue-500 font-medium">Post Job</Link>
                    <Link to="/login" className="px-4 py-2 text-white rounded hover:bg-blue-500 font-medium">Login</Link>
                </div>
                
                {/* Mobile Hamburger Button */}
                <div className="md:hidden flex items-center">
                    <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white focus:outline-none"
                    >
                        
                        {!isOpen ? (
                            /* Hamburger Icon */
                            <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                            ) : (
                                /* Close Icon */
                                <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            )}
                    </button>
                </div>
            </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
            <div className="md:hidden bg-blue-600 px-2 pt-2 pb-4 space-y-1">
                <Link to="/" className="block px-4 py-2 text-white rounded hover:bg-blue-500 font-medium">Home</Link>
                <Link to="/jobs" className="block px-4 py-2 text-white rounded hover:bg-blue-500 font-medium">Jobs</Link>
                <Link to="/post-job" className="block px-4 py-2 text-white rounded hover:bg-blue-500 font-medium">Post Job</Link>
                <Link to="/login" className="block px-4 py-2 text-white rounded hover:bg-blue-500 font-medium">Login</Link>
            </div>
        )}
    </nav>
    );
};

export default Navbar;
