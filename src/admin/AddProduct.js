import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getAllCategories, createTrip } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  
  

  const [values, setValues] = useState({
    name: "",
    category: "",
    tripNumber: "",
    trips_details: {
      DestinationA: "",
      DestinationB: "",
      SeatCount: 0,
      StartTime: Date.now(),
      EndTime: Date.now(),
      BaggageAllowance: 0,
      TicketAmount: 0,
      SeatType: [],
      TravelClass: [],
      Currency: "",
      PaymentType: [],
      RewardPoints: 0,
    },
    loading: false,
    err: "",
    createdTrip: "",
    getRedirect:"",
    categories: [],
  });

  const { name, category, tripNumber, trips_details, loading, err, createdTrip, getRedirect, categories } = values;

  const navigate = useNavigate();

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.err) {
        setValues({ ...values, err: data.err });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  const handleChange = (name) => (event) => {
    const value = event.target.value;
  
    if (name === 'trips_details') {
      
      const tripsDetails = { ...values.trips_details, [event.target.name]: value };
      setValues({ ...values, trips_details: tripsDetails });
    } else {
      setValues({ ...values, [name]: value });
     
    }
  };

  // const handleChange = (name) => (event) => {
  //   setValues({ ...values, [event.target.name]: event.target.value })
  // }
  

  const onClick = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false, loading: true });
    createTrip(user._id, token, values )
      .then((data) => {
        if (data.err) {
          setValues({ ...values, err: data.err, loading: false });
        } else {
          setValues({...values, createdTrip: data, loading: false});
          // setTimeout(() => {
          //   setValues({ ...values, getRedirect: true });
          // }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  const createTripForm = () => {
    return (
      <div className="row">
        <form className="col col-lg-6 col-md-8 col-sm-12">
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              Trip Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={values.name}
              onChange={handleChange("name")}
              id="name"
              placeholder="Trip Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              Trip Number
            </label>
            <textarea
              type="text"
              rows="3"
              className="form-control"
              name="tripNumber"
              value={values.tripNumber}
              onChange={handleChange("tripNumber")}
              id="tripNumber"
              placeholder="TripNumber"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              DestinationA
            </label>
            <input
              className="form-control"
              name="DestinationA"
              value={values.trips_details.DestinationA}
              onChange={(event) => handleChange("trips_details")(event)}
              id="DestinationA"
              placeholder="DestinationA"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="text-light">
              Category
            </label>
            <select
              className="form-control custom-select"
              name="category"
              value={values.category}
              onChange={handleChange("category")}
              id="category"
              required
            >
              <option defaultValue>Choose</option>

              {categories.map((category, index) => {
                return (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            DestinationB
            </label>
            <input
              className="form-control"
              name="DestinationB"
              value={values.trips_details.DestinationB}
              onChange={(event) => handleChange("trips_details")(event)}
              id="DestinationB"
              placeholder="DestinationB"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            SeatCount
            </label>
            <input
              className="form-control"
              name="SeatCount"
              value={values.trips_details.SeatCount}
              onChange={(event) => handleChange("trips_details")(event)}
              id="SeatCount"
              placeholder="SeatCount"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            BaggageAllowance
            </label>
            <input
              className="form-control"
              name="BaggageAllowance"
              value={values.trips_details.BaggageAllowance}
              onChange={(event) => handleChange("trips_details")(event)}
              id="BaggageAllowance"
              placeholder="BaggageAllowance"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            TicketAmount
            </label>
            <input
              className="form-control"
              name="TicketAmount"
              value={values.trips_details.TicketAmount}
              onChange={(event) => handleChange("trips_details")(event)}
              id="TicketAmount"
              placeholder="TicketAmount"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            SeatType
            </label>
            <input
              className="form-control"
              name="SeatType"
              value={values.trips_details.SeatType}
              onChange={(event) => handleChange("trips_details")(event)}
              id="SeatType"
              placeholder="SeatType"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            TravelClass
            </label>
            <input
              className="form-control"
              name="TravelClass"
              value={values.trips_details.TravelClass}
              onChange={(event) => handleChange("trips_details")(event)}
              id="TravelClass"
              placeholder="TravelClass"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            Currency
            </label>
            <input
              className="form-control"
              name="Currency"
              value={values.trips_details.Currency}
              onChange={(event) => handleChange("trips_details")(event)}
              id="Currency"
              placeholder="Currency"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            PaymentType
            </label>
            <input
              className="form-control"
              name="PaymentType"
              value={values.trips_details.PaymentType}
              onChange={(event) => handleChange("trips_details")(event)}
              id="PaymentType"
              placeholder="PaymentType"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
            RewardPoints
            </label>
            <input
              className="form-control"
              name="RewardPoints"
              value={values.trips_details.RewardPoints}
              onChange={(event) => handleChange("trips_details")(event)}
              id="RewardPoints"
              placeholder="RewardPoints"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-block"
            onClick={onClick}
          >
            Submit
          </button>
        </form>
      </div>
    );
  };

  
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <div className="alert alert-dark">{err}</div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <div className="alert alert-success">Success</div>
        </div>
      </div>
    );
  };

  const loadingSpinner = () => {
    return (
      <div className="row">
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <Spinner animation="border" variant="light" />
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Add Trip"
      description="Welcome to Trip creation section!"
      className="container"
    >
      {loading && loadingSpinner()}
      {createdTrip && successMessage()}
      {err && errorMessage()}
      {/* {photoForm()} */}
      {createTripForm()}
      {getRedirect && <navigate to="/admin/dashboard" />}
    </Base>
  );
};

export default AddProduct;
