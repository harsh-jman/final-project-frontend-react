import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.page'; // Updated import
import AdminPage from './pages/AdminPage.page';
import AdminCreateUser from './pages/admin-createuser';
import ProtectedRoute from './components/ProtectedRoute.component';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/admin/create-user" element={<ProtectedRoute><AdminCreateUser /></ProtectedRoute>} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
