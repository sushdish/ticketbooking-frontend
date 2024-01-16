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
    })

    const { userReason, createdData } = values

    const handleCloseBookDialog = () => {

    }

    const handleCancelBook = () => {
        CancelTrip(values)
        
    }

    const handleChange = (name) => (event) => {
        console.log(values, "33")
        console.log(name, "22")

        
        
        setValues({...values,   [name] : event.target.value})
    }

    return (
        <div>

            <DialogTitle>Cancel Your Book Here! </DialogTitle>
            <DialogContent>
                <DialogContentText>
                   Please provide your Reason here
                </DialogContentText>
                {/* <div style={{ textAlign: 'center' }}>
                    <FormControl fullWidth style={{ margin: '15px', width: '300px' }}> */}
                        {/* <InputLabel >userReason</InputLabel> */}
                        
                            
                            <TextField
                            // key={index}
                            margin="normal"
                            required
                            fullWidth
                            id="userReason"
                            onChange={handleChange('userReason')}
                            value={userReason}
                            label="userReason"
                            name="userReason"
                            autoComplete="userReason"
                            autoFocus
                            
                           
                            
                        />


                       
                       



                    {/* </FormControl>

                </div> */}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseBookDialog}>Cancel</Button>
                <Button onClick={handleCancelBook}>Submit</Button>
            </DialogActions>
        </div>

    )

}

export default CancelTrip