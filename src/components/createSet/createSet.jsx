import React from "react";
import "./style.css";

export const Box = () => {
  return (
    <div className="create-set">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="group">
            <div>
              <input
                className="overlap-group"
                type="text"
                placeholder="Enter Title"
              />
            </div>
            <div>
              <textarea
                className="div-wrapper"
                placeholder="Enter Description"
              ></textarea>
            </div>
          </div>
          <div className="save">save</div>
        </div>
      </div>
    </div>
  );
};
