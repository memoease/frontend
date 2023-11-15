import React, { useState } from "react";
import "../../css/login.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utilities/service/api.js";


const Login = () => {

  const navigate = useNavigate();
  const { setAuthorized, setLoading, setUser } = useAuth();
  const [loginData, setLoginData] = useState(
    {
      email: "",
      password: ""
    }
  );

  const changeHandler = (evt) => {
    setLoginData(prev => ({
      ...prev,
      [evt.target.name]: evt.target.value
    }));
  };

  // Function to log in the user
  const loginHandler = async (evt) => {
    evt.preventDefault();
    try {
      setLoading(true);
      const userData = await loginUser(loginData);
      console.log(userData);
      setUser(userData);
      setAuthorized(true);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  return (
    <div>
      <div className="Login_content">
        <h1 className="title">Login</h1>
        <div className="loginForm">
          <form onSubmit={loginHandler}>
            <div className="">
              <label htmlFor="email">
                Email:
                <input type="text" name="email" id="email" value={loginData.email} onChange={changeHandler} required />
              </label>
            </div>
            <div className="">
              <label htmlFor="password">
                Password:
                <input type="password" name="password" id="password" value={loginData.password} onChange={changeHandler} required />
              </label>
            </div>
            <div className="login_btn">
              {/* <button type="submit">Login</button> */}
              <button className="btnToSetting" type="submit" >
                Login
              </button>
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
