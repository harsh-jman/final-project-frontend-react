import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.component';
import { loginUser } from '../services/authService.service';
import { useNavigate } from 'react-router-dom'; // Import useHistory for redirection
import './LoginPage.css'; // Import CSS file for styling
import Cookies from 'js-cookie'; // Import js-cookie library

const LoginPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useHistory

    const handleLogin = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            console.log(response)
            if (response && response.message === 'Login successful') {
                if (response.forcePasswordReset === true) {
                    // Redirect to password reset page
                    navigate('/reset-password');
                } else {
                    // Set token cookie and redirect to admin page
                    Cookies.set('token', response.token, { expires: 1 / 24 });
                    navigate('/admin');
                }
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            setError('Error occurred during login');
        }
    };


    const handleForgotPassword = () => {
        // Implement logic for forgot password functionality
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
