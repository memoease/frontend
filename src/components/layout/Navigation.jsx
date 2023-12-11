import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth.jsx";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authorized, setUser, setAuthorized, setLoading, user, logout } =
    useAuth();

  const menuHandel = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="navigation">
      <div className="navigationHead">
        <NavLink className="logo" to="/">
          <h2 className="title">
            <span>M</span>
            emo<span>E</span>ase
          </h2>
        </NavLink>
        <div className="menu" onClick={menuHandel}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>

          {authorized ?
            <li>
              <NavLink className="navList" to="/home">
                Home
              </NavLink>
            </li>
            :
            <NavLink className="navList" to="/">
              Home
            </NavLink>
          }

          {!authorized ? (
            <li>
              <NavLink className="navList" to="/about">
                About
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink className="navList" to={`/setting/${user.id}`}>
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
              <NavLink to="/" className="btnLoginin" onClick={logout}>
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
