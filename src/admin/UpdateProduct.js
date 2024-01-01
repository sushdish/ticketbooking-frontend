import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {
  getAllCategories,
  getTripById,
  updateTrip,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const tripId = match.params.tripId;

 

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
    success: "",
    
  });


  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { name, category, tripNumber, trips_details, loading, err, success } = values;

  const preloadCategories = async () => {
    await getAllCategories().then((data) => {
      if (data.err) {
        setValues({ ...values, err: data.err });
      } else {
        setCategories(data);
      }
    });
  };

  const preloadTrip = async (next) => {
    await getTripById(tripId).then((data) => {
      console.log(data, "99")
      if (data.err) {
        setValues({ ...values, err: data.err });
      } else {
        setValues({
          ...values,
          name: data.name,
          category: data.category,  
          tripNumber: data.tripNumber, 
          trips_details: {
            DestinationA: data.DestinationA,
            DestinationB: data.DestinationB,
            SeatCount: data.SeatCount,
            StartTime: data.StartTime,
            EndTime: data.EndTime,
            BaggageAllowance: data.BaggageAllowance,
            TicketAmount: data.TicketAmount,
            SeatType: data.SeatType,
            TravelClass: data.TravelClass,
            Currency: data.Currency,
            PaymentType: data.PaymentType,
            RewardPoints: data.RewardPoints,
          },
          loading: false,
          err: false,
          // formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preloadTrip();
    preloadCategories();
  }, []);

  // const handleChange =  (event) => {
  //   // const value = name === "photo" ? event.target.files[0] : event.target.value;
  //   // formData.set(name, value);
  //   setValues({
  //     ...values,
  //     // [name]: value,
  //     err: false,
  //     loading: false,
  //     success: false,
  //   });
  // };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
  
    if (name === 'trips_details') {
      
      const tripsDetails = { ...values.trips_details, [event.target.name]: value };
      setValues({ ...values, trips_details: tripsDetails });
      // If you want to update formData with trips_details as well
      // values.formData.set(name, JSON.stringify(tripsDetails));
    } else {
      setValues({ ...values, [name]: value });
      // values.formData.set(name, value);
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false, loading: true });
    updateTrip(tripId, user._id, token, values)
      .then((data) => {
        if (data.err) {
          setValues({ ...values, err: data.err, loading: false });
        } else {
          setValues({...values, createdTrip: data, loading: false});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const photoForm = () => {
  //   return (
  //     <div className="row mb-3">
  //       <form className="col col-lg-6 col-md-8 col-sm-12 was-validated">
  //         <div className="custom-file">
  //           <input
  //             className="custom-file-input"
  //             type="file"
  //             accept="image/*"
  //             name="photo"
  //             id="photo"
  //             onChange={handleChange("photo")}
  //           />
  //           <label className="custom-file-label" htmlFor="photo">
  //             {"Photo"}
  //           </label>
  //           <div className="invalid-feedback">
  //             Example invalid custom file feedback
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };

  const updateTripForm = () => {
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
              placeholder="tripNumber"
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
              {categories.map((thisCategory, index) => {
                if (thisCategory._id === category) {
                  return (
                    <option key={index} value={thisCategory._id} defaultValue>
                      {thisCategory.name}
                    </option>
                  );
                } else {
                  return (
                    <option key={index} value={thisCategory._id}>
                      {thisCategory.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="categoryName" className="text-light">
              Quantity
            </label>
            <input
              className="form-control"
              name="stock"
              value={stock}
              onChange={handleChange("stock")}
              id="stock"
              placeholder="Quantity"
              required
            />
          </div> */}
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
      title="Add Trips"
      description="Welcome to Trip creation section!"
      className="container"
    >
      {loading && loadingSpinner()}
      {success && successMessage()}
      {err && errorMessage()}
      {/* {photoForm()} */}
      {updateTripForm()}
      {success && <navigate to="/admin/dashboard" />}
    </Base>
  );
};

export default UpdateProduct;
