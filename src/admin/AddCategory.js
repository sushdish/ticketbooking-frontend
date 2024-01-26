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
import Navbar from "../core/components/NavBarv2"

const AddCategory = () => {
  const defaultTheme = createTheme()
  const [categoryName, setCategoryName] = useState({
    name: "",
    error: "",
    success: "false",
    message: '',
  });
 
  const { token, user } = isAuthenticated();
  const {name, error, success, message} = categoryName

  const handleChange = (event) => {
    setCategoryName({...categoryName, error: "", [event.target.name]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setCategoryName({...categoryName, error: false, success: false})
   

    createCategory(user._id, token, categoryName)
      .then((data) => {
        console.log(data, "AA")
        if (data.err) {
          setCategoryName({...categoryName, error: data.err, success: false});
        } else {
          setCategoryName({...categoryName, name: "", error: false, success: true, message: data.message});
          console.log(categoryName, "52")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
   
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Navbar/>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Category
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
    
    
    
  ); 
};

export default AddCategory;
