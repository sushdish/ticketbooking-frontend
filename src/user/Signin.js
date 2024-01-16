import React from "react";
import { useState } from "react";
import Base from "../core/Base";
import { signin , authenticate, isAuthenticated} from "../auth/helper/index";
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


const Signin = () => {
  const defaultTheme = createTheme()
  const [values, setValues] = useState({
    email: "",
    password: "",
    err: "",
    success: false,
    loading: false,
  });

  const { email, password, err, success, loading } = values;
  const { user } = isAuthenticated();

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false, loading: false });
    signin({ email, password })
      .then((data) => {
        console.log(data, "BB")
        if (data.err) {
          setValues({ ...values, err: data.err, loading: false });
        } else {
          authenticate(data, () => {
            if (data.user && data.user.role === 1){
              setValues({...values, email: "", password: "", err: "", success: true, loading: true});

              navigate("/admin/admindashboard")
              // navigate("/")
            } else {
              setValues({...values, email: "", password: "", err: "", success: true, loading: true});

              navigate("/user/userdashboard")
            }
            
          });

        }
      })
      .catch(console.log("Signin request failed!"));
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/* {success == true ? (<Stack sx={{ width: '100%' }} spacing={2}>

          <Alert severity="success">{message} </Alert>
        </Stack>
        ) : ("")} */}
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

export default Signin;
