'use client';
import React from 'react';
import { useAuth } from '../components/AuthContext/AuthContext';

const LoginPage: React.FC = () => {
    const { login } = useAuth();

    const handleLogin = () => {
        login();
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;