import React, { useState, useEffect } from 'react';
import SkillList from '../components/allViewSkills.component';
import { getAllSkills , addSkill } from '../services/skills.service'; // Import the function to fetch all skills from the service

const AddViewSkillsPage = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getAllSkills();
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Handle error
      }
    };

    fetchSkills();
  }, []);

  return (
    <div>
      <h2>Skills</h2>
      <SkillList skills={skills} addSkill={addSkill} />
    </div>
  );
};

export default AddViewSkillsPage;
