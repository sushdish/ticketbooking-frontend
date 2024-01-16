import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

import HomeV2 from "../core/Homev2"

import Home from "../core/Homev2"


const UserDashBoard = () => {
 



 


  return (
    <div>

    <Base
      title="Welcome to User Dashboard"
      description="View All Your Bookings and Cancellations Here"
      className="container bg-success p-4"
    >

     
    </Base>
    <HomeV2/>
    </div>


      
    
    

  );
};

export default UserDashBoard;