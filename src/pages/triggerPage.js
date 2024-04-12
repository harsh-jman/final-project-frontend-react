import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getLogsData, makeLog } from "../services/logs.service";
import { mlTrain, dataIngest, edaReport, dbtDocs, dbtRun } from "../services/triggers.service";
import { withStyles } from "@mui/styles";

const styles = {
  button: {
    width: "100%",
    height: "100%"
  }
};

const TriggerPage = ({ classes }) => {
  const [logsData, setLogsData] = useState([]);
  const tasks = ['Data Ingestion', 'ML Training', 'EDA Report', 'DBT Docs', 'DBT Run'];

  useEffect(() => {
    // Fetch logs data from API
    const fetchData = async () => {
      try {
        const response = await getLogsData();
        setLogsData(response);
        
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
      if (triggerResponse.status === 200) {
        // Prepare the data payload for makeLog
        const logData = {
          level: 'info', // Example value
          message: 'Data Ingestion completed successfully', // Example message
          task: 'Data Ingestion' // Example task
        };
  
        // Make a log entry with the prepared data payload
        await makeLog(logData);
  
        // Show success message as a popup
        alert("Data Ingestion completed successfully");
      } else {
        console.log("Invalid trigger response:", triggerResponse);
        alert("Data Ingestion failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  const handleMLTrainingClick = async () => {
    try {
      // Make the API call specific to ML Training task
      const triggerResponse = await mlTrain();
      console.log("Trigger data for ML Training:", triggerResponse);
  
      // Check if triggerResponse is valid (status code 200)
      if (triggerResponse.status === 200) {
        // Prepare the data payload for makeLog
        const logData = {
          level: 'info', // Example value
          message: 'ML Training completed successfully', // Example message
          task: 'ML Training' // Example task
        };
  
        // Make a log entry with the prepared data payload
        await makeLog(logData);
  
        // Show success message as a popup
        alert("ML Training completed successfully");
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
      const triggerResponse = await edaReport();
      console.log("Trigger data for EDA Report:", triggerResponse);
  
      // Check if triggerResponse is valid (status code 200)
      if (triggerResponse.status === 200) {
        // Prepare the data payload for makeLog
        const logData = {
          level: 'info', // Example value
          message: 'EDA Report completed successfully', // Example message
          task: 'EDA Report' // Example task
        };
  
        // Make a log entry with the prepared data payload
        await makeLog(logData);
  
        // Show success message as a popup
        alert("EDA Report completed successfully");
      } else {
        console.log("Invalid trigger response:", triggerResponse);
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
      if (triggerResponse.status === 200) {
        // Prepare the data payload for makeLog
        const logData = {
          level: 'info', // Example value
          message: 'DBT Docs completed successfully', // Example message
          task: 'DBT Docs' // Example task
        };
  
        // Make a log entry with the prepared data payload
        await makeLog(logData);
  
        // Show success message as a popup
        alert("DBT Docs completed successfully");
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
      if (triggerResponse.status === 200) {
        // Prepare the data payload for makeLog
        const logData = {
          level: 'info', // Example value
          message: 'DBT Run completed successfully', // Example message
          task: 'DBT Run' // Example task
        };
  
        // Make a log entry with the prepared data payload
        await makeLog(logData);
  
        // Show success message as a popup
        alert("DBT Run completed successfully");
      } else {
        console.log("Invalid trigger response:", triggerResponse);
        alert("DBT Run failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ paddingTop: "90px", width: "95%", margin: "auto", height: "100%", boxSizing: "border-box" }}>
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
              const taskLogs = logsData.find(log => log.task === task);
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      className={classes.button} 
                      onClick={() => {
                        switch (task) {
                          case 'Data Ingestion':
                            handleDataIngestionClick();
                            break;
                          case 'ML Training':
                            handleMLTrainingClick();
                            break;
                          case 'EDA Report':
                            handleEDAReportClick();
                            break;
                          case 'DBT Docs':
                            handleDBTDocsClick();
                            break;
                          case 'DBT Run':
                            handleDBTRunClick();
                            break;
                          default:
                            console.warn("Unhandled task:", task);
                        }
                      }}
                    >
                      {task}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {taskLogs ? (
                      <div>
                        <p>Task: {taskLogs.task}</p>
                        <p>Message: {taskLogs.message}</p>
                        <p>Level: {taskLogs.level}</p>
                        <p>Created At: {new Date(taskLogs.createdAt).toLocaleString()}</p>
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
