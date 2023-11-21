import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../css/Navigation.scss";
import { useAuth } from "../../utilities/hooks/useAuth.jsx";
import { logoutUser } from "../../utilities/service/api.js";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    }
  };
const menuHandel = () => {
  setMenuOpen(!menuOpen);
};
return (
  <div className="navigation">
    <div className="toNavigation-list">
      <NavLink className="logo" to="/">
        <h2 className="title">MemoEase</h2>
      </NavLink>
      <div className="menu" onClick={menuHandel}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink className="navList" to="/home">
            Home
          </NavLink>
        </li>

        {!authorized ? (
          <li>
            <NavLink className="navList" to="/about">
              About
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink className="navList" to="/setting">
              Setting
            </NavLink>
          </li>
        )}

        <li>
          <NavLink className="navList" to="/contact">
            Contact
          </NavLink>
        </li>

        {!authorized ? (
          <li className="btn-Head">
            <NavLink to="/login" className="btnLoginin">
              Login
            </NavLink>
            <NavLink to="/register" className="btnRegister">
              Register
            </NavLink>
          </li>
        ) : (
          <li className="btn-Head">
            <NavLink to="/" className="btnLoginin" onClick={logoutHandler}>
              Logout
            </NavLink>
            <NavLink to="/dashboard" className="btnRegister">
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>
    </div>
    <Outlet />
  </div>
);
};

export default Navigation;
