import React, { useState, useEffect } from "react";
import { getAllCategories, createTrip, getAllConfig, tripConfig } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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


const AddTrips = () => {
  const defaultTheme = createTheme()
  const { user, token } = isAuthenticated();
  const [startTime, setStartTime] = useState(dayjs(''));
  const [endTime, setEndTime] = useState(dayjs(''))


  const [values, setValues] = useState({
    name: "",
    category: "",
    tripNumber: "",
    trips_details: {
      DestinationA: "",
      DestinationB: "",
      SeatCount: 0,
      StartTime: '',
      EndTime: '',
      BaggageAllowance: 0,
      TicketAmount: 0,
      SeatType: [],
      TravelClass: [],
      Currency: [],
      PaymentType: [],
      RewardPoints: 0,
    },
    loading: false,
    err: "",
    success: false,
    message: "",
    createdTrip: "",
    categories: [],
    paymentTypes: [],
    seatTypes: [],
    travelClass: [],
    currency: [],

  });

 
  const { name, category, tripNumber, trips_details, loading, err, createdTrip, categories, 
    success, message, paymentTypes, seatTypes, travelClass, currency } = values;

  const { StartTime, EndTime, DestinationA, DestinationB,SeatCount, BaggageAllowance, TicketAmount, SeatType,
    TravelClass, Currency, PaymentType, RewardPoints} = trips_details


  const navigate = useNavigate();

  const preload = () => {
    getAllCategories()
      .then((data) => {
        console.log(data, "55")
        if (data.err) {
          setValues({ ...values, err: data.err });
        } else {
          setValues({
            ...values,
            categories: data,
          });
        }
      });
  };



  useEffect(() => {
    preload();
  }, []);




  const handleChange = (name) => (event) => {
    const value = event.target.value;

    console.log(value, "83", name)

    setValues({
      ...values,
      [name]: value,
      trips_details: {
        ...values.trips_details,
        [name]: value, 
      }
    })

    if (name === 'category') {

      handleTripConfig(value)
      console.log(value, "113") //has categoryId
      console.log(name, "114") //has category 
    }

   
  }


  const handleTripConfig = (categoryId) => {
    
    tripConfig(categoryId, token).then((data) => {
      console.log(data, "132")
      setValues({
        ...values, paymentTypes: data.PaymentType, seatTypes: data.SeatType,
        travelClass: data.TravelClass, currency: data.Currency, category: data.categoryId
      })
      console.log(values, "134")
    })
  }



  const onClick = (event) => {
    event.preventDefault();


    const updatedtrips_details = values.trips_details;
    updatedtrips_details.StartTime = startTime.format();
    updatedtrips_details.EndTime = endTime.format();


    const requestBody = {
      name: values.name,
      tripNumber: values.tripNumber,
      categoryId: values.category,
      trips_details: updatedtrips_details
    }

    console.log(requestBody, "RequestBody")

    createTrip(user._id, token, requestBody)
      .then((data) => {
        console.log(data, "22")
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            category: "",
            tripNumber: "",
            trips_details: {
              DestinationA: "",
              DestinationB: "",
              SeatCount: "",
              StartTime: Date.now(),
              EndTime: Date.now(),
              BaggageAllowance: "",
              TicketAmount: "",
              SeatType: "",
              TravelClass: "",
              Currency: "",
              PaymentType: "",
              RewardPoints: "",
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
                // onChange={(event) => handleChange("DestinationA")(event)}
                onChange={handleChange("DestinationA")}
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
                onChange={(event) => handleChange("DestinationB")(event)}
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
                onChange={(event) => handleChange("SeatCount")(event)}
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
                onChange={(event) => handleChange("BaggageAllowance")(event)}
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
                onChange={(event) => handleChange("TicketAmount")(event)}
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
                onChange={(event) => handleChange("SeatType")(event)}
                value={values.trips_details.SeatType}
                label="SeatType"
                select
                name="SeatType"
                autoComplete="SeatType"
                autoFocus
              >
                {/* Map through your category options and create MenuItem for each */}
                {seatTypes.map((seatType, index) => (
                  <MenuItem key={index} value={seatType}>
                    <div>{seatType}</div>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="TravelClass"
                onChange={(event) => handleChange("TravelClass")(event)}
                value={values.trips_details.TravelClass}
                label="TravelClass"
                select
                name="TravelClass"
                autoComplete="TravelClass"
                autoFocus
              >
                {/* Map through your category options and create MenuItem for each */}
                {travelClass.map((travel, index) => (
                  <MenuItem key={index} value={travel}>
                    <div>{travel}</div>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Currency"
                onChange={(event) => handleChange("Currency")(event)}
                value={values.trips_details.Currency}
                label="Currency"
                select
                name="Currency"
                autoComplete="Currency"
                autoFocus
              >
                {/* Map through your category options and create MenuItem for each */}
                {currency.map((currency, index) => (
                  <MenuItem key={index} value={currency}>
                    <div>{currency}</div>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="PaymentType"
                onChange={(event) => handleChange("PaymentType")(event)}
                value={values.trips_details.PaymentType}
                label="PaymentType"
                // name="PaymentType"
                select
                // autoComplete="PaymentType"
                autoFocus
              >
                {/* Map through your category options and create MenuItem for each */}
                {paymentTypes.map((paymentType, index) => (
                  <MenuItem key={index} value={paymentType}>
                    <div>{paymentType}</div>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="RewardPoints"
                onChange={(event) => handleChange("RewardPoints")(event)}
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
                // onChange={handleChange('category')}
                onChange={handleChange("category")}
                name="category"
                autoFocus
              >
                {/* Map through your category options and create MenuItem for each */}
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category._id} >
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


}

export default AddTrips;
