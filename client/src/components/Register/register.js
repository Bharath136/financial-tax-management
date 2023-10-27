import React, { useState } from 'react';
import './register.css'
import { NavLink } from 'react-router-dom';

const Register = () => {
    const initialFormFields = [
        { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'First Name' },
        { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Last Name' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'Email' },
        { label: 'Password', name: 'password', type: 'password', placeholder: 'Password' },
    ];

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <div className='register-main-container'>
            <div className="container register-container">
                <div className="login-card shadow text-start">
                    <h2 className="text-center auth-head">Sign Up</h2>
                    <form onSubmit={handleSubmit} className='form-container text-light'>
                        {initialFormFields.map((field, index) => (
                            <div className="mb-2 d-flex flex-column" key={index}>
                                <label htmlFor={field.name} className="form-label">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}

                                    className="p-2 bg-dark text-light" style={{border:'1px solid grey',borderRadius:'4px', outline:'none'}}
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
                            Register
                        </button>
                        <p className='text-white mt-3'>Already have an account? <NavLink className='link text-primary' to='/login'> Sign In</NavLink></p>
                   </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
