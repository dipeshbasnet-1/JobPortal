import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../api";

const SingleJob = () => {
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const fetchJobDetails = async () => {
    try {
        setLoading(true); 
        const response = await apiClient.get(`/api/job/${id}`);
        setJob(response.data.data);
        setError(null);
    } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to fetch job details. Please try again.");
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Loading job details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">{error}</p>
            </div>
        );
    }

return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-6">
    {/* Job Title & Company */}
        <h2 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h2>
        <p className="text-gray-500 text-sm mt-1">{job.jobCompany}</p>

    {/* Job Description */}
        <p className="text-gray-600 text-sm mt-4">{job.jobDescription}</p>

    {/* Location & Salary */}
        <div className="flex justify-between items-center mt-6">
        <span className="text-gray-700 text-sm">📍 {job.jobLocation}</span>
        <span className="text-emerald-600 font-semibold text-sm">
            Rs. {job.jobSalary}
        </span>
    </div>

    {/* Apply Button */}
    <button
        className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold
        hover:bg-emerald-700 transition duration-200"
    >
        Apply Job
    </button>
    </div>
);
};

export default SingleJob;
