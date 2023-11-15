import React from "react";
import "../../css/setting.scss";

const Setting = () => {
  return (
    <div>
      <div className="setting_content">
        <h1 className="title">Setting</h1>
        <div className="settingForm">
          <form action="" method="post">
            <div className="">
              <label htmlFor="username">
                Change name
                <input type="text" name="username" id="username" required />
              </label>
            </div>
            <div className="">
              <label htmlFor="oldPassword">
                Old password
                <input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
