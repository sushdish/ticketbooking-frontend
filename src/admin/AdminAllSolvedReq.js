import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { getUserCancellations } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const AdminSolvedReq = () => {
    const { user, token } = isAuthenticated();
    const [solved, setSolved] = useState([]);
  
    const preload = () => {
        getUserCancellations(user._id, token).then((data) => {
          console.log(data, "YY")  //bookingId is in form of _id
        if (data.err) {
          console.log(data.err);
        } else {
            setSolved(data);
        }
      });
    };
  
    useEffect(() => {
      preload();
    }, []);
  
    
  
    return (
      <Base
        title="Manage Admin All Cancellations"
        description="Welcome to All Solved Cancellation Record"
        className="container"
      >
        <table className="table table-dark table-borderless table-hover">
          <tbody>
            {solved.map((solve, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <strong>Trip Name:</strong> {solve.tripName}
                  </div>
                  <div>
                    <strong>Trip Destination (To):</strong> {solve.tripDestinationA}
                  </div>
                  <div>
                    <strong>Trip Destination (From):</strong> {solve.tripDestinationB}
                  </div>
                  <div>
                    <strong>Start Time:</strong> {solve.StartTime}
                  </div>
                  <div>
                    <strong>End Time:</strong> {solve.EndTime}
                  </div>
                  <div>
                <strong>User Reason:</strong> {solve.userReason}
              </div>
                  <div>
                    <strong>Admin Reason:</strong> {solve.adminReason}
                  </div>
                </td>
                {/* <td className="text-center">
                  <i
                    className="fas fa-trash fas-125"
                    onClick={() => {
                      handleOpen(index)
                      setSelectedIndex(index)
                      // handleBookNow();
                      // setTrip(booking); // Set the selected booking
                      setValues({ userReason: '' }); // Clear userReason when modal opens
                    }}
                  ></i>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </Base>
    );
  }

  export default AdminSolvedReq;