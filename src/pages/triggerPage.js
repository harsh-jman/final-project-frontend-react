import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getLogsData } from "../services/logs.service";
import {
  mlTrain,
  dataIngest,
  edaReport,
  dbtDocs,
  dbtRun,
  edaReportView,
  dbtDocsView
} from "../services/triggers.service";
import { withStyles } from "@mui/styles";

const styles = {
  button: {
    width: "100%",
    height: "100%",
  },
  dbtDocsButton: {
    marginRight: "10px", // Add margin to the right side of the DBT Docs button
  },
};



const TriggerPage = ({ classes }) => {
  const [logsData, setLogsData] = useState([]);

  const navigate = useNavigate();
  const tasks = [
    "Data Ingestion",
    "ML Training",
    "EDA Report",
    "DBT Docs",
    "DBT Run",
  ];

  useEffect(() => {
    // Fetch logs data from API
    const fetchData = async () => {
      try {
        const response = await getLogsData();
        setLogsData(response);
        // No need to set logs data here
      } catch (error) {
        console.error("Error fetching logs data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDataIngestionClick = async () => {
    try {
      // Make the API call specific to Data Ingestion task
      const triggerResponse = await dataIngest();
      console.log("Trigger data for Data Ingestion:", triggerResponse);
      // Check if triggerResponse is valid (status code 200)
      if (triggerResponse.status === "success") {
        alert(
          `Data Ingestion completed successfully. Time taken: ${triggerResponse.TimeTaken} ms`
        );
      } else {
        console.log("Invalid trigger response:", triggerResponse);
        alert("Data Ingestion failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred: " + error.message);
    }
  };

  const handleMLTrainingClick = async () => {
    try {
      // Make the API call specific to ML Training task
      const triggerResponse = await mlTrain();
      console.log("Trigger data for ML Training:", triggerResponse);
      // Check if triggerResponse is valid (status code 200)
      if (triggerResponse.status === "success") {
        alert(
          `ML Training completed successfully. Time taken: ${triggerResponse.TimeTaken} ms`
        );
      } else {
        console.log("Invalid trigger response:", triggerResponse);
        alert("ML Training failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  const handleEDAReportClick = async () => {
    try {
      // Make the API call specific to EDA Report task
      const response = await edaReport(); // Assuming edaReport is a function that makes API call

      if (response.status === "success") {
        alert(
          `EDA Report completed successfully. Time taken: ${response.TimeTaken} ms`
        );
      } else {
        console.log("Invalid trigger response:", response);
        alert("EDA Report failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  const handleDBTDocsClick = async () => {
    try {
      // Make the API call specific to DBT Docs task
      const triggerResponse = await dbtDocs();
      console.log("Trigger data for DBT Docs:", triggerResponse);

      // Check if triggerResponse is valid (status code 200)
      if (triggerResponse.status === "success") {
        alert(
          `DBT Docs completed successfully. Time taken: ${triggerResponse.TimeTaken} ms`
        );
      } else {
        console.log("Invalid trigger response:", triggerResponse);
        alert("DBT Docs failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  const handleDBTRunClick = async () => {
    try {
      // Make the API call specific to DBT Run task
      const triggerResponse = await dbtRun();
      console.log("Trigger data for DBT Run:", triggerResponse);

      // Check if triggerResponse is valid (status code 200)
      if (triggerResponse.status === "success") {
        alert(
          `DBT Run completed successfully. Time taken: ${triggerResponse.TimeTaken} ms`
        );
      } else {
        console.log("Invalid trigger response:", triggerResponse);
        alert("DBT Run failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  const handleEDAView = async () => {
    try {
      const response = await edaReportView();
      const blob = new Blob([response], { type: 'text/html' });
      const timestamp = new Date().toISOString().replace(/:/g, '-'); // Get current timestamp
      const filename = `EDA_Report_${timestamp}.html`; // Construct filename with timestamp
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Use filename with timestamp
      document.body.appendChild(link);
  
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    }
  };

  const handleDBTView = () => {
    try {
      const url = process.env.REACT_APP_DBT_VIEW_URL;
      if (url) {
        window.open(url, '_blank'); // Open URL in a new tab
      } else {
        console.error('URL not found in environment variables.');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
  

  return (
    <div
      style={{
        paddingTop: "90px",
        width: "95%",
        margin: "auto",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tasks</TableCell>
              <TableCell>Last Trigger</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => {
              const taskLogs = logsData.find((log) => log.task === task);
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className={classes.actionButtons}>
                      <Button
                        variant="contained"
                        className={`${classes.button} ${
                          task === "DBT Docs" ? classes.dbtDocsButton : ""
                        }`} // Conditionally apply dbtDocsButton class
                        onClick={() => {
                          switch (task) {
                            case "Data Ingestion":
                              handleDataIngestionClick();
                              break;
                            case "ML Training":
                              handleMLTrainingClick();
                              break;
                            case "DBT Run":
                              handleDBTRunClick();
                              break;
                            case "EDA Report":
                              handleEDAReportClick();
                              break;
                            case "DBT Docs":
                              handleDBTDocsClick();
                              break;
                            default:
                              console.warn("Unhandled task:", task);
                          }
                        }}
                      >
                        {task}
                      </Button>
                      {task === "DBT Docs" && (
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={handleDBTView}
                        >
                          View
                        </Button>
                      )}

                      {task === "EDA Report" && (
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={handleEDAView}
                        >
                          View
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {taskLogs ? (
                      <div>
                        <p>{new Date(taskLogs.createdAt).toLocaleString()}</p>
                      </div>
                    ) : (
                      <p>Not triggered yet</p>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withStyles(styles)(TriggerPage);
