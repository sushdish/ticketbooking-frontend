import React, { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, DialogContentText } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
    Typography, Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';


const HandleOffer = ({ AddSales, CloseAddOffer, type, sales, setSales, EditOffer, endTime, setEndTime }) => {


    //   const { couponCode, route_details  } = sales
    //   const { DestinationA, DestinationB, Price, EndDate, Message } = route_details


    const handleCloseDialog = () => {
        CloseAddOffer()
    }

    const CreateOffer = () => {
        console.log(sales, "35")

        if (type === "Add") {
            AddSales(sales)
        } else if (type === 'Edit') {
            EditOffer(sales)
        }
    }




    const handleChange = (name) => (event) => {
        const value = event.target.value;
        console.log(value, "43")
        console.log(name, "41")

        setSales({
            ...sales,
            [name]: value,
            route_details: {
                ...sales.route_details,
                [name]: value,

            }
           
        })
        // }

    }

    return (
        <div>

            <DialogTitle>Select Your priority </DialogTitle>
            <DialogContent>

                <div style={{ textAlign: 'center' }}>
                    <FormControl fullWidth style={{ margin: '15px', width: '300px' }}>
                        {/* <InputLabel id="userReason">User Reason</InputLabel> */}
                        <TextField
                            label="Cupon Code"
                            id="couponCode"
                            value={sales.couponCode}
                            onChange={handleChange('couponCode')}
                        >

                        </TextField>
                        <TextField
                            label="DestinationA"
                            id="DestinationA"
                            value={sales.route_details.DestinationA}
                            onChange={handleChange('DestinationA')}
                        >

                        </TextField>
                        <TextField
                            label="DestinationB"
                            id="DestinationB"
                            value={sales.route_details.DestinationB}
                            onChange={handleChange('DestinationB')}
                        >

                        </TextField>
                        <TextField
                            label="Price"
                            id="Price"
                            value={sales.route_details.Price}
                            onChange={handleChange('Price')}
                        >

                        </TextField>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}  >
                                    <DateTimePicker
                                        label="End DAte"
                                        value={endTime}
                                        onChange={(newValue) => setEndTime(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <TextField
                            label="Message"
                            id="Message"
                            value={sales.route_details.Message}
                            onChange={handleChange('Message')}
                        >

                        </TextField>
                    </FormControl>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={CreateOffer}>Submit</Button>
            </DialogActions>
        </div>

    )
}

export default HandleOffer;