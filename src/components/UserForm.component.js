import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { registerUser } from '../services/authService.service';

const CreateUserButton = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false); // State for confirmation dialog
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        role: 'user'
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleConfirmOpen(); // Open confirmation dialog before submitting
    };

    const handleConfirmSubmit = async () => {
        try {
            const response = await registerUser(formData);
            setResponse(response);
            setError(null);
            setOpen(false);
            setConfirmOpen(false);
            setSnackbarOpen(true);
        } catch (error) {
            setError(error.message);
            setResponse(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                designation: '',
                role: 'user'
            });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>Create User</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create User</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth margin="dense" variant="outlined">
                            <InputLabel id="designation-label">Designation</InputLabel>
                            <Select
                                labelId="designation-label"
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                label="Designation"
                            >
                                <MenuItem value="">Select Designation</MenuItem>
                                {["Software Engineer", "Sr. Software Engineer", "Solution Enabler", "Consultant", "Architect", "Principal Architect"].map((designation, index) => (
                                    <MenuItem key={index} value={designation}>{designation}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense" variant="outlined">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                label="Role"
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleConfirmOpen} color="primary">Create</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
                <DialogContent>
                    <Box p={2}>
                        Are you sure you want to create this user?
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmSubmit} color="primary" autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="User created successfully"
            />
        </div>
    );
};

export default CreateUserButton;
