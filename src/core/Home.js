import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import { DataGrid,  GridToolbar } from '@mui/x-data-grid';
import BookingStepper from '../core/components/BookingStepper'
import TextField from '@mui/material/TextField';
import { getAllTrip, getTripById, bookTrip } from "../admin/helper/adminapicall";
import { IconButton, FormControlLabel } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { isAuthenticated } from "../auth/helper/index";
import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const MatEdit = ({tripId, setTrips}) => {
  const [values, setValues] = useState({
    err: "",
    loading: "false",
    success: "",
    createdBook: ""
  });

  const [open, setOpen] = useState(false);
  const { token, user } = isAuthenticated();
    const [alltrip, setAllTrip] = useState([]);

  const {err, loading, success, createdBook} = values

  const handleEditClick = () =>  {
    // console.log(categoryId, "2")
    console.log("Edit button clicked");
   
    getTripById(tripId)
      .then((data) => {
        console.log(data, "BB")
        if (data.err) {
          setValues(data.err);
        } else {
          setValues(data);
          setOpen(true);
        }
      })
    

    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setValues({ ...values, success: false }); 
  };

  const handleBookNow = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false });
    bookTrip(user._id, token, values )
      .then((data) => {
        console.log(data, "3")
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
        } else {
          setValues({...values, createdBook: "", success: true});
          handleClose()
        }
      })
      getAllTrip()
        .then((booking) => {
          console.log(booking, "4")
          setTrips(booking);
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
           <VisibilityIcon style={{ color: blue[500] }} />
        </IconButton>
      }
    />
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Trip here!</DialogTitle>
        <DialogContent>
          {alltrip.map((trip, index) => (
            <div key={index}>
            <Typography variant="body1">Name: {trip.name}</Typography>
            {/* Add other trip details as needed */}
            <hr />
          </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBookNow}>Book</Button>
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
      if (data.err) {
        console.log(data.err);
      } else {
        setTrips(data);
      }
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
    });
}, []);

const handleBook = (booking) => {
  setTrips(booking);
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
          
          <MatEdit tripId={params.row._id} setTrips={handleBook} />
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
