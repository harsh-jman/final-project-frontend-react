import React, { useState, useEffect } from "react";
import UserSkillList from "../components/ownSkillHub.component";
import { getUserSkills } from "../services/skills.service"; // Import the function to fetch user skills
import Loading from "../components/loading.component";

const OwnSkillHubPage = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch user skills
  const fetchUserSkills = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserSkills(); // Call your service function to fetch user skills
      setUserSkills(userData.userSkills); // Update the state with the fetched user skills
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user skills:", error);
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, []);

  // useEffect hook to listen for changes in userSkills and refetch data
  // useEffect(() => {
  //   fetchUserSkills(); // Refetch user skills whenever userSkills changes
  // }, [userSkills]);

  return (
    <div style={{ paddingTop: "90px", width: "95%", margin: "auto" }}>
      {/* <Typography variant="h3">My Skill Hub</Typography> */}

      {/* <Button variant="outlined" color="primary" onClick={fetchUserSkills}>
        Refresh
      </Button> */}
      <UserSkillList userSkills={userSkills} />
      {isLoading && <Loading />}
    </div>
  );
};

export default OwnSkillHubPage;
