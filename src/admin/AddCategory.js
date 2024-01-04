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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom"
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const defaultTheme = createTheme()
  const [categoryName, setCategoryName] = useState({
    name: "",
    error: "",
    success: "false",
    message: '',
  });
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);

  const { token, user } = isAuthenticated();
  const {name, error, success, message} = categoryName

  const handleChange = (event) => {
    setCategoryName({...categoryName, error: "", [event.target.name]: event.target.value});
    // setError(false);
    // setSuccess(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setCategoryName({...categoryName, error: false, success: false})
    // setError(false);
    // setSuccess(false);

    createCategory(user._id, token, categoryName)
      .then((data) => {
        console.log(data, "AA")
        if (data.err) {
          setCategoryName({...categoryName, error: data.err, success: false});
        } else {
          setCategoryName({...categoryName, name: "", error: false, success: true, message: data.message});
          // setError(false);
          // setSuccess(true);
        }
      })
      .catch((err) => {
        // setError("Request Failed!");
        // setSuccess(false);
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {success == true ? (<Stack sx={{ width: '100%' }} spacing={2}>

          <Alert severity="success">{message} </Alert>
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
            Create Category
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              onChange={handleChange}
              value={name}
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
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
              Create Category
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Grid item >
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );










  // const categoryForm = () => {
  //   return (
  //     <div className="row">
  //       <form className="col col-lg-6 col-md-8 col-sm-12">
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //             Category Name
  //           </label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             name="categoryName"
  //             value={categoryName}
  //             onChange={handleChange}
  //             id="categoryName"
  //             placeholder="Ex. Mode of Transport"
  //             required
  //             autoFocus
  //           />
  //           <button
  //             type="submit"
  //             className="btn btn-success mt-2"
  //             onClick={onSubmit}
  //           >
  //             Create
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };

  // const errorMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col col-lg-6 col-md-8 col-sm-12">
  //         <div className="alert alert-dark">{error}</div>
  //       </div>
  //     </div>
  //   );
  // };

  // const successMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col col-lg-6 col-md-8 col-sm-12">
  //         <div className="alert alert-success">Success</div>
  //       </div>
  //     </div>
  //   );
  // };

  // return (
  //   <Base
  //     title="Create Category"
  //     description="Add a new category for products"
  //     className="container"
  //   >
  //     {error && errorMessage()}
  //     {success && successMessage()}
  //     {categoryForm()}
  //   </Base>
  // );
};

export default AddCategory;
