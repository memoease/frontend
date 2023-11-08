import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../../css/Navigation.scss";

const Navigation = () => {
  return (
    <div>
      <div className="toNavigation-contact">
        <NavLink className="navHeadText" to="">
          <h2>MemoEase</h2>
        </NavLink>

        <NavLink className="navList" to="/home">
          home
        </NavLink>
        <NavLink className="navList" to="/about">
          About
        </NavLink>
        <NavLink className="navList" to="/contact">
          Contact
        </NavLink>

        <div className="btn-Head">

          <NavLink to="login" className="btnLoginin">
            Einlogin
          </NavLink>
          <NavLink to="register" className="btnRegister">
            Register
          </NavLink>
        </div>
      </div>
      {/* Outlet zeigt den Inhalt der gerenderten Route an */}
      <Outlet />

    </div>
  );
};

export default Navigation;
