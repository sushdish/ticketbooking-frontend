import React, { useState } from "react"
import { bookTrip } from"../../admin/helper/adminapicall";
import { isAuthenticated } from '../../auth/helper';
import Base from "../Base";


const BookingModal = ({ showModal, handleClose, trip }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    paymentReferenceNumber: "",
    booking_details: {
      seatType:"",
      travelClass: "",
      paymentType: "",
    },
    createdBook: "",
    loading: false,
    err: "",
  })


const { paymentReferenceNumber, booking_details, createdBook, loading, err } = values



const handleChange = (name) => (event) => {
  const value = event.target.value;


  if (name === "booking_details") {
    const updatedBookingDetails = {...values.booking_details, [event.target.name]: value};

    setValues({...values, booking_details: updatedBookingDetails,});
  } else {
    setValues({ ...values, [name]: value });
  }
};


const onClick = (event) => {
  event.preventDefault();
  setValues({ ...values, err: false, loading: true });

  const requestBody = {
    tripId: trip._id, // Assuming trip._id is available in your component
    paymentReferenceNumber: values.paymentReferenceNumber,
    paymentType: values.booking_details.paymentType,
    travelClass: values.booking_details.travelClass,
    seatType: values.booking_details.seatType,
  };

  bookTrip(user._id, token, requestBody )
    .then((data) => {
      console.log(data, "86")
      if (data.err) {
        setValues({ ...values, err: data.err, loading: false });
      } else {
        // const { paymentReferenceNumber, booking_details } = data;
        setValues({
          ...values,
          paymentReferenceNumber: "",
          booking_details: {
            seatType: "",
            travelClass: "",
            paymentType: "",
          },
          createdBook: data,
          loading: false,
          err: "",
        });
        handleClose()
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog">
       <div className="modal-dialog modal-dialog-centered" role="document">
         <div className="modal-content">
           <div className="modal-header">
            <h5 className="modal-title">Confirm Booking</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
           </div>
          <div className="modal-body">
            <p>Are you sure you want to book this trip?</p>
             
            <div className="form-group">
            <label htmlFor="seatType" className="text-light">
              SeatType
            </label>
            <select
              className="form-control custom-select"
              name="seatType"
              value={values.booking_details.seatType}
              onChange={(event) => handleChange("booking_details")(event)}
              id="seatType"
              required
            >
              <option defaultValue>Choose</option>

              {trip.trips_details.SeatType.map((seatType, index) => {
                return (
                  <option key={index} value={seatType}>
                    {seatType}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="travelClass" className="text-light">
              TravelClass
            </label>
            <select
              className="form-control custom-select"
              name="travelClass"
              value={values.booking_details.travelClass}
              onChange={(event) => handleChange("booking_details")(event)}
              id="travelClass"
              required
            >
              <option defaultValue>Choose</option>

              {trip.trips_details.TravelClass.map((travelClass, index) => {
                return (
                  <option key={index} value={travelClass}>
                    {travelClass}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="paymentType" className="text-light">
              PaymentType
            </label>
            <select
              className="form-control custom-select"
              name="paymentType"
              value={values.booking_details.paymentType}
              onChange={(event) => handleChange("booking_details")(event)}
              id="paymentType"
              required
            >
              <option defaultValue>Choose</option>

              {trip.trips_details.PaymentType.map((paymentType, index) => {
                return (
                  <option key={index} value={paymentType}>
                    {paymentType}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="form-group">
              <label htmlFor="paymentReferenceNumber">Payment Reference Number:</label>
              <textarea
                id="paymentReferenceNumber"
                name="paymentReferenceNumber"
                className="form-control"
                value={values.paymentReferenceNumber}
                onChange={(e) => setValues({ paymentReferenceNumber: e.target.value})}
              />
              
            </div> */}
            <div className="form-group">
              <label htmlFor="paymentReferenceNumber">Payment Reference Number:</label>
               {/* Display the paymentReferenceNumber */}
                  <p>{paymentReferenceNumber}</p>
                 </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onClick}>
             Book Now
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}


export default BookingModal;