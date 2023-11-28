import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";
import { updateUserData, deleteUserData } from "../../utilities/service/api";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "../../css/setting.scss";

const Setting = () => {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name: name,
      };

      await updateUserData(userId, userData);

      setMessage(`Username updated successfully to: ${name}`);
    } catch (error) {
      setMessage("Error updating username");
      console.error("Error updating username", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        oldPassword: oldPassword,
        password: newPassword,
      };

      await updateUserData(userId, userData);

      setMessage("Password updated successfully");
    } catch (error) {
      setMessage("Error updating password");
      console.error("Error updating password", error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const navigate = useNavigate();

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserData(userId);

      logout();
      console.log("User deleted successfully");

      navigate("/");
    } catch (error) {
      setMessage("Error deleting user");
      console.error("Error deleting user", error);
    }

    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="setting_content">
        <h1 className="title">You can adjust your settings here...</h1>
        <div className="formWrap">
          <div className="settingForm">
            {/* Form change Username */}
            <form onSubmit={handleNameSubmit}>
              <div className="">
                <label htmlFor="username">
                  Change name
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your new username"
                    required
                  />
                </label>
              </div>
              <div className="setting_btn">
                <button type="submit" className="submitBtn">
                  Save new Name
                </button>
              </div>
            </form>
          </div>
          <div className="settingForm">
            {/* Form Password change */}
            <form onSubmit={handlePasswordSubmit}>
              <div className="">
                <label htmlFor="oldPassword">
                  Old password
                  <div className="inputPassword">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="oldPassword"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                      placeholder="at least 8 characters"
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
              <div className="">
                <label htmlFor="newPassword">
                  New password
                  <div className="inputPassword">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      placeholder="at least 8 characters"
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
              <div className="setting_btn">
                <button type="submit" className="submitBtn">
                  Save new Password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="message-container">
          {message && <p className="message">{message}</p>}
        </div>
        {/* Button for Account Delete */}
        <div className="setting_btn">
          <button
            type="button"
            onClick={handleDeleteClick}
            className="deleteBtn"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modal confirm deletion */}
      {showDeleteModal && (
        <div className="delete-modal">
          <p>Do you really want to delete your account?</p>
          <button onClick={handleDeleteConfirm}>Yes, I'm sure</button>
          <button onClick={handleDeleteCancel}>No way!</button>
        </div>
      )}
    </div>
  );
};

export default Setting;
