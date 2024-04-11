// UserPage.js

import React from "react";

const AdminPage = () => {
  return (
    <div
      style={{
        paddingTop: "90px",
        width: "95%",
        margin: "auto",
        height: "100%",
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <iframe
          title="FinalProject"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/reportEmbed?reportId=b4c3613e-4b20-45e9-8879-63c3a57dd748&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default AdminPage;
