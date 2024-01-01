import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllTrip, deleteTrip } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const { user, token } = isAuthenticated();
  const [trips, setTrips] = useState([]);

  const preload = () => {
    getAllTrip().then((data) => {
      console.log(data, "TT")
      if (data.err) {
        console.log(data.err);
      } else {
        setTrips(data);
        console.log(data, "ZZ")
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onClick = (tripId) => () => {
    console.log(tripId, "QQ")
    deleteTrip(tripId, user._id, token)
      .then((data) => {
        console.log(data, "XX")
        if (data.err) {
          console.log(data.err);
        } else {
          preload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Base
      title="Manage Trips"
      description="Welcome to product management section"
      className="container"
    >
      <table className="table table-dark table-borderless table-hover">
        <tbody>
          {trips.map((trip, index) => {
            return (
              <tr key={index}>
                <th scope="row" className="text-125">
                  {trip.name}
                </th>
                <td className="text-center">
                  <Link to={`/admin/product/update/${trip._id}`}>
                    <i className="fas fa-edit fas-125"></i>
                  </Link>
                </td>
                <td className="text-center">
                  <i
                    className="fas fa-trash fas-125"
                    onClick={onClick(trip._id)}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Base>
  );
};

export default ManageProducts;
