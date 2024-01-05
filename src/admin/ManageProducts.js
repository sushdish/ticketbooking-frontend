import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllTrip, deleteTrip, getAllCategories, getTripById, updateTrip } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import { IconButton, FormControlLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import { Select, MenuItem } from '@mui/material';

const MatEdit = ({tripId, setTrips}) => {
  const { user, token } = isAuthenticated();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    name: "",
    category: "",
    tripNumber: "",
    trips_details: {
      DestinationA: "",
      DestinationB: "",
      SeatCount: 0,
      StartTime: Date.now(),
      EndTime: Date.now(),
      BaggageAllowance: 0,
      TicketAmount: 0,
      SeatType: [],
      TravelClass: [],
      Currency: "",
      PaymentType: [],
      RewardPoints: 0,
    },
    loading: false,
    err: "",
    success:"",
    message: "",
   
   
    // categories: [],
  });
  

  const { name, category, tripNumber, trips_details, loading, err,  success, message } = values;

  const handleEditClick = () =>  {
    console.log("Edit button clicked");

    getAllCategories()
      .then((data) => {
        if (data.err) {
          setValues({ ...values, err: data.err });
        } else {
          setCategories(data);
        }
      });
   
    getTripById(tripId)
    // getAllCategories()
      .then((data) => {
        console.log(data, "BB")
        if (data.err) {
          setValues({...values, err: data.err});
        } else {
          setValues({ ...values,  
            name: data.name,
            category: data.category,  
            tripNumber: data.tripNumber, 
            trips_details: {
              DestinationA: data.DestinationA,
              DestinationB: data.DestinationB,
              SeatCount: data.SeatCount,
              StartTime: data.StartTime,
              EndTime: data.EndTime,
              BaggageAllowance: data.BaggageAllowance,
              TicketAmount: data.TicketAmount,
              SeatType: data.SeatType,
              TravelClass: data.TravelClass,
              Currency: data.Currency,
              PaymentType: data.PaymentType,
              RewardPoints: data.RewardPoints,
            },
            loading: false,
            err: false,
           });

          //  setCategories({data})

          // setOpen(true);
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
    console.log("Updating trip with values:", values);
    setValues({ ...values, err: false });
    updateTrip(tripId, user._id, token, values)
      .then((data) => {
        console.log(data, "3")
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
        } else {
          setValues({...values, createdTrip: data, loading: false});
          handleClose()

          getAllTrip()
          .then((updatedTrips) => {
            console.log(updatedTrips, "4")
            setTrips(updatedTrips);
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
        <DialogTitle>Update Trip here!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Trip Name"
            type="name"
            fullWidth
            variant="standard"
            value={values.name}
            onChange={(e) => {
              console.log('Changing value:', e.target.value);
              setValues((prevValues) => ({ ...prevValues, name: e.target.value }))}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="tripNumber"
            name="tripNumber"
            label="Trip Number"
            type="tripNumber"
            fullWidth
            variant="standard"
            value={values.tripNumber}
            onChange={(e) => {
              console.log('Changing value:', e.target.value);
              setValues((prevValues) => ({ ...prevValues, tripNumber: e.target.value }))}}
          />
          {/* <TextField
              autoFocus
              margin="dense"
              required
              fullWidth
              // name="category"
              id="Category"
              label="Category"
              select
              value={values.category}
              onChange={(e) => {
                console.log('Changing value:', e.target.value);
                setValues((prevValues) => ({ ...prevValues, category: e.target.value }))}}
             
            > */}
              {/* Map through your category options and create MenuItem for each */}
              {/* {categories.map((category, index) => (
                <MenuItem key={index} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}

  // const onClick = (tripId) => () => {
  //   console.log(tripId, "QQ")
  //   deleteTrip(tripId, user._id, token)
  //     .then((data) => {
  //       console.log(data, "XX")
  //       if (data.err) {
  //         console.log(data.err);
  //       } else {
  //         preload();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // return (
  //   <Base
  //     title="Manage Trips"
  //     description="Welcome to product management section"
  //     className="container"
  //   >
  //     <table className="table table-dark table-borderless table-hover">
  //       <tbody>
  //         {trips.map((trip, index) => {
  //           return (
  //             <tr key={index}>
  //               <th scope="row" className="text-125">
  //                 {trip.name}
  //               </th>
  //               <td className="text-center">
  //                 <Link to={`/admin/product/update/${trip._id}`}>
  //                   <i className="fas fa-edit fas-125"></i>
  //                 </Link>
  //               </td>
  //               <td className="text-center">
  //                 <i
  //                   className="fas fa-trash fas-125"
  //                   onClick={onClick(trip._id)}
  //                 ></i>
  //               </td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </Base>
  // );

  const Demo = () => {
    const [trips, setTrips] = useState([]);
  
    useEffect(() => {
      getAllTrip()
        .then((data) => {
          console.log(data, "TT")
          if (data.err) {
            console.log(data.err);
          } else {
            setTrips(data);
            console.log(data, "ZZ")
          }
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    }, []);
  
    const handleUpdateTrips = (updatedTrips) => {
      setTrips(updatedTrips);
    };
  
  
    const columns = [
      { field: "name", headerName: "Trip Name", width: 200 },
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
              
              <MatEdit tripId={params.row._id} setTrips={handleUpdateTrips} />
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
        <DataGrid rows={trips} columns={columns} pageSize={5} getRowId={(row) => row._id} />
      </div>
      </div>
    );
  };


export default Demo;
