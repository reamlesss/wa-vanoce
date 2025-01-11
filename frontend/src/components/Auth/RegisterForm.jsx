import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css';
import '../../css/forms.css';
import { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/auth/register', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
            });

            // If registration is successful, call onLogin to transition to ChatGroupChoice
            setMessage('Registration successful!');
            onLogin(); // Notify parent about successful registration
        } catch (error) {
            // Display error message
            setMessage(error.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <>
            <form
                className="p-5 rounded-5 w-50 bg-primary"
                onSubmit={handleSubmit}
            >
                <h1 className="text-light text-center">Register</h1>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label text-light">Username</label>
                    <input
                        type="text"
                        className="form-control p-2"
                        id="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-light">Email</label>
                    <input
                        type="email"
                        className="form-control p-2"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <input
                        type="password"
                        className="form-control p-2"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label text-light">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control p-2"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>

            {/* Display feedback message */}
            {message && <p className="mt-3 text-center text-light">{message}</p>}
        </>
    );
}

export default RegisterForm;