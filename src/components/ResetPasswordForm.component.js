// ResetPasswordForm.component.js
import React, { useState } from 'react';

const ResetPasswordForm = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Add logic to handle password reset here
        // You can make an API call to reset the password
        // Display success message if successful, or display error message if failed
    };

    return (
        <div className="reset-password-form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
