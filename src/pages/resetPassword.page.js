// ResetPasswordPage.js
import React from 'react';
import Navbar from '../components/navbar.component';
import ResetPasswordForm from '../components/ResetPasswordForm.component'; // Assuming you have a component for the reset password form
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
    return (
        <div className="reset-password-page-container">
            <Navbar />
            <h2 className="reset-password-page-heading">Reset Password</h2>
            <ResetPasswordForm />
            {/* Add other content for the reset password page */}
        </div>
    );
};

export default ResetPasswordPage;
