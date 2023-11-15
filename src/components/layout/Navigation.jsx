import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../css/Navigation.scss";
import { useAuth } from "../../utilities/hooks/useAuth.jsx";

const Navigation = () => {
  const { authorized } = useAuth();
  // const [loggedIn, setLoggedIn] = useState(authorized);

  // useEffect(() => {
  //   setLoggedIn(authorized);
  // }, [authorized]);

  return (
    <div>
      <div className="toNavigation-contact">
        <NavLink className="navHeadText" to="/">
          <h2>MemoEase</h2>
        </NavLink>

        <NavLink className="navList" to="/home">
          Home
        </NavLink>

        {!authorized ? (
          <NavLink className="navList" to="/about">
            About
          </NavLink>
        ) : (
          <NavLink className="navList" to="/setting">
            Setting
          </NavLink>
        )}

        <NavLink className="navList" to="/contact">
          Contact
        </NavLink>

        {!authorized ? (
          <div className="btn-Head">
            <NavLink to="/login" className="btnLoginin">
              Login
            </NavLink>
            <NavLink to="/register" className="btnRegister">
              Register
            </NavLink>
          </div>
        ) : (
          <div className="btn-Head">
            <NavLink to="/login" className="btnLoginin">
              Logout
            </NavLink>
            <NavLink to="/dashboard" className="btnRegister">
              Dashboard
            </NavLink>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
