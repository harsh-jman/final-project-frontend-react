import React from "react";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import "./userPage.css";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    display: "flex",
    maxWidth: "95%",
    margin: "auto",
    alignItems: "center",
    height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
}));

const dummyData = [
  {
    totalUserSkills: 3,
    skillStatusCounts: [
      {
        _id: "Approved",
        count: 0,
      },
      {
        _id: "Rejected",
        count: 1,
      },
      {
        _id: "Pending",
        count: 2,
      },
    ],
    approverStatusCounts: [
      {
        _id: "Approved",
        count: 0,
      },
      {
        _id: "Rejected",
        count: 0,
      },
      {
        _id: "Pending",
        count: 1,
      },
    ],
    averageHackerRankScore: 0,
    averageRating: 2,
    notCoveredCertificateNames: ["sdada"],
    notCoveredSkillNames: [
      "JavaScript",
      "Python Programming",
      "Data Analysis",
      "Project Management",
      "Cloud Computing",
      "Mobile App Development",
      "test",
      "123",
      "adada",
      "dasda",
      "add",
    ],
  },
  {
    approvalDeskCounts: [
      {
        _id: "Approved",
        count: 0,
      },
      {
        _id: "Rejected",
        count: 1,
      },
      {
        _id: "Pending",
        count: 2,
      },
    ],
  },
];

const UserPage = () => {
  const classes = useStyles();

  // Extracting data from dummyData
  const {
    skillStatusCounts,
    notCoveredSkillNames,
    notCoveredCertificateNames,
  } = dummyData[0];

  const approvedCount = skillStatusCounts.find(
    (status) => status._id === "Approved"
  ).count;
  const pendingCount = skillStatusCounts.find(
    (status) => status._id === "Pending"
  ).count;
  const rejectedCount = skillStatusCounts.find(
    (status) => status._id === "Rejected"
  ).count;

  // Extracting data from user approval desk dummyData
  const { approvalDeskCounts } = dummyData[1];

  const approvalDeskApprovedCount = approvalDeskCounts.find(
    (status) => status._id === "Approved"
  ).count;
  const approvalDeskPendingCount = approvalDeskCounts.find(
    (status) => status._id === "Pending"
  ).count;
  const approvalDeskRejectedCount = approvalDeskCounts.find(
    (status) => status._id === "Rejected"
  ).count;

  return (
    <div
      className={classes.container}
      style={{
        position: "fixed",
        paddingTop: "95px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        paddingBottom: '30px'
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Total User Skills:</h3>
                  <h1>{dummyData[0].totalUserSkills}</h1>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Average HackerRank Score:</h3>
                  <h1>{dummyData[0].averageHackerRankScore}</h1>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Average Rating:</h3>
                  <h1>{dummyData[0].averageRating}</h1>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                style={{
                  height: "55px",
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h4>Data from User Skill Hub</h4>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Approval:</h3>
                  <h1> {approvedCount}</h1>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Pending:</h3>
                  <h1>{pendingCount}</h1>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Rejected:</h3>
                  <h1>{rejectedCount}</h1>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                style={{
                  height: "55px",
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <h4>Data from User Approval Desk</h4>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Approval:</h3>
                  <h1> {approvalDeskApprovedCount}</h1>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Pending:</h3>
                  <h1> {approvalDeskPendingCount}</h1>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <div>
                  <h3>Rejected:</h3>
                  <h1> {approvalDeskRejectedCount}</h1>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div className="skillListContainer">
                  <h3>Certifications By Other User:</h3>
                  <ul>
                    {notCoveredCertificateNames.map((skill, index) => (
                      <li key={index} className="skillItem">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div className="skillListContainer">
                  <h3>Not Covered Skill Names:</h3>
                  <ul>
                    {notCoveredSkillNames.map((skill, index) => (
                      <li key={index} className="skillItem">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserPage;
