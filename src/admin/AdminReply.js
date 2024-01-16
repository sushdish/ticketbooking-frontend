import React, { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, DialogContentText } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
    Typography, Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const AdminReply = ({AdminReply}) => {

    const [values, setValues] = useState({
        adminReason: "",
        createdData: "",
      });

      const [refunds, setRefunds] = useState({
        amount: "",
        created: "",
      })

      const {adminReason, createdData} = values
      const {amount, created} = refunds

      const handleCloseBookDialog = () => {

      }
  
      const handleCancelBook = () => {
        AdminReply(values, refunds)
       
          
      }

      const handleChange = (name) => (event) => {
        console.log(values, "33")
        console.log(name, "22")

        
        setValues({...values,   [name] : event.target.value})
        setRefunds({...refunds, [name] : event.target.value})
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
                            id="adminReason"
                            onChange={handleChange('adminReason')}
                            value={adminReason}
                            label="adminReason"
                            name="adminReason"
                            autoComplete="adminReason"
                            autoFocus
                            
                           
                            
                        />

                            <TextField
                            // key={index}
                            margin="normal"
                            required
                            fullWidth
                            id="amount"
                            onChange={handleChange('amount')}
                            value={amount}
                            label="Refund amount"
                            name="amount"
                            autoComplete="amount"
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

export default AdminReply