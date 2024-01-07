import React from 'react'
import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
  } from '@mui/material';

const Booktrip = ({tripDetails}) => {


    const handleBookNow = () => {

    }

    const handleClose = () => {

    }
  return (
    <div>
          <DialogTitle>Book Trip here!</DialogTitle>
          <DialogContent>
              <Typography variant="body1">Name: {tripDetails?.name}</Typography>
              {/* <Typography variant="body1">Name: Air INdia</Typography> */}

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleBookNow}>Book</Button>
          </DialogActions>
    </div>
  )
}

export default Booktrip
