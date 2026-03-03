import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./Home";
import About from "./About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import JobProviderDashboard from "./pages/JobProviderDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import JobCreateForm from "./pages/JobCreateForm";
import SingleJob from "./pages/SingleJob";

// Components
import Navbar from "./pages/Navbar";

// App wrapper to handle conditional Navbar
const AppWrapper = () => {
  const location = useLocation();

  // Hide Navbar on login and register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job-provider-dashboard" element={<JobProviderDashboard />} />
        <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/create-job" element={<JobCreateForm />} />
        <Route path="/job/:id" element={<SingleJob />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;

