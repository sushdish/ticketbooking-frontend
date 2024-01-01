import React from "react";
import { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    contact: "",
    err: "",
    success: false,
  });

  const { name, email, password, gender, contact, err, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false });
    signup({ name, email, password, gender, contact })
      .then((data) => {
        if (data.err) {
          setValues({ ...values, err: data.err, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            gender: "",
            contact: "",
            err: false,
            success: true,
          });
        }
      })
      .catch(console.log("Error signing up!"));
  };

  const signupForm = () => {
    return (
      <div className="row">
        <form className="col-lg-6 col-md-8 col-sm-12">
          <div className="form-row">
            <div className="form-group ">
              <label htmlFor="name" className="text-light">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleChange("name")}
                name="name"
                id="name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-light">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChange("email")}
              name="email"
              id="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleChange("password")}
              name="password"
              id="password"
            />
          </div>
          <div className="form-group">
              <label htmlFor="gender" className="text-light">
                Gender
              </label>
              <input
                type="text"
                className="form-control"
                value={gender}
                onChange={handleChange("gender")}
                name="gender"
                id="gender"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="contact" className="text-light">
               Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={handleChange("contact")}
                name="contact"
                id="contact"
              />
            </div>
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-block btn-outline-success"
          >
            Sign Up
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
          <div className="alert alert-success">
            Successfully signedup user, please{" "}
            <Link className="alert-link" to="/signin">
              Signin
            </Link>{" "}
            here
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup" description="Signup to explore!" className="container">
      {err && errorMessage()}
      {success && successMessage()}
      {signupForm()}
    </Base>
  );
};

export default Signup;