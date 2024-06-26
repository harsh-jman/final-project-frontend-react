// AdminPage.js
import React from 'react';
import CreateUserForm from '../components/UserForm.component';
import './AdminPage.css';

const AdminCreateUser = () => {
    return (
        <div className="admin-container"> {/* Apply CSS class */}
            <h2 className="admin-heading">Create Users</h2> {/* Apply CSS class */}
            <CreateUserForm /> {/* Render CreateUserForm component */}
            {/* Add other admin page content here */}
        </div>
    );
};

export default AdminCreateUser;
