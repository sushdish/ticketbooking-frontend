import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { IconButton, FormControlLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { getAllCategories, updateCategory, getCategoryById } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import Navbar from "../core/components/NavBarv2"
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const MatEdit = ({categoryId, setCategories}) => {
  const { user, token } = isAuthenticated();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    err: "",
    success: "",
  })

  const {name, err, success} = values

  const handleEditClick = () =>  {
    // console.log(categoryId, "2")
    console.log("Edit button clicked");
   
      getCategoryById(categoryId)
      .then((data) => {
        console.log(data, "BB")
        if (data.err) {
          setValues({...values, err: data.err});
        } else {
          setValues({ ...values, name: data.name || "" });
          setOpen(true);
        }
      })
    

    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setValues({ ...values, success: false }); 
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false });
    updateCategory(categoryId, user._id, token, values)
      .then((data) => {
        console.log(data, "3")
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
        } else {
          setValues({...values, name: "", success: true});
          handleClose()

          getAllCategories()
          .then((updatedCategories) => {
            console.log(updatedCategories, "4")
            setCategories(updatedCategories);
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
    
    <FormControlLabel
      control={
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleEditClick}
        >
          <EditIcon style={{ color: blue[500] }} />
        </IconButton>
      }
    />
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Category here!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Category Name"
            type="name"
            fullWidth
            variant="standard"
            value={values.name}
            onChange={(e) => {
              console.log('Changing value:', e.target.value);
              setValues((prevValues) => ({ ...prevValues, name: e.target.value }))}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};





const Demo = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          setCategories(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleUpdateCategories = (updatedCategories) => {
    setCategories(updatedCategories);
  };


  const columns = [
    { field: "name", headerName: "Category Name", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        
        
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            
            <MatEdit categoryId={params.row._id} setCategories={handleUpdateCategories} />
          </div>
        )
      },
    },
  ];  


  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Set the height of the container to the full viewport height
        backgroundColor: "#fff", 
      }}
    >
    <div style={{ height: 500, width: 500 }}>
      <DataGrid rows={categories} columns={columns} pageSize={5} getRowId={(row) => row._id} />
    </div>
    
    <Navbar/>
    </div>
  );
};


export default Demo;
