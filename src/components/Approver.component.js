import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Snackbar } from '@material-ui/core';
import { approvalsForApprover, approveUserSkill } from '../services/approver.service';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ApproverList = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkillDescription, setSelectedSkillDescription] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await approvalsForApprover(); // Call your API function here
        setUserSkills(response);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleSkillClick = (description) => {
    setSelectedSkillDescription(description);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDialog = () => {
    setSelectedCertificate(null);
    setSelectedProject(null);
    setSelectedSkillDescription(null);
    setSelectedUser(null);
    setComments('');
    setRating('');
    setSelectedAction('');
    setSelectedRowId(null);
    setOpenDialog(false);
  };

  const handleApproverActionChange = (action, rowId) => {
    setSelectedAction(action);
    setSelectedRowId(rowId);
    setOpenDialog(true);
  };

  const handleApproverActionSubmit = async () => {
    try {
      if (!selectedRowId) {
        throw new Error('Selected row ID is missing');
      }
      await approveUserSkill({
        _id: selectedRowId,
        status: selectedAction,
        comments: comments,
        rating: parseInt(rating)
      });
      // Refresh data after approval
      const response = await approvalsForApprover();
      setUserSkills(response);
      setSuccessSnackbarOpen(true);
    } catch (error) {
      console.error('Error while approving:', error);
    }
    handleCloseDialog();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h5">Approvals</Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error}</Typography>
      ) : userSkills.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Skill Name</TableCell>
                <TableCell>Proficiency</TableCell>
                <TableCell>Certificate</TableCell>
                <TableCell>Project Experience</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userSkills.map((skill, index) => (
                <TableRow key={skill._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleUserClick(skill)}>
                      {`${skill.firstName} ${skill.lastName}`}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleSkillClick(skill.userSkill.skillId.description)}>
                      {capitalizeFirstLetter(skill.userSkill.skillId.skillName)}
                    </Button>
                  </TableCell>
                  <TableCell>{capitalizeFirstLetter(skill.userSkill.proficiency)}</TableCell>
                  <TableCell>
                    {skill.userSkill.certificateId ? (
                      <Button color="primary" onClick={() => handleCertificateClick(skill.userSkill.certificateId)}>View</Button>
                    ) : (
                      'No certificate attached'
                    )}
                  </TableCell>
                  <TableCell>
                    {skill.userSkill.projectExperienceId ? (
                      <Button color="primary" onClick={() => handleProjectClick(skill.userSkill.projectExperienceId)}>View</Button>
                    ) : (
                      'No project experience'
                    )}
                  </TableCell>
                  <TableCell>{new Date(skill.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>{skill.status}</TableCell>
                  <TableCell>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id={`select-label-${index}`}>Actions</InputLabel>
                      <Select
                        labelId={`select-label-${index}`}
                        value={selectedAction || skill.status}
                        onChange={(e) => handleApproverActionChange(e.target.value, skill._id)}
                        label="Actions"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approved">Approve</MenuItem>
                        <MenuItem value="Rejected">Reject</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No approvals found.</Typography>
      )}
      {/* Dialog for user details */}
      <Dialog open={!!selectedUser} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <Typography><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</Typography>
              <Typography><strong>Email:</strong> <a href={`mailto:${selectedUser.email}`}>{selectedUser.email}</a></Typography>
              {selectedUser.designation && (
                <Typography><strong>Designation:</strong> {selectedUser.designation}</Typography>
              )}
              {selectedUser.role && (
                <Typography><strong>Role:</strong> {selectedUser.role}</Typography>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for approver action */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Action Required</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Display selected certificate */}
              {selectedCertificate && (
                <Grid item xs={12}>
                  <Typography variant="h6">Selected Certificate</Typography>
                  <Typography>{selectedCertificate.description}</Typography>
                </Grid>
              )}
              {/* Display selected project */}
              {selectedProject && (
                <Grid item xs={12}>
                  <Typography variant="h6">Selected Project</Typography>
                  <Typography>{selectedProject.description}</Typography>
                </Grid>
              )}
              {/* Display selected skill description */}
              {selectedSkillDescription && (
                <Grid item xs={12}>
                  <Typography variant="h6">Selected Skill Description</Typography>
                  <Typography>{selectedSkillDescription}</Typography>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Comments"
                margin="normal"
                multiline
                rows={4}
                fullWidth
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Rating</InputLabel>
                <Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <MenuItem value="">Select Rating</MenuItem>
                  {[1, 2, 3, 4, 5].map((ratingValue) => (
                    <MenuItem key={ratingValue} value={ratingValue}>{ratingValue}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApproverActionSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Success Snackbar */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Approval submitted successfully"
      />
    </div>
  );
};

export default ApproverList;
