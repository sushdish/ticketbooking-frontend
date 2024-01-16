import React, { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, DialogContentText } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
    Typography, Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const CancelTrip = ({  CancelTrip }) => {
    const [values, setValues] = useState({
        userReason: "",
        createdData: "",
    });

    const { userReason, createdData } = values

   
    const handleCloseDialog = () => {

    }

    const handleCancelTrips = () => {
        CancelTrip(values)
    }


   

    const handleChange = (name) => (event) => {
        console.log(name, "1")
        console.log(values, "2")
        setValues({...values ,  [name] : event.target.value
          })
    }

    return (
        <div>

            <DialogTitle>Select Your priority </DialogTitle>
            <DialogContent>
                
                <div style={{ textAlign: 'center' }}>
                    <FormControl fullWidth style={{ margin: '15px', width: '300px' }}>
                        <InputLabel id="userReason">User Reason</InputLabel>
                        <TextField
                            labelId="userReason"
                            id="userReason"
                            value={userReason}
                            onChange={handleChange('userReason')}
                        >
                            
                        </TextField>
                    </FormControl>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleCancelTrips}>Submit</Button>
            </DialogActions>
        </div>

    )
}

export default CancelTrip;