import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import HomeV2 from "../core/HomeNewV2"

const AdminDashBoard = () => {
 


  return (
    <div>
    <Base
      title="Welcome to Admin Dashboard"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      
    </Base>
    <HomeV2/>
    </div>
  );
};

export default AdminDashBoard;
