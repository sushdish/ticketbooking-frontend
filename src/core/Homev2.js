import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import BookingStepper from '../core/components/BookingStepper'
import TextField from '@mui/material/TextField';
import { getAllTrip, bookTrip } from "../admin/helper/adminapicall";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
  Typography, Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { isAuthenticated } from '../auth/helper/index';
import TablePagination from '@mui/material/TablePagination';
import BookTripDialog from "../user/Bookings/BookTrip";

const Home = () => {

  const navigate = useNavigate();

  const [page , setPage] = useState(0)

  const { user, token } = isAuthenticated();
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState({});
  const [isBookDialogOpen, setBookDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [values, setValues] = useState({
    paymentReferenceNumber: "",
    booking_details: {
      seatType: "",
      travelClass: "",
      paymentType: "",
    },
    createdBook: "",
    loading: false,
    err: "",
  });

  const [index, setSelectedIndex] = useState({})

  const { paymentReferenceNumber, booking_details, createdBook, loading, err } = values


  const preloadProducts = () => {
    getAllTrip(page).then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        setTrips(data);
      }
    })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
        // setError("Error fetching trip data");
      });
  };

  useEffect(() => {
    preloadProducts();
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
      setBookDialogOpen(true);
    } else {
      navigate('/signin')
    }


    
  };

  const handleCloseBookDialog = () => {
    setBookDialogOpen(false);
    // setSelectedIndex(null);
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;


    if (name === "booking_details") {
      const updatedBookingDetails = { ...values.booking_details, [event.target.name]: value };

      setValues({ ...values, booking_details: updatedBookingDetails, });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const  BookUsertrip = (tripDetails) => {
    console.log(tripDetails , '109')
    setBookDialogOpen(false)

    // Further Create the Trip From Here


    setValues({ ...values, err: false, loading: true });
    if (!selectedTrip || !selectedTrip.trips_details) {
      console.error("Invalid selectedTrip or missing trips_details");
      return;
    }
    // setValues({ ...values, err: false, loading: true });

    const requestBody = {
      tripId: selectedTrip._id,
      paymentReferenceNumber: tripDetails.paymentReferenceNumber,
      paymentType: tripDetails.booking_details.paymentType,
      travelClass: tripDetails.booking_details.travelClass,
      seatType: tripDetails.booking_details.seatType,
    };

    console.log(requestBody, 'Request Body');

    bookTrip(user._id, token, requestBody)
      .then((data) => {
        console.log(data, "86")
        console.log(requestBody, "55")
        if (data.err) {
          setValues({ ...values, err: data.err, loading: false });
        } else {
          setValues({
            ...values,
            paymentReferenceNumber: "",
            booking_details: {
              seatType: "",
              travelClass: "",
              paymentType: "",
            },
            createdBook: data,
            loading: false,
            err: "",
          });
          setBookDialogOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlePagination = async (event , newPage) => {
    setPage(newPage)
    event.preventDefault()

    await getAllTrip(newPage + 1).then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        setTrips(data);
      }
    })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
        // setError("Error fetching trip data");
      });
  }

  const handleChangeRowsPerPage = (event) => {
  
  };


  return (
    <>
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Book, Pack and Go
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Amazing Deals with lots of options
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
          <Table sx={{ minWidth: 300, maxWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Trip NAme </TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Book Trip</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {trip.name}
                  </TableCell>
                  <TableCell>
                    {/* <Button
                  variant="contained"
                  color="primary"
                  
                > */}
                    <VisibilityIcon onClick={() => handleViewButtonClick(trip)}></VisibilityIcon>
                    {/* View */}
                    {/* </Button> */}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBookButtonClick(trip)}
                    >
                      Book
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
      component="div"
      count={10}
      page={page}
      onPageChange={handlePagination}
      rowsPerPage={5}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />

        {/* Dialog to display trip details */}
        <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
          <DialogTitle>Trip Details</DialogTitle>
          <DialogContent>
            {/* Render trip details in the Dialog content */}
            {selectedTrip && selectedTrip.trips_details && (
              <div>
                <p>Trip Name: {selectedTrip.name}</p>
                <p>Trip Number: {selectedTrip.tripNumber}</p>
                <p>Destination A: {selectedTrip.trips_details.DestinationA}</p>
                <p>Destination B: {selectedTrip.trips_details.DestinationB}</p>
                <p>Start Time: {selectedTrip.trips_details.StartTime}</p>
                <p>End Time: {selectedTrip.trips_details.EndTime}</p>
                <p>Seat Count: {selectedTrip.trips_details.SeatCount}</p>
                <p>BaggageAllowance: {selectedTrip.trips_details.BaggageAllowance}</p>
                <p>TicketAmount: {selectedTrip.trips_details.TicketAmount}</p>
                <p>SeatType: {selectedTrip.trips_details.SeatType.join(', ')}</p>
                <p>TravelClass: {selectedTrip.trips_details.TravelClass.join(', ')}</p>
                <p>Currency: {selectedTrip.trips_details.Currency}</p>
                <p>PaymentType: {selectedTrip.trips_details.PaymentType.join(', ')}</p>
                <p>RewardPoints: {selectedTrip.trips_details.RewardPoints}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog} color="primary">
              Close
            </Button>

          </DialogActions>
        </Dialog>


        <Dialog open={isBookDialogOpen} onClose={handleCloseBookDialog} >
        <BookTripDialog tripDetails={selectedTrip.trips_details} BookTrip={BookUsertrip} closeDialog={ () => (setBookDialogOpen(false))} />
        </Dialog>
      </div>
    </>
  );
};

export default Home;
