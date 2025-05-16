import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "User", // Default role
    });
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:7246/api/Auth/register", formData);
            alert("Registration successful!");
            console.log(response.data);
        } catch (error) {
            console.error("Registration failed:", error.response.data);
            alert("Registration failed: " + error.response.data.message);
        }
    };

    return (
        <div className={`container d-flex justify-content-center align-items-center ${isDarkMode ? "dark-mode" : ""}`} style={{ height: "100vh" }}>
            <div className="card p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="form-control"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="form-control"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>

                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>

                    <button className="btn btn-secondary mt-3 w-100" onClick={toggleDarkMode}>
                        Toggle Dark Mode
                    </button>
                </form>
            </div>
        </div>


    );
};

export default Register;