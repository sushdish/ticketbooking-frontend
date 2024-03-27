import React, { useState, useEffect } from "react";
import "../../styles.css";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {getAllCancellations, pigination } from "../../admin/helper/adminapicall";
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
import { isAuthenticated } from '../../auth/helper/index';
import Cancel from "../../user/Cancellations/Cancel"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBarv2"
import TablePagination from '@mui/material/TablePagination';
import Dialogg from '../../admin/Components/ViewDetails/DialogAllDetails'


const Cancellation = () => {

    const { user, token } = isAuthenticated();
    const [cancellations, setCancellations] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});
    const [isViewDialogOpen, setViewDialogOpen] = useState(false);
    const [page , setPage] = useState(0)
     const [total, setTotal] = useState()


    const preload = () => {
        getAllCancellations(user._id, token, page).then((data) => {
          console.log(data, "YY")  
        if (data.err) {
          console.log(data.err);
        } else {
          setCancellations(data.cancellation);
          setTotal(data.totalUserCancellation)
        }
      });
    };
    
    useEffect(() => {
      preload();
    }, []);

    const handlePagination = async (event , newPage) => {
        setPage(newPage)
        event.preventDefault()
    
        await getAllCancellations(newPage).then((data) => {
          if (data.err) {
            console.log(data.err);
          } else {
            setCancellations(data.cancellation);
          }
        })
          .catch((error) => {
            console.error("Error fetching trip data:", error);
            // setError("Error fetching trip data");
          });
      }
  
      const handleChangeRowsPerPage = (event) => {
  
      };
  

    const handleViewButtonClick = (selectedRow) => {
        setSelectedRequest(selectedRow)
        setViewDialogOpen(true)
    }

    const handleCloseViewDialoge = () => {
        setViewDialogOpen(false)
    }

  return (
    <>
    <Navbar/>
      <Typography variant="h5" align="center" gutterBottom sx={{ margin: '30px 0' }}>
          My Cancellations
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          View All your Cancellations here
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
                    
                    <VisibilityIcon onClick={() => handleViewButtonClick(cancel)}></VisibilityIcon>
                   
                  </TableCell>
                     </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={handlePagination}
      rowsPerPage={5}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />

        {/* Dialoge code to display view Booking details */}

        <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialoge}>
        {/* <DialogTitle>Booking Details</DialogTitle> */}
        <Dialogg 
           selectedRequest={selectedRequest}

        />
        <DialogActions>
            <Button onClick={handleCloseViewDialoge} color="primary">
              Close
            </Button>

          </DialogActions>
        </Dialog>
    </>
  )
}

export default Cancellation
