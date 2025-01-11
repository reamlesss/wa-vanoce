import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/main.css";
import "../../css/forms.css";

function LoginForm({ onLogin }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username: formData.username,
                password: formData.password,
            });

            setMessage("Login successful!");
            console.log(response.data); // Handle token if needed
            onLogin(); // Notify App.js to show ChatGroupChoice
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <>
            <form
                className="bg-primary p-5 rounded-5 w-50"
                onSubmit={handleSubmit}
            >
                <h1 className="text-light text-center">Login</h1>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label text-light">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control p-2"
                        id="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-light">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control p-2"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>
            </form>

            {message && <p className="mt-3 text-center text-light">{message}</p>}
        </>
    );
}

export default LoginForm;