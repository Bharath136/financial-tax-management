import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { Component } = props
    const navigate = useNavigate()
    useEffect(() => {
        const token = Cookie.getItem('jwtToken')
        if (!token) {
            navigate('/login')
        }
    })
    return <Component />

};

export default ProtectedRoute;
