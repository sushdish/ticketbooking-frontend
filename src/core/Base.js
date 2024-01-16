import React from "react";
import NavBar from "./components/NavBar";
import NavBarV2 from "./components/NavBarv2";

import { isAuthenticated } from "../auth/helper/index";

import Footer from "./components/Footer";
import Jumbotron from "./components/Jumbotron";

const Base = ({
  title = "Title",
  description = "Description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    {/* <NavBar /> */}
    {  isAuthenticated() ? <NavBarV2 /> : ''}
    <div style={{display : "flex", flexDirection : "column" , alignItems : 'center' , justifyContent : "center"}}>
      {/* <Jumbotron title={title} description={description} /> */}
      <h2 style={{marginTop : "20px"}}>{title}</h2>
      <h4 style={{marginTop : '-10px'}}>{description}</h4>
    </div>
    {/* <div className={className}>
      
      {children}</div> */}
    {/* <Footer /> */}
  </div>
);

export default Base;