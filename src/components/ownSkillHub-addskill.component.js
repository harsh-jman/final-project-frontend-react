import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Snackbar,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoIcon from '@material-ui/icons/Info';

import { addUserSkills, getAllSkills } from "../services/skills.service";

const OwnSkillHubPage = () => {
  const [open, setOpen] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [skill, setSkill] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [certificateDescription, setCertificateDescription] = useState("");
  const [issuingAuthority, setIssuingAuthority] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [validityPeriodMonths, setValidityPeriodMonths] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [certificateSupportedDocumentLink, setCertificateSupportedDocumentLink] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectSupportedDocumentLink, setProjectSupportedDocumentLink] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchSkills = async () => {
    try {
      const skills = await getAllSkills();
      setSkillList(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };
  

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // Reset all state values to initial empty values
    setSkill("");
    setProficiency("");
    setCertificateName("");
    setCertificateId("");
    setCertificateDescription("");
    setIssuingAuthority("");
    setIssueDate("");
    setValidityPeriodMonths("");
    setCertificateSupportedDocumentLink("");
    setProjectName("");
    setProjectDescription("");
    setStartDate("");
    setEndDate("");
    setProjectSupportedDocumentLink("");
    setOpen(false);
  };

  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;
    setSkill(selectedSkill);
    const selectedSkillObject = skillList.find(skillItem => skillItem.skillName === selectedSkill);
    setSelectedSkillId(selectedSkillObject._id);
  };

  const handleSave = async () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = (confirmed ) => {
    if (confirmed) {
      const data = {
        skillId: selectedSkillId,
        proficiency,
        certificate: {
          certificateName,
          certificateId,
          description: certificateDescription,
          issuingAuthority,
          issueDate,
          validityPeriodMonths,
          supportedDocumentLink: certificateSupportedDocumentLink,
        },
        projectExperience: {
          projectName,
          description: projectDescription,
          startDate,
          endDate,
          supportedDocumentLink: projectSupportedDocumentLink,
        },
      };

      addUserSkills(data)
        .then(() => {
          setSnackbarMessage('Skill submitted successfully!');
          setSnackbarOpen(true);
          handleClose();
          // Fetch skills again after submission
          
        })
        .catch((error) => {
          console.error('Error submitting skill:', error);
          if (error.response && error.response.data && error.response.data.error === "Certificate already exists") {
            setSnackbarMessage("Certificate already exists");
          } else {
            setSnackbarMessage(error.response && error.response.data && error.response.data.error ? `Error: ${error.response.data.error}` : 'An error occurred while saving.');
          }
          setSnackbarOpen(true);
        });
    }
    setConfirmDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add Own Skill
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Own Skill</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="skill-label">Select Skill</InputLabel>
                <Select
                  labelId="skill-label"
                  id="skill"
                  value={skill}
                  onChange={handleSkillChange}
                >
                  {skillList.map((skillItem) => (
                    <MenuItem key={skillItem.id} value={skillItem.skillName}>{skillItem.skillName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="proficiency-label">
                  Proficiency Level
                </InputLabel>
                <Select
                  labelId="proficiency-label"
                  id="proficiency"
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="certificate-content"
              id="certificate-header"
            >
              <Typography>Certificate</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <TextField
                  margin="normal"
                  id="certificateName"
                  label="Certificate Name"
                  type="text"
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.target.value)}
                  fullWidth
                />
                <TextField
                  margin="normal"
                  id="certificateId"
                  label="Certificate ID"
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  fullWidth
                />
                <TextField
                  margin="normal"
                  id="certificateDescription"
                  label="Description"
                  multiline
                  rows={4}
                  value={certificateDescription}
                  onChange={(e) => setCertificateDescription(e.target.value)}
                  fullWidth
                />
                <TextField
                  margin="normal"
                  id="issuingAuthority"
                  label="Issuing Authority"
                  type="text"
                  value={issuingAuthority}
                  onChange={(e) => setIssuingAuthority(e.target.value)}
                  fullWidth
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextField
                    margin="normal"
                    id="issueDate"
                    label="Issue Date"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ marginRight: "10px" }}
                  />
                  <TextField
                    margin="normal"
                    id="validityPeriodMonths"
                    label="Validity Period (Months)"
                    type="number"
                    value={validityPeriodMonths}
                    onChange={(e) => setValidityPeriodMonths(e.target.value)}
                    fullWidth
                    style={{ width: "50%" }}
                  />
                </div>
                <TextField
                  margin="normal"
                  id="certificateSupportedDocumentLink"
                  label="Supported Document Link"
                  type="text"
                  value={certificateSupportedDocumentLink}
                  onChange={(e) => setCertificateSupportedDocumentLink(e.target.value)}
                  fullWidth
                />
                <Tooltip title="Make Sure link is publicly accessible">
                  <InfoIcon />
                </Tooltip>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="project-content"
              id="project-header"
            >
              <Typography>Project Experience</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <TextField
                  margin="normal"
                  id="projectName"
                  label="Project Name"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  fullWidth
                />
                <TextField
                  margin="normal"
                  id="projectDescription"
                  label="Description"
                  multiline
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  fullWidth
                />
                <TextField
                  margin="normal"
                  id="startDate"
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  id="endDate"
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  id="projectSupportedDocumentLink"
                  label="Supported Document Link"
                  type="text"
                  value={projectSupportedDocumentLink}
                  onChange={(e) => setProjectSupportedDocumentLink(e.target.value)}
                  fullWidth
                />
                <Tooltip title="Make Sure link is publicly accessible">
                  <InfoIcon />
                </Tooltip>
              </div>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDialogOpen}
        onClose={() => handleConfirmDialogClose(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit this skill?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmDialogClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleConfirmDialogClose(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default OwnSkillHubPage;
