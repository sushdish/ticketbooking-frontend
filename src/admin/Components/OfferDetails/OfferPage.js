import React, { useState, useEffect } from 'react'
import TableBody from '@mui/material/TableBody';
import { TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import { getAllOffer, getOfferById, bookOffer , updateOffer, deleteOffer} from "../../helper/adminapicall";
import { adminSignup, getAllAdmin, isAuthenticated, statusChange } from "../../../auth/helper/index";
import HandleOffer from './HandleOffer';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


const OfferPage = () => {
  const navigate = useNavigate();

  const { user, token } = isAuthenticated();
  const [total, setTotal] = useState()
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [offertype, setoffertype] = useState("")

  const [offers, setOffers] = useState([])
  const [page, setPage] = useState(0)

  const [sales, setSales] = useState({
    _id: "",
    couponCode: "",
    route_details: {
      DestinationA: "",
      DestinationB: "",
      Price: 0,
      Message: "",
      EndDate: ""

    },
  })



  const handleEditClick = (offerId) => {
    console.log(offerId, "281")
  
    setoffertype("Edit")
    getOfferById(offerId)
      .then((data) => {
        console.log(data, "BB")
        if (data.err) {
          console.log(data.err)
        } else {
          setSales({
            ...sales,
            _id: data._id, 
            couponCode: data.couponCode,
            route_details: {
              DestinationA: data.route_details.DestinationA,
              DestinationB: data.route_details.DestinationB,
              Price: data.route_details.Price,
              Message: data.route_details.Message,
              EndDate: data.route_details.EndDate
            },
          })
          // console.log(sales, "299")
          setCancelDialogOpen(true)
        }
      })
  }

  
  const firstload = () => {

    getAllOffer(user._id, token, page).then((data) => {
      console.log(page, "97")
      console.log(data, "YY")
      if (data.err) {
        console.log(data.err);
      } else {
        setOffers(data.offer);
        setTotal(data.totalOffers)
      }
    });
  };

  useEffect(() => {
    firstload()
  }, [])

  const handleOfferPagination = async (event, newPage) => {
    console.log(newPage, "73")
    setPage(newPage)
    console.log(newPage, "99")
    console.log(page, "75")
    event.preventDefault()

    await getAllOffer(user._id, token, newPage).then((data) => {
      console.log(newPage, "94")
      if (data.err) {
        console.log(data.err);
      } else {
        setOffers(data.offer);
      }
    })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
      });
  }

  const handleChangeRowsPerPage = (event) => {

  };


  const EditOfferDetails = (UpdatedofferDetails) => {
    // console.log(selectedId, "Id")
    console.log(UpdatedofferDetails, "edit Offer Details")
    updateOffer(user._id, token, UpdatedofferDetails)
      .then((data) => {
        console.log(data, "3")
        if (data.err) {
          console.log(data.err)
        } else {
          setSales({...sales, 
          _id: "",
          couponCode: "",
          route_details: {
          DestinationA: "",
          DestinationB: "", 
          Price: "",
          Message: "",
          EndDate:""
          
        },
          });
          console.log(sales, "99")
          setCancelDialogOpen(false);

          getAllOffer(user._id, token, page).then((data) => {
            console.log(data, "YY")
            if (data.err) {
              console.log(data.err);
            } else {
              setOffers(data.offer);
              setTotal(data.totalOffers)
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDeleteClick = (offerId) => {
    console.log(offerId, "281")
  
    // setoffertype("Delete")
    getOfferById(offerId)
      .then((data) => {
        console.log(data, "BB")
        if (data.err) {
          console.log(data.err)
        } else if (data) {
          deleteOffer(offerId, user._id, token)
          .then((daata) => {
            console.log(daata, "YY")
            if (daata.err) {
              console.log(daata.err);
            } else {
              console.log(daata, "173")
            }
            getAllOffer(user._id, token, page).then((data) => {
              console.log(page, "97")
              console.log(data, "YY")
              if (data.err) {
                console.log(data.err);
              } else {
                setOffers(data.offer);
                setTotal(data.totalOffers)
              }
            });
          })
          
        }
      })
  }

// const DeleteOfferDetails = () => {
//   // console.log(UpdatedofferDetails, "edit Offer Details")
//   deleteOffer(user._id, token, UpdatedofferDetails)
//       .then((data) => {
//         console.log(data, "3")
//         if (data.err) {
//           console.log(data.err)
//         } else {
//           setSales({...sales, 
//           _id: "",
//           couponCode: "",
//           route_details: {
//           DestinationA: "",
//           DestinationB: "", 
//           Price: "",
//           Message: "",
//           EndDate:""
          
//         },
//           });
//           console.log(sales, "99")
//           setCancelDialogOpen(false);

//           getAllOffer(user._id, token, page).then((data) => {
//             console.log(data, "YY")
//             if (data.err) {
//               console.log(data.err);
//             } else {
//               setOffers(data.offer);
//               setTotal(data.totalOffers)
//             }
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// }

        const AddOffers = (sales) => {
          console.log(sales, "139")
          // event.preventDefault();
          bookOffer(user._id, token, sales)
            .then((data) => {
              console.log(data, "172")
              if (data.err) {
                console.log(data.err, "169")
              } else {
                setSales({
                  ...sales,
                  couponCode: "",
                  route_details: {
                    DestinationA: "",
                    DestinationB: "",
                    Price: "",
                    Message: "",
                    EndDate: ""

                  },

                });
                setCancelDialogOpen(false);

                window.alert("Offer Created")
                console.log("Offer Created")

                getAllOffer(user._id, token, page).then((data) => {
                  console.log(data, "YY")
                  if (data.err) {
                    console.log(data.err);
                  } else {
                    setOffers(data.offer);
                    setTotal(data.totalOffers)
                  }
                });
              }
            })
        }

        

        const handleAddOfferButton = () => {

          if (isAuthenticated()) {
            setSales({
              couponCode: "",
              route_details: {
                DestinationA: "",
                DestinationB: "",
                Price: 0,
                Message: "",
                EndDate: ""

              },
            })
            setoffertype("Add")
            setCancelDialogOpen(true);
          } else {
            navigate('/signin')
          }
        };

        const handleCloseAddOfferDialog = () => {
          setSales({
            couponCode: "",
            route_details: {
              DestinationA: "",
              DestinationB: "",
              Price: 0,
              Message: "",
              EndDate: ""

            },
          })

          console.log(sales, "Sales")
          setCancelDialogOpen(false);
        };

       

        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddOfferButton()}
            >
              Add Offers
            </Button>
            <Table sx={{ minWidth: 300, maxWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Offer Details </TableCell>
                  {/* <TableCell>Refund Amount</TableCell> */}
                </TableRow>
              </TableHead>

            </Table>
            <TableBody>
              {offers.map((sale) => (
                <TableRow key={sale._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <div style={{ marginBottom: '8px' }}>
                      Coupon Code : {sale.couponCode}
                    </div >
                    <div>
                      {sale.route_details.DestinationA} to {sale.route_details.DestinationB}
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div >
                      <EditIcon onClick={() => handleEditClick(sale._id)}></EditIcon>

                    </div>

                   

                  </TableCell>

                  <TableCell>

                  <div >
                      <DeleteIcon onClick={() => handleDeleteClick(sale._id)}></DeleteIcon>

                    </div>

                  </TableCell>




                </TableRow>
              ))}
            </TableBody>

            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={handleOfferPagination}
              rowsPerPage={5}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={isCancelDialogOpen} onClose={handleCloseAddOfferDialog} >
              <HandleOffer CloseAddOffer={() => (setCancelDialogOpen(false))}
                AddSales={AddOffers}
                EditOffer={EditOfferDetails}
                // DeleteOffer= {DeleteOfferDetails}
                type={offertype}
                sales={sales}
                setSales={setSales}
              />
            </Dialog>
          </div>
        )
      }

export default OfferPage
