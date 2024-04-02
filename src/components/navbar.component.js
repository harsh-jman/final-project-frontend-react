import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService.service';
import Cookies from 'js-cookie'; // Import Cookies library
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core'; // Import Material-UI components
import './navbar.css'; // You may not need this if you're not using it elsewhere

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#1976d2', // Change background color to a shade of blue
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#f44336', // Change background color to red
    '&:hover': {
      backgroundColor: '#d32f2f', // Darker shade of red on hover
    },
  },
}));

const Navbar = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null); // State to store user role
    const classes = useStyles(); // Use the custom styles

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
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Button component={Link} to="/" color="inherit" className={classes.homeButton}>
                    <Typography variant="h6">My App</Typography>
                </Button>
                <div style={{ marginLeft: 'auto' }}>
                    <Button component={Link} to="/skill-hub" color="inherit">My Skill Hub</Button>
                    {role === 'admin' && (
                        <>
                            <Button component={Link} to="/admin/create-user" color="inherit">User Management</Button>
                            <Button component={Link} to="/admin/skills" color="inherit">Skill Management</Button>
                            <Button component={Link} to="/approverDesk" color="inherit">Approver Desk</Button>
                        </>
                    )}
                    {role === 'user' && (
                        <>
                            <Button component={Link} to="/approverDesk" color="inherit">Approver Desk</Button>
                        </>
                    )}
                    <Button component={Link} to="/user/profile" color="inherit">Profile</Button>
                    <Button className={classes.logoutButton} onClick={handleLogout} color="inherit">Logout</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
