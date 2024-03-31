// ProfileForm.js

import React from 'react';

const ProfileForm = ({ profileData }) => {
    return (
        <div>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={profileData.firstName} readOnly />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={profileData.lastName} readOnly />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={profileData.email} readOnly />
            </div>
            <div>
                <label htmlFor="designation">Designation:</label>
                <input type="text" id="designation" name="designation" value={profileData.designation} readOnly />
            </div>
            <div>
                <label htmlFor="role">Role:</label>
                <input type="text" id="role" name="role" value={profileData.role} readOnly />
            </div>
        </div>
    );
};

export default ProfileForm;
