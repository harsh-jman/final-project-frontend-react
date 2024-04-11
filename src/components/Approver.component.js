import React, { useState, useEffect } from "react";
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
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  Snackbar,
} from "@material-ui/core";
import {
  approvalsForApprover,
  approveUserSkill,
} from "../services/approver.service";
import Rating from "@material-ui/lab/Rating";
import Loading from "./loading.component";
import "./approver.css";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const statusOptions = ["All", "Approved", "Pending", "Rejected", "None"];

const ApproverList = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); // State for status filter
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState("");
  const [originalRating, setOriginalRating] = useState("");
  const [openSkillDialog, setOpenSkillDialog] = useState(false);
  const [openCertificateDialog, setOpenCertificateDialog] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openApproverDialog, setOpenApproverDialog] = useState(false); // Added state for the approver dialog
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false); // State for confirmation dialog
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [updateFlag, setUpdateFlag] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedPendingSkill, setSelectedPendingSkill] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await approvalsForApprover();
        setUserSkills(response);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [updateFlag]);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setOpenSkillDialog(true);
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setOpenCertificateDialog(true);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setOpenProjectDialog(true);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpenUserDialog(true);
  };

  const handleCloseSkillDialog = () => {
    setOpenSkillDialog(false);
  };

  const handleCloseCertificateDialog = () => {
    setOpenCertificateDialog(false);
  };

  const handleCloseProjectDialog = () => {
    setOpenProjectDialog(false);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };

  const handleCloseApproverDialog = () => {
    setOpenApproverDialog(false);
    // Reset comments and rating to their previous values if canceled
    setComments("");
    setRating(originalRating);
    setSelectedAction(""); // Reset selected action when cancelling
  };

  const handleApproverActionChange = (action, rowId) => {
    setSelectedAction(action);
    if (action !== "") {
      setOpenApproverDialog(true);
      // Set the original rating when action is selected
      setOriginalRating(rating);
      setSelectedRowId(rowId);
    }
  };

  // Function to handle opening status dialog for selected pending skill
  const handleStatusDialogOpen = (skill) => {
    setSelectedPendingSkill(skill); // Set the selected pending skill
    setOpenStatusDialog(true); // Open the status dialog
  };

  const handleApproverActionSubmit = async () => {
    try {
      // Check if comment and rating are empty
      if (!comments || !rating) {
        alert("Please provide both comment and rating.");
        setConfirmationDialogOpen(false);
        return;
      }

      const response = await approveUserSkill({
        _id: selectedRowId, // Pass the _id of the selected user
        status: selectedAction,
        comments: comments,
        rating: rating,
      });
      // Show success notification
      setPopupMessage("Approval submitted successfully!");
      setConfirmationDialogOpen(false); // Close the confirmation dialog
      // Reset dialog and states
      setSelectedUser(null);
      setSelectedAction("");
      setComments("");
      setRating("");
      setOpenUserDialog(false);
      handleCloseApproverDialog();
      setUpdateFlag((prevFlag) => !prevFlag);
    } catch (error) {
      alert("Error submitting approval: " + error.message);
    }
  };

  const handleConfirmationDialogClose = (confirmed) => {
    if (confirmed) {
      handleApproverActionSubmit();
    } else {
      setConfirmationDialogOpen(false);
    }
  };

  const handlePopupClose = () => {
    setPopupMessage("");
  };

  const filteredUserSkills = userSkills.filter((skill) =>
    statusFilter === "All" ? true : skill.status.toLowerCase().includes(statusFilter.toLowerCase())
  );

  return (
    <div>
      <div style={{ padding: "10px", display: "flex", alignItems: "center", justifyContent: 'flex-end'}}>
        <FormControl style={{ minWidth: "200px" }} variant="outlined">
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
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
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Typography>Error: {error}</Typography>
      ) : filteredUserSkills.length > 0 ? (
        <TableContainer component={Paper} className="appTableCon">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>S.No.</TableCell>
                <TableCell style={{ textAlign: "center" }}>User Name</TableCell>
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
                <TableCell style={{ textAlign: "center" }}>
                  HackerRank Percentage
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Submission Date
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUserSkills.map((skill, index) => (
                <TableRow key={skill._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex ">
                    <Button
                      color="primary"
                      onClick={() => handleUserClick(skill)}
                      className="w-full center"
                    >
                      {`${skill.firstName} ${skill.lastName}`}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handleSkillClick(skill.userSkill)}
                      className="center w-full"
                    >
                      {capitalizeFirstLetter(skill.userSkill.skillId.skillName)}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {capitalizeFirstLetter(skill.userSkill.proficiency)}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {skill.userSkill.certificateId ? (
                      <Button
                        color="primary"
                        onClick={() =>
                          handleCertificateClick(skill.userSkill.certificateId)
                        }
                        className="center"
                        style={{ textAlign: "center" }}
                      >
                        View
                      </Button>
                    ) : (
                      "No certificate attached"
                    )}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {skill.userSkill.projectExperienceId ? (
                      <Button
                        color="primary"
                        onClick={() =>
                          handleProjectClick(
                            skill.userSkill.projectExperienceId
                          )
                        }
                      >
                        View
                      </Button>
                    ) : (
                      "No project experience"
                    )}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {skill.userSkill.hackerRankScore}
                  </TableCell>
                  <TableCell>
                    {new Date(skill.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handleStatusDialogOpen(skill)}
                      style={{
                        color:
                          skill.status === "Pending"
                            ? "orange"
                            : skill.status === "Approved"
                            ? "green"
                            : skill.status === "Rejected"
                            ? "red"
                            : "black",
                      }}
                    >
                      {skill.status}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id={`select-label-${index}`}>
                        Actions
                      </InputLabel>
                      <Select
                        labelId={`select-label-${index}`}
                        value={selectedAction || skill.status}
                        onChange={(e) =>
                          handleApproverActionChange(e.target.value, skill._id)
                        }
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
      {/* Dialog for skill details */}
      <Dialog open={openSkillDialog} onClose={handleCloseSkillDialog}>
        <DialogTitle>Skill Details</DialogTitle>
        <DialogContent>
          {selectedSkill && (
            <div>
              <Typography>
                <strong>Skill Name:</strong> {selectedSkill.skillId.skillName}
              </Typography>
              <Typography>
                <strong>Description:</strong>{" "}
                {selectedSkill.skillId.description}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSkillDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for certificate details */}
      <Dialog
        open={openCertificateDialog}
        onClose={handleCloseCertificateDialog}
      >
        <DialogTitle>Certificate Details</DialogTitle>
        <DialogContent>
          {selectedCertificate && (
            <div>
              <Typography>
                <strong>Certificate ID:</strong>{" "}
                {selectedCertificate.certificateId}
              </Typography>
              <Typography>
                <strong>Certificate Name:</strong>{" "}
                {selectedCertificate.certificateName}
              </Typography>
              <Typography>
                <strong>Description:</strong> {selectedCertificate.description}
              </Typography>
              <Typography>
                <strong>Issuing Authority:</strong>{" "}
                {selectedCertificate.issuingAuthority}
              </Typography>
              <Typography>
                <strong>Issue Date:</strong>{" "}
                {new Date(selectedCertificate.issueDate).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Validity Period:</strong>{" "}
                {selectedCertificate.validityPeriodMonths} months
              </Typography>
              <Typography>
                <strong>Supported Document Link:</strong>{" "}
                <Link
                  href={selectedCertificate.supportedDocumentLink}
                  target="_blank"
                  rel="noopener"
                >
                  View
                </Link>
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCertificateDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for project details */}
      <Dialog open={openProjectDialog} onClose={handleCloseProjectDialog}>
        <DialogTitle>Project Details</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <div>
              <Typography>
                <strong>Project Name:</strong> {selectedProject.projectName}
              </Typography>
              <Typography>
                <strong>Description:</strong> {selectedProject.description}
              </Typography>
              <Typography>
                <strong>Start Date:</strong>{" "}
                {new Date(selectedProject.startDate).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>End Date:</strong>{" "}
                {new Date(selectedProject.endDate).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Supported Document Link:</strong>{" "}
                <Link
                  href={selectedProject.supportedDocumentLink}
                  target="_blank"
                  rel="noopener"
                >
                  View
                </Link>
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProjectDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for user details */}
      <Dialog open={openUserDialog} onClose={handleCloseUserDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <Typography>
                <strong>Name:</strong> {selectedUser.firstName}{" "}
                {selectedUser.lastName}
              </Typography>
              <Typography>
                <strong>Email:</strong>{" "}
                <Link href={`mailto:${selectedUser.email}`}>
                  {selectedUser.email}
                </Link>
              </Typography>
              {selectedUser.designation && (
                <Typography>
                  <strong>Designation:</strong> {selectedUser.designation}
                </Typography>
              )}
              {selectedUser.role && (
                <Typography>
                  <strong>Role:</strong> {selectedUser.role}
                </Typography>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for Approver Action */}
      <Dialog open={openApproverDialog} onClose={handleCloseApproverDialog}>
        <DialogTitle>Approver Action</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Skill Name: {selectedSkill ? selectedSkill.skillId.skillName : ""}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="comments"
            label={`Why ${selectedAction}?`}
            type="text"
            fullWidth
            multiline
            rows={6}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            variant="outlined"
            style={{ width: "100%", marginBottom: "20px" }}
            required
          />
          <Typography variant="body1">Rating*</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApproverDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => setConfirmationDialogOpen(true)}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmationDialogClose(true)}
            color="primary"
          >
            Yes
          </Button>
          <Button
            onClick={() => handleConfirmationDialogClose(false)}
            color="primary"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}
      >
        <DialogTitle>
          Status: {selectedPendingSkill ? selectedPendingSkill.status : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              <strong>Status:</strong>{" "}
              {selectedPendingSkill ? selectedPendingSkill.status : ""}
            </Typography>
            <Typography>
              <strong>Comments:</strong>{" "}
              {selectedPendingSkill ? selectedPendingSkill.comments || "" : ""}
            </Typography>
            <Typography>
              <strong>Rating:</strong>{" "}
              {selectedPendingSkill ? selectedPendingSkill.rating || "" : ""}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for success message */}
      <Snackbar
        open={!!popupMessage}
        autoHideDuration={6000} // Change duration as needed
        onClose={handlePopupClose}
        message={popupMessage}
      />
    </div>
  );
};

export default ApproverList;
