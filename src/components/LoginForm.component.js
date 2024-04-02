import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    margin: theme.spacing(1, 0),
  },
  submitButton: {
    margin: theme.spacing(2, 0),
  },
}));

const LoginForm = ({ onLogin }) => {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
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
            </form>
        </Paper>
    );
};

export default LoginForm;
