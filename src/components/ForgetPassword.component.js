// ForgetPasswordForm.js

import React, { useState } from 'react';
import { sendResetEmail } from '../services/authService.service';

const ForgetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the API to send the reset password email
            await sendResetEmail(email);
            setMessage('Reset password email sent!');
        } catch (error) {
            setMessage('Error sending reset password email');
        }
    };

    return (
        <div className="forget-password-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleChange} required />
                </div>
                <button type="submit">Send Reset Email</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ForgetPasswordForm;
