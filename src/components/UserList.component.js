import React, { useState, useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal.component";
import { updateUserDetails, sendResetEmail, deleteUser } from "../services/authService.service";
import "./UserList.css";

const UserList = ({ users }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [tempEditedUser, setTempEditedUser] = useState(null);
  const [resetEmail, setResetEmail] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    // Set tempEditedUser when entering edit mode
    if (editMode) {
      setTempEditedUser(editedUser);
    }
  }, [editMode, editedUser]);

  const handleEdit = (user) => {
    setEditMode(true);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      await updateUserDetails(tempEditedUser);
      setShowSaveConfirmation(false);
      setEditMode(false);
      setEditedUser(null);
      setTempEditedUser(null); // Reset tempEditedUser
      alert("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error);
      // Handle error
    }
  };

  const handleCancelSave = () => {
    setShowSaveConfirmation(false);
    setEditMode(false);
    setEditedUser(null);
    setTempEditedUser(null); // Reset tempEditedUser
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleResetPassword = (email) => {
    setResetEmail(email);
    setShowResetConfirmation(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(userToDelete.email);
      setShowDeleteConfirmation(false);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const handleConfirmReset = async () => {
    try {
      await sendResetEmail(resetEmail);
      setShowResetConfirmation(false);
      alert("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      // Handle error
    }
  };

  const handleCancelReset = () => {
    setShowResetConfirmation(false);
    setResetEmail(null);
  };

  return (
    <div className="user-list-container">
      {users.map((user, index) => (
        <div className="user-item" key={user._id}>
          <p className="serial-number">S. No: {index + 1}</p>
          {editMode && editedUser === user ? (
            <div className="edit-mode">
              {/* Conditionally render input fields only if tempEditedUser is not null */}
              {tempEditedUser && (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={tempEditedUser.firstName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={tempEditedUser.lastName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="email"
                    value={tempEditedUser.email}
                    readOnly
                  />
                  <select
                    name="designation"
                    value={tempEditedUser.designation}
                    onChange={handleInputChange}
                  >
                    {["Software Engineer", "Sr. Software Engineer", "Solution Enabler", "Consultant", "Architect", "Principal Architect"].map(designation => (
                      <option key={designation} value={designation}>{designation}</option>
                    ))}
                  </select>
                  <select
                    name="role"
                    value={tempEditedUser.role}
                    onChange={handleInputChange}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <select
                    name="isActive"
                    value={tempEditedUser.isActive}
                    onChange={handleInputChange}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </>
              )}
            </div>
          ) : (
            <div className="view-mode">
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.email}</p>
              <p>{user.designation}</p> {/* Display designation */}
              <p>{user.role}</p>
              <p>{user.isActive ? "Active" : "Inactive"}</p>
            </div>
          )}
          {editMode && editedUser === user ? (
            <>
              <button onClick={() => setShowSaveConfirmation(true)}>Save</button>
              <button onClick={handleCancelSave}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => handleEdit(user)}>Edit Details</button>
              <button onClick={() => handleResetPassword(user.email)}>Reset Password</button>
              <button onClick={() => handleDeleteUser(user)}>Delete User</button>
            </>
          )}
        </div>
      ))}
      {showSaveConfirmation && (
        <ConfirmationModal
          message={`Are you sure you want to save the changes for ${tempEditedUser.firstName} ${tempEditedUser.lastName}?`}
          onConfirm={handleSave}
          onCancel={handleCancelSave}
        />
      )}
      {showResetConfirmation && (
        <ConfirmationModal
          message={`Are you sure you want to reset the password for ${resetEmail}?`}
          onConfirm={handleConfirmReset}
          onCancel={handleCancelReset}
        />
      )}
      {showDeleteConfirmation && (
        <ConfirmationModal
          message={`Are you sure you want to delete the user ${userToDelete.firstName} ${userToDelete.lastName}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UserList;
