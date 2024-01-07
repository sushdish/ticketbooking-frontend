import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import BookingStepper from '../core/components/BookingStepper'
import TextField from '@mui/material/TextField';
import { getAllTrip, getTripById, bookTrip } from "../admin/helper/adminapicall";
import { IconButton, FormControlLabel } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { isAuthenticated } from "../auth/helper/index";
import Booktrip from "./components/Booktrip";
import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Homev3 = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [viewTrip, setViewtrip] = useState({});
    const [tripId , settripId] = useState('')


    const MatEdit =  ({ trip }) => {
        settripId(trip)


        return (
            <>
                <FormControlLabel
                    control={
                        <IconButton
                            color="secondary"
                            aria-label="add an alarm"
                            onClick={handleOpenTrip}
                        >
                            <VisibilityIcon style={{ color: blue[500] }} />
                        </IconButton>
                    }
                />
            </>
        );
    }

    const handleOpenTrip = () => {
        // console.log(getTrip , 'getTrip53')

        getTripById(tripId)
        .then((data) => {
        //   console.log(data, "BB")
          if (data.err) {
            // setValues(data.err);
          } else {
            console.log(data , "61")
            setViewtrip(data)
        setOpenDialog(true)

          }
        })
    }


    const [trips, setTrips] = useState([]);

    useEffect(() => {
        getAllTrip()
            .then((data) => {
                if (data.err) {
                    console.log(data.err);
                } else {
                    setTrips(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

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

                        <MatEdit trip={params.row._id} />
                    </div>
                )
            },
        },
    ];

    return (
        <div>
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
            <Dialog open={openDialog}>
                <Booktrip tripDetails={viewTrip} />
            </Dialog>


        </div>
    )
}

export default Homev3
