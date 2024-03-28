import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;