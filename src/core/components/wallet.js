import React, { useState, useEffect } from "react";
import "../../styles.css";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {wallet, getTotalWallet } from "../../admin/helper/adminapicall";
import {
  Typography, Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { isAuthenticated } from '../../auth/helper/index';
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBarv2"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';




const Wallet = () => {
  const { token, user } = isAuthenticated();
  const [totalamount, setTotalAmount] = useState(0)
  const [values, setValues] = useState({
    amount: "",
    type: "credit",
    error: ""
  })

  const preload = () => {
    getTotalWallet(user._id, token).then((data) => {
      console.log(data, "YY")  //bookingId is in form of _id
    if (data.err) {
      console.log(data.err);
    } else {
      setTotalAmount(data.amount);
      
    }
  });
};

useEffect(() => {
  preload();
}, []);

  const {amount, type, error} = values

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // setCategoryName({...categoryName, error: false, success: false})
   

    wallet(user._id, token, values)
      .then((data) => {
        console.log(data, "AA")
        if (data.err) {
          setValues({...values, error: data.err});
        } else {
          setValues({...values, amount: ""});
          console.log(values, "52")
          getTotalWallet(user._id, token).then((data)=> {
            console.log(data, "YY")  //bookingId is in form of _id
            if (data.err) {
              console.log(data.err);
            } else {
              setTotalAmount(data.amount);
              
            }
          })
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar/>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 2, // Adjust the flex value as needed,
        padding: 6,
        marginLeft: '250px', // Additional left margin
        marginTop: '80px', // Additional top margin
        // height: '200vh', // Adjust the height as needed
      }}
    >
      
        <Card sx={{ minWidth: '10%', width: '40%', height: '250px', borderRadius: '16px' ,  marginLeft: '30px',}}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{display: 'inline', margin: '70px 0', marginLeft: '8px' }} >
            Wallet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'inline' , margin: '70px 0', marginLeft: '200px'}}>
              {totalamount}
            </Typography>
          
        </CardContent>
      </Card>

      <Card sx={{ minWidth: '10%', width: '30%', height: '170px', borderRadius: '16px' ,  marginLeft: '30px',}}>
        <CardContent>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          id="amount"
          onChange={handleChange}
          value={amount}
          name="amount"
          autoComplete="amount"
          autoFocus
          
        />
         <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Amount
            </Button>
            </Box>
          
        </CardContent>
      </Card>

    </Box>
    </>
  )
}

export default Wallet
