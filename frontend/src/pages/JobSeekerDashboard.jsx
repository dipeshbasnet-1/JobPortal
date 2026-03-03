import React, { useEffect, useState } from "react";
import { apiClient, APIAuthenticatedClient } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobSeekerDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

// Fetch all jobs from backend
const fetchJobs = async () => {
    try {
        setLoading(true);
        const response = await apiClient.get("/api/jobs"); // GET all jobs
        console.log("Jobs fetched:", response.data.data); // debug
        setJobs(response.data.data || []);
        setLoading(false);
    } catch (err) {
        console.error("Failed to fetch jobs:", err);
        toast.error("Failed to fetch jobs");
        setLoading(false);
    }
};

useEffect(() => {
    fetchJobs();  
}, []);

  // Apply to a job
    const handleApply = async (jobId) => {
        if (!jobId) {
            toast.error("Job ID is missing!");
            return;
        }

    try {
        const response = await APIAuthenticatedClient.post(`/api/applications/apply/${jobId}`);
        toast.success(response.data.message || "Applied successfully!");
    } catch (err) {
        console.error("Apply job error:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Failed to apply");
    }
};

if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

return (
    <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Job Seeker Dashboard</h1>
        
        {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available right now.</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className="bg-white p-6 rounded-2xl shadow-lg transition hover:shadow-xl"
                >
                <h2 className="text-xl font-semibold text-gray-800">{job.Title}</h2>
                <p className="text-sm text-gray-500 mt-1">{job.Company}</p>
                <p className="text-gray-600 text-sm mt-3">{job.Description}</p>
                
                <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-700">{job.Location}</span>
                <span className="text-sm font-semibold text-emerald-600">Rs. {job.Salary}</span>
                </div>

            <div className="mt-5">
                <button
                    onClick={() => handleApply(job.id)}
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
                >
                    Apply
                </button>
            </div>
        </div>))}
    </div>)}
</div>);
};

export default JobSeekerDashboard;