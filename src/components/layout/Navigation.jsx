import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../css/Navigation.scss";
import { useAuth } from "../../utilities/hooks/useAuth.jsx";
import { useAuth } from "../../utilities/hooks/useAuth.jsx";
import { logoutUser } from "../../utilities/service/api.js";

const Navigation = () => {
  const { authorized } = useAuth();
  // const [loggedIn, setLoggedIn] = useState(authorized);

  // useEffect(() => {
  //   setLoggedIn(authorized);
  // }, [authorized]);
  const { authorized, setUser, setAuthorized, setLoading } = useAuth();

  // Function to log out the user
  const logoutHandler = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setAuthorized(false);
    } catch (error) {
      console.error("Logout error:", error);
    };
  };

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
            <NavLink to="/" className="btnLoginin" onClick={logoutHandler}>
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
