// Navbar.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService.service';
import Cookies from 'js-cookie'; // Import Cookies library
import './navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null); // State to store user role

    useEffect(() => {
        // Read role from cookies when component mounts
        const userRole = Cookies.get('role');
        setRole(userRole);
    }, []);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul>
                {role === 'admin' && (
                    <>
                        <li><Link to="/admin">Home</Link></li>
                        <li><Link to="/admin/create-user">User Management</Link></li>
                        <li><Link to="/admin/skills">Skill Management</Link></li>
                        <li><Link to="/skill-hub">My Skill Hub</Link></li>

                        <li><Link to="/approverDesk">Approver Desk</Link></li>
                        <li><Link to="/user/profile">Profile</Link></li>

                        {/* Add more admin-specific navigation links as needed */}
                    </>
                )}
                {role === 'user' && (
                    <>
                        {/* Add user-specific navigation links here */}
                        <li><Link to="/user">Home</Link></li>
                        <li><Link to="/skill-hub">My Skill Hub </Link></li>
                        <li><Link to="/user/profile">Profile</Link></li>
                        <li><Link to="/approverDesk">Approver Desk</Link></li>
                        
                    </>
                )}
                <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
