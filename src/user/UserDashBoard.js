import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const UserDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const userLeftSide = () => {
    return (
      <div className="card border-success">
        <div className="card-header bg-dark text-light">User Navigation</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/user/mybookings" className="text-success">
              My Bookings
            </Link>
           </li>
           <li className="list-group-item">
            <Link to="/user/mycancellations" className="text-success">
              My Cancellations
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/requestsolved" className="text-success">
              User request Solved
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  

  return (
    <Base
      title="Welcome to User Dashboard"
      description="View All Your Bookings and Cancellations Here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-sm-12 col-md-3">{userLeftSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
