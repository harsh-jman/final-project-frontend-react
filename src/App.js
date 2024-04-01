// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.page";
import AdminPage from "./pages/AdminPage.page";
import AdminCreateUser from "./pages/admin-createuser";
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

function App() {
  return (
    <Router>
      <Layout>
        {" "}
        {/* Use the Layout component */}
        <Routes>
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
                <AdminCreateUser />
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
          <Route path="/user/skill-hub" element={<OwnSkillHubPage />} />

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
