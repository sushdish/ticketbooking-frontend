import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./components/Card";
import { DataGrid,  GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import BookingStepper from '../core/components/BookingStepper'
import TextField from '@mui/material/TextField';
import { getAllTrip } from "../admin/helper/adminapicall";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import BookingModal from "./components/BookingModal"; 


const Home = ({trip}) => {
    console.log(trip, "94")
    const [trips, setTrips] = useState([]);
    const [err, setError] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const preloadProducts = () => {
        getAllTrip().then((data) => {
            if (data.err) {
                setError(data.err);
            } else {
                setTrips(data);
            }
        })
            .catch((error) => {
                console.error("Error fetching trip data:", error);
                setError("Error fetching trip data");
            });
    };

    useEffect(() => {
        preloadProducts();
    }, []);

    const columns = [
        { field: 'tripName', headerName: 'Trip Name', width: 70 },

        {
            field: 'viewButton',
            headerName: 'View',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewButtonClick(params.row)}
              >
                View
              </Button>
            )
        }
    ];

    const handleViewButtonClick = (selectedRow) => {
        setSelectedTrip(selectedRow);
        setDialogOpen(true);
      };
    
      const handleCloseDialog = () => {
        setDialogOpen(false);
      };

      const openModal = () => {
        setShowModal(true);
        console.log("Modal is now open");
      };

      const closeModal = () => {
        setShowModal(false);
      };

      const handleBookNow = (trip) => {
        if (!selectedTrip || !selectedTrip.trips_details) {
            console.error('Invalid trip object:', selectedTrip);
            return;
          }
        console.log('Trip object before opening modal:', trip);
        
        console.log("Book button clicked");
       
        openModal(); 
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
        <TableContainer component={Paper}   sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
          <Table sx={{ minWidth: 300, maxWidth: 600 }}  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Flight Name </TableCell>
                <TableCell>Trip Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {trip.name}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewButtonClick(trip)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog to display trip details */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Trip Details</DialogTitle>
        <DialogContent>
          {/* Render trip details in the Dialog content */}
          {selectedTrip && (
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
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* <BookingModal
        showModal={showModal} // You can modify this based on your requirements
        handleClose={closeModal}
        trip={selectedTrip}
      /> */}

          {/* <button href="#" className="btn btn-success" onClick={() => handleBookNow(selectedTrip || trip)}>
            Book
                </button> */}
         {/* Modal */}
         {/* {showModal && <BookingModal showModal={showModal} handleClose={closeModal} trip={trip} />} */}
      </div>
    </>
      );
};

export default Home;
