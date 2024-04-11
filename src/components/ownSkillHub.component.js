import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddSkillButton from "../components/ownSkillHub-addskill.component"; // Import the AddSkillButton component

const capitalizeFirstLetter = (string) => {
  if (!string) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const UserSkillList = ({ userSkills, fetchSkill }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkillDescription, setSelectedSkillDescription] =
    useState(null);
  const [selectedApproverDetail, setSelectedApproverDetail] = useState(null);
  const [selectedStatusDetail, setSelectedStatusDetail] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [skillNameFilter, setSkillNameFilter] = useState("All");

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
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  }

  // Filter userSkills based on status and skillName
  const filteredUserSkills = userSkills.filter((skill) => {
    if (skill.approverDetailId) {
      const skillName = skill.skillId.description.toLowerCase();
      const status = skill.approverDetailId.status.toLowerCase();

      return (
        (skillNameFilter === "All" ||
          skillName.includes(skillNameFilter.toLowerCase())) &&
        (statusFilter === "All" || status.includes(statusFilter.toLowerCase()))
      );
    }
  });

  const skillOptions = [
    "All",
    "JavaScript",
    "Python Programming",
    "Data Analysis",
    "Project Management",
    "Cloud Computing",
    "UI/UX Design",
    "CyberSecurity",
    "Digital Marketing",
    "Mobile App Development",
  ];

  const statusOptions = ["All", "Approved", "Pending", "Rejected"];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AddSkillButton addSkill={fetchSkill} />{" "}
        {/* Integrating the AddSkillButton component */}
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FormControl
            style={{ minWidth: "200px" }}
            variant="outlined"
            size="small"
          >
            <InputLabel id="skill-filter-label">Filter by Skill</InputLabel>
            <Select
              labelId="skill-filter-label"
              value={skillNameFilter}
              onChange={(e) => setSkillNameFilter(e.target.value)}
              label="Filter by Skill"
            >
              {skillOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            style={{ minWidth: "200px" }}
            variant="outlined"
            size="small"
          >
            <InputLabel id="status-filter-label">Filter by Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Filter by Status"
            >
              {statusOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ marginTop: "12px" }}>
        {filteredUserSkills.length > 0 ? (
          <TableContainer component={Paper} className="appTableCon">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "center" }}>S.No.</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Skill Name
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Proficiency
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Certificate
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Project Experience
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Approver
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Creation Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUserSkills.map((skill, index) => (
                  <TableRow key={skill._id}>
                    <TableCell style={{ textAlign: "center" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        color="primary"
                        onClick={() =>
                          handleSkillClick(skill.skillId.description)
                        }
                      >
                        {capitalizeFirstLetter(skill.skillId.skillName)}
                      </Button>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {capitalizeFirstLetter(skill.proficiency)}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {skill.certificateId ? (
                        <Button
                          color="primary"
                          onClick={() =>
                            handleCertificateClick(skill.certificateId)
                          }
                        >
                          View
                        </Button>
                      ) : (
                        "No certificate attached"
                      )}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {skill.projectExperienceId ? (
                        <Button
                          color="primary"
                          onClick={() =>
                            handleProjectClick(skill.projectExperienceId)
                          }
                        >
                          View
                        </Button>
                      ) : (
                        "No project experience"
                      )}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        color="primary"
                        onClick={() =>
                          handleStatusDetailClick(skill.approverDetailId)
                        }
                        style={{
                          color:
                            skill.approverDetailId.status === "Pending"
                              ? "orange"
                              : skill.approverDetailId.status === "Approved"
                              ? "green"
                              : skill.approverDetailId.status === "Rejected"
                              ? "red"
                              : "black",
                        }}
                      >
                        {skill.approverDetailId.status}
                      </Button>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        color="primary"
                        onClick={() =>
                          handleApproverDetailClick(skill.approverDetailId)
                        }
                      >
                        {skill.approverDetailId.approverUserId
                          ? `${
                              skill.approverDetailId.approverUserId.firstName ||
                              "Approver Allotment"
                            } ${
                              skill.approverDetailId.approverUserId.lastName ||
                              "in Progress"
                            }`
                          : "Waiting"}
                      </Button>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {new Date(skill.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No user skills found. Please add a skill.</Typography>
        )}

        {/* Dialogs */}
        {/* Certificate details dialog */}
        <Dialog open={!!selectedCertificate} onClose={handleCloseDialog}>
          <DialogTitle>Certificate Details</DialogTitle>
          <DialogContent>
            {selectedCertificate && (
              <div>
                <Typography>
                  Certificate ID: {selectedCertificate.certificateId}
                </Typography>
                <Typography>
                  Certificate Name:{" "}
                  {capitalizeFirstLetter(selectedCertificate.certificateName)}
                </Typography>
                <Typography>
                  Description:{" "}
                  {capitalizeFirstLetter(selectedCertificate.description)}
                </Typography>
                <Typography>
                  Issuing Authority:{" "}
                  {capitalizeFirstLetter(selectedCertificate.issuingAuthority)}
                </Typography>
                <Typography>
                  Issue Date:{" "}
                  {new Date(selectedCertificate.issueDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  Validity Period (Months):{" "}
                  {selectedCertificate.validityPeriodMonths}
                </Typography>
                {selectedCertificate.supportedDocumentLink ? (
                  <Typography>
                    Supported Document Link:{" "}
                    <a
                      href={selectedCertificate.supportedDocumentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedCertificate.supportedDocumentLink}
                    </a>
                  </Typography>
                ) : (
                  <Typography>
                    Supported Document Link: No document attached
                  </Typography>
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
                <Typography>
                  Project Name:{" "}
                  {capitalizeFirstLetter(selectedProject.projectName)}
                </Typography>
                <Typography>
                  Description:{" "}
                  {capitalizeFirstLetter(selectedProject.description)}
                </Typography>
                <Typography>
                  Start Date:{" "}
                  {new Date(selectedProject.startDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  End Date:{" "}
                  {new Date(selectedProject.endDate).toLocaleDateString()}
                </Typography>
                {selectedProject.supportedDocumentLink ? (
                  <Typography>
                    Supported Document Link:{" "}
                    <a
                      href={selectedProject.supportedDocumentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedProject.supportedDocumentLink}
                    </a>
                  </Typography>
                ) : (
                  <Typography>
                    Supported Document Link: No document attached
                  </Typography>
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
            <Typography>
              {capitalizeFirstLetter(selectedSkillDescription)}
            </Typography>
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
                <Typography>
                  <strong>Name:</strong>{" "}
                  {capitalizeFirstLetter(
                    selectedApproverDetail.approverUserId.firstName
                  )}{" "}
                  {capitalizeFirstLetter(
                    selectedApproverDetail.approverUserId.lastName
                  )}
                </Typography>
                <Typography>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${selectedApproverDetail.approverUserId.email}`}
                  >
                    {selectedApproverDetail.approverUserId.email}
                  </a>
                </Typography>
                <Typography>
                  <strong>Designation:</strong>{" "}
                  {capitalizeFirstLetter(
                    selectedApproverDetail.approverUserId.designation
                  )}
                </Typography>
                <Typography>
                  <strong>Role:</strong>{" "}
                  {capitalizeFirstLetter(
                    selectedApproverDetail.approverUserId.role
                  )}
                </Typography>
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
                <Typography>
                  <strong>Status:</strong> {selectedStatusDetail.status || ""}
                </Typography>
                {selectedStatusDetail.comments !== undefined && (
                  <Typography>
                    <strong>Comments:</strong>{" "}
                    {selectedStatusDetail.comments || ""}
                  </Typography>
                )}
                {selectedStatusDetail.rating !== undefined && (
                  <Typography>
                    <strong>Rating:</strong> {selectedStatusDetail.rating || ""}
                  </Typography>
                )}
                {(selectedStatusDetail.comments !== undefined ||
                  selectedStatusDetail.rating !== undefined) && (
                  <Typography>
                    <strong>Timestamp:</strong>{" "}
                    {formatTimestamp(selectedStatusDetail.updatedAt) || ""}
                  </Typography>
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
    </>
  );
};

export default UserSkillList;
