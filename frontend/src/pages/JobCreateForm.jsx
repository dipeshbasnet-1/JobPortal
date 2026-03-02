import React, { useState } from "react";
import { APIAuthenticatedClient } from "../api";
import { useNavigate } from "react-router-dom";

const JobCreateForm = () => {
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobSalary, setJobSalary] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        !companyName ||
        !jobTitle ||
        !jobDescription ||
        !jobLocation ||
        !jobSalary
    ) {
        alert("Please fill all fields");
        return;
    }

    try {
        setLoading(true);

    const jobData = {
        jobCompany: companyName,
        jobTitle,
        jobDescription,
        jobLocation,
        jobSalary,
    };


    const response = await APIAuthenticatedClient.post(
        "/api/job",
        jobData
    );
    
    if (response.status === 201) {
        alert("Job created successfully!");
        navigate("/job-provider-dashboard");
    }
    } catch (error) {
        console.error("Error creating job:", error);
        alert(
            error.response?.data?.message ||
            "Failed to create job. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Create Job
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">

    {/* Job Title */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
            </label>
            
            <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Frontend Developer"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            focus:border-emerald-500 transition duration-200"
            />
    </div>

    {/* Company Name */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
        </label>
            
            <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="ABC Pvt. Ltd."
            className="w-full border border-gray-300 rounded-lg px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            focus:border-emerald-500 transition duration-200"
        />
    </div>

    {/* Job Description */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description
        </label>
            
            <textarea
            rows="4"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Describe the job role..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            focus:border-emerald-500 transition duration-200"
            />
    </div>

    {/* Location */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Location
        </label>
            
            <input
            type="text"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            placeholder="Kathmandu"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            focus:border-emerald-500 transition duration-200"
            />
    </div>

    {/* Salary */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary
        </label>
        
            <input
            type="number"
            value={jobSalary}
            onChange={(e) => setJobSalary(e.target.value)}
            placeholder="80000"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            focus:border-emerald-500 transition duration-200"
            />
    </div>

    {/* Submit Button */}
    <button
    type="submit"
    disabled={loading}
    className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200 ${
        loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-700"
    }`}
    >
        {loading ? "Creating..." : "Create Job"}
        </button>
        </form>
        </div>
    </div>
    );
};

export default JobCreateForm;
