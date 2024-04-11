// ForgetPasswordForm.js

import React, { useState } from "react";
import { sendResetEmail } from "../services/authService.service";
import Loading from "./loading.component";
import "./forgetPassword.css";
import forget from "../assets/forget.svg";
import { Modal } from "@material-ui/core";

import { Link, useNavigate } from "react-router-dom";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
      setEmail("");
      setMessage("Reset password email sent!");
      setOpenDialog(true);
    } catch (error) {
      setError("Error sending reset password email");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleOk = () => {
    setOpenDialog(false);
    navigate("/login");
  };

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
          <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
            <div className="dialog">
              <p>{message}</p>
              <div className="okBtn">
                <button onClick={handleOk}>OK</button>
              </div>
            </div>
          </Modal>
        </form>
        <Link to="/login" className="link">
          Back to Login
        </Link>
      </div>
      {error && (
        <p
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "red",
          }}
        >
          {error}
        </p>
      )}
    </>
  );
};

export default ForgetPasswordForm;
