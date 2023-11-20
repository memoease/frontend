import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../css/register.scss";
import { registerUser } from "../../utilities/service/api.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    setError("");
    setConfirmationMessage("");
  }, [formData]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (evt) => {
    evt.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setConfirmationMessage("");
      return;
    }

    try {
      const response = await registerUser({
        name,
        email,
        password,
      });

      if (response.error) {
        setError(response.error); // Keine JSON.stringify mehr
        setConfirmationMessage("");
      } else {
        setConfirmationMessage("Please check your email for confirmation.");
        setIsRegistered(true);
        setError(""); // Fehlermeldung zurücksetzen
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration.");
      setConfirmationMessage("");
    }
  };

  return (
    <div>
      <div className="register_container">
        <h1 className="title">Register</h1>
        <div className="register-form">
          {!isRegistered ? (
            <form onSubmit={handleRegister}>
              <div className="">
                <label htmlFor="name">
                  Username
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your username"
                    required
                  />
                </label>
              </div>
              <div className="">
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Valid email address"
                    required
                  />
                </label>
              </div>
              <div className="password-input-container">
                <label htmlFor="password" className="password-label">
                  Password
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password at least 8 characters"
                    required
                  />
                  <button
                    type="button"
                    className="pwdvisibility"
                    onClick={togglePasswordVisibility}
                  >
                    👁️
                  </button>
                </label>
              </div>

              <div className="password-input-container">
                <label htmlFor="confirmPassword" className="password-label">
                  Confirm Password
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    className="pwdvisibility"
                    onClick={togglePasswordVisibility}
                  >
                    👁️
                  </button>
                </label>
              </div>
              <div className="Register_btn">
                <button type="submit">Register</button>
              </div>
            </form>
          ) : null}
          {error && <p className="error-message">{error}</p>}
          {confirmationMessage && (
            <p className="confirmation-message">{confirmationMessage}</p>
          )}
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
