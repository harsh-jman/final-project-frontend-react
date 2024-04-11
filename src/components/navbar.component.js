import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService.service";
import Cookies from "js-cookie"; // Import Cookies library
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core"; // Import Material-UI components
import "./navbar.css"; // You may not need this if you're not using it elsewhere
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#303F9F", // Change background color to a shade of blue
    padding: "6px 18px",
    margin: "0 auto 0 auto",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: "#f44336", // Change background color to red
    "&:hover": {
      backgroundColor: "#d32f2f", // Darker shade of red on hover
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // State to store user role
  const [showSmallNav, setShowSmallNav] = useState(false);
  const [userName, setUserName] = useState("");
  const classes = useStyles(); // Use the custom styles

  const token = Cookies.get("token");

  useEffect(() => {
    // Read role from cookies when component mounts
    const userRole = Cookies.get("role");
    const storedUsername = Cookies.get("username");
    setRole(userRole);
    setUserName(storedUsername);

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    // If screen width is greater than 968px, hide small nav
    if (window.innerWidth > 968) {
      setShowSmallNav(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar className="toolbar">
        <div className="container">
          <Typography variant="h5">
            <span style={{ color: "#D32F2F" }}>Hey! </span>
            {role === "user" ? `${userName}` : "Admin"}
          </Typography>

          <div className="bigNav">
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/skill-hub" color="inherit">
              My Skill Hub
            </Button>
            {role === "admin" && (
              <>
                <Button
                  component={Link}
                  to="/admin/create-user"
                  color="inherit"
                >
                  User Management
                </Button>
                <Button component={Link} to="/admin/skills" color="inherit">
                  Skill Management
                </Button>
                <Button component={Link} to="/approverDesk" color="inherit">
                  Approver Desk
                </Button>
              </>
            )}
            {role === "user" && (
              <>
                <Button component={Link} to="/approverDesk" color="inherit">
                  Approver Desk
                </Button>
              </>
            )}
            <Button component={Link} to="/user/profile" color="inherit">
              Profile
            </Button>
          </div>
          <div className="bigNav">
            <Button
              className={classes.logoutButton}
              onClick={handleLogout}
              color="inherit"
            >
              {token ? "Logout" : "Login"}
            </Button>
          </div>
        </div>

        {showSmallNav && (
          <div
            style={{
              position: "fixed",
              top: "0%",
              left: "0px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              backgroundColor: "#303F9F",
              padding: "6px 8px",
              boxSizing: "border-box",
              justifyContent: "flex-start",
            }}
            className="smallNav"
          >
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "100%",
                padding: "0 24px",
                gao: "8px",
              }}
            >
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button
                component={Link}
                to="/skill-hub"
                color="inherit"
                onClick={() => setShowSmallNav(false)}
              >
                My Skill Hub
              </Button>
              {role === "admin" && (
                <>
                  <Button
                    component={Link}
                    to="/admin/create-user"
                    color="inherit"
                    onClick={() => setShowSmallNav(false)}
                  >
                    User Management
                  </Button>
                  <Button
                    component={Link}
                    to="/admin/skills"
                    color="inherit"
                    onClick={() => setShowSmallNav(false)}
                  >
                    Skill Management
                  </Button>
                  <Button
                    component={Link}
                    to="/approverDesk"
                    color="inherit"
                    onClick={() => setShowSmallNav(false)}
                  >
                    Approver Desk
                  </Button>
                </>
              )}
              {role === "user" && (
                <>
                  <Button
                    component={Link}
                    to="/approverDesk"
                    color="inherit"
                    onClick={() => setShowSmallNav(false)}
                  >
                    Approver Desk
                  </Button>
                </>
              )}
              <Button
                component={Link}
                to="/user/profile"
                color="inherit"
                onClick={() => setShowSmallNav(false)}
              >
                Profile
              </Button>
            </div>
            <Button
              className={classes.logoutButton}
              onClick={handleLogout}
              color="inherit"
              style={{ marginLeft: "0px" }}
            >
              {token ? "Logout" : "Login"}
            </Button>
          </div>
        )}

        <div className="toggleBtn">
          <button onClick={() => setShowSmallNav(!showSmallNav)}>
            <MenuIcon />
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
