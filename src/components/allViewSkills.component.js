import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal.component'; // Import the ConfirmationModal component
import './allViewSkills.css'; // Import your CSS file for styling

const SkillList = ({ skills }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ skillName: '', description: '' });

  // Function to handle editing a skill
  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setShowEditConfirmation(true);
  };

  // Function to handle deleting a skill
  const handleDeleteSkill = (skill) => {
    setSelectedSkill(skill);
    setShowDeleteConfirmation(true);
  };

  // Function to handle adding a new skill
  const handleAddSkill = () => {
    setShowAddSkillForm(true);
  };

  // Function to handle canceling addition of a new skill
  const handleCancelAddSkill = () => {
    setShowAddSkillForm(false);
    setNewSkill({ skillName: '', description: '' }); // Reset the newSkill state
  };

  // Function to handle saving a new skill
  const handleSaveSkill = () => {
    // Implement your save skill logic here
    if (!newSkill.skillName || !newSkill.description) {
      console.log('Please enter both skill name and description');
      return;
    }
    
    // Assuming there's a function to save the new skill
    // saveNewSkill(newSkill);

    console.log('New Skill:', newSkill);
    // Reset the newSkill state
    setNewSkill({ skillName: '', description: '' });
    // Close the add skill form
    setShowAddSkillForm(false);
  };

  // Function to handle changes in the new skill form fields
  const handleNewSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prevSkill) => ({
      ...prevSkill,
      [name]: value,
    }));
  };

  // Function to confirm and handle editing a skill
  const handleConfirmEditSkill = () => {
    // Implement your edit skill logic here
    console.log('Editing skill:', selectedSkill);
    // Close the confirmation modal
    setShowEditConfirmation(false);
  };

  // Function to cancel editing a skill
  const handleCancelEditSkill = () => {
    // Close the confirmation modal
    setShowEditConfirmation(false);
  };

  // Function to confirm and handle deleting a skill
  const handleConfirmDeleteSkill = () => {
    // Implement your delete skill logic here
    console.log('Deleting skill:', selectedSkill);
    // Close the confirmation modal
    setShowDeleteConfirmation(false);
  };

  // Function to cancel deleting a skill
  const handleCancelDeleteSkill = () => {
    // Close the confirmation modal
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="skill-list-container">
      {skills.length === 0 && <p>No skills found. Create one!</p>}
      <div className="add-skill-button">
        <button onClick={handleAddSkill}>Add Skill</button>
      </div>
      {showAddSkillForm && (
        <div className="add-skill-form">
          <input
            type="text"
            name="skillName"
            placeholder="Skill Name"
            value={newSkill.skillName}
            onChange={handleNewSkillChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newSkill.description}
            onChange={handleNewSkillChange}
          />
          <button onClick={handleSaveSkill}>Save</button>
          <button onClick={handleCancelAddSkill}>Cancel</button>
        </div>
      )}
      {skills.map((skill) => (
        <div className="skill-item" key={skill._id}>
          <p>{skill.skillName}</p>
          <p>{skill.description}</p>
          <button onClick={() => handleEditSkill(skill)}>Edit</button>
          <button onClick={() => handleDeleteSkill(skill)}>Delete</button>
        </div>
      ))}
      {/* Confirmation modal for editing a skill */}
      {showEditConfirmation && (
        <ConfirmationModal
          message={`Are you sure you want to edit ${selectedSkill.skillName}?`}
          onConfirm={handleConfirmEditSkill}
          onCancel={handleCancelEditSkill}
        />
      )}
      {/* Confirmation modal for deleting a skill */}
      {showDeleteConfirmation && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${selectedSkill.skillName}?`}
          onConfirm={handleConfirmDeleteSkill}
          onCancel={handleCancelDeleteSkill}
        />
      )}
    </div>
  );
};

export default SkillList;
