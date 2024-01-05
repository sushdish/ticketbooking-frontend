import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getAllCategories, createTrip } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
import { Select, MenuItem } from '@mui/material';

const AddProduct = () => {
  const defaultTheme = createTheme()
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    category: "",
    tripNumber: "",
    trips_details: {
      DestinationA: "",
      DestinationB: "",
      SeatCount: 0,
      StartTime: Date.now(),
      EndTime: Date.now(),
      BaggageAllowance: 0,
      TicketAmount: 0,
      SeatType: [],
      TravelClass: [],
      Currency: "",
      PaymentType: [],
      RewardPoints: 0,
    },
    loading: false,
    err: "",
    success:"false",
    message: "",
    createdTrip: "",
    getRedirect:"",
    categories: [],
  });

  const { name, category, tripNumber, trips_details, loading, err, createdTrip, getRedirect, categories, success, message } = values;

  const navigate = useNavigate();

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.err) {
        setValues({ ...values, err: data.err });
      } else {
        setValues({
          ...values,
          categories: data,
          // formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  const handleChange = (name) => (event) => {
    const value = event.target.value;
  
    if (name === 'trips_details') {
      
      const tripsDetails = { ...values.trips_details, [event.target.name]: value };
      setValues({ ...values, trips_details: tripsDetails });
    } else {
      setValues({ ...values, [name]: value });
     
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false,  success:false });
    createTrip(user._id, token, values )
      .then((data) => {
        if (data.err) {
          setValues({ ...values, err: data.err, sccess: false });
        } else {
          setValues({
            ...values,
            name: "",
            category: "",
            tripNumber: "",
            trips_details: {
              DestinationA: "",
              DestinationB: "",
              SeatCount: 0,
              StartTime: Date.now(),
              EndTime: Date.now(),
              BaggageAllowance: 0,
              TicketAmount: 0,
              SeatType: [],
              TravelClass: [],
              Currency: "",
              PaymentType: [],
              RewardPoints: 0,
            },
            loading: false,
            error: false,
            success: true,
            message: data.message,
            createdTrip: data,
          });;
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
            Create Trip
          </Typography>
          <Box component="form" onSubmit={onClick} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              onChange={handleChange("name")}
              value={values.name}
              label="Trip Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="tripNumber"
              onChange={handleChange("tripNumber")}
              value={values.tripNumber}
              label="Trip Number"
              name="tripNumber"
              autoComplete="tripNumber"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="DestinationA"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.DestinationA}
              label="DestinationA"
              name="DestinationA"
              autoComplete="DestinationA"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="DestinationB"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.DestinationB}
              label="DestinationB"
              name="DestinationB"
              autoComplete="DestinationB"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="SeatCount"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.SeatCount}
              label="SeatCount"
              name="SeatCount"
              autoComplete="SeatCount"
              autoFocus
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="BaggageAllowance"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.BaggageAllowance}
              label="BaggageAllowance"
              name="BaggageAllowance"
              autoComplete="BaggageAllowance"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="TicketAmount"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.TicketAmount}
              label="TicketAmount"
              name="TicketAmount"
              autoComplete="TicketAmount"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="SeatType"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.SeatType}
              label="SeatType"
              name="SeatType"
              autoComplete="SeatType"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="TravelClass"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.TravelClass}
              label="TravelClass"
              name="TravelClass"
              autoComplete="TravelClass"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Currency"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.Currency}
              label="Currency"
              name="Currency"
              autoComplete="Currency"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="PaymentType"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.PaymentType}
              label="PaymentType"
              name="PaymentType"
              autoComplete="PaymentType"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="RewardPoints"
              onChange={(event) => handleChange("trips_details")(event)}
              value={values.trips_details.RewardPoints}
              label="RewardPoints"
              name="RewardPoints"
              autoComplete="RewardPoints"
              autoFocus
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="Category"
              label="Category"
              select
              value={values.category}
              onChange={handleChange("category")}
              autoFocus
            >
              {/* Map through your category options and create MenuItem for each */}
              {categories.map((category, index) => (
                <MenuItem key={index} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Trip
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>

        {/* <Typography variant="subtitle1" component="div">
          Selected: {selectedValue}
        </Typography>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
          Open simple dialog
        </Button>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={onClose}
        /> */}
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );

  // const createTripForm = () => {
  //   return (
  //     <div className="row">
  //       <form className="col col-lg-6 col-md-8 col-sm-12">
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //             Trip Name
  //           </label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             name="name"
  //             value={values.name}
  //             onChange={handleChange("name")}
  //             id="name"
  //             placeholder="Trip Name"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //             Trip Number
  //           </label>
  //           <textarea
  //             type="text"
  //             rows="3"
  //             className="form-control"
  //             name="tripNumber"
  //             value={values.tripNumber}
  //             onChange={handleChange("tripNumber")}
  //             id="tripNumber"
  //             placeholder="TripNumber"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //             DestinationA
  //           </label>
  //           <input
  //             className="form-control"
  //             name="DestinationA"
  //             value={values.trips_details.DestinationA}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="DestinationA"
  //             placeholder="DestinationA"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="category" className="text-light">
  //             Category
  //           </label>
  //           <select
  //             className="form-control custom-select"
  //             name="category"
  //             value={values.category}
  //             onChange={handleChange("category")}
  //             id="category"
  //             required
  //           >
  //             <option defaultValue>Choose</option>

  //             {categories.map((category, index) => {
  //               return (
  //                 <option key={index} value={category._id}>
  //                   {category.name}
  //                 </option>
  //               );
  //             })}
  //           </select>
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           DestinationB
  //           </label>
  //           <input
  //             className="form-control"
  //             name="DestinationB"
  //             value={values.trips_details.DestinationB}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="DestinationB"
  //             placeholder="DestinationB"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           SeatCount
  //           </label>
  //           <input
  //             className="form-control"
  //             name="SeatCount"
  //             value={values.trips_details.SeatCount}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="SeatCount"
  //             placeholder="SeatCount"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           BaggageAllowance
  //           </label>
  //           <input
  //             className="form-control"
  //             name="BaggageAllowance"
  //             value={values.trips_details.BaggageAllowance}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="BaggageAllowance"
  //             placeholder="BaggageAllowance"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           TicketAmount
  //           </label>
  //           <input
  //             className="form-control"
  //             name="TicketAmount"
  //             value={values.trips_details.TicketAmount}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="TicketAmount"
  //             placeholder="TicketAmount"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           SeatType
  //           </label>
  //           <input
  //             className="form-control"
  //             name="SeatType"
  //             value={values.trips_details.SeatType}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="SeatType"
  //             placeholder="SeatType"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           TravelClass
  //           </label>
  //           <input
  //             className="form-control"
  //             name="TravelClass"
  //             value={values.trips_details.TravelClass}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="TravelClass"
  //             placeholder="TravelClass"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           Currency
  //           </label>
  //           <input
  //             className="form-control"
  //             name="Currency"
  //             value={values.trips_details.Currency}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="Currency"
  //             placeholder="Currency"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           PaymentType
  //           </label>
  //           <input
  //             className="form-control"
  //             name="PaymentType"
  //             value={values.trips_details.PaymentType}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="PaymentType"
  //             placeholder="PaymentType"
  //             required
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="categoryName" className="text-light">
  //           RewardPoints
  //           </label>
  //           <input
  //             className="form-control"
  //             name="RewardPoints"
  //             value={values.trips_details.RewardPoints}
  //             onChange={(event) => handleChange("trips_details")(event)}
  //             id="RewardPoints"
  //             placeholder="RewardPoints"
  //             required
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           className="btn btn-success btn-block"
  //           onClick={onClick}
  //         >
  //           Submit
  //         </button>
  //       </form>
  //     </div>
  //   );
  // };

  
  // const errorMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col col-lg-6 col-md-8 col-sm-12">
  //         <div className="alert alert-dark">{err}</div>
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

  // const loadingSpinner = () => {
  //   return (
  //     <div className="row">
  //       <div className="col col-lg-6 col-md-8 col-sm-12">
  //         <Spinner animation="border" variant="light" />
  //       </div>
  //     </div>
  //   );
  // };

  // return (
  //   <Base
  //     title="Add Trip"
  //     description="Welcome to Trip creation section!"
  //     className="container"
  //   >
  //     {loading && loadingSpinner()}
  //     {createdTrip && successMessage()}
  //     {err && errorMessage()}
  //     {/* {photoForm()} */}
  //     {createTripForm()}
  //     {getRedirect && <navigate to="/admin/dashboard" />}
  //   </Base>
  // );
};

export default AddProduct;
