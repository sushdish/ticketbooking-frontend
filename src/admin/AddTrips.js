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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Navbar from "../core/components/NavBarv2"

const AddProduct = () => {
  const defaultTheme = createTheme()
  const { user, token } = isAuthenticated();


  const [startTime, setStartTime] = useState(dayjs(Date.now()));
  const [endTime, setEndTime] = useState(dayjs(Date.now()))

  const [values, setValues] = useState({
    name: "",
    category: "",
    tripNumber: "",
    trips_details: {
      DestinationA: "",
      DestinationB: "",
      SeatCount: 0,
      StartTime: startTime,
      EndTime: endTime,
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
    success: "false",
    message: "",
    createdTrip: "",
    getRedirect: "",
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
    // console.log(value, "83", name)

    if (name === 'trips_details') {

      const tripsDetails = { ...values.trips_details, [event.target.name]: value };
      setValues({ ...values, trips_details: tripsDetails });
    } else {
      setValues({ ...values, [name]: value });
      // console.log(values, "90")
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false, success: false });
    console.log(startTime, "Values")
    console.log(endTime, "Values")

    const formattedStartTime = startTime.format(); 
  const formattedEndTime = endTime.format();
    
    const requestBody = {
      name: values.name,
      tripNumber: values.tripNumber,
      category: values.category,
      categoryId: values.category,
      trips_details: values.trips_details,
      trips_details: {
        ...values.trips_details,
        StartTime: formattedStartTime,
        EndTime: formattedEndTime,
      }
     
    }
    createTrip(user._id, token, requestBody)
      .then((data) => {
        console.log(data, "1")
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
              EndTime:  Date.now(),
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
      <Container component="main" >
        <CssBaseline />
        <Navbar />
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

        </Box>
        <Box component="form" onSubmit={onClick} noValidate sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>

                  <DateTimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}  >
                  <DateTimePicker
                    label="End Time"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

          </Grid>
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


      </Container>
    </ThemeProvider>
  );
};

export default AddProduct;
