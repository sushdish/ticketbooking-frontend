import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./components/Card";
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BookingStepper from '../core/components/BookingStepper'
import TextField from '@mui/material/TextField';
import { getAllTrip } from "../admin/helper/adminapicall";

const Home = () => {
    const [trips, setTrips] = useState([]);
    const [err, setError] = useState(false);

    const preloadProducts = () => {
        getAllTrip().then((data) => {
            if (data.err) {
                setError(data.err);
            } else {
                setTrips(data);
            }
        })
            .catch((error) => {
                console.error("Error fetching trip data:", error);
                setError("Error fetching trip data");
            });
    };

    useEffect(() => {
        preloadProducts();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


    return (

        // <div>
        //     <h1>Welcome</h1>
        // </div>

        <div style={{ marginLeft: '20px' }}>

            <Base
                title="Book, Pack And Go"
                description="Welcome to Booking Trip!"
                className="container"
            >
                {/* <div className="row">
        {trips.map((trip, index) => {
          return (
            <div className="col-sm-12 col-md-4 col-lg-3">
              <Card key={index} trip={trip} />
            </div>
          );
        })}
      </div> */}


            </Base>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <BookingStepper />
                    </Grid>
                    {/* <Grid item xs={12} style={{ marginBottom: '15px' }}>
                       // Intergate Here Search Funcationality 
                    </Grid> */}
                    <Grid item xs={2}>
                        
                    </Grid>
                    <Grid item xs={10}>
                        <div style={{ height: 400, width: '75%', }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 8 },
                                    },
                                }}
                                pageSizeOptions={[8, 10]}
                            // checkboxSelection
                            />
                        </div>
                        {/* <Item>xs=4</Item> */}
                    </Grid>

                </Grid>
            </Box>
        </div>


    );
};

export default Home;
