// ResetPasswordPage.js
import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm.component"; // Assuming you have a component for the reset password form
import "./ResetPasswordPage.css";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  return (
    <>
      <header className="loginHeader">
        <Link to={"/"}>
          <h2>Skill Matrix</h2>
        </Link>
      </header>

      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#303F9F"
            fillOpacity="1"
            d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,96C672,75,768,117,864,149.3C960,181,1056,203,1152,186.7C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="reset-password-page-container">
        <ResetPasswordForm />
        {/* Add other content for the reset password page */}
      </div>
    </>
  );
};

export default ResetPasswordPage;
