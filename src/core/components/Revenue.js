import React, { useState, useEffect } from "react";
import "../../styles.css";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {getAllRefunds, pigination } from "../../admin/helper/adminapicall";
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




const Revenue = () => {

  return (
    <>
       <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Revenue