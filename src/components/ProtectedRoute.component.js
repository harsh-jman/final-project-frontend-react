// components/routing/ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token") || sessionStorage.getItem("token");
  // let location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
