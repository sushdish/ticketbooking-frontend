import React, { useState, useEffect } from "react";
import "../../styles.css";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {getAllRefunds, pigination, getTotalRefund, getTotalBookings } from "../../admin/helper/adminapicall";
import {
  Typography, Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { isAuthenticated } from '../../auth/helper/index';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBarv2"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import NavBar from "../components/NavBarv2"



const Sales = () => {

  const { user, token } = isAuthenticated();
  const [totalRefunds, setTotalRefunds] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const preload = () => {
    getTotalRefund(user._id, token).then((data) => {
      console.log(data, "YY")  
    if (data.err) {
      console.log(data.err);
    } else {
      setTotalRefunds(data.totalRefund);
    }
  });
};

const firstload = () => {
  getTotalBookings(user._id, token).then((data) => {
    console.log(data, "ZZ")
    if (data.err) {
      console.log(data.err)
    } else{
      setTotalRevenue(data.totalBookings)
    }
  })
}

useEffect(() => {
  preload();
  firstload();
}, []);

  return (
    <>
    <Navbar/>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 2, // Adjust the flex value as needed,
        padding: 2,
        marginLeft: '250px', // Additional left margin
        marginTop: '80px', // Additional top margin
        // height: '100vh', // Adjust the height as needed
      }}
    >
      
        <Card sx={{ minWidth: '10%', width: '20%', borderRadius: '16px' ,  marginLeft: '30px',}}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ margin: '10px 0' }}>
            Total Refund
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {totalRefunds}
            </Typography>
          
        </CardContent>
      </Card>

      <Card sx={{ minWidth: '10%', width: '20%', borderRadius: '16px' ,  marginLeft: '30px',}}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ margin: '10px 0' }}>
            Total Revenue
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {totalRevenue}
            </Typography>
          
        </CardContent>
      </Card>
     
      
    </Box>
    </>
  )
}

export default Sales
