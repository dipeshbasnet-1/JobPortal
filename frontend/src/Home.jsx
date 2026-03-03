import React, { useEffect, useState } from "react";
import { apiClient } from "./api"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    
    const fetchJobs = async () => {
        try {
            const response = await apiClient.get("/api/jobs");
            console.log("Jobs fetched:", response.data);
            
            // API returns data from backend
            if (Array.isArray(response.data.data)) {
                setJobs(response.data.data);
            } else {
                setJobs([]);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            alert("Failed to fetch jobs. Please try again.");
        }
    };
    
    const handleNavigate = (id) => {
        navigate(`/job/${id}`);
    };
    
    useEffect(() => {
        fetchJobs();
    }, []);
    
    return (
        <div className="p-5">
            {jobs.length === 0 ? (
                <p>No jobs available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job.id} // <-- use job.id
                            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                            <h2 className="text-lg font-semibold">{job.Title}</h2>
                            <p className="text-sm text-gray-500 mt-1">{job.Company}</p>
                            <p className="text-gray-600 text-sm mt-3">{job.Description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-gray-700">📍 {job.Location}</span>
                                <span className="text-sm font-semibold text-green-600">
                                    Rs. {job.Salary}
                                </span>
                            </div>
                            <button
                                onClick={() => handleNavigate(job.id)} // <-- use job.id
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;