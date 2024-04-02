import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import ConfirmationModal from './ConfirmationModal.component'; // Import the ConfirmationModal component

const SkillList = ({ skills }) => {
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false);
  const [newSkill, setNewSkill] = useState({ skillName: '', description: '' });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to handle adding a new skill
  const handleAddSkill = () => {
    setShowAddSkillDialog(true);
  };

  // Function to handle saving a new skill
  const handleSaveSkill = () => {
    if (!newSkill.skillName || !newSkill.description) {
      setSnackbarMessage('Please enter both skill name and description');
      setShowSnackbar(true);
      return;
    }
    // Assuming there's a function to save the new skill
    // saveNewSkill(newSkill);
    console.log('New Skill:', newSkill);
    // Reset the newSkill state
    setNewSkill({ skillName: '', description: '' });
    // Close the add skill dialog
    setShowAddSkillDialog(false);
    // Show success message
    setSnackbarMessage('Skill added successfully');
    setShowSnackbar(true);
  };

  // Function to handle changes in the new skill form fields
  const handleNewSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prevSkill) => ({
      ...prevSkill,
      [name]: value,
    }));
  };

  // Function to close the snackbar
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      {skills.length === 0 && <Typography variant="body1">No skills found. Create one!</Typography>}
      <div>
        <Button variant="contained" color="primary" onClick={handleAddSkill}>Add Skill</Button>
      </div>
      <Dialog open={showAddSkillDialog} onClose={() => setShowAddSkillDialog(false)}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Skill Name"
            name="skillName"
            value={newSkill.skillName}
            onChange={handleNewSkillChange}
          />
          <TextField
            fullWidth
            multiline
            rows={4} // Adjust the number of rows as needed
            label="Description"
            name="description"
            value={newSkill.description}
            onChange={handleNewSkillChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddSkillDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveSkill} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      {skills.map((skill, index) => (
        <div key={index}>
          <Typography variant="body1">{skill.skillName}</Typography>
          <Typography variant="body2">{skill.description}</Typography>
        </div>
      ))}
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SkillList;
