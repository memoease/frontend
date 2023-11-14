import React from "react";
import "../../css/setting.scss";
import { NavLink } from "react-router-dom";
const Setting = () => {
  return (
    <div>
      <div className="setting_content">
        <h1 className="title">Setting</h1>
        <div className="settingForm">
          <form action="" method="post">
            <div className="">
              <label htmlFor="username">
                Chang name
                <input type="text" name="username" id="username" required />
              </label>
            </div>
            <div className="">
              <label htmlFor="password">
                old password
                <input type="password" name="password" id="password" required />
              </label>
            </div>
            <div className="">
              <label htmlFor="password">
                New password
                <input type="password" name="password" id="password" required />
              </label>
            </div>
            <div className="setting_btn">
              <NavLink className="DashBoardLink" to="/DashBoard_login">
                Save
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
