import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import UserSkillList from '../components/ownSkillHub.component';
import { getUserSkills } from '../services/skills.service'; // Import the function to fetch user skills
import AddSkillButton from '../components/ownSkillHub-addskill.component'; // Import the AddSkillButton component

const OwnSkillHubPage = () => {
  const [userSkills, setUserSkills] = useState([]);

  // Function to fetch user skills
  const fetchUserSkills = async () => {
    try {
      const userData = await getUserSkills(); // Call your service function to fetch user skills
      setUserSkills(userData.userSkills); // Update the state with the fetched user skills
    } catch (error) {
      console.error('Error fetching user skills:', error);
    }
  };

  useState(() => {
    fetchUserSkills();
  }, []);

  return (
    <div>
      <Typography variant="h3">My Skill Hub</Typography>
      <AddSkillButton /> {/* Integrating the AddSkillButton component */}
      <Button variant="outlined" color="primary" onClick={fetchUserSkills}>
        Refresh
      </Button>
      <UserSkillList userSkills={userSkills} />
    </div>
  );
};

export default OwnSkillHubPage;
