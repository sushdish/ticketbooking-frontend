import React, { useState, useEffect } from "react";
import "../styles.css";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { getPendingCancellations, adminReason , refund} from "../admin/helper/adminapicall";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Typography, Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { isAuthenticated } from '../auth/helper/index';
import { useNavigate } from "react-router-dom";
import Reply from "../admin/AdminReply"
import Navbar from "../core/components/NavBarv2"

const AdminCancellationsV2 = () => {

    const { user, token } = isAuthenticated();
    const [pendings, setPendings] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [isViewDialogOpen, setViewDialogOpen] = useState(false);
    const [isApproveDialogOpen, setApproveDialogOpen] = useState(false);
    const [values, setValues] = useState({
        adminReason: "",
        createdData: "",
      });

      const [refunds, setRefunds] = useState({
        amount: "",
        created: "",
      })

      const {userReason, createdData} = values
      const {amount, created} = refunds

      const navigate = useNavigate()

      const preload = () => {
        getPendingCancellations(user._id, token).then((data) => {
            console.log(data, "YY")  //bookingId is in form of _id
          if (data.err) {
            console.log(data.err);
          } else {
            setPendings(data);
          }
        });
      };
    
      useEffect(() => {
        preload();
      }, []);

      const handleViewButtonClick = (selectedRow) => {
        setSelectedRequest(selectedRow)
        setViewDialogOpen(true)
    }

    const handleCloseViewDialoge = () => {
        setViewDialogOpen(false)
    }

    const handleCancelButtonClick = (selectedRow) => {
        
        if(isAuthenticated()) {
            setSelectedRequest(selectedRow);
            setApproveDialogOpen(true);
        } else {
          navigate('/signin')
        }
    
    };

    const  AcceptRequest = (values, refunds) => {
        // console.log(tripDetails , '109')
        console.log(values, "3")
        console.log(refunds, "4")
        setApproveDialogOpen(false)
    
        // Further Create the Trip From Here
    
    
        setValues({ ...values, err: false, loading: true });
        if (!selectedRequest ) {
          console.error("Invalid bookings");
          return;
        }
        
        const requestBody = {
            tripId: selectedRequest.tripId,
            bookingId: selectedRequest.bookingId,
            cancellationId: selectedRequest.cancellationId, 
            amount: refunds.amount,
            adminReason: values.adminReason,
        };
    
        console.log(requestBody, 'Request Body');
    
        adminReason(user._id, token, requestBody )
        refund(user._id, token, requestBody)
          .then((data) => {
            console.log(data, "86")
            console.log(requestBody, "55")
            if (data.err) {
              setValues({ ...values, err: data.err, loading: false });
            } else {
                setValues({
                    ...values,
                    adminReason: "",
                    createdData: "",
                  });

                  setRefunds({
                    ...refunds,
                    amount: "",
                    created: "",
                  });
                 
                  setApproveDialogOpen(false);

                  
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }



  return (
    <>
      <div>
        <Navbar/>
      <Typography variant="h6" align="center" gutterBottom sx={{ margin: '30px 0' }}>
          User Cancellation Request
        </Typography>
        <Typography variant="body1" align="center" gutterBottom sx={{ margin: '10px 0' }}>
          View all user Cancellation Request Here!
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Table sx={{ minWidth: 300, maxWidth: 600 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Cancel Request(Trip NAme) </TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Approve Request</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {pendings.map((pending) => (
                     <TableRow key={pending._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                           {pending.tripName}
                        </TableCell>
                        <TableCell>
                    
                    <VisibilityIcon onClick={() => handleViewButtonClick(pending)}></VisibilityIcon>
                   
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCancelButtonClick(pending)}
                    >
                      Approve
                    </Button>
                  </TableCell>
                     </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>

        {/* Dialoge code to display view Booking details */}

        <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialoge}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
        {selectedRequest && (
            <div>
                <p>Trip Name: {selectedRequest.tripName}</p>
                <p>Trip Destination(TO): {selectedRequest.tripDestinationA}</p>
                <p>Trip Destination(FROM): {selectedRequest.tripDestinationB}</p>
                <p>Start Time: {selectedRequest.StartTime}</p>
                <p>End Time: {selectedRequest.EndTime}</p>
            </div>
        )}


            
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseViewDialoge} color="primary">
              Close
            </Button>

          </DialogActions>
        </Dialog>

        <Dialog open={isApproveDialogOpen} onClose={handleCloseViewDialoge} >
        <Reply  AdminReply={AcceptRequest} />
        </Dialog>

      </div>
    </>
  )
}

export default AdminCancellationsV2
