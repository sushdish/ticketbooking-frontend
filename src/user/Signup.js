import React from "react";
import { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import Tabs from '@material-ui/core/Tabs';
// import LinkTab from '../core/LinkTab';
// import Tab from '@material-ui/core/Tab';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const defaultTheme = createTheme()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    contact: "",
    err: "",
    success: false,
    message: '',
  });

  const navigate = useNavigate();
  const { name, email, password, gender, contact, err, success, message } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: "", [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false });
    signup({ name, email, password, gender, contact })
      .then((data) => {
        console.log(data, "A")
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
        } else {
      
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            gender: "",
            contact: "",
            err: false,
            success: true,
            message: data.message
          });
          navigate("/signin")
        }
      })
      .catch(console.log("Error signing up!"));
      // alert(data.body.message);
  };

  // const signupForm = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {success ===   true ? (<Stack sx={{ width: '100%' }} spacing={2}>

          <Alert severity="success">{message} </Alert>
        </Stack>
        ) : ("")}
        {success === false && err !== "" && (<Stack sx={{ width: '100%'}} spacing={2}>
          <Alert severity="error">{err}</Alert>
        </Stack>
        )}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              onChange={handleChange("name")}
              value={name}
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={handleChange("email")}
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={handleChange("password")}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            value={gender}
            onChange={handleChange("gender")}
            name="gender"
            label="gender"
            type="gender"
            id="gender"
            autoComplete="gender"
          />
           <TextField
            margin="normal"
            required
            fullWidth
            value={contact}
            onChange={handleChange("contact")}
            name="contact"
            label="contact"
            type="contact"
            id="contact"
            autoComplete="contact"
          />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              
              <Grid item >
                <Link href="/signin" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>

            </Grid>
            
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
    );
  };
 

export default Signup;