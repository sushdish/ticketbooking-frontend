import React from 'react'
import { Box, Button,   Grid } from '@mui/material';
import { useState, useEffect } from "react";
import Base from "../../../core/Base";
// import { adminSignup, getAllAdmin, isAuthenticated, statusChange } from "../auth/helper/index";
// import { getAllOffer, bookOffer, getOfferById } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from "../../../core/components/NavBarv2"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';

const viewTripsDetails = ({selectedRequest}) => {


    
  return (
    <>
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
 
    </>
  )
}

export default viewTripsDetails
