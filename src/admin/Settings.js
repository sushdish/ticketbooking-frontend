import React from "react";
import { useState, useEffect } from "react";
import Base from "../core/Base";
import { adminSignup, getAllAdmin, isAuthenticated, statusChange } from "../auth/helper/index";
import { getAllOffer, bookOffer, getOfferById } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from "../core/components/NavBarv2"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import {  Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Offers from './AddOffer'
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import OfferPage from "./Components/OfferDetails/OfferPage";


const Settings = () => {
  const defaultTheme = createTheme()
  const { user, token } = isAuthenticated();
  const [tab, setTab] = useState('1')
  const [admins, setAdmins] = useState([])
  const [total, setTotal] = useState()
  const [page, setPage] = useState(0)
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    err: "",

  });

  const [offers, setOffers] = useState([])
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [sales, setSales] = useState({
    couponCode: "",
        route_details: {
          DestinationA: "",
          DestinationB: "", 
          Price: 0,
          Message: "",
          EndDate: ""
          
        },
  })

  const preload = () => {

    getAllAdmin(user._id, token, page).then((data) => {
      console.log(data, "YY")
      if (data.err) {
        console.log(data.err);
      } else {
        setAdmins(data.users);
        setTotal(data.totalUsers)
      }
    });
  };

  // const firstload = () => {

  //   getAllOffer(user._id, token, page).then((data) => {
  //     console.log(data, "YY")
  //     if (data.err) {
  //       console.log(data.err);
  //     } else {
  //       setOffers(data.offer);
  //       setTotal(data.totalOffers)
  //     }
  //   });
  // };

  useEffect(() => {
    preload();
    // firstload();
  }, []);

  const handlePagination = async (event, newPage) => {
    setPage(newPage)
    event.preventDefault()

    await getAllAdmin(newPage).then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        setAdmins(data.users);
      }
    })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
      });
  }

  // const handleOfferPagination = async (event, newPage) => {
  //   setPage(newPage)
  //   event.preventDefault()

  //   await getAllOffer(newPage).then((data) => {
  //     if (data.err) {
  //       console.log(data.err);
  //     } else {
  //       setOffers(data.offer);
  //     }
  //   })
  //     .catch((error) => {
  //       console.error("Error fetching trip data:", error);
  //     });
  // }

  // const handleChangeRowsPerPage = (event) => {

  // };

  const navigate = useNavigate();
  const { name, email, password, err } = values;
  const { couponCode, route_details  } = sales

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = (parameter) => (event) => {

    // console.log(parameter, "44")  
    // console.log(event, "45")
    setValues({ ...values, [parameter]: event.target.value });
    // console.log(values, "49")
    // console.log(event.target.value, "52")

  };

  const onSubmit = (event) => {
    event.preventDefault();
    adminSignup(values)
      .then((data) => {
        console.log(data, "A")
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
          window.alert("Registeration Failed")
          console.log("Registeration Failed")
          console.log(values, "61")

        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            err: false,

          });

          window.alert("Registeration Successfull")
          console.log("Registration Successfull")

          console.log(values, "73")
          // console.log(success, "74")
          navigate("/signin")

        }
      })
      .catch(err);
    console.log(err, "80")

  };



  const statusToggle = (body, status) => {
    console.log(status, "162")
    console.log(body, "163")

    const requestBody = {
      userId: body                    //here userId has to be named same as the backend temporary variable
      //const {userId} = req.body
    }
    console.log(requestBody, "168")

    statusChange(user._id, token, requestBody, status)
      .then((data) => {
        console.log(data, "172")
        if (data.err) {
          console.log(data.err, "169")
        } else {
          // setAdmins(data)

          getAllAdmin(user._id, token, page).then((data) => {
            console.log(data, "YY")
            if (data.err) {
              console.log(data.err);
            } else {
              setAdmins(data.users);
              setTotal(data.totalUsers)
            }
          });
        }
      })
  }

  // const handleAddOfferButton = () => {
  
  //   if (isAuthenticated()) {

  //     setCancelDialogOpen(true);
  //   } else {
  //     navigate('/signin')
  //   }
  // };

  // const handleCloseAddOfferDialog = () => {
  //   setCancelDialogOpen(false);
    
  // };

  // const AddOffers = (sales) => {
  //   // event.preventDefault();
  //   bookOffer(user._id, token, sales)
  //     .then((data) => {
  //       console.log(data, "172")
  //       if (data.err) {
  //         console.log(data.err, "169")
  //       } else {
  //         setSales({
  //           ...sales,
  //           couponCode: "",
  //           route_details: {
  //             DestinationA: "",
  //             DestinationB: "", 
  //             Price: "",
  //             Message: "",
  //             EndDate: ""
              
  //           },

  //         });
  //         setCancelDialogOpen(false);

  //         window.alert("Offer Created")
  //         console.log("Offer Created")

  //         getAllOffer(user._id, token, page).then((data) => {
  //           console.log(data, "YY")
  //           if (data.err) {
  //             console.log(data.err);
  //           } else {
  //             setOffers(data.offer);
  //             setTotal(data.totalOffers)
  //           }
  //         });
  //       }
  //     })
  // }

  // const handleEditClick = (offerId) => {
  //   console.log(offerId, "281")
  //   getOfferById(offerId)
  //   .then((data) => {
  //     console.log(data, "BB")
  //       if (data.err) {
  //        console.log(data.err)
  //       } else {
  //         setSales({...sales, 
  //         couponCode: data.couponCode,
  //         route_details: {
  //         DestinationA: data.route_details.DestinationA,
  //         DestinationB: data.route_details.DestinationB, 
  //         Price: data.route_details.Price,
  //         Message: data.route_details.Message,
  //         EndDate: data.route_details.EndDate
          
  //       },
  //         })
  //         console.log(sales, "299")
  //         setCancelDialogOpen(true)
  //       }
  //   })
  // }

  // const handleUpdate = () => {
    
  //   const requestBody = {
  //     couponCode: sales.couponCode,
  //       route_details: sales.route_details,
  //       }
  //       console.log(requestBody, "77")

   
  //   updateTrip(user._id, token, offerId, requestBody)
  //     .then((data) => {
  //       console.log(data, "3")
  //       if (data.err) {
  //         console.log(data.err)
  //       } else {
  //         setSales({...sales, 
  //           couponCode: data.couponCode,
  //         route_details: {
  //         DestinationA: data.route_details.DestinationA,
  //         DestinationB: data.route_details.DestinationB, 
  //         Price: data.route_details.Price,
  //         Message: data.route_details.Message,
  //         EndDate: data.route_details.EndDate
          
  //       },
  //         });
  //         console.log(sales, "99")
          // handleClose()

          // getEveryTrip()
          // .then((updatedCategories) => {
          //   console.log(updatedCategories, "4")
          //   setTrips(updatedCategories);
          // })
  //         .catch((error) => {
  //           console.error('Error fetching categories:', error);
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <>
      <Navbar />


      <Box sx={{ width: '100%', typography: 'body1', marginTop: '60px', marginLeft: '300px', marginRight: '20px' }}>
        <TabContext value={tab} >
          <div style={{ borderBottom: '1px solid #ccc' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="Create Admin" value="1" />
              <Tab label="Status Change" value="2" />
              <Tab label="Offers" value="3" />
            </TabList>
          </div>
          <TabPanel value="1">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flex: 2, // Adjust the flex value as needed,
                padding: 2,
                marginLeft: '10px', // Additional left margin
                marginTop: '50px', // Additional top margin
                // height: '100vh', // Adjust the height as needed
              }}
            >

              <Card sx={{ minWidth: '40%', width: '60%', borderRadius: '16px' }}>
                <CardContent>
                  <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      onChange={handleChange("name")}
                      value={name}
                      label="Full Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      onChange={handleChange("email")}
                      value={email}
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={password}
                      onChange={handleChange("password")}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />



                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>

          </TabPanel>
          <TabPanel value="2">
            <TableContainer component={Paper} sx={{ maxWidth: 600, marginLeft: '100px', marginRight: '100px', padding: 2 }}>
              <Table sx={{ minWidth: 300, maxWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell> Details </TableCell>
                    {/* <TableCell>Refund Amount</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admins.map((current) => (
                    <TableRow key={current._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <div style={{ marginBottom: '8px' }}>
                          Name : {current.name}
                        </div >
                        <div>
                          {current.email}
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div >
                          <Button

                            variant="contained"
                            color="primary"
                            onClick={() => statusToggle(current._id, current.status)}>
                            {current.status}
                          </Button>
                        </div>
                        {/* <VisibilityIcon onClick={() => handleViewButtonClick(points)}></VisibilityIcon> */}

                      </TableCell>


                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={handlePagination}
              rowsPerPage={5}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </TabPanel>



          <TabPanel value="3">

            <TableContainer component={Paper} sx={{ maxWidth: 600, marginLeft: '100px', marginRight: '100px', padding: 2 }}>
              {/* <Table sx={{ minWidth: 300, maxWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Offer Details </TableCell>
                  </TableRow>
                </TableHead>
               
              </Table> */}

              <OfferPage />
           
            {/* <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={handleOfferPagination}
              rowsPerPage={5}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
              </TableContainer>

             
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddOfferButton()}
            >
              Add Offers
            </Button> */}
                          
            {/* <Dialog open={isCancelDialogOpen} onClose={handleCloseAddOfferDialog} >
            <Offers CloseAddOffer={() => (setCancelDialogOpen(false))}AddSales={AddOffers} />
            </Dialog> */}
          </TabPanel>
        </TabContext>
      </Box>


    </>
  )
}

export default Settings
