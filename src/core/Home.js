import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./components/Card";
import { getAllTrip } from "../admin/helper/adminapicall";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [err, setError] = useState(false);

  const preloadProducts = () => {
    getAllTrip().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setTrips(data);
      }
    })
    .catch((error) => {
      console.error("Error fetching trip data:", error);
      setError("Error fetching trip data");
    });
  };

  useEffect(() => {
    preloadProducts();
  }, []);

  return (
    <Base
      title="Book, Pack And Go"
      description="Welcome to Booking Trip!"
      className="container"
    >
      <div className="row">
        {trips.map((trip, index) => {
          return (
            <div className="col-sm-12 col-md-4 col-lg-3">
              <Card key={index} trip={trip} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
