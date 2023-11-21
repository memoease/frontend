import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utilities/service/api.js";
import "../../css/login.scss";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthorized, setLoading, setUser } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Extract status and message from the URL
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    const msg = searchParams.get("message");

    // Use status and message if available
    if (status && msg) {
      setMessage(decodeURIComponent(msg));
    }
  }, [location.search]);

  const changeHandler = (evt) => {
    setLoginData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
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
      const { error: errorMessage } = error.response.data;

      if (errorMessage) {
        setMessage(`${errorMessage}. `);
      }
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
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={loginData.email}
                  onChange={changeHandler}
                  required
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={loginData.password}
                  onChange={changeHandler}
                  required
                />
              </label>
            </div>
            <div className="login_btn">
              <button className="btnToSetting" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="message-container">
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
