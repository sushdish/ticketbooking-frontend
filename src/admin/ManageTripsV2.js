import React, { useState, useEffect } from "react";
import { IconButton, FormControlLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { getAllTrip, updateTrip, getTripById , getEveryTrip} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import Navbar from "../core/components/NavBarv2"
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const MatEdit = ({tripId, setTrips}) => {
  const { user, token } = isAuthenticated();
  const [open, setOpen] = useState(false);
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
    success:false,
    message: "",
    createdTrip: "",
  })

  const { name, category, tripNumber, trips_details, loading, err,  success, message , createdTrip} = values

  const handleEditClick = () =>  {
    // console.log(categoryId, "2")
    console.log("Edit button clicked");
   
    getTripById(tripId)
      .then((data) => {
        console.log(data, "BB")
        if (data.err) {
          setValues({...values, err: data.err});
        } else {
          setValues({ ...values, name: data.name,
            category: data.category,  
            tripNumber: data.tripNumber, 
            trips_details: {
              DestinationA: data.trips_details.DestinationA,
              DestinationB: data.trips_details.DestinationB,
              SeatCount: data.trips_details.SeatCount,
              StartTime: data.trips_details.StartTime,
              EndTime: data.trips_details.EndTime,
              BaggageAllowance: data.trips_details.BaggageAllowance,
              TicketAmount: data.trips_details.TicketAmount,
              SeatType: data.trips_details.SeatType,
              TravelClass: data.trips_details.TravelClass,
              Currency: data.trips_details.Currency,
              PaymentType: data.trips_details.PaymentType,
              RewardPoints: data.trips_details.RewardPoints,
            },
            loading: false,
            err: false,});

          setOpen(true);
        }
      })
    

    // setOpen(true)
  };

  const handleChange = (name) => (event) => {
    // const value = event.target.value;

    console.log(event, "83")
    console.log(name, "84")

    if (name === 'trips_details') {

      const tripsDetails = { ...values.trips_details, [name]: event.target.value };
      setValues({ ...values, trips_details: tripsDetails });
    } else {
      setValues({ ...values, [name]: event.target.value });

      console.log(values, "90")

    
  };
}

  const handleClose = () => {
    setOpen(false);
    setValues({ ...values, success: false }); 
  };

  

  const handleUpdate = () => {
    // event.preventDefault();
    const requestBody = {
        name: values.name,
        category: values.category,
        tripNumber: values.tripNumber,
        trips_details: values.trips_details,
        }
        console.log(requestBody, "77")

    // setValues({ ...values, err: false });
    updateTrip(tripId, user._id, token, requestBody)
      .then((data) => {
        console.log(data, "3")
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
        } else {
          setValues({...values, name: data.name,
            success: true
          });
          console.log(name, "99")
          handleClose()

          getEveryTrip()
          .then((updatedCategories) => {
            console.log(updatedCategories, "4")
            setTrips(updatedCategories);
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
    
    <FormControlLabel
      control={
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleEditClick}
        >
          <EditIcon style={{ color: blue[500] }} />
        </IconButton>
      }
    />
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Category here!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Category Name"
            type="name"
            fullWidth
            variant="standard"
            value={values.name}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, name: e.target.value }))}}
            onChange={handleChange("name")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="tripNumber"
            name="tripNumber"
            label="Trip Number"
            type="tripNumber"
            fullWidth
            variant="standard"
            value={values.tripNumber}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, tripNumber: e.target.value }))}}
            onChange={handleChange("tripNumber")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="DestinationA"
            name="DestinationA"
            label="DestinationA"
            type="DestinationA"
            fullWidth
            variant="standard"
            value={values.trips_details.DestinationA}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, DestinationA: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="DestinationB"
            name="DestinationB"
            label="DestinationB"
            type="DestinationB"
            fullWidth
            variant="standard"
            value={values.trips_details.DestinationB}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, DestinationB: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="StartTime"
            name="StartTime"
            label="StartTime"
            type="StartTime"
            fullWidth
            variant="standard"
            value={values.trips_details.StartTime}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, StartTime: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="EndTime"
            name="EndTime"
            label="EndTime"
            type="EndTime"
            fullWidth
            variant="standard"
            value={values.trips_details.EndTime}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, EndTime: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="BaggageAllowance"
            name="BaggageAllowance"
            label="BaggageAllowance"
            type="BaggageAllowance"
            fullWidth
            variant="standard"
            value={values.trips_details.BaggageAllowance}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, BaggageAllowance: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="TicketAmount"
            name="TicketAmount"
            label="TicketAmount"
            type="TicketAmount"
            fullWidth
            variant="standard"
            value={values.trips_details.TicketAmount}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, TicketAmount: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Currency"
            name="Currency"
            label="Currency"
            type="Currency"
            fullWidth
            variant="standard"
            value={values.trips_details.Currency}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, Currency: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="SeatCount"
            name="SeatCount"
            label="SeatCount"
            type="SeatCount"
            fullWidth
            variant="standard"
            value={values.trips_details.SeatCount}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, SeatCount: e.target.value }))}}
              onChange={(SeatCount) => handleChange("trips_details")(SeatCount)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="SeatType"
            name="SeatType"
            label="SeatType"
            type="SeatType"
            fullWidth
            variant="standard"
            value={values.trips_details.SeatType}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, SeatType: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="TravelClass"
            name="TravelClass"
            label="TravelClass"
            type="TravelClass"
            fullWidth
            variant="standard"
            value={values.trips_details.TravelClass}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, TravelClass: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="PaymentType"
            name="PaymentType"
            label="PaymentType"
            type="PaymentType"
            fullWidth
            variant="standard"
            value={values.trips_details.PaymentType}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, PaymentType: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="RewardPoints"
            name="RewardPoints"
            label="RewardPoints"
            type="RewardPoints"
            fullWidth
            variant="standard"
            value={values.trips_details.RewardPoints}
            // onChange={(e) => {
            //   console.log('Changing value:', e.target.value);
            //   setValues((prevValues) => ({ ...prevValues, RewardPoints: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};





const Demo = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getEveryTrip()
      .then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          console.log('Fetched trips:', data);
            setTrips(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleUpdateTrips = (updateTrips) => {
    setTrips(updateTrips);
  };


  const columns = [
    { field: "name", headerName: "Category Name", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        
        
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            
            <MatEdit tripId={params.row._id} setTrips={handleUpdateTrips} />
          </div>
        )
      },
    },
  ];  


  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Set the height of the container to the full viewport height
        backgroundColor: "#fff", 
      }}
    >
    <div style={{ height: 500, width: 500 }}>
    <Typography variant="h5" align="center" gutterBottom >
              Manage Trips
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Make Changes to Trips here!
            </Typography>
      <DataGrid rows={trips} columns={columns} pageSize={5} getRowId={(row) => row._id} />
    </div>
    
    <Navbar/>
    </div>
  );
};


export default Demo;
