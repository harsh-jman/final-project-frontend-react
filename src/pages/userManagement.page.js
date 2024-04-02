import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList.component';
import UserForm from '../components/UserForm.component';
import { getAllUserData } from '../services/authService.service';

const UserManagement = () => { // Change the component name to start with an uppercase letter
  const [users, setUsers] = useState([]);
  const [formKey, setFormKey] = useState(0); // Key for triggering re-render when UserForm changes

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUserData();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error
      }
    };

    fetchUsers();
  }, [formKey]); // Add formKey to dependency array

  const handleFormChange = () => {
    setFormKey(prevKey => prevKey + 1); // Update formKey to trigger re-render
  };

  return (
    <div>
      <h2 className="admin-heading">Admin Home</h2>
      <UserForm onChange={handleFormChange} />
      <UserList key={formKey} users={users} /> {/* Use key to trigger re-render */}
    </div>
  );
};

export default UserManagement; // Export with the corrected name
