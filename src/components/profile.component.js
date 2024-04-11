// ProfileForm.js

import React from "react";
import "./profile.css";

const ProfileForm = ({ profileData }) => {
  return (
    <div className="forget-password-form center">
      <div className="profileCon">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={profileData.firstName}
          readOnly
        />
      </div>
      <div className="profileCon" >
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={profileData.lastName}
          readOnly
        />
      </div>
      <div className="profileCon">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={profileData.email}
          readOnly
        />
      </div>
      <div className="profileCon">
        <label htmlFor="designation">Designation</label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={profileData.designation}
          readOnly
        />
      </div>
      <div className="profileCon">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={profileData.role}
          readOnly
        />
      </div>
    </div>
  );
};

export default ProfileForm;
