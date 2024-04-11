// ForgetPasswordForm.js

import React, { useState } from "react";
import { sendResetEmail } from "../services/authService.service";
import Loading from "./loading.component";
import "./forgetPassword.css";
import forget from "../assets/forget.svg";
import { Modal } from "@material-ui/core";

import { Link } from "react-router-dom";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Call the API to send the reset password email
      await sendResetEmail(email);
      setIsLoading(false);
      setMessage("Reset password email sent!");
    } catch (error) {
      setMessage("Error sending reset password email");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="forget-password-form">
        <h2>Forgot Password?</h2>
        <div
          style={{
            width: "225px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "35px",
          }}
        >
          <img src={forget} alt="login" style={{ width: "100%" }} />
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputCon">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="btnCon">
            <button type="submit">Send Reset Email</button>
          </div>
          {message && (
            <Modal>
              <p>{message}</p>
            </Modal>
          )}
        </form>
        <Link to="/login" className="link">Back to Login</Link>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
