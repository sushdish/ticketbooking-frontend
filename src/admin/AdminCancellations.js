import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { getPendingCancellations, adminReason , refund} from "./helper/adminapicall";
import { Link } from "react-router-dom";

// import Cancellation from "./Cancellation"; 

const AdminCancellations = () => {
  const { user, token } = isAuthenticated();
  const [pendings, setPendings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    adminReason: "",
    createdData: "",
  });

  const [refunds, setRefunds] = useState({
    amount: "",
    created: "",
  })

  const [index, setSelectedIndex] = useState({})
 

  const preload = () => {
    getPendingCancellations(user._id, token).then((data) => {
        console.log(data, "YY")  //bookingId is in form of _id
      if (data.err) {
        console.log(data.err);
      } else {
        setPendings(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const {userReason, createdData} = values
  const {amount, created} = refunds

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
    let cancellationId = null
    let bookingId = null
    if (index !== null && pendings[index]){
      const selectedBooking = pendings[index];
      console.log(selectedBooking, "UU")   
      tripId = String(selectedBooking.tripId)
      cancellationId = String(selectedBooking._id)
      bookingId = String(selectedBooking.bookingId)
      console.log(tripId, "RR")
    }
    

    const requestBody = {
      cancellationId: cancellationId,
      bookingId : bookingId, 
      tripId: tripId,
      amount: refunds.amount,
      adminReason: values.adminReason,
    };

    console.log('Request Body:', requestBody);
    adminReason(user._id, token, requestBody )
    refund(user._id, token, requestBody)
        .then((data) => {
          console.log(data, "PP");
          if (data.err) {
            console.log(data.err);
          } else {
            setValues({
              ...values,
              adminReason: "",
              createdData: "",
            });

            setRefunds({
              ...refunds,
              amount: "",
              created: "",
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
      title="Manage Admin Cancellations"
      description="Admin response and Refund action carried here"
      className="container"
    >
      <table className="table table-dark table-borderless table-hover">
        <tbody>
          {pendings.map((pending, index) => (
            <tr key={index}>
              <td>
                <div>
                  <strong>Trip Name:</strong> {pending.tripName}
                </div>
                <div>
                  <strong>Trip Destination (To):</strong> {pending.tripDestinationA}
                </div>
                <div>
                  <strong>Trip Destination (From):</strong> {pending.tripDestinationB}
                </div>
                <div>
                  <strong>Start Time:</strong> {pending.StartTime}
                </div>
                <div>
                  <strong>End Time:</strong> {pending.EndTime}
                </div>
                <div>
                  <strong>User Reason:</strong> {pending.userReason}
                </div>
                <div>
                  <strong>Admin Reason:</strong> {pending.adminReason}
                </div>
              </td>
              <td className="text-center">
                <i
                  className="fas fa-trash fas-125"
                  onClick={() => {
                    handleOpen(index)
                    setSelectedIndex(index)
                  
                    setValues({ adminReason: '' }); // Clear userReason when modal opens
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
              <label htmlFor="adminReason">Admin Reply:</label>
              <textarea
                id="adminReason"
                name="adminReason"
                className="form-control"
                value={values.adminReason}
                onChange={(e) => setValues({ adminReason: e.target.value})}
              />
              </div>
              <div className="form-group">
              <label htmlFor="amount">Refund:</label>
              <textarea
                id="amount"
                name="amount"
                className="form-control"
                value={refunds.amount}
                onChange={(e) => setRefunds({ amount: e.target.value})}
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

export default AdminCancellations;