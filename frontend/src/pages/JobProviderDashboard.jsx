import React, { useState, useEffect } from "react";
import { APIAuthenticatedClient } from "../api";
import { useNavigate } from "react-router-dom";

const JobProviderDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const handleCreate = () => navigate("/create-job");

    // Fetch provider's jobs from backend
    const fetchJobs = async () => {
        try {
            const response = await APIAuthenticatedClient.get("/jobs/my-jobs");
            setJobs(response.data.jobs || []);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
        }
    };

    useEffect(() => { fetchJobs(); }, []);
    return (
    <div className="min-h-screen bg-gray-100 p-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
            Job Provider Dashboard
        </h1>
        <button
            onClick={handleCreate}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
        >
        + Create Job
        </button>
    </div>

    {/* Job Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg transition hover:shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800">
                Frontend Developer
            </h2>
            <p className="text-sm text-gray-500 mt-1">ABC Company</p>
            <p className="text-gray-600 text-sm mt-3">
                Develop and maintain web applications using React, Node.js, and MongoDB.
            </p>
            
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-700"> Kathmandu</span>
                <span className="text-sm font-semibold text-emerald-600">
                    Rs. 100,000
                </span>
            </div>
            
            <div className="flex gap-3 mt-5">
            <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-200">
                Edit
            </button>
            <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200">
                Delete
            </button>
            </div>
        </div>

    {/* TODO: Loop through jobs from backend here */}
    </div>
    </div>
);
};

export default JobProviderDashboard;
