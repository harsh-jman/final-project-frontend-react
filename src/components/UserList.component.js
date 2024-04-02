import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField, MenuItem, Switch } from '@mui/material';
import { updateUserDetails, sendResetEmail, deleteUser } from "../services/authService.service";

const designationOptions = ["Software Engineer", "Sr. Software Engineer", "Solution Enabler", "Consultant", "Architect", "Principal Architect"];
const roleOptions = ["user", "admin"];

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempEditedUser, setTempEditedUser] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [resetPasswordConfirmation, setResetPasswordConfirmation] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEdit = (user) => {
    setEditMode(true);
    setSelectedUser(user);
    setTempEditedUser({ ...user });
  };

  const handleSave = async () => {
    try {
      console.log(tempEditedUser)
      await updateUserDetails(tempEditedUser);
      setEditMode(false);
      setSelectedUser(null);
      setTempEditedUser(null);
      setSnackbarMessage('User details updated successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setResetPasswordConfirmation(true);
  };

  const handleResetPasswordConfirm = async () => {
    try {
      await sendResetEmail(selectedUser.email);
      setResetPasswordConfirmation(false);
      setSnackbarMessage('Password reset email sent successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteConfirmation(true);
  };

  const handleDeleteUserConfirm = async () => {
    try {
      await deleteUser(selectedUser.email);
      setDeleteConfirmation(false);
      setSelectedUser(null);
      setSnackbarMessage('User deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "isActive" ? value === "true" : value;
    setTempEditedUser((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
    console.log(tempEditedUser)
  };

  const handleToggleChange = (name) => (event) => {
    setTempEditedUser((prevUser) => ({
      ...prevUser,
      [name]: event.target.checked,
    }));
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedUser(null);
    setTempEditedUser(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper style={{ width: '100%', marginBottom: '2rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S. No</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id} hover>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {editMode && selectedUser === user ? (
                  <TextField
                    name="firstName"
                    value={tempEditedUser.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.firstName
                )}
              </TableCell>
              <TableCell>
                {editMode && selectedUser === user ? (
                  <TextField
                    name="lastName"
                    value={tempEditedUser.lastName}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.lastName
                )}
              </TableCell>
              <TableCell>
                {editMode && selectedUser === user ? (
                  <TextField
                    name="email"
                    value={tempEditedUser.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </TableCell>
              <TableCell>
                {editMode && selectedUser === user ? (
                  <TextField
                    select
                    name="designation"
                    value={tempEditedUser.designation}
                    onChange={handleInputChange}
                  >
                    {designationOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  user.designation
                )}
              </TableCell>
              <TableCell>
                {editMode && selectedUser === user ? (
                  <TextField
                    select
                    name="role"
                    value={tempEditedUser.role}
                    onChange={handleInputChange}
                  >
                    {roleOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>
                {editMode && selectedUser === user ? (
                  <Switch
                    name="isActive"
                    checked={tempEditedUser.isActive}
                    onChange={handleToggleChange('isActive')}
                  />
                ) : (
                  user.isActive ? "Active" : "Inactive"
                )}
              </TableCell>
              <TableCell>
                {editMode && selectedUser === user ? (
                  <>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(user)}>Edit Details</Button>
                    <Button onClick={() => handleResetPassword(user)}>Reset Password</Button>
                    <Button onClick={() => handleDeleteUser(user)}>Delete User</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
      >
        <DialogTitle>{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
          <Button onClick={handleDeleteUserConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={resetPasswordConfirmation}
        onClose={() => setResetPasswordConfirmation(false)}
      >
        <DialogTitle>{"Reset Password?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the password?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetPasswordConfirmation(false)}>Cancel</Button>
          <Button onClick={handleResetPasswordConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default UserList;
