import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const capitalizeFirstLetter = (string) => {
  if (!string) {
    return ''; // Return an empty string if the input string is null or undefined
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};


const UserSkillList = ({ userSkills }) => {
  const [selectedCertificate, setSelectedCertificate] = React.useState(null);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [selectedSkillDescription, setSelectedSkillDescription] = React.useState(null);
  const [selectedApproverDetail, setSelectedApproverDetail] = React.useState(null);
  const [selectedStatusDetail, setSelectedStatusDetail] = React.useState(null);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleSkillClick = (description) => {
    setSelectedSkillDescription(description);
  };

  const handleApproverDetailClick = (approverDetail) => {
    setSelectedApproverDetail(approverDetail);
  };

  const handleStatusDetailClick = (statusDetail) => {
    setSelectedStatusDetail(statusDetail);
  };

  const handleCloseDialog = () => {
    setSelectedCertificate(null);
    setSelectedProject(null);
    setSelectedSkillDescription(null);
    setSelectedApproverDetail(null);
    setSelectedStatusDetail(null);
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedDate;
  }

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
                  <TableCell>
                    <Button color="primary" onClick={() => handleStatusDetailClick(skill.approverDetailId)}>
                      {skill.approverDetailId.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleApproverDetailClick(skill.approverDetailId)}>
                      {skill.approverDetailId.approverUserId ? `${skill.approverDetailId.approverUserId.firstName || 'Approver Allotment'} ${skill.approverDetailId.approverUserId.lastName || 'in Progress'}` : 'Waiting'}
                    </Button>
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

      {/* Certificate details dialog */}
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

      {/* Project experience details dialog */}
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

      {/* Skill description dialog */}
      <Dialog open={!!selectedSkillDescription} onClose={handleCloseDialog}>
        <DialogTitle>Skill Description</DialogTitle>
        <DialogContent>
          <Typography>{capitalizeFirstLetter(selectedSkillDescription)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approver details dialog */}
      <Dialog open={!!selectedApproverDetail} onClose={handleCloseDialog}>
        <DialogTitle>Approver Details</DialogTitle>
        <DialogContent>
          {selectedApproverDetail && (
            <div>
              <Typography><strong>Name:</strong> {capitalizeFirstLetter(selectedApproverDetail.approverUserId.firstName)} {capitalizeFirstLetter(selectedApproverDetail.approverUserId.lastName)}</Typography>
              <Typography><strong>Email:</strong> <a href={`mailto:${selectedApproverDetail.approverUserId.email}`}>{selectedApproverDetail.approverUserId.email}</a></Typography>
              <Typography><strong>Designation:</strong> {capitalizeFirstLetter(selectedApproverDetail.approverUserId.designation)}</Typography>
              <Typography><strong>Role:</strong> {capitalizeFirstLetter(selectedApproverDetail.approverUserId.role)}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status details dialog */}
      <Dialog open={!!selectedStatusDetail} onClose={handleCloseDialog}>
  <DialogTitle>Status Details</DialogTitle>
  <DialogContent>
    {selectedStatusDetail && (
      <div>
        <Typography><strong>Status:</strong> {selectedStatusDetail.status || ''}</Typography>
        {selectedStatusDetail.comments !== undefined && (
          <Typography><strong>Comments:</strong> {selectedStatusDetail.comments || ''}</Typography>
        )}
        {selectedStatusDetail.rating !== undefined && (
          <Typography><strong>Rating:</strong> {selectedStatusDetail.rating || ''}</Typography>
        )}
        {(selectedStatusDetail.comments !== undefined || selectedStatusDetail.rating !== undefined) && (
          <Typography><strong>Timestamp:</strong> {formatTimestamp(selectedStatusDetail.updatedAt) || ''}</Typography>
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

    </div>
  );
};

export default UserSkillList;
