import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";
import { updateUserData, deleteUserData } from "../../utilities/service/api";

import "../../css/setting.scss";

const Setting = () => {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

      console.log("Benutzername erfolgreich aktualisiert");
    } catch (error) {
      console.error("Fehler bei der Aktualisierung des Benutzernamens", error);
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

      console.log("Benutzerpasswort erfolgreich aktualisiert");
    } catch (error) {
      console.error(
        "Fehler bei der Aktualisierung des Benutzerpassworts",
        error
      );
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserData(userId);

      logout();
      console.log("User deleted successfully");

      // Optional: Weiterleitung zu einer anderen Seite nach dem Löschen
      // Beispiel: history.push("/login");
    } catch (error) {
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
        <h1 className="title">Setting</h1>
        <div className="settingForm">
          <div className="changeName">
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
                    required
                  />
                </label>
              </div>
              <div className="setting_btn">
                <button
                  type="submit"
                  className="DashBoardLink"
                  to="/DashBoard_login"
                >
                  Save Name
                </button>
              </div>
            </form>
          </div>
          <div className="changePwd">
            {/* Form Password change */}
            <form onSubmit={handlePasswordSubmit}>
              <div className="">
                <label htmlFor="oldPassword">
                  Old password
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    required
                  />
                </label>
              </div>
              <div className="">
                <label htmlFor="newPassword">
                  New password
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                  />
                </label>
              </div>
              <div className="setting_btn">
                <button
                  type="submit"
                  className="DashBoardLink"
                  to="/DashBoard_login"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
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

      {/* Modal confirm withdraw */}
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
