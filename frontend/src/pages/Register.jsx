import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); // Role state
    
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
// Redirect to login after successful registration
    useEffect(() => {
        if (authState.loading === "idle" && authState.error === null && authState.user) {
            navigate("/login");
        }
    }, [authState, navigate]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
    if (!role) {
        alert("All fields are required including role"); // Alert if role not selected
        return;
    }
    
    const data = {
        username: name,
        userEmail: email,
        userPassword: password,
        userRole: role, //  Send role to backend
    };
    
    dispatch(registerUser(data));
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Create Account
                </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500
                focus:border-emerald-500 transition duration-200"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500
                focus:border-emerald-500 transition duration-200"
            >
              <option value="">Select role</option>
              <option value="jobSeeker">Job Seeker</option>
              <option value="jobProvider">Job Provider</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold
              hover:bg-emerald-700 transition duration-200"
          >
            Register
          </button>

          {authState.error && (
            <p className="text-red-500 text-sm mt-2 text-center">{authState.error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;