import React, { useState, useEffect } from "react";
import Base from "./Base";
import "../styles.css";

const Home = () => {






  return (
    <Base
      title="Home"
      description="Welcome to Booking Trip!"
      className="container"
    >
      <h1 style={{ color: 'white' }}>Welcome To Our Website</h1>
      <p style={{ color: 'white' }}>
        This is a website created for booking trips and packaging your belongings. You can search for flights, hotels or rent cars
        This is a simple application for booking trips. You can search and book your trip by selecting the destination you want to visit or simply browse
        </p>
        <div className="row">
          <section id="left-col">
            <h2  style={{ color: 'white' }}>About Us:</h2>
            <p style={{ color: 'white' }}>
              We are a company that specializes in providing travel services for both individuals and groups. Whether you're planning a quick weekend getaway or a long trip
              </p>
              </section>
              </div>


    </Base>
   
  );
};

export default Home;
