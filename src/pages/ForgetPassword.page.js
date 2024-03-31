// ForgetPasswordPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import ForgetPasswordForm from '../components/ForgetPassword.component';

const ForgetPasswordPage = ({ onSendResetEmail }) => {
    return (
        <div className="forget-password-page">
            <h2>Forget Password</h2>
            <ForgetPasswordForm onSendResetEmail={onSendResetEmail} />
            <Link to="/login">Back to Login</Link>
        </div>
    );
};

export default ForgetPasswordPage;
