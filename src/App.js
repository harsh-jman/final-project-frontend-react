// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.page";
import UserManagement from "./pages/userManagement.page";
import ResetPasswordPage from "./pages/resetPassword.page";
import UserPage from "./pages/user.page";
import ProfilePage from "./pages/profile.page";
import ForgetPasswordPage from "./pages/ForgetPassword.page";
import ProtectedRoute from "./components/ProtectedRoute.component";
import { logoutUser } from "./services/authService.service";
import Layout from "./pages/layout.page"; // Import the Layout component
import AddViewSkillsPage from "./pages/AddViewSkillsPage";
import OwnSkillHubPage from "./pages/OwnSkillHubPage.page";
import Approver from "./pages/Approver.page";
import AdminPage from "./pages/admin.page";
import HomePage from "./pages/HomePage";
import TemperatureRecommendationForm from "./components/ml.component";

function App() {
  return (
    <Router>
      <Layout>
        {" "}
        {/* Use the Layout component */}
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route
            path="/approverDesk"
            element={
              <ProtectedRoute>
                <Approver />
              </ProtectedRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/skills"
            element={
              <ProtectedRoute>
                <AddViewSkillsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-user"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/ML"
            element={
              <ProtectedRoute>
                <TemperatureRecommendationForm/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skill-hub"
            element={
              <ProtectedRoute>
                <OwnSkillHubPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

const LogoutPage = () => {
  logoutUser();
  return null;
};

export default App;
