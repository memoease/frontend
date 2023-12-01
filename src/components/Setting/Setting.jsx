import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";
import { updateUserData, deleteUserData } from "../../utilities/service/api";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import "../../css/setting.scss";
import ModalSetting from "../ModalSetting/ModalSetting";

const Setting = () => {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const navigate = useNavigate();
  // Modal Block function
  const handleDeleteConfirm = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteCancels = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirms = async () => {
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
  return (
    <div className="setting_content">
      <h1 className="title">You can adjust your settings here...</h1>
      <div className="formWrap">
        <div className="settingForm">
          {/* Form change Username */}
          <form onSubmit={handleNameSubmit}>
            <div className="formUsername">
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
              <div className="setting_btn">
                <button type="submit" className="submitBtn">
                  Save new Name
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="settingForm">
          {/* Form Password change */}
          <form onSubmit={handlePasswordSubmit}>
            <div className="formPassword">
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
                <button type="submit" className="submitBtn">
                  Save new Password
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="message-container">
        {message && <p className="message">{message}</p>}
      </div>
      {/* Button for Account Delete  /   Cancel */}
      <div className="modalBtnSetting">
        <button onClick={handleDeleteConfirm}>Delete Account</button>

        <ModalSetting
          showDeleteModal={showDeleteModal}
          handleDeleteConfirms={handleDeleteConfirms}
          handleDeleteCancels={handleDeleteCancels}
          modalText="Do you really want to delete your account?"
          confirmButtonText="Yes, I'm sure"
          cancelButtonText="No way!"
        />
      </div>
    </div>
  );
};

export default Setting;
