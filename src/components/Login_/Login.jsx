import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utilities/service/api.js";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setAuthorized, setLoading, setUser } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
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
      // Start loading state
      setLoading(true);

      // Call the loginUser function to authenticate user
      const userData = await loginUser(loginData);
      console.log(userData);

      // Set user data in the application state
      setUser(userData);

      // Mark the user as authorized
      setAuthorized(true);

      // End loading state
      setLoading(false);

      // Check if the Set-ID is present in the Session Storage
      const setIdFromStorage = localStorage.getItem("setId");

      if (setIdFromStorage) {
        // If Set-ID is present, navigate to edit the corresponding set
        navigate(`/editset/${setIdFromStorage}`);
      } else {
        // Otherwise, navigate to the default route (e.g., "/home")
        navigate("/home");
      }
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
      const { error: errorMessage } = error.response?.data;

      if (errorMessage) {
        setMessage(`${errorMessage}. `);
      }
    }
  };

  return (
    <div>
      <div className="signupFormContainer">
        <h1 className="title">Sign in </h1>
        <div className="loginForm">
          <form onSubmit={loginHandler}>
            <div className="">
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={loginData.email}
                  onChange={changeHandler}
                  placeholder="Please provide your email"
                  required
                />
              </label>
            </div>
            <div className="password-input-container">
              <label htmlFor="password" className="password-label">
                Password
                <div className="inputPassword">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={loginData.password}
                    onChange={changeHandler}
                    placeholder="and your password"
                    required
                  />
                  <button
                    type="button"
                    className="pwdvisibilityPass"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
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
