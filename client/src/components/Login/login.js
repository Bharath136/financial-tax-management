import React, { useState } from 'react';
import './login.css'; // Import your custom CSS for styling
import { NavLink } from 'react-router-dom';

const Login = () => {
    const initialFormFields = [
        { label: 'Email', name: 'email', type: 'email', placeholder: 'Email' },
        { label: 'Password', name: 'password', type: 'password', placeholder: 'Password' },
    ];

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here, e.g., sending the data to a server
        console.log('Form submitted:', formData);
    };

    return (
        <div className='login-main-container'>
            <div className="container login-container">
                <div className="login-card shadow text-start">
                    <h2 className="text-center auth-head">Sign In</h2>
                    <form onSubmit={handleSubmit} className='form-container'>
                        {initialFormFields.map((field, index) => (
                            <div className="mb-2 d-flex flex-column" key={index}>
                                <label htmlFor={field.name} className="form-label text-light">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}

                                    className="p-2 bg-dark text-light" style={{ border: '1px solid grey', borderRadius: '4px', outline: 'none' }}
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className="btn border button w-100 mt-2">
                            Login
                        </button>
                        <p className='text-white mt-3'>Don't have an account? <NavLink className='link text-primary' to='/signup'> Sign Up</NavLink></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;