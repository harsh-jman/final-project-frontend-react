// ResetPasswordForm.component.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService.service';
import './reset.css'

const ResetPasswordForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(
                formData.email,
                formData.currentPassword,
                formData.newPassword,
                formData.confirmPassword
            );
            if (response.status === 'success') {
                setSuccess(true);
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('Error resetting password: ' + error.message);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="reset-password-form-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} className='resetForm'>
                <div className='inputCon'>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className='inputCon'>
                    <label>Current Password:</label>
                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
                </div>
                <div className='inputCon'>
                    <label>New Password:</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </div>
                <div className='inputCon'>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                {error && <p className="error">{error}</p>}
                {success ? (
                    <div className="success-message">
                        Password reset successfully. Click <span onClick={handleBackToLogin} className="login-link">here</span> to login.
                    </div>
                ) : (
                    <button type="submit" className='resetBtn'>Reset Password</button>
                )}
            </form>
        </div>
    );
};

export default ResetPasswordForm;
