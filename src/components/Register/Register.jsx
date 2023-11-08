import React from "react";
import "../../css/register.scss";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <div className="register_container">
        <h1 className="title">Register</h1>
        <div className="register-form">
          <form action="">
            <div className="">
              <label htmlFor="username">
                Username:
                <input type="text" name="username" id="username" required />
              </label>
            </div>
            <div className="">
              <label htmlFor="email">
                Email:
                <input type="email" name="email" id="email" required />
              </label>
            </div>
            <div className="">
              <label htmlFor="password">
                Password:
                <input type="password" name="password" id="password" required />
              </label>
            </div>
            <div className="Register_btn">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
        <div className="login_link">
          <p>or</p>
          <NavLink className="toLoginLink" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
