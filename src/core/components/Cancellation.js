import React, { useState , useEffect} from 'react';
import Base from "../Base";
import MyBookings from "./MyBookings";
import { cancellation } from"../../admin/helper/adminapicall"; 
import { isAuthenticated } from '../../auth/helper';
import {getAllCancellations} from '../../admin/helper/adminapicall'

const MyCancellations = () => {
  const { user, token } = isAuthenticated();
  const [cancellations, setCancellations] = useState([]);

  const preload = () => {
    getAllCancellations(user._id, token).then((data) => {
      console.log(data, "YY")  //bookingId is in form of _id
    if (data.err) {
      console.log(data.err);
    } else {
      setCancellations(data);
    }
  });
};

useEffect(() => {
  preload();
}, []);

return (
  <Base
    title="All Cancellations"
    description="Welcome to your cancellation history"
    className="container"
  >
    <table className="table table-dark table-borderless table-hover">
      <tbody>
        {cancellations.map((cancellation, index) => (
          <tr key={index}>
            <td>
              <div>
                <strong>Trip Name:</strong> {cancellation.tripName}
              </div>
              <div>
                <strong>Trip Destination (To):</strong> {cancellation.tripDestinationA}
              </div>
              <div>
                <strong>Trip Destination (From):</strong> {cancellation.tripDestinationB}
              </div>
              <div>
                <strong>Start Time:</strong> {cancellation.StartTime}
              </div>
              <div>
                <strong>End Time:</strong> {cancellation.EndTime}
              </div>
              <div>
                <strong>User Reason:</strong> {cancellation.userReason}
              </div>
            </td>
            <td className="text-center">
              {/* <i
                className="fas fa-trash fas-125"
                onClick={onClick(trip._id)}
              ></i> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </Base>
  );
}


export default MyCancellations;