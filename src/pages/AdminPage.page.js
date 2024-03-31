// AdminPage.js
import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList.component';
import './AdminPage.css';
import { getAllUserData } from '../services/authService.service';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

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
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Home</h2>
      <UserList users={users} />
    </div>
  );
};

export default AdminPage;
