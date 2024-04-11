import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    padding: theme.spacing(3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  inputField: {
    margin: theme.spacing(1, 0),
  },
  submitButton: {
    margin: theme.spacing(4, 0, 2, 0),
    borderRadius: '8px'
  },
  forgotBtn:{
    position: "absolute",
    top:" 55%",
    right: "0"
    
  },
  btns:{
    backgroundColor: 'transparent',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
    color: '#6c6c6c'
  }
}));

const LoginForm = ({ onLogin }) => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  const handleForgotPassword = () => {
    navigate("/forget-password");
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.inputField}
          label="Email"
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          size="small"
        />
        <TextField
          className={classes.inputField}
          label="Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          size="small"
        />
        <Button
          className={classes.submitButton}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
        <div className={classes.forgotBtn}>
          <button onClick={handleForgotPassword} className={classes.btns}>Forgot password?</button>
        </div>
      </form>
    </Paper>
  );
};

export default LoginForm;
