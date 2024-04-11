// ProfilePage.js

import React, { useEffect, useState } from "react";
import ProfileForm from "../components/profile.component";
import { getUserData } from "../services/authService.service";
import Loading from "../components/loading.component";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profileData = await getUserData();
        setProfile(profileData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching user profile:", error);
        // Handle error
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div style={{ paddingTop: "75px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#303F9F"
            fillOpacity="1"
            d="M0,32L1440,288L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div
        style={{
          width: "95%",
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          zIndex: "6",
        }}
      >
        <h2 style={{ color: "white", textDecoration: "underline" }}>Profile</h2>
        {profile && <ProfileForm profileData={profile} />}
        {isLoading && <Loading />}
      </div>

      <footer
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          zIndex: "5",
          width: "100%",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ zIndex: "5", margin: "0", padding: "0" }}
        >
          <path
            fill="#303F9F"
            fillOpacity="1"
            d="M0,32L1440,288L1440,320L0,320Z"
          ></path>
        </svg>
      </footer>
    </>
  );
};

export default ProfilePage;
