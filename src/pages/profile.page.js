// ProfilePage.js

import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/profile.component';
import { getUserData } from '../services/authService.service';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getUserData();
                setProfile(profileData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                // Handle error
            }
        };
        
        fetchProfile();
    }, []);
    
    return (
        <div>
            <h2>Profile</h2>
            {profile ? (
                <ProfileForm profileData={profile} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
