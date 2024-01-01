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
  });

  const { name, email, password, gender, contact, err, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false });
    signup({ name, email, password, gender, contact })
      .then((data) => {
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
          });
        }
      })
      .catch(console.log("Error signing up!"));
  };

  const signupForm = () => {
    return (
      // <div className="row">
      //   <form className="col-lg-6 col-md-8 col-sm-12">
      //     <div className="form-row">
      //       <div className="form-group ">
      //         <label htmlFor="name" className="text-light">
      //           First Name
      //         </label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           value={name}
      //           onChange={handleChange("name")}
      //           name="name"
      //           id="name"
      //         />
      //       </div>
      //     </div>
      //     <div className="form-group">
      //       <label htmlFor="email" className="text-light">
      //         Email
      //       </label>
      //       <input
      //         type="email"
      //         className="form-control"
      //         value={email}
      //         onChange={handleChange("email")}
      //         name="email"
      //         id="email"
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label htmlFor="password" className="text-light">
      //         Password
      //       </label>
      //       <input
      //         type="password"
      //         className="form-control"
      //         value={password}
      //         onChange={handleChange("password")}
      //         name="password"
      //         id="password"
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label htmlFor="gender" className="text-light">
      //         Gender
      //       </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={gender}
      //         onChange={handleChange("gender")}
      //         name="gender"
      //         id="gender"
      //       />
      //     </div>
      //     <div className="form-group ">
      //       <label htmlFor="contact" className="text-light">
      //         Contact Number
      //       </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={contact}
      //         onChange={handleChange("contact")}
      //         name="contact"
      //         id="contact"
      //       />
      //     </div>
      //     <button
      //       type="submit"
      //       onClick={onSubmit}
      //       className="btn btn-block btn-outline-success"
      //     >
      //       Sign Up
      //     </button>
      //   </form>
      // </div>
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {success == true ? (<Stack sx={{ width: '100%' }} spacing={2}>

          <Alert severity="success">{onSubmit} </Alert>
        </Stack>
        ) : ("")}
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item >
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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

  const erroronSubmit = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <div className="alert alert-dark">{err}</div>
        </div>
      </div>
    );
  };

  const successonSubmit = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <div className="alert alert-success">
            Successfully signedup user, please{" "}
            <Link className="alert-link" to="/signin">
              Signin
            </Link>{" "}
            here
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Base title="Signup" description="Signup to explore!" className="container">
      </Base>
        {err && erroronSubmit()}
        {success && successonSubmit()}
        {signupForm()}
    </div>
  );
};

export default Signup;