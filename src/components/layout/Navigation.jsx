import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../../css/Navigation.scss";
import { useAuth } from "../../utilities/hooks/useAuth.jsx";
import { logoutUser } from "../../utilities/service/api.js";

const Navigation = () => {
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

        {!authorized ? <div className="btn-Head">
          <NavLink to="login" className="btnLoginin">
            Login
          </NavLink>
          <NavLink to="register" className="btnRegister">
            Register
          </NavLink>
        </div>
          :
          <div className="btn-Head">
            <NavLink to="/" className="btnLoginin" onClick={logoutHandler}>
              Logout
            </NavLink>
            <NavLink to="dashboard" className="btnRegister">
              Dashboard
            </NavLink>
          </div>
        }
      </div>
      {/* Outlet zeigt den Inhalt der gerenderten Route an */}
      <Outlet />

    </div>
  );
};

export default Navigation;
