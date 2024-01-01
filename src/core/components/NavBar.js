import React from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated, signout, isUser, isAdmin } from "../../auth/helper";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <a className="navbar-brand" href="/">
      LCO
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            exact
            className="nav-link"
            activeClassName="active-nav-link"
            to="/"
          >
            Bookings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active-nav-link"
            to="/cart"
          >
            Home
          </NavLink>
        </li>

        {isUser() && (
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active-nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}

        {isAdmin() && (
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active-nav-link"
              to="/admin/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>
    </div>

    {isAuthenticated() ? (
      <button
        className="btn btn-success nav-btn"
        onClick={() => {
          signout(() => navigate("/"));
        }}
      >
        Sign Out
      </button>
    ) : (
      <div>
        <button
          className="btn btn-success nav-btn"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className="btn btn-success nav-btn"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
      </div>
    )}
  </nav>
  )
};

export default Menu;
