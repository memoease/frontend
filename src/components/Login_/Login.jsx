import React from "react";
import "../../css/login.scss";
import { NavLink } from "react-router-dom";
const Login = () => {
  return (
    <div>
      <div className="Login_content">
        <h1 className="title">Login</h1>
        <div className="loginForm">
          <form action="">
            <div className="">
              <label htmlFor="email">
                Email:
                <input type="text" name="email" id="email" required />
              </label>
            </div>
            <div className="">
              <label htmlFor="password">
                Password:
                <input type="password" name="password" id="password" required />
              </label>
            </div>
            <div className="login_btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <div className="register_link">
          <p>or</p>
          <NavLink className="toRegisterLink" to="/register">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
