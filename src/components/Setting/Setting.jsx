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
                username
                <input type="text" name="username" id="username" />
              </label>
            </div>
            <div className="">
              <label htmlFor="password">
                old password
                <input type="password" name="password" id="password" />
              </label>
            </div>
            <div className="">
              <label htmlFor="password">
                New password
                <input type="password" name="password" id="password" />
              </label>
            </div>
            <div className="setting_btn">
              <button type="submit">save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
