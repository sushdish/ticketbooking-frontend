import React, { useState, useEffect } from "react";
import "../../styles.css";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { getAllCancellations, cancellation } from "../../admin/helper/adminapicall";
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
import Navbar from "../../core/components/NavBarv2"

const Cancellation = () => {

    const navigate = useNavigate();

    const { user, token } = isAuthenticated();
    const [cancellations, setCancellations] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [isViewDialogOpen, setViewDialogOpen] = useState(false);
    
    const preloadCancellations = () => {
        getAllCancellations(user._id, token).then((data) => {
          if (data.err) {
            console.log(data.err);
          } else {
            setCancellations(data);
          }
        })
          .catch((error) => {
            console.error("Error fetching trip data:", error);
            // setError("Error fetching trip data");
          });
      };
    
      useEffect(() => {
        preloadCancellations();
      }, []);

      const handleViewButtonClick = (selectedRow) => {
        setSelectedTrip(selectedRow);
        setViewDialogOpen(true)
      };
    
      const handleCloseViewDialog = () => {
        setViewDialogOpen(false);
      };

      return (
        <>
        <Navbar/>
          <div>
            <Typography variant="h5" align="center" gutterBottom sx={{ margin: '30px 0' }}>
              My Cancellations
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              View All cancellations here!
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
              <Table sx={{ minWidth: 300, maxWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Trip NAme </TableCell>
                    <TableCell>View Details</TableCell>
                    
    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cancellations.map((cancel) => (
                    <TableRow key={cancel._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {cancel.tripName}
                      </TableCell>
                      <TableCell>
                        {/* <Button
                      variant="contained"
                      color="primary"
                      
                    > */}
                        <VisibilityIcon onClick={() => handleViewButtonClick(cancel)}></VisibilityIcon>
                        {/* View */}
                        {/* </Button> */}
                      </TableCell>
                      {/* <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleBookButtonClick(book)}
                        >
                          Cancel
                        </Button>
                      </TableCell> */}
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
    
    
            {/* <Dialog open={isCancelDialogOpen} onClose={handleCloseBookDialog} >
            <Cancel CancelTrip={CancelUsertrip} />
            </Dialog> */}
          </div>
        </>
      );
    
}

export default Cancellation