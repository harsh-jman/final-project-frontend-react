import React from 'react';
import ApproverList from '../components/Approver.component';


const Approver = () => {
  return (
    <div style={{paddingTop: '90px', width: '95%', margin: 'auto'}}>
      <h1 style={{textAlign: 'center'}}>Welcome to Aproval Desk</h1>
      <ApproverList />
    </div>
  );
};

export default Approver;
