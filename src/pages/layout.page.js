// Layout.js

import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar.component";

const Layout = ({ children }) => {
  const location = useLocation();

  // List of routes where navbar should not be displayed
  const noNavbarRoutes = ["/login", "/reset-password", "/forget-password"];

  // Check if the current route is in the list of routes where navbar should not be displayed
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <div style={{ height: "100%" }}>
      {!hideNavbar && <Navbar />}
      <div className="content" style={{ height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
