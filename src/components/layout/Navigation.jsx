import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../../css/Navigation.scss";
import { AuthProvider, useAuth } from "../../utilities/hooks/useAuth.jsx";

const Navigation = () => {
  const { authorized } = useAuth();


  return (
    <AuthProvider>
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

          {authorized ? <div className="btn-Head">
            <NavLink to="login" className="btnLoginin">
              Login
            </NavLink>
            <NavLink to="register" className="btnRegister">
              Register
            </NavLink>
          </div>
            :
            <div className="btn-Head">
              <NavLink to="login" className="btnLoginin">
                Logout
              </NavLink>
              <NavLink to="register" className="btnRegister">
                Dashboard
              </NavLink>
            </div>
          }
        </div>
        {/* Outlet zeigt den Inhalt der gerenderten Route an */}
        <Outlet />

      </div>
    </AuthProvider>
  );
};

export default Navigation;
