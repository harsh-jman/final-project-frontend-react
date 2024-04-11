import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList.component';
import UserForm from '../components/UserForm.component';
import { getAllUserData } from '../services/authService.service';
import Loading from '../components/loading.component';

const UserManagement = () => { // Change the component name to start with an uppercase letter
  const [users, setUsers] = useState([]);
  const [formKey, setFormKey] = useState(0); // Key for triggering re-render when UserForm changes
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const userData = await getAllUserData();
        setUsers(userData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
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
    <div style={{paddingTop: '90px', width: '95%', margin: 'auto'}}>
      <UserForm onChange={handleFormChange} />
      <UserList key={formKey} users={users} /> {/* Use key to trigger re-render */}
      {isLoading && <Loading/>}
    </div>
  );
};

export default UserManagement; // Export with the corrected name
