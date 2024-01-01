import React, { useState, useEffect } from "react";
import Base from "../Base";
import { isAuthenticated } from "../../auth/helper/index";
import { getAllBookings, cancellation } from "../../admin/helper/adminapicall";
import { Link } from "react-router-dom";

// import Cancellation from "./Cancellation"; 

const MyBookings = () => {
  const { user, token } = isAuthenticated();
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    userReason: "",
    createdData: "",
  });

  const [index, setSelectedIndex] = useState({})
  // const [trip, setTrip] = useState(null)

  const preload = () => {
      getAllBookings(user._id, token).then((data) => {
        console.log(data, "YY")  //bookingId is in form of _id
      if (data.err) {
        console.log(data.err);
      } else {
          setBookings(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const {userReason, createdData} = values

  const handleClose = () => {
    setShowModal(false);
    setSelectedIndex(null)
   
  };

  const handleOpen = (index) => {
    console.log(index, "QQ")
    setShowModal(true);
    setSelectedIndex(index)
   
  }

  const onClick = (event) => {
    event.preventDefault();
    let tripId = null
    let bookingId = null
    if (index !== null && bookings[index]){
      const selectedBooking = bookings[index];
      console.log(selectedBooking, "UU")   //bookingId is in from of _id
      tripId = String(selectedBooking.tripId)
      bookingId = String(selectedBooking._id)
      console.log(tripId, "RR")
    }
    

    const requestBody = {
      tripId: tripId,
      bookingId: bookingId, 
      userReason: values.userReason,
    };

    console.log('Request Body:', requestBody);
      cancellation(user._id, token, requestBody )
        .then((data) => {
          console.log(data, "PP");
          if (data.err) {
            console.log(data.err);
          } else {
            setValues({
              ...values,
              userReason: "",
              createdData: "",
            });
            handleClose(); // Close the modal after successful cancellation
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
  }

  return (
    <Base
      title="All Bookings"
      description="View all your Bookings here"
      className="container"
    >
      <table className="table table-dark table-borderless table-hover">
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>
                <div>
                  <strong>Trip Name:</strong> {booking.tripName}
                </div>
                <div>
                  <strong>Destination A:</strong> {booking.tripDestinationA}
                </div>
                <div>
                  <strong>Destination B:</strong> {booking.tripDestinationB}
                </div>
                <div>
                  <strong>Start Time:</strong> {booking.StartTime}
                </div>
                <div>
                  <strong>End Time:</strong> {booking.EndTime}
                </div>
              </td>
              <td className="text-center">
                <i
                  className="fas fa-trash fas-125"
                  onClick={() => {
                    handleOpen(index)
                    setSelectedIndex(index)
                    setValues({ userReason: '' }); // Clear userReason when modal opens
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal markup */}
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cancellation</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="userReason">Reason for Cancellation:</label>
              <textarea
                id="userReason"
                name="userReason"
                className="form-control"
                value={values.userReason}
                onChange={(e) => setValues({ userReason: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClick}>
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
    </Base>
  );
}

export default MyBookings;