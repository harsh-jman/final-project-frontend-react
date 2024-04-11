import React, { useState } from "react";
import LoginForm from "../components/LoginForm.component";
import { loginUser } from "../services/authService.service";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./LoginPage.css";

import Loading from "../components/loading.component";

import login from "../assets/login.svg";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await loginUser(credentials);
      setIsLoading(false);
      handleLoginResponse(response);
    } catch (error) {
      setIsLoading(false);
      setError("Error occurred during login");
    }
  };

  const handleLoginResponse = (response) => {
    if (response.forcePasswordReset === true) {
      // Display a popup or alert notifying the user about password reset
      alert("You need to reset your password.");
      // Navigate to reset password page after the user acknowledges the message
      navigate("/reset-password");
    } else if (response.message === "Login successful") {
      const role = response.role;
      const token = response.token;
      const name = response.firstName;
      // Calculate expiration time in 1 hour

      Cookies.set("username", name, { expires: 1 / 24 });
      // Set token with expiration time of 1 hour
      Cookies.set("token", token, { expires: 1 / 24 }); // 1 hour = 1/24 day
      Cookies.set("role", role, { expires: 1 / 24 });
      navigate(role === "user" ? "/user" : "/admin");
    } else {
      setIsLoading(false);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="hello">
      <header className="loginHeader">
        <Link to={"/"}>
          <h2>My App</h2>
        </Link>
      </header>
      <div className="main-con">
        {isLoading && <Loading />}
        <div className="login-page-container">
          <div className="abc">
            <div className="image-con">
              <img src={login} alt="login" />
              {/* <h2>Make your work easy and organized</h2> */}
            </div>
          </div>
        </div>
        <div className="form-con">
          <h2>
            Welcome <span>Back!</span>
          </h2>
          <p>
            Your gateway to endless possibilities awaits. Login to unlock a
            world of personalized experiences tailored just for you. Let's
            journey together!
          </p>
          <LoginForm onLogin={handleLogin} />
          {error && (
            <span style={{ position: "absolute", bottom: "18%", color: "red" }}>
              {error}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
