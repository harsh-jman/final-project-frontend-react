import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/admin">Home</Link></li>
                <li><Link to="/admin/create-user">Create User</Link></li>
                {/* Add more navigation links as needed */}
            </ul>
        </nav>
    );
};

export default Navbar;