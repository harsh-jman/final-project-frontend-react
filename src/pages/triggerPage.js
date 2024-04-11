import React from "react";
import Button from "@mui/material/Button";

const TriggerPage = () => {
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
      <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Button variant="contained">ABC</Button>
        <Button variant="contained">ABC</Button>
        <Button variant="contained">ABC</Button>
        <Button variant="contained">ABC</Button>
      </div>
    </div>
  );
};

export default TriggerPage;
