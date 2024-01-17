// import React, { useState, useEffect } from "react";
// import "../../styles.css";
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import { getAllBookings, bookTrip, cancellation } from "../../admin/helper/adminapicall";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import {
//   Typography, Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import { isAuthenticated } from '../../auth/helper/index';
// import Cancel from "../../user/Cancellations/Cancel"
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/NavBarv2"

// const Bookings = () => {

//     const { user, token } = isAuthenticated();
//     const [bookings, setBookings] = useState([]);   //Array bec all bookings are received here
//     const [selectedBooking, setSelectedBooking] = useState({});
//     const [isViewDialogOpen, setViewDialogOpen] = useState(false);
//     const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
//     const [values, setValues] = useState({
//         userReason: "",
//         createdData: "",
//       });

//       const navigate = useNavigate()

//     const preloadBookings = () => {
//         getAllBookings(user._id , token).then((data) => {
//             console.log(data, "1")
//           if (data.err) {
//             console.log(data.err);
//           } else {
//             setBookings(data);
//           }
//         })
//           .catch((error) => {
//             console.error("Error fetching trip data:", error);
            
//           });
//       };
    
//       useEffect(() => {
//         preloadBookings();
//       }, []);

//     const handleViewButtonClick = (selectedRow) => {
//         setSelectedBooking(selectedRow)
//         setViewDialogOpen(true)
//     }

//     const handleCloseViewDialoge = () => {
//         setViewDialogOpen(false)
//     }

//     const handleCancelButtonClick = (selectedRow) => {
//         // console.log(selectedRow , "SelectedRow")
    
    
//         if(isAuthenticated()) {
//             setSelectedBooking(selectedRow);
//           setCancelDialogOpen(true);
//         } else {
//           navigate('/signin')
//         }
    
    
        
//       };

//       const  CancelUsertrip = (values) => {
//         // console.log(tripDetails , '109')
//         console.log(values, "3")
//         setCancelDialogOpen(false)
    
//         // Further Create the Trip From Here
    
    
//         setValues({ ...values, err: false, loading: true });
//         if (!selectedBooking ) {
//           console.error("Invalid bookings");
//           return;
//         }
//         // setValues({ ...values, err: false, loading: true });
    
//         const requestBody = {
//             tripId: selectedBooking.tripId,
//             bookingId: selectedBooking._id, 
//             userReason: values.userReason,
//         };
    
//         console.log(requestBody, 'Request Body');
    
//         cancellation(user._id, token, requestBody)
//           .then((data) => {
//             console.log(data, "86")
//             console.log(requestBody, "55")
//             if (data.err) {
//               setValues({ ...values, err: data.err, loading: false });
//             } else {
//                 setValues({
//                     ...values,
//                     userReason: "",
//                     createdData: "",
//                   });
                 
//                   setCancelDialogOpen(false);

//                   getAllBookings(user._id , token)
//                   .then((updatedBooking) => {
//                     console.log(updatedBooking, "4")
//                     setBookings(updatedBooking)
//                   }) 
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }


//   return (
//     <>
//       <div>
//         <Navbar/>
//       <Typography variant="h5" align="center" gutterBottom sx={{ margin: '30px 0' }}>
//           My Bookings
//         </Typography>
//         <Typography variant="body1" align="center" gutterBottom>
//           View All your Bookings here
//         </Typography>
//         <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
//         <Table sx={{ minWidth: 300, maxWidth: 600 }} aria-label="simple table">
//             <TableHead>
//             <TableRow>
//                 <TableCell>Trip NAme </TableCell>
//                 <TableCell>View Details</TableCell>
//                 <TableCell>Cancel Trip</TableCell>
//             </TableRow>
//             </TableHead>
//             <TableBody>
//                 {bookings.map((booking) => (
//                      <TableRow key={booking._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                         <TableCell component="th" scope="row">
//                            {booking.tripName}
//                         </TableCell>
//                         <TableCell>
                    
//                     <VisibilityIcon onClick={() => handleViewButtonClick(booking)}></VisibilityIcon>
                   
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleCancelButtonClick(booking)}
//                     >
//                       Cancel
//                     </Button>
//                   </TableCell>
//                      </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//         </TableContainer>

//         {/* Dialoge code to display view Booking details */}

//         <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialoge}>
//         <DialogTitle>Booking Details</DialogTitle>
//         <DialogContent>
//         {selectedBooking && (
//             <div>
//                 <p>Trip Name: {selectedBooking.tripName}</p>
//                 <p>Trip Destination(TO): {selectedBooking.tripDestinationA}</p>
//                 <p>Trip Destination(FROM): {selectedBooking.tripDestinationB}</p>
//                 <p>Start Time: {selectedBooking.StartTime}</p>
//                 <p>End Time: {selectedBooking.EndTime}</p>
//             </div>
//         )}


            
//         </DialogContent>
//         <DialogActions>
//             <Button onClick={handleCloseViewDialoge} color="primary">
//               Close
//             </Button>

//           </DialogActions>
//         </Dialog>

//         <Dialog open={isCancelDialogOpen} onClose={handleCloseViewDialoge} >
//         <Cancel  CancelTrip={CancelUsertrip} />
//         </Dialog>
//       </div>
//     </>
//   )
// }

// export default Bookings


