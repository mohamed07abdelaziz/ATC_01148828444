import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Check for saved dark mode preference on component mount
    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(savedDarkMode);
        if (savedDarkMode) {
            document.body.classList.add("dark-mode");
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleDarkMode = (e) => {
        // Prevent form submission
        e.preventDefault();

        const newDarkModeState = !isDarkMode;
        setIsDarkMode(newDarkModeState);

        // Save preference to localStorage
        localStorage.setItem("darkMode", newDarkModeState);

        if (newDarkModeState) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("https://localhost:7246/api/Auth/login", formData);

            // Store auth data
            localStorage.setItem("accessToken", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("userId", response.data.userId);

            // Extract role from token
            const decodedToken = jwtDecode(response.data.token);
            const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            localStorage.setItem("userRole", userRole);

            // Success notification
            navigate('/events');
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed: " + (error.response?.data?.message || "Please check your credentials"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`container-fluid ${isDarkMode ? "bg-dark text-light" : "bg-light"}`} style={{ minHeight: "100vh" }}>
            <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-md-6 col-lg-4">
                    <div className={`card shadow-lg ${isDarkMode ? "bg-dark text-light border-secondary" : ""}`}>
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h3>Welcome Back</h3>
                        </div>
                        <div className="card-body py-4 px-4">
                            {/* Dark Mode Toggle - Outside the form */}
                            <div className="d-flex justify-content-end mb-3">
                                <button
                                    type="button"
                                    className={`btn ${isDarkMode ? "btn-light" : "btn-dark"} btn-sm`}
                                    onClick={toggleDarkMode}
                                >
                                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={`form-control ${isDarkMode ? "bg-dark text-light border-secondary" : ""}`}
                                            placeholder="Your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            className={`form-control ${isDarkMode ? "bg-dark text-light border-secondary" : ""}`}
                                            placeholder="Your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4 form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                    <Link to="/forgot-password" className="float-end">Forgot password?</Link>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Signing in...
                                        </>
                                    ) : "Sign In"}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <p>Don't have an account? <Link to="/register" className={isDarkMode ? "text-info" : ""}>Register here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;