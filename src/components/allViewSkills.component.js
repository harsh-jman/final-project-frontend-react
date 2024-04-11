import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Alert } from '@mui/material';
import './allViewSkills.css'

const SkillList = ({ skills, addSkill }) => {
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false);
  const [newSkill, setNewSkill] = useState({ skillName: '', description: '' });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Function to handle adding a new skill
  const handleAddSkill = () => {
    // Open the dialog for adding a new skill
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
    // Reset the newSkill state
    setNewSkill({ skillName: '', description: '' });
    addSkill(newSkill);
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
      <div className='skillBtn'>
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
      {skills.length > 0 && (
        <TableContainer component={Paper} className='tableCon'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sno</TableCell>
                <TableCell>Skill Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills.map((skill, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='skillname'>{skill.skillName}</TableCell>
                  <TableCell>{skill.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={showSnackbar} autoHideDuration={3} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SkillList;
