import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllTrip, deleteTrip, getAllCategories, getTripById, updateTrip } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import { IconButton, FormControlLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import { Select, MenuItem } from '@mui/material';

const MatEdit = ({tripId, setTrips}) => {
  const { user, token } = isAuthenticated();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
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
    success:"",
    message: "",
    createdTrip: "",
   
    // categories: [],
  });
  

  const { name, category, tripNumber, trips_details, loading, err,  success, message , createdTrip} = values;

  const handleEditClick = () =>  {
    console.log("Edit button clicked");

    getAllCategories()
      .then((data) => {
        if (data.err) {
          setValues({ ...values, err: data.err });
        } else {
          setCategories(data);
        }
      });
   
    getTripById(tripId)
    // getAllCategories()
      .then((data) => {
        console.log(data, "BB")
        if (data.err) {
          setValues({...values, err: data.err});
        } else {
          setValues({ ...values,  
            name: data.name,
            category: data.category,  
            tripNumber: data.tripNumber, 
            trips_details: {
              DestinationA: data.trips_details.DestinationA,
              DestinationB: data.DestinationB,
              SeatCount: data.SeatCount,
              StartTime: data.StartTime,
              EndTime: data.EndTime,
              BaggageAllowance: data.BaggageAllowance,
              TicketAmount: data.TicketAmount,
              SeatType: data.SeatType,
              TravelClass: data.TravelClass,
              Currency: data.Currency,
              PaymentType: data.PaymentType,
              RewardPoints: data.RewardPoints,
            },
            loading: false,
            err: false,
           });

          //  setCategories({data})

          // setOpen(true);
        }
      })
    

    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setValues({ ...values, success: false }); 
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
  
    if (name === 'trips_details') {
      
      const tripsDetails = { ...values.trips_details, [event.target.name]: value };
      setValues({ ...values, trips_details: tripsDetails });
      
    } else {
      setValues({ ...values, [name]: value });
      
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("Updating trip with values:", values);
    const requestBody = {
    name: values.name,
    category: values.category,
    tripNumber: values.tripNumber,
    trips_details: values.trips_details,
    }
    
    updateTrip(tripId, user._id, token, requestBody)
      .then((data) => {
        console.log("Response from updateTrip:", requestBody  );
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
        } else {
          setValues({...values, createdTrip: data, success: true});
          handleClose()

          getAllTrip()
          .then((updatedTrips) => {
            console.log("Updated Trips:", updatedTrips);
            setTrips(updatedTrips);
          })
          .catch((error) => {
            console.error('Error fetching trips:', error);
          });
        }
      })
      .catch((err) => {
        console.error('Error updating trip:', err);
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
        <DialogTitle>Update Trip here!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Trip Name"
            type="name"
            fullWidth
            variant="standard"
            value={values.name}
            onChange={(e) => {
              console.log('Changing value:', e.target.value);
              setValues((prevValues) => ({ ...prevValues, name: e.target.value }))}}
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
            onChange={(e) => {
              console.log('Changing value:', e.target.value);
              setValues((prevValues) => ({ ...prevValues, tripNumber: e.target.value }))}}
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
              // console.log('Changing value:', e.target.value);
              // setValues((prevValues) => ({ ...prevValues, DestinationA: e.target.value }))}}
              onChange={(event) => handleChange("trips_details")(event)}
          />
          {/* <TextField
              autoFocus
              margin="dense"
              required
              fullWidth
              // name="category"
              id="Category"
              label="Category"
              select
              value={values.category}
              onChange={(e) => {
                console.log('Changing value:', e.target.value);
                setValues((prevValues) => ({ ...prevValues, category: e.target.value }))}}
             
            > */}
              {/* Map through your category options and create MenuItem for each */}
              {/* {categories.map((category, index) => (
                <MenuItem key={index} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}

  const Demo = () => {
    const [trips, setTrips] = useState([]);
  
    useEffect(() => {
        getAllTrip()
          .then((data) => {
          console.log(data, "TT")
          if (data.err) {
            console.log(data.err);
          } else {
            setTrips(data);
            console.log(data, "ZZ")
          }
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    }, []);
  
    const handleUpdateTrips = (updatedTrips) => {
      setTrips(updatedTrips);
    };
  
  
    const columns = [
      { field: "name", headerName: "Trip Name", width: 200 },
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
        <DataGrid rows={trips} columns={columns} pageSize={5} getRowId={(row) => row._id} />
      </div>
      </div>
    );
  };


export default Demo;
