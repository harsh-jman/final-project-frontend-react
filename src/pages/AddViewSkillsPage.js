import React, { useState, useEffect } from "react";
import SkillList from "../components/allViewSkills.component";
import { getAllSkills, addSkill } from "../services/skills.service"; // Import the function to fetch all skills from the service
import Loading from "../components/loading.component";

const AddViewSkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const skillsData = await getAllSkills();
        setSkills(skillsData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching skills:", error);
        // Handle error
      }
    };

    fetchSkills();
  }, []);

  return (
    <div style={{ paddingTop: "90px", width: "95%", margin: "auto" }}>
      {/* <h2>Skills</h2> */}
      <SkillList skills={skills} addSkill={addSkill} />
      {isLoading && <Loading />}
    </div>
  );
};

export default AddViewSkillsPage;
