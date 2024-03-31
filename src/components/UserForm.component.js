import React, { useState } from 'react';
import './UserForm.css';
import { registerUser } from '../services/authService.service';

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: '', // Added designation field
        role: 'user'
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            setResponse(response); // Set the response in state
            setError(null); // Clear any previous error
        } catch (error) {
            setError(error.message); // Set error message if registration fails
            setResponse(null); // Clear any previous response
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                designation: '', // Reset designation field too
                role: 'user'
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="create-user-form"> {/* Apply CSS class */}
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Designation:</label>
                    <select name="designation" value={formData.designation} onChange={handleChange}>
                        <option value="">Select Designation</option>
                        {["Software Engineer", "Sr. Software Engineer", "Solution Enabler", "Consultant", "Architect", "Principal Architect"].map(designation => (
                            <option key={designation} value={designation}>{designation}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit">Create User</button>
            </form>
            {response && <div>Response: {JSON.stringify(response)}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default CreateUserForm;
