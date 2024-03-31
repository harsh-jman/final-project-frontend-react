import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const UserSkillList = ({ userSkills }) => {
  const [selectedCertificate, setSelectedCertificate] = React.useState(null);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [selectedSkillDescription, setSelectedSkillDescription] = React.useState(null);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleSkillClick = (description) => {
    setSelectedSkillDescription(description);
  };

  const handleCloseDialog = () => {
    setSelectedCertificate(null);
    setSelectedProject(null);
    setSelectedSkillDescription(null);
  };

  return (
    <div>
      <Typography variant="h5">User Skills</Typography>
      {userSkills.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>Skill Name</TableCell>
                <TableCell>Proficiency</TableCell>
                <TableCell>Certificate</TableCell>
                <TableCell>Project Experience</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Approver</TableCell>
                <TableCell>Creation Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userSkills.map((skill, index) => (
                <TableRow key={skill._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleSkillClick(skill.skillId.description)}>
                      {capitalizeFirstLetter(skill.skillId.skillName)}
                    </Button>
                  </TableCell>
                  <TableCell>{capitalizeFirstLetter(skill.proficiency)}</TableCell>
                  <TableCell>
                    {skill.certificateId ? (
                      <Button color="primary" onClick={() => handleCertificateClick(skill.certificateId)}>View</Button>
                    ) : (
                      'No certificate attached'
                    )}
                  </TableCell>
                  <TableCell>
                    {skill.projectExperienceId ? (
                      <Button color="primary" onClick={() => handleProjectClick(skill.projectExperienceId)}>View</Button>
                    ) : (
                      'No project experience'
                    )}
                  </TableCell>
                  <TableCell>{skill.approverDetailId ? skill.approverDetailId.status : 'Waiting'}</TableCell>
                  <TableCell>
                    {skill.approverDetailId.approverUserId ? (
                      `${skill.approverDetailId.approverUserId.firstName || 'Approver Allotment'} ${skill.approverDetailId.approverUserId.lastName || 'in Progress'}`
                    ) : (
                      'Waiting'
                    )}
                  </TableCell>
                  <TableCell>{new Date(skill.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No user skills found. Please add a skill.</Typography>
      )}
      <Dialog open={!!selectedCertificate} onClose={handleCloseDialog}>
        <DialogTitle>Certificate Details</DialogTitle>
        <DialogContent>
          {selectedCertificate && (
            <div>
              <Typography>Certificate ID: {selectedCertificate.certificateId}</Typography>
              <Typography>Certificate Name: {capitalizeFirstLetter(selectedCertificate.certificateName)}</Typography>
              <Typography>Description: {capitalizeFirstLetter(selectedCertificate.description)}</Typography>
              <Typography>Issuing Authority: {capitalizeFirstLetter(selectedCertificate.issuingAuthority)}</Typography>
              <Typography>Issue Date: {new Date(selectedCertificate.issueDate).toLocaleDateString()}</Typography>
              <Typography>Validity Period (Months): {selectedCertificate.validityPeriodMonths}</Typography>
              {selectedCertificate.supportedDocumentLink ? (
                <Typography>
                  Supported Document Link: <a href={selectedCertificate.supportedDocumentLink} target="_blank" rel="noopener noreferrer">{selectedCertificate.supportedDocumentLink}</a>
                </Typography>
              ) : (
                <Typography>Supported Document Link:  No document attached</Typography>
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
      <Dialog open={!!selectedProject} onClose={handleCloseDialog}>
        <DialogTitle>Project Experience Details</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <div>
              <Typography>Project Name: {capitalizeFirstLetter(selectedProject.projectName)}</Typography>
              <Typography>Description: {capitalizeFirstLetter(selectedProject.description)}</Typography>
              <Typography>Start Date: {new Date(selectedProject.startDate).toLocaleDateString()}</Typography>
              <Typography>End Date: {new Date(selectedProject.endDate).toLocaleDateString()}</Typography>
              {selectedProject.supportedDocumentLink ? (
                <Typography>
                  Supported Document Link: <a href={selectedProject.supportedDocumentLink} target="_blank" rel="noopener noreferrer">{selectedProject.supportedDocumentLink}</a>
                </Typography>
              ) : (
                <Typography>Supported Document Link:  No document attached</Typography>
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
      <Dialog open={!!selectedSkillDescription} onClose={handleCloseDialog}>
        <DialogTitle>Skill Description</DialogTitle>
        <DialogContent>
          <Typography>{selectedSkillDescription}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserSkillList;
