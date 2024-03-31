import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.component';
import { loginUser } from '../services/authService.service';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import './LoginPage.css';

const LoginPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            handleLoginResponse(response);
        } catch (error) {
            setError('Error occurred during login');
        }
    };

    const handleLoginResponse = (response) => {
        if (response.forcePasswordReset === true) {
            // Display a popup or alert notifying the user about password reset
            alert('You need to reset your password.');
            // Navigate to reset password page after the user acknowledges the message
            navigate('/reset-password');
        } else if (response.message === 'Login successful') {
            const role = response.role;
            const token = response.token;
            // Set token with expiration time of 1 hour
            Cookies.set('token', token, { expires: 1 / 24 }); // 1 hour = 1/24 day
            Cookies.set('role', role, { expires: 1 / 24 });
            navigate(role === 'user' ? '/user' : '/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forget-password');
    };

    return (
        <div className="login-page-container">
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <LoginForm onLogin={handleLogin} />
            <div>
                <button onClick={handleForgotPassword}>Forgot password?</button>
            </div>
        </div>
    );
};

export default LoginPage;
