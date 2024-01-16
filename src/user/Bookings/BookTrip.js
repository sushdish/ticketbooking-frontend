import React, { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, DialogContentText } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
    Typography, Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const BookTrip = ({ tripDetails, BookTrip, closeDialog }) => { 
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

    const { paymentReferenceNumber, booking_details, createdBook, loading, err } = values

    const { seatType, travelClass, paymentType } = booking_details

    const handleCloseBookDialog = () => {
        closeDialog()
    }

    const handleBookTrips = () => {
        BookTrip(values)
    }

    // ...values.booking_details,
   

    const handleChange = (name) => (event) => {
        setValues({...values ,  
            // Wrote below Line for Example
            // [name] : event.target.value, 
            booking_details: {
            ...values.booking_details,
            [name] : event.target.value
          }})
    }

    return (
        <div>

            <DialogTitle>Select Your priority </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please Select Your Trip Preference
                </DialogContentText>
                <div style={{ textAlign: 'center' }}>
                    <FormControl fullWidth style={{ margin: '15px', width: '300px' }}>
                        <InputLabel id="seat-type-label">Seat Type</InputLabel>
                        <Select
                            labelId="seat-type-label"
                            id="seat-type"
                            value={seatType}
                            onChange={handleChange('seatType')}
                        >
                            {tripDetails && tripDetails.SeatType.map((seatType, index) => (

                                <MenuItem key={index} value={seatType}>
                                    {seatType}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ margin: '15px', width: '300px' }}>
                        <InputLabel id="seat-type-label">Travel Class</InputLabel>
                        <Select
                            labelId="seat-type-label"
                            id="seat-type"
                            value={travelClass}
                            onChange={handleChange('travelClass')}
                        >
                            {tripDetails && tripDetails.TravelClass.map((travelclass, index) => (

                                <MenuItem key={index} value={travelclass}>
                                    {travelclass}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ margin: '15px', width: '300px' }}>
                        <InputLabel id="seat-type-label">Payment Type</InputLabel>
                        <Select
                            labelId="seat-type-label"
                            id="seat-type"
                            value={paymentType}
                            onChange={handleChange('paymentType')}
                        >
                            {tripDetails && tripDetails.PaymentType.map((payment, index) => (

                                <MenuItem key={index} value={payment}>
                                    {payment}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseBookDialog}>Cancel</Button>
                <Button onClick={handleBookTrips}>Submit</Button>
            </DialogActions>
        </div>

    )
}

export default BookTrip