import React, { useState, useEffect } from "react";
import "../../styles.css";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { getAllBookings, cancellation } from "../../admin/helper/adminapicall";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import {
  Typography, Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { isAuthenticated } from '../../auth/helper/index';
import Cancel from "../../user/Cancel/CancelTrip"
import Navbar from "../../core/components/NavBarv2"

const MyBookings = () => {

    const navigate = useNavigate();

  const { user, token } = isAuthenticated();
  const [bookings, setBookings] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState({});
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [values, setValues] = useState({
    userReason: "",
    createdData: "",
  });

  const {userReason, createdData} = values

  const preloadBookings = () => {
    getAllBookings(user._id, token).then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        setBookings(data);
      }
    })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
        // setError("Error fetching trip data");
      });
  };

  useEffect(() => {
    preloadBookings();
  }, []);

  const handleViewButtonClick = (selectedRow) => {
    setSelectedTrip(selectedRow);
    setViewDialogOpen(true)
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    // setSelectedIndex(null)
  };

  const handleBookButtonClick = (selectedRow) => {
    // console.log(selectedRow , "SelectedRow")


    if(isAuthenticated()) {
      setSelectedTrip(selectedRow);
      setCancelDialogOpen(true);
    } else {
      navigate('/signin')
    }


    
  };

  const handleCloseBookDialog = () => {
    setCancelDialogOpen(false);
    // setSelectedIndex(null);
  };

  const handleChange = (event) => {
    setValues({...values,  [event.target.name]: event.target.value});
  };

  const CancelUsertrip = (values) => {
    // console.log(tripDetails , '109')
    setCancelDialogOpen(false)

    // Further Create the Trip From Here


    // setValues({ ...values, err: false, loading: true });
    if (!selectedTrip ) {
      console.error("Invalid selectedTrip or missing trips_details");
      return;
    }
    // setValues({ ...values, err: false, loading: true });

    const requestBody = {
        tripId: selectedTrip.tripId,
        bookingId: selectedTrip._id, 
        userReason: values.userReason,
    };


    cancellation(user._id, token, requestBody )
      .then((data) => {
        console.log(data, "86")
        if (data.err) {
            console.log(data.err);
        } else {
          setValues({
            ...values,
              userReason: "",
              createdData: "",
          });
          setCancelDialogOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
    <Navbar/>
      <div>
        <Typography variant="h5" align="center" gutterBottom sx={{ margin: '30px 0' }}>
          My Bookings
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          View All bookings here!
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
          <Table sx={{ minWidth: 300, maxWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Trip NAme </TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Cancel Trip</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((book) => (
                <TableRow key={book._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {book.tripName}
                  </TableCell>
                  <TableCell>
                    {/* <Button
                  variant="contained"
                  color="primary"
                  
                > */}
                    <VisibilityIcon onClick={() => handleViewButtonClick(book)}></VisibilityIcon>
                    {/* View */}
                    {/* </Button> */}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBookButtonClick(book)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog to display trip details */}
        <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
          <DialogTitle>Trip Details</DialogTitle>
          <DialogContent>
            {/* Render trip details in the Dialog content */}
            {selectedTrip &&  (
              <div>
                <p>Trip Name: {selectedTrip.tripName}</p>
                <p>Destination A: {selectedTrip.tripDestinationA}</p>
                <p>Destination B: {selectedTrip.tripDestinationB}</p>
                <p>Start Time: {selectedTrip.StartTime}</p>
                <p>End Time: {selectedTrip.EndTime}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog} color="primary">
              Close
            </Button>

          </DialogActions>
        </Dialog>


        <Dialog open={isCancelDialogOpen} onClose={handleCloseBookDialog} >
        <Cancel CancelTrip={CancelUsertrip} />
        </Dialog>
      </div>
    </>
  );
}

export default MyBookings